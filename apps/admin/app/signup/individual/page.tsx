'use client';

import { useBEM } from '@tectus/hooks';
import './signup-individual-page.scss'; 
import { useRouter } from 'next/navigation'; 
import { PageBanner } from '@/app/components';
import { UiButton } from '@tectus/ui';

export default function SignupIndividualPage() {
  const router = useRouter();
  const { B, E } = useBEM('signup-individual-page');

  const okHandler = async () => {
    router.push('/');
  };

  return (
    <div className={B()}>
      <PageBanner
        title="Individual application not yet available"
        subtitle="Sorry, individual accounts are invite only."
      />

      <UiButton onClick={okHandler} className={E('button')}>
        OK
      </UiButton>
    </div>
  );
}
