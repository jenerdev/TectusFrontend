// import { create } from 'zustand';
// import { persist } from 'zustand/middleware';

// export interface User {
//   id: string;
//   email: string;
//   companyName: string;
//   emailVerified: boolean;

//   status?: 'Pending' | 'Rejected' | 'Approved';
//   // TODO: add missing fields
// }

// interface UserState {
//   user?: User;
//   token?: string;
//   refreshToken?: string;
//   hasHydrated: boolean;
//   setUser: (user: User) => void;
//   login: (data: { token: string; refreshToken: string }) => void;
//   logout: () => void;
//   setHasHydrated: (hydrated: boolean) => void;
// }

// export const useUserStore = create<UserState>()(
//   persist(
//     (set) => ({
//       user: undefined,
//       token: undefined,
//       refreshToken: undefined,
//       hasHydrated: false,
//       emailVerified: false,

//       setUser: (user) => set({ user }),
//       login: ({ token, refreshToken }) => set({ token, refreshToken }),
//       logout: () => {
//         document.cookie = 'token=; path=/; max-age=0';
//         set({ user: undefined, token: undefined, refreshToken: undefined });
//       },

//       setHasHydrated: (hydrated) => set({ hasHydrated: hydrated }),
//     }),
//     {
//       name: 'user',
//       partialize: (state) => ({
//         user: state.user,
//         token: state.token,
//         refreshToken: state.refreshToken,
//       }),
//       // ✅ this is the key: tells Zustand when it's finished restoring from storage
//       onRehydrateStorage: () => (state) => {
//         state?.setHasHydrated(true);
//       },
//     },
//   ),
// );

import { create, StoreApi, UseBoundStore } from 'zustand';
import { persist } from 'zustand/middleware';

export enum UserStatus {
  PENDING = 'PENDING',
  REJECTED = 'REJECTED',
  APPROVED = 'APPROVED',
}
export interface User {
  id: string;
  email: string;
  companyName: string;
  emailVerified: boolean;
  status?: UserStatus;
}

export interface UserState {
  user?: User;
  token?: string;
  refreshToken?: string;
  hasHydrated: boolean;
  emailVerified: boolean;
  setUser: (user: User) => void;
  login: (data: { token: string; refreshToken: string; emailVerified: boolean }) => void;
  logout: () => void;
  setHasHydrated: (hydrated: boolean) => void;
}

export const useUserStore: UseBoundStore<StoreApi<UserState>> = create<UserState>()(
  persist<UserState, [], [], Pick<UserState, 'user' | 'token' | 'refreshToken'>>(
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
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
