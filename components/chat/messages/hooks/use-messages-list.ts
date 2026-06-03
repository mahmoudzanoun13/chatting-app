import { useCallback, useEffect, useState } from "react";
import { useConversationMessages } from "./use-conversation-messages";
import { useConversationSocket } from "./use-conversation-socket";
import { useSendMessage } from "./use-send-message";
import { useAutoScroll } from "./use-auto-scroll";
import { useMarkAsRead } from "@/hooks/mutations/notifications/use-mark-as-read";
import { useNotificationStore } from "@/stores/notification-store";

export function useMessagesList(userId: string) {
  const {
    user,
    conversationId,
    messages,
    typedMessages,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useConversationMessages(userId);

  const socket = useConversationSocket(conversationId, user);
  const { handleSend } = useSendMessage(conversationId, user, socket);
  const { containerRef, bottomRef } = useAutoScroll({ dependency: messages });

  const [showScrollToBottom, setShowScrollToBottom] = useState(false);

  const clearUnread = useNotificationStore((state) => state.clearUnread);
  const setActiveConversationId = useNotificationStore((state) => state.setActiveConversationId);
  const { mutate: markAsRead } = useMarkAsRead();

  // Mark messages as read and set active conversation when opening a chat
  useEffect(() => {
    if (!conversationId) return;

    const id = Number(conversationId);
    clearUnread(id);
    markAsRead(id);
    setActiveConversationId(id);

    return () => {
      setActiveConversationId(null);
    };
  }, [conversationId, clearUnread, markAsRead, setActiveConversationId]);

  // Handle scroll to detect if we're near the bottom
  useEffect(() => {
    const container = containerRef.current;
    if (!container || isLoading) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      // Show button if we are more than 300px away from bottom
      const isNearBottom = scrollHeight - scrollTop - clientHeight < 300;
      setShowScrollToBottom(!isNearBottom);
    };

    // Initialize state
    handleScroll();

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [containerRef, isLoading, typedMessages]);

  const scrollToBottom = useCallback(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [bottomRef]);

  // Load older messages while preserving the current scroll position
  const handleLoadMore = useCallback(async () => {
    const container = containerRef.current;
    const prevScrollHeight = container?.scrollHeight ?? 0;

    await fetchNextPage();

    // After new messages are prepended, restore scroll position
    requestAnimationFrame(() => {
      if (container) {
        container.scrollTop = container.scrollHeight - prevScrollHeight;
      }
    });
  }, [fetchNextPage, containerRef]);

  return {
    user,
    conversationId,
    typedMessages,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    showScrollToBottom,
    handleSend,
    handleLoadMore,
    scrollToBottom,
    containerRef,
    bottomRef,
  };
}
