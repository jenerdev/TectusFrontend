"use client";
import { UiButton, UiTextField } from '@tectus/ui';
import { PageBanner } from '../components';
import { useBEM } from '@tectus/hooks';
import './reset-password-page.scss';
import { useRouter } from 'next/navigation';

export default function ResetPasswordPage() {
  const { B, E } = useBEM('reset-password-page');
  const router = useRouter();

  const handleSetPassword = () => {
    router.push('/signin');
  }

  return (
    <div className={B()}>
      <PageBanner
        title="Reset password"
        subtitle="Please enter your new password."
      />

      <form className={E('form')}>
        <UiTextField
          type='password'
          placeholder="Password" 
        />
        <UiTextField
          type='password'
          placeholder="Repeat Password" 
        />
      </form>
      
      <UiButton onClick={handleSetPassword}>Set password</UiButton>
    </div>
  );
}
