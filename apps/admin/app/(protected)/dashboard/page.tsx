'use client';

import { Container, GoogleMap, Page } from '../../components';
import { useBEM, useBreakpoint } from '@tectus/hooks';
import './dashboard-page.scss';
import { DashboardCard, DashboardCardProps } from './components';
import { UiTabs, UiTypography } from '@tectus/ui';
import { useEffect, useMemo, useState } from 'react';
import { EmployeesOverview } from './components/EmployeesOverview/EmployeesOverview';
import { useJobList } from '../jobs/useJobList';
import { Job } from '../jobs/Job.types';
import { useRouter } from 'next/navigation';

type DashboardCardType = 'availableJobs' | 'jobsForBidding' | 'earnings';
const dashboardCards: Record<
  DashboardCardType,
  { section: string; data: DashboardCardProps[]; action: { label: string; href: string }; loading: boolean }
> = {
  availableJobs: {
    section: 'Available Jobs',
    data: [],
    action: {
      label: 'Browse All',
      href: '/jobs',
    },
    loading: false,
  },
  jobsForBidding: {
    section: 'Jobs for Bidding',
    data: [],
    action: {
      label: 'Browse All',
      href: '/jobs?tab=bidding',
    },
    loading: false,
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
    action: {
      label: 'See more',
      href: '/earnings',
    },
    loading: false,
  },
};

export default function DashboardPage() {
  const router = useRouter();
  const { B, E } = useBEM('dashboard-page');
  const [mobileTab, setMobileTab] = useState(0);
  const { isLessThan } = useBreakpoint();
  const { data: availableJobs, loading: availableJobsLoading } = useJobList('available');
  const { data: jobsForBidding, loading: jobsForBiddingLoading } = useJobList('bidding');

  const [dashboardCardsState, setDashboardCardState] = useState(dashboardCards);

  const sectionTitles = useMemo(() => {
    return Object.values(dashboardCards).map((section) => section.section);
  }, [dashboardCards]);

  const mapJob = (job: Job) => {
    const budget = parseFloat(job.budget);
    const rate = (budget / job.numberOfPersonnel).toFixed(2);
    return {
      title: job.categories[0] as string,
      location: job.location?.address || '~',
      details: {
        dateTime: job.startAt,
        rate: `${rate}/hr`,
        person: job.numberOfPersonnel,
      },
    };
  };

  useEffect(() => {
    setDashboardCardState((prevState) => ({
      ...prevState,
      availableJobs: {
        ...prevState.availableJobs,
        loading: availableJobsLoading,
        data: (availableJobs || []).slice(0, 2).map(mapJob),
      },
    }));
  }, [availableJobsLoading, availableJobs]);

  useEffect(() => {
    setDashboardCardState((prevState) => ({
      ...prevState,
      jobsForBidding: {
        ...prevState.jobsForBidding,
        loading: jobsForBiddingLoading,
        data: (jobsForBidding || []).slice(0, 2).map(mapJob),
      },
    }));
  }, [jobsForBidding, jobsForBiddingLoading]);

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
          {Object.keys(dashboardCardsState).map((dc: string, indx: number) => {
            const cardData = dashboardCardsState[dc as DashboardCardType];
            if (indx !== mobileTab && isLessThan(`tablet-lg`)) return null;

            return (
              <div className={E('card-section')} key={dc}>
                <UiTypography variant="h5" bold className={E('card-section-title')}>
                  {cardData.section}
                </UiTypography>

                {cardData.data.map((data) => (
                  <DashboardCard {...data} key={data.title} />
                ))}

                {cardData.data.length > 0 && (
                  <UiTypography className={E('card-section-action')} variant="subtitle1" onClick={() => router.push(cardData.action.href)}>
                    {cardData.action.label} &#8250;
                  </UiTypography>
                )}

                {cardData.data.length == 0 && !cardData.loading && (
                  <UiTypography className={E('card-section-no-data')} variant="subtitle1">
                    No Data Available
                  </UiTypography>
                )}

                {cardData.loading && (
                  <UiTypography className={E('card-section-no-data')} variant="subtitle1">
                    Loading...
                  </UiTypography>
                )}
              </div>
            );
          })}
        </div>
        <EmployeesOverview />
      </Container>
    </Page>
  );
}
