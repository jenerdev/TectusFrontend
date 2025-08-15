'use client';

import { useBEM } from '@tectus/hooks';
import './application-approved.scss';
import { PageBanner } from '../components';
import { UiButton } from '../../../../packages/ui/src/UiButton';
import { useRouter } from 'next/navigation';
import { useProtectedRoute } from '../hooks';

export default function ApplicationApprovedPage() {

  const router = useRouter();
  const { B, E } = useBEM('application-approved-page');
  const { hasHydrated } = useProtectedRoute();
  if(!hasHydrated)return;

  const okHandler = async () => {
    router.push('/');
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
