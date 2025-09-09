'use client';
import React from 'react';
import './protected-layout.scss';
// import '@tectus/styles/globals.scss';
import { UiTabs } from '@tectus/ui';
import { Container } from '../components';
import { Header } from '../components';
import { usePathname } from 'next/navigation';
import { useProtectedRoute } from '../hooks';
import { useBEM } from '@tectus/hooks';
import { UserStatus, useUserStore } from '@/store';
import NextLink from 'next/link';

const tabs = [
  { label: 'Dashboard', path: '/dashboard' },
  { label: 'Jobs', path: '/jobs' },
  { label: 'Schedule', path: '/schedule' },
  { label: 'Users', path: '/users' },
  { label: 'Earnings', path: '/earnings' },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { B, E } = useBEM('protected-layout');
  const pathname = usePathname();
  const { user } = useUserStore();
  const isApproved = (user?.status || '').toUpperCase() === UserStatus.APPROVED;

  const { isChecking } = useProtectedRoute({ bypassApproved: true });
  if (isChecking) return;

  const currentTab = tabs.findIndex((t) => pathname.startsWith(t.path));

  return (
    <div className={B()}>
      <div className={E('top')}>
        <Header />
        {isApproved && (
          <Container noPadding>
            <UiTabs
              className={E('tabs')}
              value={currentTab === -1 ? 0 : currentTab}
              items={tabs}
              variant="scrollable"
              scrollButtons="auto"
              allowScrollButtonsMobile
              componentLink={NextLink}
            />
          </Container>
        )}
      </div>
      {children}
    </div>
  );
}
