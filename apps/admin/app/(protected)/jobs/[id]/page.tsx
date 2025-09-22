'use client';

import { useBEM } from '@tectus/hooks';
import './job-details-page.scss';
import { Container, Page } from '@/app/components';
import React, { useMemo, useEffect, useState } from 'react';
import { JobDetails, JobDetailsActionType } from '../components';
import { UiTypography, useUiSnackbar } from '@tectus/ui';
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
  const { showSnackbar } = useUiSnackbar();
  const [availablePersonnels, setAvailablePersonnels] = useState([]);
  const [assignedPersonnels, setAssignedPersonnels] = useState([]);

  const { loading, details: selectedJob, acceptJob, refetch, getAvailablePersonnels, getAssignedPersonnels } = useJobApi({id: unwrappedParams.id});

  const isAccepted = useMemo(() => {
    if(!selectedJob) return false;
    if(selectedJob.type === 'Scheduled') return selectedJob.status === 'Awarded';
    if(selectedJob.type === 'Instant') return selectedJob.status === 'Accepted';
    return false;
  }, [selectedJob]);


  const [refetchAssignmentFlag, setRefetchAssignmentFlag] = useState(0);
  useEffect(() => {
    if(!isAccepted) return;
    (async () => {
      
      const all = Promise.all([
        getAvailablePersonnels(),
        getAssignedPersonnels(),
      ]);
      
      const [available, assigned] = await all;

      if(available.error) {
        showSnackbar(available.error.message || 'Failed to fetch available personnels', 'error');
      } else {
        setAvailablePersonnels(available.data || []);
      }

      if(assigned.error) {
        showSnackbar(assigned.error.message || 'Failed to fetch assigned personnels', 'error');
      }else {
        setAssignedPersonnels((assigned.data || []).reverse());
      }      
    })();
  }, [isAccepted, refetchAssignmentFlag])
  

  const actionHandler = (action: JobDetailsActionType) => {
    const mapping = {
      accept: async () => {
        const result = await acceptJob();
        if(result.error) {
          showSnackbar(result.error.message || 'Failed to accept job', 'error');
          return;
        }
        showSnackbar('Job accepted successfully!', 'success');
        refetch();
      },
      back: () => {
        router.back();
      },
      refetch: () => {
        setRefetchAssignmentFlag(flag => flag + 1);
      },
    }

    mapping[action]();
  }

  return (
    <Page id="job-detail-page" className={B()}>
      <Container inner className={E('container')}>
      {
        selectedJob && <JobDetails 
          job={selectedJob} 
          actionHandler={actionHandler} 
          loading={loading} 
          assignedPersonnels={assignedPersonnels} 
          availablePersonnels={availablePersonnels} 
        />
      }

        {loading && !selectedJob && (
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
