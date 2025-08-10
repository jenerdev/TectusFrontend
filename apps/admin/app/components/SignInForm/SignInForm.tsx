'use client';
import { useBEM, useForm } from '@tectus/hooks';
import './SignInForm.scss';
import { UiButton, UiTextField } from '@tectus/ui';
import { SigninFormProps, SigninFormValues } from './SignInForm.types';
import { UiSwitch } from '@tectus/ui/UiSwitch/UiSwitch';
import { useState } from 'react';

export function SignInForm({ onSubmit, loading }: SigninFormProps) {
  const { B, E } = useBEM('sign-in-form');
  const [rememberMe, setRememberMe] = useState(false);

  const {
    register,
    handleSubmit,
    validate: { required, email },
    errors,
  } = useForm<SigninFormValues>({
    email: '',
    password: '',
  });

  const onSubmitInternal = async (values: SigninFormValues) => {
    console.log('Form submitted with values:', values);
    onSubmit?.(values);
  };

  return (
    <form className={B()} onSubmit={handleSubmit(onSubmitInternal)}>

      <UiTextField
        placeholder="Email"
        {...register('email', {
          ...required('Please enter your email.'),
          ...email('Invalid email address'),
        })}
        helperText={errors.email}
        error={Boolean(errors.email)}
      />

      <UiTextField
        placeholder="Password"
        type="password"
        {...register('password', {
          ...required('Please enter your password.'),
        })}
        helperText={errors.password}
        error={Boolean(errors.password)}
      />

      <UiSwitch checked={rememberMe} onChange={() => setRememberMe(!rememberMe)} label='Remember me' />

      <UiButton type="submit" className={E('submit')} loading={loading} topspacing={3} fullWidth>
        Sign in
      </UiButton>
    </form>
  );
}
