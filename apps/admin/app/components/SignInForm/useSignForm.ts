'use client';
import { useRouter } from 'next/navigation';
import { useHttp } from '@tectus/hooks';
import { SigninFormValues, SigninPostResponse } from './SignInForm.types';
import { useGlobalAlert } from '../GlobalAlert';

export function useSignInForm() {
  const router = useRouter();
  const { showAlert } = useGlobalAlert();

  const { data, error, loading, sendRequest } = useHttp<SigninPostResponse, SigninFormValues>(
    'https://tectus-api-dev-ec5ef89bd7d4.herokuapp.com/api/go/user/login',
    {
      method: 'POST',
    },
  );

  const handleSignIn = async (values: SigninFormValues) => {
    const result = await sendRequest({ body: values });

    if (result.error) {
      showAlert('Login failed. Please check your credentials.', 'danger', true);
      return;
    }

    router.push('/dashboard');
  };

  return {
    handleSignIn,
    loading,
    error,
    data,
  };
}
