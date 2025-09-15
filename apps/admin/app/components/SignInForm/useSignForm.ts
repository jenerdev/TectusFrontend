'use client';
import { useRouter } from 'next/navigation';
import { User, UserStatus, useUserStore } from '@/store';
import { useApi, useApiErrorMessage } from '@/app/hooks';
import { useUiSnackbar } from '@tectus/ui';
import { ApiErrorCode } from '@/app/constants';
import { useUserApi } from '@/app/api';
import { LoginInForm } from '@/app/api/models';

export function useSignInForm() {
  const router = useRouter();
  const { showSnackbar } = useUiSnackbar();
  const { getErrorMessage } = useApiErrorMessage();

  const { loading: loginLoading, login } = useUserApi();

  // TODO: create a model and hook for this on /api
  const { loading: userLoading, sendRequest: userRequest } = useApi<User>(`api/go/user/me`, {
    method: 'GET',
  });

  // TODO: create a model and hook for this on /api
  const { loading: verifyEmailLoading, sendRequest: verifyEmailRequest } = useApi<any>(
    `api/go/user/sendVerificationEmail`,
    {
      method: 'POST',
    },
  );

  const handleSignIn = async (values: LoginInForm, verifyEmail = true) => {
    const loginResult = await login(values);
    const {
      idToken: token,
      refreshToken,
      expiresIn,
      emailVerified = false,
    } = loginResult.data || {};
    if (loginResult.error || !token || !refreshToken) {
      const errorMessage = getErrorMessage(loginResult.error?.code as ApiErrorCode);

      showSnackbar(errorMessage, 'error', {
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'left',
        },
      });
      return;
    }
    const userResult = await userRequest({
      token: token,
      refreshToken: refreshToken,
    });
    if (userResult.error || !userResult.data) {
      const errorMessage = getErrorMessage(userResult.error?.message as ApiErrorCode);

      showSnackbar(errorMessage, 'error', {
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'left',
        },
      });
      return;
    }
    // Note: this cookie will be used for authentication in the middleware for route guarding
    document.cookie = `token=${token}; path=/; max-age=${expiresIn}; secure; samesite=lax`;
    useUserStore.getState().login({ token, refreshToken, emailVerified });
    useUserStore.getState().setUser(userResult.data);

    if (emailVerified) {
      const status = (userResult.data.status || '').toUpperCase() as UserStatus;

      const statusRoutes: Record<UserStatus, string> = {
        [UserStatus.APPROVED]: '/dashboard',
        [UserStatus.PENDING]: '/application-submitted',
        [UserStatus.REJECTED]: '/application-rejected',
      };

      const targetRoute = statusRoutes[status] ?? '/submit-info';

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
    loading: loginLoading || userLoading || verifyEmailLoading,
  };
}
