'use client';

import { useBEM } from '@tectus/hooks';
import './job-details-page.scss';
import { Container, Page } from '@/app/components';
import React from 'react';
import { JobDetails } from '../components';
import { UiTypography } from '@tectus/ui';
import { useRouter } from 'next/navigation';
import { useJobApi } from '@/app/api';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function JobsPage({ params }: PageProps) {
  const unwrappedParams = React.use(params);
  const router = useRouter();
  const { B, E } = useBEM('job-detail-page');

  const { loading, details: selectedJob } = useJobApi({id: unwrappedParams.id});

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
