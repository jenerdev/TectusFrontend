import { useApi } from '@/app/hooks';
import { useEffect, useRef, useState } from 'react';
import { JobModel, JobStatusType } from './models';
import endpoints from './endpoints';

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

type useGetJobProps = {
  status?: JobStatusType;
  id?: string;
};

type useGetJobReturn = {
  loading: boolean;
  list: JobModel[];
  details: JobModel | null;
  refetch: () => void;
};

export const useJobApi = ({ status, id }: useGetJobProps): useGetJobReturn => {
  const [list, setList] = useState<JobModel[]>([]);
  const [details, setDetails] = useState<JobModel | null>(null);
  const [refetchFlag, setRefetchFlag] = useState(0);

  const loaded = useRef(false);
  const listEndpoint = endpoints.job.list(status || 'active');

  const { loading: listLoading, sendRequest: sendRequestList } = useApi<JobModel[], any>(
    listEndpoint,
    {
      method: 'GET',
    },
  );

  // TODO: create a model and hook for this on /api
  const { loading: detailsLoading, sendRequest: sendRequestDetails } = useApi<JobModel, any>(
    endpoints.job.detail(id || ''),
    {
      method: 'GET',
    },
  );

  useEffect(() => {
    if (refetchFlag === 0) return;
    loaded.current = false;
  }, [refetchFlag, status]);

  useEffect(() => {
    loaded.current = false;
  }, [status]);

  useEffect(() => {
    if (loaded.current || !status) return;
    (async () => {
      const results = await sendRequestList();

      const dataWithFormattedDates = (results?.data || []).map(({ startAt, endAt, location, budget, ...others }) => {
        const { address = '', lat = 0, lng = 0 } = location || {};
        return {
          ...others,
          startAt: formatDate(startAt),
          endAt: formatDate(endAt),
          location: { address, lat, lng },
          budget: budget || '0',
        };
      });

      setList(dataWithFormattedDates as JobModel[]);
    })();
    loaded.current = true;
  }, [refetchFlag, status]);

  useEffect(() => {
    if (loaded.current || !id) return;
    (async () => {
      const result = await sendRequestDetails();
      if (!result.error && result?.data) {
        setDetails(result?.data || null);
        return;
      }
      console.log(result.error);
    })();
    loaded.current = true;
  }, [refetchFlag, id]);

  const refetch = () => {
    setRefetchFlag((prev) => prev + 1);
  };

  return {
    loading: listLoading || detailsLoading,
    list,
    details,
    refetch,
  };
};
