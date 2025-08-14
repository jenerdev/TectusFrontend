"use client";
import './page-not-found.scss'; // Import the SCSS file
import { AppLink, UiButton, UiTypography } from '@tectus/ui';
import { useBEM } from '@tectus/hooks';
import { useRouter } from 'next/navigation';

export default function PageNotFound() {
  const { B, E } = useBEM('page-not-found');
  const router = useRouter();

  const goHome = () => {
    router.push('/');
  }

  return (
    <main className={B()}>
      <div>
        <UiTypography className={E('title')} variant="h1">
          404
        </UiTypography>

        <UiTypography className={E('message')} variant="body1">
          Oops! Page not found.
        </UiTypography>
      </div>

      <UiButton className={E('link')} variant="contained" onClick={goHome}>
        Go back home
      </UiButton>
    </main>
  );
}
