import { create } from "zustand";

type TypingStore = {
  // Map of conversationId -> Set of userIds currently typing
  typingUsers: Record<number, Set<number>>;

  addUserTyping: (conversationId: number, userId: number) => void;
  removeUserTyping: (conversationId: number, userId: number) => void;
  getTypingUsers: (conversationId: number) => number[];
};

export const useTypingStore = create<TypingStore>((set, get) => ({
  typingUsers: {},

  addUserTyping: (conversationId, userId) =>
    set((state) => {
      const currentSet = state.typingUsers[conversationId] || new Set();
      const updatedSet = new Set(currentSet);
      updatedSet.add(userId);
      return {
        typingUsers: {
          ...state.typingUsers,
          [conversationId]: updatedSet,
        },
      };
    }),

  removeUserTyping: (conversationId, userId) =>
    set((state) => {
      const currentSet = state.typingUsers[conversationId];
      if (!currentSet) return state;

      const updatedSet = new Set(currentSet);
      updatedSet.delete(userId);
      return {
        typingUsers: {
          ...state.typingUsers,
          [conversationId]: updatedSet,
        },
      };
    }),

  getTypingUsers: (conversationId) => {
    const set = get().typingUsers[conversationId];
    return set ? Array.from(set) : [];
  },
}));
