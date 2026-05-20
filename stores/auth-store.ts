import { create } from "zustand";

type User = {
  id: number;
  name: string;
  email: string;
  avatar?: string | null;
};

type AuthStore = {
  user: User | null;
  loading: boolean;
  initialized: boolean;

  fetchMe: () => Promise<void>;
  logout: () => Promise<void>;
};

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  loading: true,
  initialized: false,

  fetchMe: async () => {
    try {
      const response = await fetch("/api/auth/me", {
        credentials: "include",
      });

      const result = await response.json();

      if (result.success) {
        set({
          user: result.data,
          loading: false,
          initialized: true,
        });
      } else {
        set({
          user: null,
          loading: false,
          initialized: true,
        });
      }
    } catch {
      set({
        user: null,
        loading: false,
        initialized: true,
      });
    }
  },

  logout: async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    set({
      user: null,
    });
  },
}));
