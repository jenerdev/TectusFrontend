'use client';

import { useUserStore } from '@/store';
import { useBEM } from '@tectus/hooks';
import { UiIconButton } from '@tectus/ui';
import { useRouter } from 'next/navigation';
import './TempLogout.scss';
import { useEffect, useState } from 'react';

export function TempLogout() {
  const { B, E } = useBEM('temp-logout');
  const user = useUserStore((state) => state.user);
  const router = useRouter();
  const [showLogout, setShowLogout] = useState(false);

  useEffect(() => {
    setShowLogout(!!user);
  }, [user]);

  const onLogout = () => {
    useUserStore.getState().logout();
    router.push('/');
  };

  return (
    <div className={B()}>{showLogout && <UiIconButton icon="Logout" onClick={onLogout} />}</div>
  );
}
