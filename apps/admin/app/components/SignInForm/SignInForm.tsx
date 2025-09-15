'use client';
import { useBEM, useForm } from '@tectus/hooks';
import './SignInForm.scss';
import { UiButton, UiTextField } from '@tectus/ui';
import { SigninFormProps } from './SignInForm.types';
import { UiSwitch } from '@tectus/ui';
import { useState } from 'react';
import { LoginInForm } from '@/app/api/models';

export function SignInForm({ onSubmit, loading }: SigninFormProps) {
  const { B, E } = useBEM('sign-in-form');
  const [rememberMe, setRememberMe] = useState(false);

  const {
    register,
    handleSubmit,
    validate: { required, email },
    errors,
  } = useForm<LoginInForm>({
    email: '',
    password: '',
  });

  const onSubmitInternal = async (values: LoginInForm) => {
    onSubmit?.(values);
  };

  return (
    <form className={B()} onSubmit={handleSubmit(onSubmitInternal)}>

      <UiTextField
        label="Email"
        {...register('email', {
          ...required('Please enter your email.'),
          ...email('Invalid email address'),
        })}
        helperText={errors.email}
        error={Boolean(errors.email)}
      />

      <UiTextField
        label="Password"
        type="password"
        {...register('password', {
          ...required('Please enter your password.'),
        })}
        helperText={errors.password}
        error={Boolean(errors.password)}
      />

      <UiSwitch checked={rememberMe} onChange={() => setRememberMe(!rememberMe)} label='Remember me' />

      <UiButton type="submit" className={E('submit')} loading={loading}>
        Sign in
      </UiButton>
    </form>
  );
}
