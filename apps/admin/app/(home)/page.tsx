'use client';

import { useState } from 'react';
import { AppLink, UiButton, UiTypography } from '@tectus/ui';
import { PageBanner, SignInForm, useSignInForm } from '../components';
import { useBEM } from '@tectus/hooks';
import { useRouter } from 'next/navigation';

import './home-page.scss';

type Step = 'initial' | 'signupType';

type ButtonActionType = 'joinnow' | 'signin' | 'individual' | 'company';

export default function Home() {
  const { B, E } = useBEM('home-page');
  const router = useRouter();
  const [step, setStep] = useState<Step>('initial');
  const { handleSignIn, loading } = useSignInForm();

  const handleButtonAction = (action: ButtonActionType) => {
    const actions: Record<ButtonActionType, () => void> = {
      joinnow: () => setStep('signupType'),
      signin: () => router.push('/signin'),
      individual: () => router.push('/alert/individual-signup'),
      company: () => router.push('/signup'),
    };

    actions[action]?.();
  };

  const renderInitialButtons = () => (
    <>
      <UiButton onClick={() => handleButtonAction('signin')} className={E('signin-button')}>
        Sign in
      </UiButton>
      <UiButton variant="outlined" onClick={() => handleButtonAction('joinnow')}>
        Join now
      </UiButton>
    </>
  );

  const renderSignupTypeButtons = () => (
    <div className={E('buttons')}>
      <UiButton onClick={() => handleButtonAction('individual')}>Individual</UiButton>
      <UiButton variant="outlined" onClick={() => handleButtonAction('company')}>
        Company
      </UiButton>
    </div>
  );

  return (
    <div className={B()}>
      <PageBanner
        title="Welcome to Tectus GO"
        subtitle="Connecting security professionals and <br/>companies on-demand."
      />

      <div className={E('main')}>
        <div className={E('section', 'left')}>
          <div className={E('content', 'left')}>
            <UiTypography variant="body1" className={E('text')}>
              New to Tectus?
            </UiTypography>
            {step === 'initial' && renderInitialButtons()}
            {step === 'signupType' && renderSignupTypeButtons()}
          </div>
        </div>

        {/* TODO: create reusable component for divider */}
        <div className={E('divider')}></div>

        <div className={E('section', 'right')}>
          <div className={E('content', 'right')}>
            <UiTypography variant="body1" className={E('text')}>
              Already have an account?
            </UiTypography>

            <SignInForm onSubmit={handleSignIn} loading={loading} />
            <AppLink href="/reset-password/request" className={E('link')}>
              Forgot Password?
            </AppLink>
          </div>
        </div>
      </div>
    </div>
  );
}
