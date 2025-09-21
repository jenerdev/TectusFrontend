'use client';

import { useBEM } from '@tectus/hooks';
import './verify-email-page.scss'; 
import { useUserStore } from '@/store'; 
import { UiButton, useUiSnackbar } from '@tectus/ui';
import { useRouter } from 'next/navigation';
import { useApi, useApiErrorMessage, useProtectedRoute } from '@/app/hooks';
import { ApiErrorCode } from '@/app/constants';
import { PageBanner } from '@/app/components';
import { useVendorApi } from '@/app/api';

export default function VerifyEmailPage() {
  const router = useRouter();
  const { B, E } = useBEM('verify-email-page');
  const { getErrorMessage } = useApiErrorMessage();
  const { showSnackbar } = useUiSnackbar();

  const { loading, getVendorDetails } = useVendorApi();

  const { isChecking } = useProtectedRoute();
  if(isChecking)return;

  const handleOnRefresh = async () => {
    const vendor = await getVendorDetails();
    if (vendor.error || !vendor.data) {
      const errorMessage = getErrorMessage(vendor.error?.message as ApiErrorCode);

      showSnackbar(errorMessage, 'error', {
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'left',
        },
      });
      return;
    }
    if(vendor.data.emailVerified){
      useUserStore.getState().setVendor(vendor.data);
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
