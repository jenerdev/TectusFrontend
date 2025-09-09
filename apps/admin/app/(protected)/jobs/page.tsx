'use client';

import { Container, GoogleMap, Page } from '../../components';
import { useBEM } from '@tectus/hooks';
import './jobs-page.scss';
import { JobList } from './components';
import { Job } from './Job.types';
import { useRouter } from 'next/navigation';

export default function JobsPage() {
  const { B, E } = useBEM('jobs-page');
  const router = useRouter();

  const onSelectJob = (job: Job) => {
    router.push(`/jobs/${job.id}`);
  }

  return (
    <Page id="jobs-page" className={B()}>
      <Container inner className={E('container')}>
        <GoogleMap />
        <JobList onSelectJob={onSelectJob}/>
      </Container>
    </Page>
  );
}
