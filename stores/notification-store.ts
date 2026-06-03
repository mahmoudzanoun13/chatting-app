import { create } from "zustand";

type NotificationStore = {
  // Map of conversationId -> unread count
  unreadCounts: Record<number, number>;

  incrementUnread: (conversationId: number) => void;
  clearUnread: (conversationId: number) => void;
  setUnreadCount: (conversationId: number, count: number) => void;
  setBulkUnread: (counts: Record<number, number>) => void;
  activeConversationId: number | null;
  setActiveConversationId: (id: number | null) => void;
  getTotalUnread: () => number;
  reset: () => void;
};

export const useNotificationStore = create<NotificationStore>((set, get) => ({
  unreadCounts: {},
  activeConversationId: null,

  setActiveConversationId: (id) => set({ activeConversationId: id }),

  getTotalUnread: () => {
    return Object.values(get().unreadCounts).reduce((acc, count) => acc + count, 0);
  },

  incrementUnread: (conversationId) =>
    set((state) => {
      // Don't increment if this conversation is currently active
      if (state.activeConversationId === conversationId) {
        return state;
      }
      return {
        unreadCounts: {
          ...state.unreadCounts,
          [conversationId]: (state.unreadCounts[conversationId] || 0) + 1,
        },
      };
    }),

  clearUnread: (conversationId) =>
    set((state) => {
      const updated = { ...state.unreadCounts };
      delete updated[conversationId];
      return { unreadCounts: updated };
    }),

  setUnreadCount: (conversationId, count) =>
    set((state) => ({
      unreadCounts: {
        ...state.unreadCounts,
        [conversationId]: count,
      },
    })),

  setBulkUnread: (counts) => set({ unreadCounts: counts }),

  reset: () => set({ unreadCounts: {} }),
}));
