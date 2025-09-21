'use client';
import { useRouter } from 'next/navigation';
import { UserStatus, useUserStore } from '@/store';
import { useApi, useApiErrorMessage } from '@/app/hooks';
import { useUiSnackbar } from '@tectus/ui';
import { ApiErrorCode } from '@/app/constants';
import { useAuthApi, usePersonnelApi, useVendorApi } from '@/app/api';
import { AuthRoleEnum, LoginDTO } from '@/app/api/models';

export function useSignInForm() {
  const router = useRouter();
  const { showSnackbar } = useUiSnackbar();
  const { getErrorMessage } = useApiErrorMessage();

  const { loading: loginLoading, login } = useAuthApi();
  const { loading: vendorLoading, getVendorDetails } = useVendorApi();
  const { loading: personnelLoading, getPersonnelDetails } = usePersonnelApi();

  // TODO: create a model and hook for this on /api
  const { loading: verifyEmailLoading, sendRequest: verifyEmailRequest } = useApi<any>(
    `api/go/user/sendVerificationEmail`,
    {
      method: 'POST',
    },
  );

  const handleSignIn = async (values: LoginDTO, verifyEmail = true) => {
    const loginResult = await login(values);
    const {
      idToken: token,
      refreshToken,
      expiresIn,
      emailVerified = false,
      role,
    } = loginResult.data || {};
    if (!loginResult.data || loginResult.error || !token || !refreshToken) {
      const errorMessage = getErrorMessage(loginResult.error?.code as ApiErrorCode);

      showSnackbar(errorMessage, 'error', {
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'left',
        },
      });
      return;
    }

    let userStatus;
    const isPersonnel = role === AuthRoleEnum.PERSONNEL;

    if (role === AuthRoleEnum.PROVIDER) {
      const vendorResult = await getVendorDetails({
        token: token,
        refreshToken: refreshToken,
      });
      if (vendorResult?.error?.message) {
        showSnackbar(vendorResult?.error?.message || '', 'error', {
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'left',
          },
        });
        return;
      }
      userStatus = vendorResult?.data?.status;
      useUserStore.getState().setVendor(vendorResult?.data);
    }

    if (isPersonnel) {
      const { data, error } = await getPersonnelDetails({
        token: token,
        refreshToken: refreshToken,
      });
      if (error) {
        showSnackbar(error.message || '', 'error');
        return;
      }
      useUserStore.getState().setPersonnel(data);
      userStatus = data.personnelInfo.status;
    }

    // Note: this cookie will be used for authentication in the middleware for route guarding
    document.cookie = `token=${token}; path=/; max-age=${expiresIn}; secure; samesite=lax`;
    useUserStore.getState().setAuth(loginResult.data);

    if (isPersonnel) {
      // TODO: improve handling personnel specific logic
      if (userStatus === 'SignedUp') {
        router.push('/create-profile');
        return;
      }

      if (userStatus === 'Pending') {
        router.push('/application-submitted');
        return;
      }

      router.push('/dashboard');

      return;
    }

    if (emailVerified && userStatus) {
      const statusRoutes: Record<UserStatus, string> = {
        [UserStatus.APPROVED]: '/dashboard',
        [UserStatus.PENDING]: '/application-submitted',
        [UserStatus.REJECTED]: '/application-rejected',
      };

      const statusUpperCase = (userStatus || '').toUpperCase() as UserStatus;
      const targetRoute = statusRoutes[statusUpperCase] ?? '/submit-info';
      router.push(targetRoute);
      return;
    }

    // Note: send a request to verify email
    if (verifyEmail) {
      await verifyEmailRequest({
        body: {
          email: values.email,
        },
      });
    }

    router.push('/verify-email');
  };

  return {
    handleSignIn,
    loading: loginLoading || verifyEmailLoading || vendorLoading || personnelLoading,
  };
}
