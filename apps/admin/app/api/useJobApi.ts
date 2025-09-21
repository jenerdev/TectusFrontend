import { useApi } from '@/app/hooks';
import { useEffect, useRef, useState } from 'react';
import { AuthRoleEnum, JobModel, JobStatusType } from './models';
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
  role?: AuthRoleEnum;
  disable?: boolean;
};

type useGetJobReturn = {
  loading: boolean;
  list: JobModel[];
  details: JobModel | null;
  refetch: () => void;
};

export const useJobApi = ({
  status,
  id,
  role = AuthRoleEnum.PROVIDER,
  disable = false,
}: useGetJobProps): useGetJobReturn => {
  const [list, setList] = useState<JobModel[]>([]);
  const [details, setDetails] = useState<JobModel | null>(null);
  const [refetchFlag, setRefetchFlag] = useState(0);

  const loaded = useRef(false);
  const listEndpoint = endpoints.job.list(status as JobStatusType, role);

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
    if (!status) return;
    loaded.current = false;
  }, [status]);

  useEffect(() => {
    console.log(loaded.current);
    if (loaded.current || !status || disable) return;
    (async () => {
      const results = await sendRequestList();
      let list = results?.data || [];

      if (status === 'accepted') {
        list = (list as any[]).map((item) => item.job);
      }

      const dataWithFormattedDates = list.map(({ startAt, endAt, location, budget, ...others }) => {
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
