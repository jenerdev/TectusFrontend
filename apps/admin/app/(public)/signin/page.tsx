'use client';
import { AppLink } from '@tectus/ui';
import { PageBanner, SignInForm, useSignInForm } from '../../components';
import { useBEM } from '@tectus/hooks';
import './signin-page.scss';  


export default function Signin() {
  const { B, E } = useBEM('signin-page');
  const { handleSignIn, loading } = useSignInForm();
 
  return (
    <div className={B()}>
      <div className={E('main')}>
        <PageBanner
          title="Sign in to Tectus GO"
        />
        <SignInForm onSubmit={handleSignIn} loading={loading} />
      </div>

      <div className={E('forgot')}>
        <AppLink href="/reset-password/request" className={E('link')}>
          Forgot Password?
        </AppLink>
      </div>
    </div>
  );
}
