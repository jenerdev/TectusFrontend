import { AuthModel, AuthRoleEnum, VendorModel } from '@/app/api/models';
import { create, StoreApi, UseBoundStore } from 'zustand';
import { persist } from 'zustand/middleware';

export enum UserStatus {
  PENDING = 'PENDING',
  REJECTED = 'REJECTED',
  APPROVED = 'APPROVED',
}

export interface UserState {
  auth?: AuthModel;
  vendor?: VendorModel | null;
  personnel?: any; //TODO: define personnel model
  hasHydrated: boolean;
  setAuth: (data: AuthModel) => void;
  setVendor: (data: VendorModel | null) => void;
  setPersonnel: (data: any) => void;
  logout: () => void;
  setHasHydrated: (hydrated: boolean) => void;
  updateTokens: (data: { token: string; refreshToken: string }) => void;
  getUserStatus: () => UserStatus;
  getUser: () => VendorModel | null | any;
}

export const useUserStore: UseBoundStore<StoreApi<UserState>> = create<UserState>()(
  persist<UserState, [], [], Pick<UserState, 'vendor'>>(
    (set, get) => ({
      auth: undefined,
      vendor: undefined,
      personnel: undefined,
      hasHydrated: false,

      setAuth: (auth) => set({ auth }),
      setVendor: (vendor) => set({ vendor, personnel: undefined }),
      setPersonnel: (personnel) => set({ personnel, vendor: undefined }),
      logout: () => {
        document.cookie = 'token=; path=/; max-age=0';
        set({ vendor: undefined, auth: undefined, personnel: undefined });
      },
      setHasHydrated: (hydrated) => set({ hasHydrated: hydrated }),
      updateTokens: ({ token, refreshToken }) => {
        const currentAuth = get().auth as AuthModel;
        set({ auth: { ...currentAuth, idToken: token, refreshToken } });
      },
      getUserStatus: () => {
        const isPersonnel = get().auth?.role === AuthRoleEnum.PERSONNEL;
        const status = isPersonnel ? get().personnel?.personnelInfo.status : get().vendor?.status;
        return (status || '').toUpperCase() as UserStatus;
      },
      getUser: () => {
        const isPersonnel = get().auth?.role === AuthRoleEnum.PERSONNEL;
        return isPersonnel ? get().personnel : get().vendor;
      },
    }),
    {
      name: 'user',
      partialize: (state) => ({
        auth: state.auth,
        vendor: state.vendor,
        personnel: state.personnel,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
