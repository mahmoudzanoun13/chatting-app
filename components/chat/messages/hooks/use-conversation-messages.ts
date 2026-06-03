import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { conversationByUserQuery } from "@/hooks/queries/conversations/by-user";
import { infiniteMessagesOptions } from "@/hooks/queries/messages/messages";
import { useCurrentAuth } from "@/hooks/queries/auth/use-current-auth";
import { useMemo } from "react";
import { getSenderType } from "../utils/message-utils";

export function useConversationMessages(userId: string) {
  const { data: user } = useCurrentAuth();

  const { data: conversationId, isLoading: isConvLoading } = useQuery(
    conversationByUserQuery(userId)
  );

  const {
    data: infiniteData,
    isLoading: isMsgLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(infiniteMessagesOptions(Number(conversationId)));

  // Flatten messages from all pages (reverse pages so oldest is first, then newest)
  const messages = useMemo(() => {
    if (!infiniteData?.pages) return [];
    return [...infiniteData.pages].reverse().flat();
  }, [infiniteData]);

  const typedMessages = useMemo(() => {
    if (!user) return [];
    return messages.map((msg) => ({
      ...msg,
      senderType: getSenderType(msg.sender.id, user.id),
    }));
  }, [messages, user]);

  return {
    user,
    conversationId,
    messages,
    typedMessages,
    isLoading: isConvLoading || isMsgLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
}
