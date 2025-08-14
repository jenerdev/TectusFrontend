'use client';

import { useBEM } from '@tectus/hooks';
import './application-submitted.scss';
import { PageBanner } from '../components';
import { UiButton } from '../../../../packages/ui/src/UiButton';
import { useApi, useApiErrorMessage } from '../hooks';
import { User } from '@/store';
import { ApiErrorCode } from '../constants';
import { useUiSnackbar } from '@tectus/ui';
import { useRouter } from 'next/navigation';

export default function ApplicationSubmittedPage() {
  const router = useRouter();
  const { B, E } = useBEM('application-submitted-page');
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

    if(userResult.data.isApproved){
      router.push('/alert/application-approved');
    }

    // TODO for application rejected
    
  };

  return (
    <div className={B()}>
      <PageBanner
        title="Application submitted"
        subtitle="Thanks for submitting your application. You'll be notified once reviewed."
      />

      <UiButton onClick={handleOnRefresh} className={E('button')} loading={loading}>
        Refresh
      </UiButton>
    </div>
  );
}
