'use client';
import { UiButton, UiTextField, useUiSnackbar } from '@tectus/ui';
import { PageBanner, useSignInForm } from '../components';
import { useBEM, useForm } from '@tectus/hooks';
import './signup-page.scss';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { useApi } from '../hooks';

type SignupFormValues = {
  email: string;
  password: string;
  repeatPassword: string;
};
interface SignupPostResponse {
  countryCode: string;
  email: string;
  emailVerified: boolean;
  firstName: string;
  id: string;
  lastName: string;
  name: string;
  phoneNumber: string;
  phoneVerified: boolean;
  rating: number;
  role: string;
}

//TODO: create a global function/hook to handle all env variables
const baseApiURL = process.env.NEXT_PUBLIC_API_URL;

export default function Signup() {
  const router = useRouter();
  const { B, E } = useBEM('signup-page');
  const { showSnackbar } = useUiSnackbar();
  const { handleSignIn, loading: signInLoading } = useSignInForm();

  const { loading, sendRequest } = useApi<
    SignupPostResponse,
    Omit<SignupFormValues, 'repeatPassword'>
  >(`user/register`, {
    method: 'POST',
  });

  const {
    values,
    register,
    handleSubmit,
    validate: { required, email, minLength },
    errors,
  } = useForm<SignupFormValues>({
    email: '',
    password: '',
    repeatPassword: '',
  });

  const handleOnSubmit = async ({ email, password }: SignupFormValues) => {
    if (passwordNotMatch) return;
    const result = await sendRequest({
      body: {
        countryCode: 'US',
        password,
        email,
      },
    });
    if (result.error) {
      showSnackbar(result.error.message, 'error', {
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center',
        },
      });

      return;
    }

    await handleSignIn(
      {
        email,
        password,
      },
      false,
    );
  };

  const passwordNotMatch = useMemo(() => {
    return values.password !== values.repeatPassword && values.repeatPassword.length > 0;
  }, [values.password, values.repeatPassword]);

  const passwordErrorMessage = useMemo(() => {
    if (errors.repeatPassword) return errors.repeatPassword;
    return passwordNotMatch ? 'Passwords do not match' : '';
  }, [errors.repeatPassword, passwordNotMatch]);

  return (
    <div className={B()}>
      <PageBanner
        title="Sign up for Tectus GO"
        subtitle="Connecting security professionals and companies on-demand."
      />

      <form className={E('form')} onSubmit={handleSubmit(handleOnSubmit)}>
        <UiTextField
          placeholder="Email"
          {...register('email', {
            ...required('Please enter your email.'),
            ...email('Invalid email address.'),
          })}
          type="email"
          helperText={errors.email}
          error={Boolean(errors.email)}
        />

        <UiTextField
          placeholder="Password"
          {...register('password', {
            ...required('Please enter your password.'),
            ...minLength(8, 'Password must be at least 8 characters long.'),
          })}
          type="password"
          helperText={errors.password}
          error={Boolean(errors.password)}
        />

        <UiTextField
          placeholder="Repeat Password"
          {...register('repeatPassword', {
            ...required('Please repeat your password.'),
            ...minLength(8, 'Password must be at least 8 characters long.'),
          })}
          type="password"
          helperText={passwordErrorMessage}
          error={Boolean(errors.repeatPassword) || passwordNotMatch}
        />

        <UiButton type="submit" loading={loading || signInLoading} topspacing={3}>
          Sign up
        </UiButton>
      </form>
    </div>
  );
}
