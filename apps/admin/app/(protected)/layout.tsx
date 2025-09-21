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
import { AuthRoleEnum } from '../api/models';

const tabs = [
  { label: 'Dashboard', path: '/dashboard' },
  { label: 'Jobs', path: '/jobs' },
  { label: 'Schedule', path: '/schedule', roles: [ AuthRoleEnum.PROVIDER ] },
  { label: 'Users', path: '/users', roles: [ AuthRoleEnum.PROVIDER ] },
  { label: 'Earnings', path: '/earnings', roles: [ AuthRoleEnum.PROVIDER ] },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { B, E } = useBEM('protected-layout');
  const pathname = usePathname();
  const userStatus = useUserStore.getState().getUserStatus();
  const role = useUserStore((state) => state.auth?.role);
  const isApproved = userStatus === UserStatus.APPROVED;

  const { isChecking } = useProtectedRoute({ bypassApproved: true });
  if (isChecking || !role) return;

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
              items={tabs.filter((tab) => !tab.roles || tab.roles.includes(role))}
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
