'use client';
import { UiButton, UiTextField, useUiSnackbar } from '@tectus/ui';
import { useBEM, useForm } from '@tectus/hooks';
import './change-password.scss';
import { useRouter } from 'next/navigation';
import { PageBanner } from '@/app/components';
import { useAuthApi, usePersonnelApi } from '@/app/api';
import { useMemo } from 'react';

type ChangePasswordForm = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export default function ChangePassword() { 
  const { B, E } = useBEM('change-password-page');
  const { showSnackbar } = useUiSnackbar();
  const { loading, changePassword } = useAuthApi();

  const {
    values,
    register,
    handleSubmit,
    validate: { required, minLength, password },
    errors,
    reset,
    isValid
  } = useForm<ChangePasswordForm>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleOnSubmit = async (form: ChangePasswordForm) => {
    const res = await changePassword(form);
    if(res.error){
      showSnackbar(res.error.message, 'error');
      return;
    }

    showSnackbar(res?.data?.message || 'Password changed successfully', 'success');
    reset();
  };

  const passwordNotMatch = useMemo(() => {
    return values.newPassword !== values.confirmPassword && values.confirmPassword.length > 0;
  }, [values.newPassword, values.confirmPassword]);

  const passwordErrorMessage = useMemo(() => {
    if (errors.confirmPassword) return errors.confirmPassword;
    return passwordNotMatch ? 'Passwords do not match' : '';
  }, [errors.confirmPassword, passwordNotMatch]);



  return (
    <div className={B()}>
      
      <div className={E('banner')}>
        <PageBanner
          title="Change Password"
          hideLogo
        />
      </div>

      <form className={E('form')} onSubmit={handleSubmit(handleOnSubmit)}>
         
         <UiTextField
          label="Current Password"
          placeholder="Current Password"
          {...register('currentPassword', {
            ...required('Please enter your current password.'),
            ...minLength(12, 'Password must be at least 12 characters.'),
            ...password(),
          })}
          type="password"
          helperText={errors.currentPassword}
          error={Boolean(errors.currentPassword)}
          helperTextPosition='relative'
        />

        <UiTextField
          label="New Password"
          placeholder="Password"
          {...register('newPassword', {
            ...required('Please enter your new password.'),
            ...minLength(12, 'Password must be at least 12 characters.'),
            ...password(),
          })}
          type="password"
          helperText={errors.newPassword}
          error={Boolean(errors.newPassword)}
          helperTextPosition='relative'
        />

        <UiTextField
          label="Confirm Password"
          placeholder="Confirm Password"
          {...register('confirmPassword', {
            ...required('Please confirm your password.'),
            ...minLength(12, 'Password must be at least 12 characters'),
            ...password(),
          })}
          type="password"
          helperText={passwordErrorMessage}
          error={Boolean(errors.confirmPassword) || passwordNotMatch}
          helperTextPosition='relative'
        />
        
        <UiButton type="submit" topspacing={3} loading={loading} disabled={!isValid}>
          Submit
        </UiButton>
      </form>
    </div>
  );
}
