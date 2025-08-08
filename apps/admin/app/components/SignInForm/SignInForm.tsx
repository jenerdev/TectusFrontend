'use client';
import { useBEM, useForm } from '@tectus/hooks';
import './SignInForm.scss';
import { UiButton, UiTextField } from '@tectus/ui';
import { SigninFormProps, SigninFormValues } from './SignInForm.types';

export function SignInForm({ onSubmit, loading }: SigninFormProps) {
  const { B, E } = useBEM('sign-in-form');

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
          ...required('Email is required'),
          ...email('Invalid email address'),
        })}
        helperText={errors.email}
        error={Boolean(errors.email)}
      />

      <UiTextField
        placeholder="Password"
        type="password"
        {...register('password', {
          ...required('Password is required'),
        })}
        helperText={errors.password}
        error={Boolean(errors.password)}
      />

      <UiButton type="submit" className={E('submit')} loading={loading} topSpacing={3} >
        Sign in
      </UiButton>
    </form>
  );
}
