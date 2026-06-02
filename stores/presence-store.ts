import { create } from "zustand";

type PresenceStore = {
  onlineUsers: Set<number>;

  setOnline: (userId: number) => void;
  setOffline: (userId: number) => void;
  setBulk: (userIds: number[]) => void;
  isOnline: (userId: number) => boolean;
  reset: () => void;
};

export const usePresenceStore = create<PresenceStore>((set, get) => ({
  onlineUsers: new Set<number>(),

  setOnline: (userId) =>
    set((state) => {
      const updated = new Set(state.onlineUsers);
      updated.add(userId);
      return { onlineUsers: updated };
    }),

  setOffline: (userId) =>
    set((state) => {
      const updated = new Set(state.onlineUsers);
      updated.delete(userId);
      return { onlineUsers: updated };
    }),

  setBulk: (userIds) =>
    set(() => ({
      onlineUsers: new Set(userIds),
    })),

  isOnline: (userId) => {
    return get().onlineUsers.has(userId);
  },
  reset: () => set({ onlineUsers: new Set() }),
}));
