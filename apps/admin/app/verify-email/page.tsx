'use client';

import { useBEM } from '@tectus/hooks';
import './verify-email-page.scss';
import { PageBanner } from '../components';
import { UiButton } from '../../../../packages/ui/src/UiButton';
import { useApi, useApiErrorMessage } from '../hooks';
import { User, useUserStore } from '@/store';
import { ApiErrorCode } from '../constants';
import { useUiSnackbar } from '@tectus/ui';
import { useRouter } from 'next/navigation';

export default function VerifyEmailPage() {
  const router = useRouter();
  const { B, E } = useBEM('verify-email-page');
  const { getErrorMessage } = useApiErrorMessage();
  const { showSnackbar } = useUiSnackbar();
  const { loading, sendRequest } = useApi<User>(`user/me`, {
    method: 'GET',
  });

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
    if(userResult.data.emailVerified){
      useUserStore.getState().setUser(userResult.data);
      router.push('/submit-info');
    }
    
  };

  return (
    <div className={B()}>
      <PageBanner
        title="Verify your email"
        subtitle="Please check your email for the verification link we sent you."
      />

      <UiButton onClick={handleOnRefresh} className={E('button')} loading={loading}>
        Refresh
      </UiButton>
    </div>
  );
}
