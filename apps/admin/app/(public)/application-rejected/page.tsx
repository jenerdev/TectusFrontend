'use client';

import { useBEM } from '@tectus/hooks';
import './application-rejected.scss';
import { useUserStore } from '@/store';
import { useRouter } from 'next/navigation';
import { useProtectedRoute } from '@/app/hooks';
import { PageBanner } from '@/app/components';
import { UiButton } from '@tectus/ui';

export default function ApplicationRejectedPage() {
  const router = useRouter();
  const { B, E } = useBEM('application-rejected-page');
  const { isChecking } = useProtectedRoute();
  if(isChecking)return;

  const goHome = async () => {
    useUserStore.getState().logout();
    router.push('/');
  };

  return (
    <div className={B()}>
      <PageBanner
        title="Application rejected"
        subtitle="We’re sorry to inform you that your<br/>application has been rejected."
      />

      <UiButton onClick={goHome} className={E('button')}>
        OK
      </UiButton>
    </div>
  );
}
