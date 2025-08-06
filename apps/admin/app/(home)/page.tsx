'use client';

import { useState } from 'react';
import { AppLink, Button } from '@tectus/ui';
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
      company: () => router.push('/signup')
    };

    actions[action]?.();
  };

  const renderInitialButtons = () => (
    <>
      <Button onClick={() => handleButtonAction('signin')} className={E('signin-button')}>
        Sign in
      </Button>
      <Button variant="outlined" onClick={() => handleButtonAction('joinnow')}>
        Join now
      </Button>
    </>
  );

  const renderSignupTypeButtons = () => (
    <div className={E('buttons')}>
      <Button onClick={() => handleButtonAction('individual')}>Individual</Button>
      <Button variant="outlined" onClick={() => handleButtonAction('company')}>
        Company
      </Button>
    </div>
  );

  return (
    <div className={B()}>
      <PageBanner
        title="Welcome to Tectus GO"
        subtitle="Connecting security professionals and <br/>companies on-demand."
      />

      <div className={E('content')}>
        <div className={E('content-left')}>
          <p className={E('text')}>New to Tectus?</p>
          {step === 'initial' && renderInitialButtons()}
          {step === 'signupType' && renderSignupTypeButtons()}
        </div>

        {/* TODO: create reusable component for divider */}
        <div className={E('divider')}></div>

        <div className={E('content-right')}>
          <p className={E('text')}>Already have an account?</p>
          <SignInForm onSubmit={handleSignIn} loading={loading} />
          <AppLink href="/reset-password/request" className={E('link')}>
            Forgot Password?
          </AppLink>
        </div>
      </div>
    </div>
  );
}
