import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  id: string;
  email: string;
  companyName: string;
}

interface UserState {
  user?: User;
  token?: string;
  refreshToken?: string;
  emailVerified: boolean;
  hasHydrated: boolean;
  setUser: (user: User) => void;
  login: (data: { token: string; refreshToken: string; emailVerified: boolean }) => void;
  logout: () => void;
  setHasHydrated: (hydrated: boolean) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: undefined,
      token: undefined,
      refreshToken: undefined,
      hasHydrated: false,
      emailVerified: false,

      setUser: (user) => set({ user }),
      login: ({ token, refreshToken, emailVerified }) =>
        set({ token, refreshToken, emailVerified }),
      logout: () => {
        document.cookie = 'token=; path=/; max-age=0';
        set({ user: undefined, token: undefined, refreshToken: undefined });
      },

      setHasHydrated: (hydrated) => set({ hasHydrated: hydrated }),
    }),
    {
      name: 'user',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        refreshToken: state.refreshToken,
        emailVerified: state.emailVerified,
      }),
      // ✅ this is the key: tells Zustand when it's finished restoring from storage
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
