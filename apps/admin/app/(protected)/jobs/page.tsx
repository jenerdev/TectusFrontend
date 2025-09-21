'use client';

import { Container, GoogleMap, Page } from '../../components';
import { useBEM } from '@tectus/hooks';
import './jobs-page.scss';
import { JobList } from './components';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useMemo } from 'react';
import { UiTabs } from '../../../../../packages/ui/src/UiTabs';
import { useJobApi } from '@/app/api';
import { AuthRoleEnum, JobModel, JobStatusType } from '@/app/api/models';
import { useUserStore } from '@/store';

const tabItems = [
    {
      label: 'Available Jobs',
      value: 'active',
      roles: [AuthRoleEnum.PROVIDER],
    },
    {
      label: 'Available Jobs',
      value: 'available',
      roles: [AuthRoleEnum.PERSONNEL],
    },
    {
      label: 'Jobs for Bidding',
      value: 'bidding',
      roles: [AuthRoleEnum.PROVIDER],
    },
    {
      label: 'Accepted Jobs',
      value: 'accepted',
      roles: [AuthRoleEnum.PROVIDER],
    },
    {
      label: 'Completed Jobs',
      value: 'completed',
      roles: [AuthRoleEnum.PROVIDER],
    },
  ];


export default function JobsPage() {
  const { B, E } = useBEM('jobs-page');
  const role = useUserStore((state) => state.auth?.role);
  const router = useRouter();
  const searchParams = useSearchParams();
  const isPersonnel = role === AuthRoleEnum.PERSONNEL;
  const initialTab = (searchParams.get('tab') || (isPersonnel ? 'available' : 'active')) as JobStatusType;
  
  const [tab, setTab] = useState<JobStatusType>(initialTab);
  
  const { list: data, loading } = useJobApi({ status: tab, role });
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

  if(!role)return null;

  return (
    <Page id="jobs-page" className={B()}>
      <Container inner className={E('container')}>
        <GoogleMap locations={mapLocations}/>
        <div>
          <UiTabs
            className={E('tabs')}
            value={tab}
            items={tabItems.filter(item => item.roles.includes(role))}
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
