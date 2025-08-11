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

  const handleClick = () => {
    if (navigateTo) {
      router.push(navigateTo);
      return;
    }
  };

  return (
    <UiButton onClick={handleClick} className='alert-button'>
      {label}
    </UiButton>
  );
}
