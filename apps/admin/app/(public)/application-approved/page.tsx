'use client';

import { useBEM } from '@tectus/hooks';
import './application-approved.scss';
import { useRouter } from 'next/navigation';
import { useProtectedRoute } from '@/app/hooks';
import { PageBanner } from '@/app/components';
import { UiButton } from '@tectus/ui';

export default function ApplicationApprovedPage() {

  const router = useRouter();
  const { B, E } = useBEM('application-approved-page');
  const { isChecking } = useProtectedRoute();
  if(isChecking)return;

  const okHandler = async () => {
    router.push('/dashboard');
  };

  return (
    <div className={B()}>
      <PageBanner
        title="Application approved"
        subtitle="Your application has been approved. Welcome to Tectus GO!"
      />

      <UiButton onClick={okHandler} className={E('button')}>
        OK
      </UiButton>
    </div>
  );
}
