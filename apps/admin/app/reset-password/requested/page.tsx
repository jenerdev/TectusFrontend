'use client';

import { useBEM } from '@tectus/hooks';
import './reset-password-requested.scss'; 
import { useRouter } from 'next/navigation'; 
import { PageBanner } from '@/app/components';
import { UiButton } from '@tectus/ui';

export default function ResetPasswordRequestedPage() {
  const router = useRouter();
  const { B, E } = useBEM('reset-password-requested-page');

  const okHandler = async () => {
    router.push('/signin');
  };

  return (
    <div className={B()}>
      <PageBanner
        title="Password reset requested"
        subtitle="Please check your email for the password reset link"
      />

      <UiButton onClick={okHandler} className={E('button')}>
        OK
      </UiButton>
    </div>
  );
}
