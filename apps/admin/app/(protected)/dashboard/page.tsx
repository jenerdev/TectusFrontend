'use client';

import { Container, GoogleMap, Page } from '../../components';
import { useBEM, useBreakpoint } from '@tectus/hooks';
import './dashboard-page.scss';
import { DashboardCard, DashboardCardProps } from './components';
import { UiTabs, UiTypography } from '@tectus/ui';
import { useMemo, useState } from 'react';
import UiIcon from '@tectus/ui/UiIcon/UiIcon';
import { EmployeesOverview } from './components/EmployeesOverview/EmployeesOverview';
import { ActionType, InviteUsersBulkModal, InviteUsersModal } from '../components';

type DashboardCardType = 'availableJobs' | 'jobsForBidding' | 'earnings';
const dashboardCards: Record<
  DashboardCardType,
  { section: string; data: DashboardCardProps[]; action: string }
> = {
  availableJobs: {
    section: 'Available Jobs',
    data: [
      {
        title: 'Event Security',
        location: 'Manhattan, New York',
        details: {
          dateTime: '15 Aug 2025 10:00',
          rate: '$40/hr',
          person: 3,
        },
      },
      {
        title: 'Corporate Security',
        location: 'Manhattan, New York',
        details: {
          dateTime: '15 Aug 2025 10:00',
          rate: '$40/hr',
          person: 3,
        },
      },
    ],
    action: 'Browse All',
  },
  jobsForBidding: {
    section: 'Jobs for Bidding',
    data: [
      {
        title: 'Executive Protection',
        location: 'Manhattan, New York',
        details: {
          dateTime: '15 Aug 2025 10:00',
          rate: '$40/hr',
          person: 3,
        },
      },
      {
        title: 'Retail Security',
        location: 'Manhattan, New York',
        details: {
          dateTime: '15 Aug 2025 10:00',
          rate: '$40/hr',
          person: 3,
        },
      },
    ],
    action: 'Browse All',
  },
  earnings: {
    section: 'Earnings',
    data: [
      {
        title: 'Today',
        earnings: '$200.25',
      },
      {
        title: 'This Month',
        earnings: '$1,500.00',
      },
    ],
    action: 'See more',
  },
};


export default function DashboardPage() {
  const { B, E } = useBEM('dashboard-page');
  const [mobileTab, setMobileTab] = useState(0);
  const { isLessThan } = useBreakpoint();
  const [openInviteModal, setOpenInviteModal] = useState(false);
  const [openInviteBulkModal, setOpenInviteBulkModal] = useState(false);

  const sectionTitles = useMemo(() => {
    return Object.values(dashboardCards).map((section) => section.section);
  }, [dashboardCards]);

  const employeesOverviewHandleAction = (action: ActionType) => {
    if (action === 'invite_user') setOpenInviteModal(true);
    if (action === 'invite_user_bulk')  setOpenInviteBulkModal(true);
  }

  return (
    <Page id="dashboard-page" className={B()}>
      <Container inner className={E('container')}>
        <GoogleMap />

        <UiTabs
          className={E('tabs')}
          value={mobileTab}
          items={sectionTitles.map((title) => ({ label: title }))}
          onChange={(_, newValue) => setMobileTab(newValue)}
        />

        <div className={E('card-container')}>
          {Object.keys(dashboardCards).map((dc: string, indx: number) => {
            const cardData = dashboardCards[dc as DashboardCardType];
            if (indx !== mobileTab && isLessThan(`tablet-lg`)) return null;

            return (
              <div className={E('card-section')} key={dc}>
                <UiTypography variant="h5" bold className={E('card-section-title')}>
                  {cardData.section}
                </UiTypography>

                {cardData.data.map((data) => (
                  <DashboardCard {...data} key={data.title} />
                ))}

                <UiTypography className={E('card-section-action')} variant="subtitle1">
                  {cardData.action} &#8250;
                </UiTypography>
              </div>
            );
          })}
        </div>
        <EmployeesOverview handleAction={employeesOverviewHandleAction}/>
      </Container>

      <InviteUsersModal open={openInviteModal} onClose={() => setOpenInviteModal(false)} />
      <InviteUsersBulkModal open={openInviteBulkModal} onClose={() => setOpenInviteBulkModal(false)} />
    </Page>
  );
}
