'use client';
import { useRouter } from 'next/navigation';
import { SigninFormValues, SigninPostResponse } from './SignInForm.types';
import { User, UserStatus, useUserStore } from '@/store';
import { useApi, useApiErrorMessage } from '@/app/hooks';
import { useUiSnackbar } from '@tectus/ui';
import { ApiErrorCode } from '@/app/constants';

export function useSignInForm() {
  const router = useRouter();
  const { showSnackbar } = useUiSnackbar();
  const { getErrorMessage } = useApiErrorMessage();

  const { loading: loginLoading, sendRequest: loginRequest } = useApi<
    SigninPostResponse,
    SigninFormValues
  >(`api/go/user/login`, {
    method: 'POST',
  });

  const { loading: userLoading, sendRequest: userRequest } = useApi<User>(`api/go/user/me`, {
    method: 'GET',
  });

  const { loading: verifyEmailLoading, sendRequest: verifyEmailRequest } = useApi<any>(
    `api/go/user/sendVerificationEmail`,
    {
      method: 'POST',
    },
  );

  const handleSignIn = async (values: SigninFormValues, verifyEmail = true) => {
    const loginResult = await loginRequest({ body: values });
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
          vertical: 'top',
          horizontal: 'center',
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
          vertical: 'top',
          horizontal: 'center',
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
