'use client';
import { useRouter } from 'next/navigation';
import { SigninFormValues, SigninPostResponse } from './SignInForm.types';
import { useGlobalAlert } from '../GlobalAlert';
import { User, useUserStore } from '@/store/userStore';
import { useApi } from '@/app/hooks';

export function useSignInForm() {
  const router = useRouter();
  const { showAlert } = useGlobalAlert();

  const { loading: loginLoading, sendRequest: loginRequest } = useApi<
    SigninPostResponse,
    SigninFormValues
  >(`user/login`, {
    method: 'POST',
  });

  const { loading: userLoading, sendRequest: userRequest } = useApi<User>(`user/me`, {
    method: 'GET',
  });

  const handleSignIn = async (values: SigninFormValues) => {
    const loginResult = await loginRequest({ body: values });
    const { idToken: token, refreshToken, expiresIn } = loginResult.data || {};

    if (loginResult.error || !token || !refreshToken) {
      showAlert('Login failed. Please check your credentials.', 'error', true);
      return;
    }

    const userResult = await userRequest({
      token: token,
      refreshToken: refreshToken,
    });

    if (userResult.error || !userResult.data) {
      showAlert('Error fetching user data, please contact support.', 'error', true);
      return;
    }

    // Note: this cookie will be used for authentication in the middleware for route guarding
    document.cookie = `token=${token}; path=/; max-age=${expiresIn}; secure; samesite=lax`;

    useUserStore.getState().login({ token, refreshToken });
    useUserStore.getState().setUser(userResult.data);
    router.push('/dashboard');
  };

  return {
    handleSignIn,
    loading: loginLoading || userLoading,
  };
}
