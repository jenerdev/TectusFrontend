'use client';

import { useBEM, useEffectDebounce } from '@tectus/hooks';
import './job-details-page.scss';
import { Container, Page } from '@/app/components';
import React, { useMemo, useEffect, useState } from 'react';
import { JobDetails, JobDetailsActionType } from '../components';
import { UiTypography, useUiSnackbar } from '@tectus/ui';
import { useRouter } from 'next/navigation';
import { useJobApi } from '@/app/api';
import { J } from 'vitest/dist/chunks/environment.d.cL3nLXbE.js';
import { JobModel } from '@/app/api/models';

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
  const [selectedJob, setSelectedJob] = useState<JobModel | null>(null);
  const [bidAmount, setBidAmount] = useState<string | undefined>();
  const [refetchAssignmentFlag, setRefetchAssignmentFlag] = useState(0);
  const { 
    loading, 
    acceptJob, 
    getAvailablePersonnels, 
    getAssignedPersonnels, 
    getJobDetails, 
    placeBid,
    getJobBidding 
  } = useJobApi({id: unwrappedParams.id});

  
  useEffectDebounce(() => {
    (async () => { 
      const requests = Promise.all([getJobDetails(), getJobBidding()]);
      const [job, jobBidding] = await requests;

      if(job.error) {
        showSnackbar(job.error.message || 'Failed to fetch job details', 'error');
        return;
      };
      setSelectedJob(job.data || null);
      setBidAmount(jobBidding.data?.amount);
    })();
  }, [unwrappedParams.id, refetchAssignmentFlag]);

  const isAccepted = useMemo(() => {
    if(!selectedJob) return false;
    if(selectedJob.type === 'Scheduled') return selectedJob.status === 'Awarded';
    if(selectedJob.type === 'Instant') return selectedJob.status === 'Accepted';
    return false;
  }, [selectedJob]);

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
  
  const refetch = () => setRefetchAssignmentFlag(flag => flag + 1);

  const actionHandler = (action: JobDetailsActionType, data?: string | number) => {
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
        refetch();
      },
      placeBid: async () => {
        const res = await placeBid({amount: String(data)});
        if(res.error) {
          showSnackbar(res.error.message || 'Failed to place bid', 'error');
          return;
        }
        setBidAmount(res.data.amount)
        showSnackbar('Bid placed successfully!', 'success');
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
          bidAmount={bidAmount}
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
