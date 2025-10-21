'use client';

import { Container, GoogleMap, Page,  } from '../../components';
import { useBEM, useEffectDebounce } from '@tectus/hooks';
import './schedule-page.scss';
import { useUserStore } from '@/store/userStore';
import { useRouter } from 'next/navigation';
import { AuthRoleEnum, JobModel } from '@/app/api/models';
import { useJobApi } from '@/app/api';
import { JobList } from '../jobs/components';
import { useMemo, useState } from 'react';

export default function SchedulePage() {
  const { B, E } = useBEM('schedule-page');
  const role = useUserStore((state) => state.auth?.role);
  const router = useRouter();
  
  const [jobList, setJobList] = useState<JobModel[]>([]);
  
  const { loading, getJobList } = useJobApi({ status: 'accepted', role });
  const mapLocations = useMemo(() => {
    return jobList.map((job) => {
      return {
        ...job.location,
        title: job.location.address,
        pinColor: 'blue' as const,
      }
    });
  }, [jobList]);

  useEffectDebounce(() => {
    (async () => {
      const result = await getJobList();  
      setJobList(result.data || []);
    })();
  }, []);  


  const onSelectJob = (job: JobModel) => {
    router.push(`/jobs/${job.id}`);
  };


  if(!role)return null;

  return (
    <Page id="jobs-page" className={B()}>
      <Container inner className={E('container')}>
        <GoogleMap locations={mapLocations}/>
        <div>
          <JobList onSelectJob={onSelectJob} loading={loading} data={jobList} />
        </div>
      </Container>
    </Page>
  );
}
