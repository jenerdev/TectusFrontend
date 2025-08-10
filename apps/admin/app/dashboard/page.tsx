"use client";

import { PageBanner } from '../components';
import { useBEM } from '@tectus/hooks';
import './dashboard-page.scss';
import { useUserStore } from '@/store';
import { UiButton } from '@tectus/ui';
import { useRouter } from 'next/navigation';
import { useProtectedRoute } from '../hooks';

export default function Dashboard() {
  useProtectedRoute();
  const { B, E } = useBEM('dashboard-page');
  const user = useUserStore((state) => state.user);
  const router = useRouter();

  const handleLogout = () => {
    useUserStore.getState().logout();
    router.push('/');
  };
  return (
    <div className={B()}>
      <PageBanner
        title="Home"
        subtitle={`User: ${user?.email || ''}`}
      />
      <div className={E('content')}>
        <UiButton onClick={handleLogout}>Logout</UiButton>
      </div>
    </div>
  );
}
