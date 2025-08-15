'use client';

import { useBEM } from '@tectus/hooks';
import './application-submitted.scss';
import { PageBanner } from '../components';
import { UiButton } from '../../../../packages/ui/src/UiButton';
import { useApi, useApiErrorMessage, useProtectedRoute } from '../hooks';
import { User, useUserStore } from '@/store';
import { ApiErrorCode } from '../constants';
import { useUiSnackbar } from '@tectus/ui';
import { usePathname, useRouter } from 'next/navigation';

export default function ApplicationSubmittedPage() {


  const router = useRouter();
  const pathname = usePathname();
  const { B, E } = useBEM('application-submitted-page');
  const { getErrorMessage } = useApiErrorMessage();
  const { showSnackbar } = useUiSnackbar();
  const { loading, sendRequest } = useApi<User>(`api/go/user/me`, {
    method: 'GET',
  });

  const { hasHydrated } = useProtectedRoute();
  if(!hasHydrated)return;
  
  const handleOnRefresh = async () => {
    const userResult = await sendRequest();
    if (userResult.error || !userResult.data) {
      const errorMessage = getErrorMessage(userResult.error?.message as ApiErrorCode);

      showSnackbar(errorMessage, 'error', {
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center',
        },
      });
      return;
    }

    const status = userResult.data.status;
    if(status === 'Pending')return;

    const statusRoutes: Record<NonNullable<User['status']>, string> = {
      Approved: '/application-approved',
      Pending: '/application-submitted',
      Rejected: '/application-rejected',
    };

    
    if (status === 'Approved' && pathname === '/application-approved') return;
    const targetRoute = status ? (statusRoutes[status] ?? '/submit-info') : '/submit-info';
    useUserStore.getState().setUser(userResult.data);
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
