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

export default function ResetPasswordPage() {
  const { B, E } = useBEM('reset-password-page');
  const router = useRouter();
  const { showSnackbar } = useUiSnackbar();

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
    await sendRequest({
      body: { email },
    });

    // Note: for security reasons, we do not show specific error messages for email existence
    // if (result.error) {
    //   showSnackbar('Account with this email does not exist', 'error', {
    //     anchorOrigin: {
    //       vertical: 'top',
    //       horizontal: 'center',
    //     },
    //   });
    //   return;
    // }

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
