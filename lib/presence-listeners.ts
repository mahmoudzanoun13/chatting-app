import { getSocket } from "@/lib/socket-client";
import { usePresenceStore } from "@/stores/presence-store";
import { useTypingStore } from "@/stores/typing-store";

export function initPresenceListeners() {
  const socket = getSocket();
  const presenceStore = usePresenceStore.getState();
  const typingStore = useTypingStore.getState();

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
}
