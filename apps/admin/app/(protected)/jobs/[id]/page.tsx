'use client';

import { useBEM } from '@tectus/hooks';
import './job-details-page.scss';
import { Container, Page } from '@/app/components';
import { useApi } from '@/app/hooks/useApi';
import { Job } from '../Job.types';
import React, { useEffect, useState } from 'react';
import { useJobList } from '../useJobList';
import { JobDetails } from '../components';
import { UiTypography } from '@tectus/ui';
import { useRouter } from 'next/navigation';

// const GET_JOB_BY_ID_API = 'api/jobs/my/'; // TODO: append job id

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function JobsPage({ params }: PageProps) {
  const unwrappedParams = React.use(params);
  const router = useRouter();
  const { B, E } = useBEM('job-detail-page');
  const [selectedJob, setSelectedJob] = useState<Job | undefined>(undefined);
  // TEMPORARY while we don't have the job detail API
  const { data, loading } = useJobList('available');

  useEffect(() => {
    if (data.length === 0) return;
    const job = data.find((job) => job.id === unwrappedParams.id);
    setSelectedJob(job);
  }, [data, unwrappedParams.id]);

  const actionHandler = () => {
    router.back();
  }

  return (
    <Page id="job-detail-page" className={B()}>
      <Container inner className={E('container')}>
        {selectedJob && <JobDetails job={selectedJob} actionHandler={actionHandler} />}

        {loading && (
          <UiTypography variant="h6" className={E('text')}>
            loading...
          </UiTypography>
        )}

        {!loading && !selectedJob && (
          <UiTypography variant="h6" className={E('text')}>
            Job not found
          </UiTypography>
        )}
      </Container>
    </Page>
  );
}
