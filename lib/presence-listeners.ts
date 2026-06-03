import { getSocket } from "@/lib/socket-client";
import { usePresenceStore } from "@/stores/presence-store";
import { useTypingStore } from "@/stores/typing-store";
import { useNotificationStore } from "@/stores/notification-store";
import { markAsRead } from "@/hooks/mutations/notifications/use-mark-as-read";
import { playNotificationSound } from "./audio";
import { queryClient } from "./query-client";

export function initPresenceListeners() {
  const socket = getSocket();
  const presenceStore = usePresenceStore.getState();
  const typingStore = useTypingStore.getState();
  const notificationStore = useNotificationStore.getState();

  socket.on("user_online", ({ userId }) => {
    presenceStore.setOnline(userId);
  });

  socket.on("user_offline", ({ userId }) => {
    presenceStore.setOffline(userId);
  });

  socket.on("online_users_snapshot", ({ users }) => {
    presenceStore.setBulk(users);
  });

  socket.on("user_typing_status", ({ userId, conversationId, isTyping }) => {
    if (isTyping) {
      typingStore.addUserTyping(conversationId, userId);
    } else {
      typingStore.removeUserTyping(conversationId, userId);
    }
  });

  socket.on("new_notification", ({ conversationId }) => {
    notificationStore.incrementUnread(conversationId);
    
    // Invalidate the messages query to ensure it fetches latest on open
    queryClient.invalidateQueries({
      queryKey: ["messages", conversationId],
    });
    
    // If it's active, we should still mark as read in DB to be safe
    const state = useNotificationStore.getState();
    if (state.activeConversationId === conversationId) {
      markAsRead(conversationId);
    } else {
      // Play sound for background notifications
      playNotificationSound();
    }
  });
}
