'use client';
import { Button, Input, InputWrapper } from '@tectus/ui';
import { useBEM, useForm } from '@tectus/hooks';
import './reset-password-page.scss';
import { PageBanner, useGlobalAlert } from '@/app/components';
import { useRouter } from 'next/navigation';
import { useApi } from '@/app/hooks';

type ResetPasswordFormValues = {
  email: string;
};
interface ResetPasswordPostResponse {}

export default function ResetPasswordPage() {
  const { B, E } = useBEM('reset-password-page');
  const router = useRouter();
  const { showAlert } = useGlobalAlert();


  const { loading, sendRequest } = useApi<ResetPasswordPostResponse, ResetPasswordFormValues>(
    `user/sendPasswordResetEmail`,
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
      showAlert('Account with this email does not exist', 'danger', false);
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
        <Button className={E('submit')} type="submit" loading={loading}>
          Reset password
        </Button>
      </form>
    </div>
  );
}
