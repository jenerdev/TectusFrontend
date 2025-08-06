'use client';

import { Button } from '@tectus/ui';
import { useRouter } from 'next/navigation';

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
    <Button onClick={handleClick}>
      {label}
    </Button>
  );
}
