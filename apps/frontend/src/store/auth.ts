import { create } from "zustand";
import { persist } from "zustand/middleware";

interface TokenState {
  token: string;
  actions: TokenActions;
}

interface TokenActions {
  setToken: (token: string) => void;
}

export const useAuthStore = create<TokenState>()(
  persist(
    (set) => ({
      token: "",
      actions: {
        setToken: (token: string) => set(() => ({ token })),
      },
    }),
    {
      name: "token",
      partialize: (state) => ({ token: state.token }),
    }
  )
);

export const useToken = () => useAuthStore((state) => state.token);

export const useIsAuthenticated = () => useAuthStore((state) => !!state.token);

export const useAuthActions = () => useAuthStore((state) => state.actions);
