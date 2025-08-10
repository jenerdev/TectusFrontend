'use client';

import { UiButton } from '@tectus/ui';
import { useRouter } from 'next/navigation';
import './AlertButton.scss';
import { SigninFormValues, SigninPostResponse } from '@/app/components';
import { useApi } from '@/app/hooks';
import { PageKey } from '../../types';

interface ActionButtonProps {
  actionKey: PageKey;
  label: string;
  navigateTo?: string;
}

export function AlertButton({ actionKey, label, navigateTo }: ActionButtonProps) {
  const router = useRouter();

  const { loading: loginLoading, sendRequest: loginRequest } = useApi<
      SigninPostResponse,
      SigninFormValues
    >(`user/login`, {
      method: 'POST',
  });

  // const actionMapper = (key: PageKey) => {
  //   return {
  //     'verify-email': () => {
  //       alert('test');
  //     },
  //     'application-approved': () => {
  //       alert('Application approved!');
  //     },
  //     'application-rejected': () => {
  //       alert('Application rejected!');
  //     },
  //     'application-submitted': () => {
  //       alert('Application submitted!');
  //     },
  //     'individual-signup': () => {
  //       alert('Individual signup!');
  //     },
  //     'reset-password': () => {
  //       alert('Reset password!');
  //     }
  //   }[key];
  // }

  const handleClick = () => {
    if (navigateTo) {
      router.push(navigateTo);
      return;
    }
    // actionMapper(actionKey)?.();

  };

  return (
    <UiButton onClick={handleClick} className='alert-button'>
      {label}
    </UiButton>
  );
}
