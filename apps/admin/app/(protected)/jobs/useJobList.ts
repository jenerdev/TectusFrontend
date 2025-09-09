'use client';

import { useApi } from '@/app/hooks';
import { useEffect, useRef, useState } from 'react';
import { Job, JobStatusType } from './Job.types';

const jobEnpointMapping: Record<JobStatusType, string> = {
  active: 'api/jobs/active',
  bidding: 'api/jobs/bidding',
  completed: 'api/jobs/completed',
  available: 'api/jobs/available',
};

// TODO: create a util for this
const formatDate = (date: string) => {
  const dateObj = new Date(date);

  const formatter = new Intl.DateTimeFormat('en-US', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  return formatter.format(dateObj).replace(',', '');
};

export function useJobList(status: JobStatusType) {
  const [data, setData] = useState<Job[]>([]);

  const [refetchFlag, setRefetchFlag] = useState(0);

  const { loading, sendRequest } = useApi<Job[], any>(jobEnpointMapping[status], {
    method: 'GET',
  });

  const loaded = useRef(false);

  useEffect(() => {
    if (refetchFlag === 0) return;
    loaded.current = false;
  }, [refetchFlag, status]);

  useEffect(() => {
    loaded.current = false;
  }, [status]);

  useEffect(() => {
    if (loaded.current) return;
    (async () => {
      const results = await sendRequest();
      setData(
        (results?.data || []).map((item: any) => ({
          id: item.id,
          title: item.title,
          description: item.description,
          categories: item.categories,
          type: item.type,
          startAt: formatDate(item.startAt),
          endAt: formatDate(item.endAt),
          location: item.location,
          budget: item.budget,
          clientNotes: item.clientNotes,
          numberOfPersonnel: item.numberOfPersonnel,
          status: item.status,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
        })),
      );
    })();
    loaded.current = true;
  }, [refetchFlag, status]);

  const refetch = () => {
    setRefetchFlag((prev) => prev + 1);
  };

  return {
    data,
    loading,
    refetch,
  };
}
