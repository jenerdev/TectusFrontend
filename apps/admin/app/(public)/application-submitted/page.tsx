'use client';

import { useBEM } from '@tectus/hooks';
import './application-submitted.scss';
import { User, UserStatus, useUserStore } from '@/store';
import { UiButton, useUiSnackbar } from '@tectus/ui';
import { usePathname, useRouter } from 'next/navigation';
import { ApiErrorCode } from '@/app/constants';
import { useApi, useApiErrorMessage, useProtectedRoute } from '@/app/hooks';
import { PageBanner } from '@/app/components';

export default function ApplicationSubmittedPage() {


  const router = useRouter();
  const pathname = usePathname();
  const { B, E } = useBEM('application-submitted-page');
  const { getErrorMessage } = useApiErrorMessage();
  const { showSnackbar } = useUiSnackbar();
  const { loading, sendRequest } = useApi<User>(`api/go/user/me`, {
    method: 'GET',
  });

  const { isChecking } = useProtectedRoute();
  if(isChecking)return;
  const handleOnRefresh = async () => {
    const userResult = await sendRequest();
    if (userResult.error || !userResult.data) {
      const errorMessage = getErrorMessage(userResult.error?.message as ApiErrorCode);

      showSnackbar(errorMessage, 'error', {
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'left',
        },
      });
      return;
    }

    // const TEST_STATUS = UserStatus.APPROVED;
    const status = (userResult.data.status || '').toUpperCase() as UserStatus;
    if(status === UserStatus.PENDING)return;

    const statusRoutes: Record<UserStatus, string> = {
      [UserStatus.APPROVED]: '/application-approved',
      [UserStatus.PENDING]: '/application-submitted',
      [UserStatus.REJECTED]: '/application-rejected',
    };

    
    if (status === UserStatus.APPROVED && pathname === '/application-approved') return;
    const targetRoute = statusRoutes[status] ?? '/submit-info'
    useUserStore.getState().setUser({
      ...userResult.data,
      // ...( !!TEST_STATUS ? { status: TEST_STATUS } : {} ),
    });
    router.push(targetRoute);
  };

  return (
    <div className={B()}>
      <PageBanner
        title="Application submitted"
        subtitle="Thanks for submitting your application.<br/>You'll be notified once reviewed."
      />

      <UiButton onClick={handleOnRefresh} className={E('button')} loading={loading}>
        Refresh
      </UiButton>
    </div>
  );
}
