'use client';

import { UiButton } from '@tectus/ui';
import { useRouter } from 'next/navigation';
import './AlertButton.scss';

interface ActionButtonProps {
  label: string;
  navigateTo?: string;
}

export function AlertButton({ label, navigateTo }: ActionButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    if (navigateTo) router.push(navigateTo);
  };

  return (
    <UiButton onClick={handleClick} className='alert-button'>
      {label}
    </UiButton>
  );
}
