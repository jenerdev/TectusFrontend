'use client';
import { UiButton, UiTextField, useUiSnackbar } from '@tectus/ui';
import { useBEM, useForm } from '@tectus/hooks';
import './reset-password-page.scss';
import { PageBanner } from '@/app/components';
import { useRouter } from 'next/navigation';
import { useApi } from '@/app/hooks';

type ResetPasswordFormValues = {
  email: string;
};
interface ResetPasswordPostResponse {}

export default function ResetPasswordRequestPage() {
  const { B, E } = useBEM('reset-password-page');
  const router = useRouter();
  const { showSnackbar } = useUiSnackbar();

  const { loading, sendRequest } = useApi<ResetPasswordPostResponse, ResetPasswordFormValues>(
    `api/go/user/sendPasswordResetEmail`,
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
    await sendRequest({
      body: { email },
    });

    router.push('/reset-password/requested');
  };

  return (
    <div className={B()}>
      <PageBanner
        title="Reset password"
        subtitle="Enter the email address you used to register to reset your password"
      />

      <form className={E('form')} onSubmit={handleSubmit(handleOnSubmit)}>
        <UiTextField
          label='Email'
          placeholder="Email"
          {...register('email', {
            ...required('Email is required'),
            ...email('Invalid email address'),
          })}
          helperText={errors.email}
          error={Boolean(errors.email)}
        />
        <UiButton className={E('submit')} type="submit" loading={loading} topspacing={3}>
          Reset password
        </UiButton>
      </form>
    </div>
  );
}
