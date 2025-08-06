'use client';
import { useBEM, useForm } from '@tectus/hooks';
import './SignInForm.scss';
import { Button, Input, InputWrapper } from '@tectus/ui';
import { SigninFormProps, SigninFormValues } from './SignInForm.types';

export function SignInForm({ onSubmit, loading }: SigninFormProps) {
  const { B, E } = useBEM('sign-in-form');

  const {
    register,
    handleSubmit,
    validate,
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

      <InputWrapper helperText={errors.email} isError={!!errors.email}>
        <Input
          placeholder="Email"
          type="email"
          id="email"
          {...register('email', {
            ...validate.required('Email is required'),
            ...validate.email('Invalid email address'),
          })}
        />
      </InputWrapper>

      <InputWrapper helperText={errors.password} isError={!!errors.password}>
        <Input
          placeholder="Password"
          type="password"
          id="password"
          {...register('password', {
            ...validate.required('Password is required'),
          })}
        />
      </InputWrapper>

      <Button type="submit" className={E('submit')} disabled={loading}>
        Sign in
      </Button>
    </form>
  );
}
