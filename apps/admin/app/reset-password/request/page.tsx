'use client';
import { UiButton, UiTextField } from '@tectus/ui';
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

    if (result.error) {
      showAlert('Account with this email does not exist', 'error', false);
      return;
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
        <UiTextField
          placeholder="Email"
          {...register('email', {
            ...required('Email is required'),
            ...email('Invalid email address'),
          })}
          helperText={errors.email}
          error={Boolean(errors.email)}
        />
        <UiButton className={E('submit')} type="submit" loading={loading}>
          Reset password
        </UiButton>
      </form>
    </div>
  );
}
