'use client';
import { useRouter } from 'next/navigation';
import { UserStatus, useUserStore } from '@/store';
import { useApi, useApiErrorMessage } from '@/app/hooks';
import { useUiSnackbar } from '@tectus/ui';
import { ApiErrorCode } from '@/app/constants';
import { useAuthApi, usePersonnelApi, useVendorApi } from '@/app/api';
import { AuthRoleEnum, LoginDTO } from '@/app/api/models';

export function useSignInForm(manual = true) {
  const router = useRouter();
  const { showSnackbar } = useUiSnackbar();
  const { getErrorMessage } = useApiErrorMessage();

  const { loading: loginLoading, login } = useAuthApi();
  const { loading: vendorLoading, getVendorDetails } = useVendorApi();
  const { loading: personnelLoading, getPersonnelDetails } = usePersonnelApi(true);

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
    const isVendor = role === AuthRoleEnum.PROVIDER;
    const isPersonnel = role === AuthRoleEnum.PERSONNEL;
    if (manual && !isVendor) {
      showSnackbar(
        'This account can only be accessed from the mobile app. Please use the app to log in.',
        'info',
      );
      return;
    }

    if (isVendor) {
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
      userStatus = data.status;
    }

    // Note: this cookie will be used for authentication in the middleware for route guarding
    document.cookie = `token=${token}; path=/; max-age=${expiresIn}; secure; samesite=lax`;
    useUserStore.getState().setAuth(loginResult.data);

    if (isPersonnel) {
      router.push('/create-profile');
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
