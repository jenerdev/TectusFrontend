"use client";
import { Button, Input } from '@tectus/ui';
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
        <Input placeholder="Password" name="password" id="password" />
        <Input placeholder="Repeat Password" name="repeat-password" id="repeat-password" />
      </form>
      
      <Button onClick={handleSetPassword}>Set password</Button>
    </div>
  );
}
