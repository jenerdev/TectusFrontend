'use client';

import { Container, GoogleMap, Page } from '../../components';
import { useBEM } from '@tectus/hooks';
import './jobs-page.scss';
import { JobList } from './components';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useMemo } from 'react';
import { UiTabs } from '../../../../../packages/ui/src/UiTabs';
import { useJobApi } from '@/app/api';
import { JobModel, JobStatusType } from '@/app/api/models';

export default function JobsPage() {
  const { B, E } = useBEM('jobs-page');
  
  const tabItems = [
    {
      label: 'Active Jobs',
      value: 'active',
    },
    {
      label: 'Jobs for Bidding',
      value: 'bidding',
    },
    {
      label: 'Accepted Jobs',
      value: 'accepted',
    },
    {
      label: 'Completed Jobs',
      value: 'completed',
    },
  ];
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialTab = searchParams.get('tab') as JobStatusType;
  const [tab, setTab] = useState<JobStatusType>(initialTab || 'active');
  
  const { list: data, loading } = useJobApi({ status: tab });
  const mapLocations = useMemo(() => {
    return data.map((job) => {
      return {
        ...job.location,
        title: job.location.address,
        pinColor: 'blue' as const,
      }
    });
  }, [data]);

  const onSelectJob = (job: JobModel) => {
    router.push(`/jobs/${job.id}`);
  };

  const tabOnChange = (value: JobStatusType) => {
    setTab(value);

    const params = new URLSearchParams(searchParams.toString());
    params.set('tab', value);
    router.replace(`?${params.toString()}`);
  };

  return (
    <Page id="jobs-page" className={B()}>
      <Container inner className={E('container')}>
        <GoogleMap locations={mapLocations}/>
        <div>
          <UiTabs
            className={E('tabs')}
            value={tab}
            items={tabItems}
            onChange={(_, newValue) => tabOnChange(newValue)}
            color="#00cccc"
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
          />
          <JobList onSelectJob={onSelectJob} loading={loading} data={data} />
        </div>
      </Container>
    </Page>
  );
}
