'use client';
import { Button, Input, InputWrapper } from '@tectus/ui';
import { PageBanner, useGlobalAlert } from '../components';
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
  const { showAlert } = useGlobalAlert();

  const { loading, sendRequest } = useApi<SignupPostResponse, Omit<SignupFormValues, 'repeatPassword'>>(
    `user/register`,
    {
      method: 'POST',
    },
  );

  const {
    values,
    register,
    handleSubmit,
    validate: {
      required,
      email,
      minLength,
    },
    errors,
  } = useForm<SignupFormValues>({
    email: '',
    password: '',
    repeatPassword: '',
  });

  const handleOnSubmit = async ({ email, password }: SignupFormValues) => {
    if(passwordNotMatch) return;
    const result = await sendRequest({
      body: {
        countryCode: 'US',
        password,
        email,
      },
    });
    if(result.error){
      showAlert(result.error.message, 'danger', false);
      return;
    }
    router.push('alert/verify-email')
  };

  const passwordNotMatch = useMemo(() => {
    return values.password !== values.repeatPassword && values.repeatPassword.length > 0;
  }, [values.password, values.repeatPassword]);

  const passwordErrorMessage = useMemo(() => {
    if (errors.repeatPassword) return errors.repeatPassword;
    return passwordNotMatch ? 'Passwords do not match': '';
  }, [errors.repeatPassword, passwordNotMatch]);

  return (
    <div className={B()}>
      <PageBanner
        title="Sign up for Tectus GO"
        subtitle="Connecting security professionals and companies on-demand."
      />

      <form className={E('form')} onSubmit={handleSubmit(handleOnSubmit)}>
        <InputWrapper helperText={errors.email} isError={!!errors.email}>
          <Input
            {...register('email', {
              ...required('Email is required'),
              ...email('Invalid email address'),
            })}
            type="email"
            placeholder="Email"
          />
        </InputWrapper>

        <InputWrapper helperText={errors.password} isError={!!errors.password}>
          <Input
            {...register('password', {
              ...required('Password is required'),
              ...minLength(8, 'Password must be at least 8 characters long'),
            })}
            placeholder="Password"
            type="password"
          />
        </InputWrapper>

        <InputWrapper helperText={passwordErrorMessage} isError={!!errors.repeatPassword || passwordNotMatch}>
          <Input
            {...register('repeatPassword', {
              ...required('Password is required'),
              ...minLength(8, 'Password must be at least 8 characters long'),
            })}
            placeholder="Repeat Password"
            type="password"
          />
        </InputWrapper>
        <Button type="submit" className={E('submit-button')} loading={loading}>
          Sign up
        </Button>
      </form>
    </div>
  );
}
