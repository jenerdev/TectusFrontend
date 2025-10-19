'use client';

import { useBEM } from '@tectus/hooks';
import './application-submitted.scss';
import { UserStatus, useUserStore } from '@/store';
import { UiButton, useUiSnackbar } from '@tectus/ui';
import { usePathname, useRouter } from 'next/navigation';
import { ApiErrorCode } from '@/app/constants';
import { useApiErrorMessage, useProtectedRoute } from '@/app/hooks';
import { PageBanner } from '@/app/components';
import { usePersonnelApi, useVendorApi } from '@/app/api';
import { AuthRoleEnum } from '@/app/api/models';


const contentMapping = {
  [AuthRoleEnum.PROVIDER]: {
    title: 'Application submitted',
    subtitle: "Thanks for submitting your application.<br/>You'll be notified once reviewed.",
  },
  [AuthRoleEnum.PERSONNEL]: {
    title: 'Profile Created',
    subtitle: "Thanks for creating your profile.<br/>You'll be notified once reviewed.",
  }
}

export default function ApplicationSubmittedPage() {

  const router = useRouter();
  const pathname = usePathname();
  const { B, E } = useBEM('application-submitted-page');
  const { getErrorMessage } = useApiErrorMessage();
  const { showSnackbar } = useUiSnackbar();
  const { auth } = useUserStore();
  const { loading, getVendorDetails } = useVendorApi();
  const { loading: getPersonnelDetailsLoading, getPersonnelDetails } = usePersonnelApi(true);
  

  const { isChecking } = useProtectedRoute();
  if(isChecking)return;
  const handleOnRefresh = async () => {
    const isPersonnel = auth?.role === AuthRoleEnum.PERSONNEL;

    if(isPersonnel){
      const personnelResult = await getPersonnelDetails();
      const status = (personnelResult.data?.status || '').toUpperCase() as UserStatus;
      if (status === UserStatus.PENDING) return;
      
      router.push('/dashboard');
      return;
    }

    
    const userResult = await getVendorDetails();
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
    useUserStore.getState().setVendor({
      ...userResult.data,
    });
    router.push(targetRoute);
  };

  return (
    <div className={B()}>

      { 
        auth?.role && 
        <PageBanner
          title={contentMapping[auth?.role]?.title}
          subtitle={contentMapping[auth?.role]?.subtitle}
          hideLogo
        />      
      }


      <UiButton onClick={handleOnRefresh} className={E('button')} loading={loading || getPersonnelDetailsLoading}>
        Refresh
      </UiButton>
    </div>
  );
}
