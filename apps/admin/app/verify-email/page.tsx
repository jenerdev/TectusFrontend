"use client"

import { useBEM } from '@tectus/hooks';
import './verify-email-page.scss';
import { PageBanner } from '../components';
import { UiButton } from '../../../../packages/ui/src/UiButton';

export default function VerifyEmailPage() {
  const { B, E } = useBEM('verify-email-page');
//   const { handleSignIn, loading } = useSignInForm();

  const handleOnRefresh = async () => {
  };

  return (
    <div className={B()}>
      <PageBanner
        title="Verify your email"
        subtitle="Please check your email for the verification link we sent you."
      />

      <UiButton onClick={handleOnRefresh} className={E('button')}>
        Refresh
      </UiButton>
    </div>
  );
}
