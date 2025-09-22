import { useApi } from '@/app/hooks';
import { useEffect, useRef, useState } from 'react';
import { AuthRoleEnum, JobModel, JobStatusType } from './models';
import endpoints from './endpoints';
import { HttpError } from '@tectus/hooks';

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
  acceptJob: () => Promise<{
    data: any;
    error: HttpError | null;
  }>;
  getAssignedPersonnels: () => Promise<{
    data: any;
    error: HttpError | null;
  }>;
  getAvailablePersonnels: () => Promise<{
    data: any;
    error: HttpError | null;
  }>;
  assignPersonnel: (personnelId: string) => Promise<{
    data: any;
    error: HttpError | null;
  }>;
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

  const { loading: detailsLoading, sendRequest: sendRequestDetails } = useApi<JobModel, any>(
    endpoints.job.detail(id || ''),
    {
      method: 'GET',
    },
  );

  const { loading: acceptJobLoading, sendRequest: acceptJobRequest } = useApi<any, any>(
    endpoints.job.accept(id || ''),
    {
      method: 'POST',
    },
  );

  const { loading: getAssignedPersonnelsLoading, sendRequest: getAssignedPersonnels } = useApi<
    any,
    any
  >(endpoints.job.assignedPersonnel(id || ''), {
    method: 'GET',
  });

  const { loading: getAvailablePersonnelsLoading, sendRequest: getAvailablePersonnels } = useApi<
    any,
    any
  >(endpoints.job.availablePersonnels(id || ''), {
    method: 'GET',
  });

  const { loading: assignPersonnelRequestLoading, sendRequest: assignPersonnelRequest } = useApi<
    any,
    any
  >(endpoints.job.assignPersonnel(id || ''), {
    method: 'POST',
  });

  useEffect(() => {
    if (refetchFlag === 0) return;
    loaded.current = false;
  }, [refetchFlag, status]);

  useEffect(() => {
    if (!status) return;
    loaded.current = false;
  }, [status]);

  useEffect(() => {
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

  const acceptJob = async () => {
    return await acceptJobRequest();
  };

  const assignPersonnel = async (personnelId: string) => {
    return assignPersonnelRequest({
      body: {
        personnelId,
      },
    });
  };

  return {
    loading:
      listLoading ||
      detailsLoading ||
      acceptJobLoading ||
      getAssignedPersonnelsLoading ||
      getAvailablePersonnelsLoading ||
      assignPersonnelRequestLoading,
    list,
    details,
    refetch,
    acceptJob,
    getAssignedPersonnels,
    getAvailablePersonnels,
    assignPersonnel,
  };
};
