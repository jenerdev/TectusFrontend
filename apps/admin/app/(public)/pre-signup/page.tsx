'use client';
import { UiButton } from '@tectus/ui';
import { useBEM } from '@tectus/hooks';
import './pre-signup.scss';
import { PageBanner } from '@/app/components';
import { useRouter } from 'next/navigation';

type routeUrl = 'individual' | 'company';
const routeMapping: Record<routeUrl, string> = {
  individual: '/signup/individual',
  company: '/signup',
};

export default function PreSignupPage() {
  const { B, E } = useBEM('pre-signup-page');
  const router = useRouter();

  const handleNavigation = (type: routeUrl) => {
    router.push(routeMapping[type]);
  };

  return (
    <div className={B()}>
      <PageBanner
        title="Sign up for Tectus GO"
        subtitle="Are you signing up as an individual or company?"
      />

      <div className={E('buttons')}>
        <UiButton
          className={E('submit')}
          type="submit"
          onClick={() => handleNavigation('individual')}
        >
          Individual
        </UiButton>
        <UiButton
          className={E('submit')}
          type="submit"
          variant="outlined"
          onClick={() => handleNavigation('company')}
        >
          Company
        </UiButton>
      </div>
    </div>
  );
}
