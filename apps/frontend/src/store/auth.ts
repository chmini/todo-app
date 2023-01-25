import { create } from "zustand";
import { persist } from "zustand/middleware";

interface TokenState {
  token: string;
  actions: TokenActions;
}

interface TokenActions {
  setToken: (token: string) => void;
}

export const useTokenStore = create<TokenState>()(
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

export const useToken = () => useTokenStore((state) => state.token);

export const useIsAuthenticated = () => useTokenStore((state) => !!state.token);

export const useTokenActions = () => useTokenStore((state) => state.actions);
