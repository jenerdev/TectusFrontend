'use client';
import { Button, Input, InputWrapper } from '@tectus/ui';
import { useBEM, useForm, useHttp } from '@tectus/hooks';
import './reset-password-page.scss';
import { PageBanner, useGlobalAlert } from '@/app/components';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

type ResetPasswordFormValues = {
  email: string;
};
interface ResetPasswordPostResponse {}

export default function ResetPasswordPage() {
  const { B, E } = useBEM('reset-password-page');
  const router = useRouter();
  const { showAlert } = useGlobalAlert();

  // TODO: add based endpont on environment variables
  const { loading, sendRequest } = useHttp<ResetPasswordPostResponse, ResetPasswordFormValues>(
    'https://tectus-api-dev-ec5ef89bd7d4.herokuapp.com/api/go/user/sendPasswordResetEmail',
    {
      method: 'POST',
    },
  );

  const { 
    register,
    handleSubmit,
    validate: { required, email },
    errors,
  } = useForm<ResetPasswordFormValues>({
    email: '',
  });

  const handleOnSubmit = async ({ email }: ResetPasswordFormValues) => {
    const result = await sendRequest({
      body: { email },
    });

    if(result.error) {
      showAlert('Account with this email does not exist', 'danger', true);
      return
    }
    router.push('/alert/reset-password');
  };

  return (
    <div className={B()}>
      <PageBanner
        title="Reset password"
        subtitle="Enter the email address you used to register to reset your password"
      />

      <form className={E('form')} onSubmit={handleSubmit(handleOnSubmit)}>
        <InputWrapper helperText={errors.email} isError={!!errors.email}>
          <Input
            placeholder="Email"
            id="email"
            {...register('email', {
              ...required('Email is required'),
              ...email('Invalid email address'),
            })}
          />
        </InputWrapper>
        <Button className={E('submit')} type="submit" disabled={loading}>
          Reset password
        </Button>
      </form>
    </div>
  );
}
