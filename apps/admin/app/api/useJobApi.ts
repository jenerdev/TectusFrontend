import { useApi } from '@/app/hooks';
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

export type PlaceBidPayload = {
  amount: string;
  message?: string;
  proposedStartAt?: string;
  proposedEndAt?: string;
};

type useGetJobProps = {
  status?: JobStatusType;
  id?: string;
  role?: AuthRoleEnum;
  disable?: boolean;
};

type UseJobApiReturn = {
  loading: boolean;
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
  acceptPersonnelAssignment: (id: string) => Promise<{
    data: any;
    error: HttpError | null;
  }>;
  cancelPersonnelAssignment: (personnelId: string) => Promise<{
    data: any;
    error: HttpError | null;
  }>;
  getJobDetails: () => Promise<{
    data: JobModel | null;
    error: HttpError | null;
  }>;
  getJobList: () => Promise<{
    data: JobModel[] | null;
    error: HttpError | null;
  }>;
  placeBid: (payload: PlaceBidPayload) => Promise<{
    data: any | null;
    error: HttpError | null;
  }>;
  getJobBidding: () => Promise<{
    data: any;
    error: HttpError | null;
  }>;
};

export const useJobApi = ({
  status,
  id,
  role = AuthRoleEnum.PROVIDER,
}: useGetJobProps): UseJobApiReturn => {
  const listEndpoint = endpoints.job.list(status as JobStatusType, role);
  const jobId = id || '';

  const { loading: listLoading, sendRequest: sendRequestList } = useApi<JobModel[], any>(
    listEndpoint,
    { method: 'GET' },
  );

  const { loading: detailsLoading, sendRequest: sendRequestDetails } = useApi<JobModel, any>(
    endpoints.job.detail(jobId),
    { method: 'GET' },
  );

  const { loading: acceptJobLoading, sendRequest: acceptJobRequest } = useApi<any, any>(
    endpoints.job.accept(jobId),
    { method: 'POST' },
  );

  const { loading: getAssignedPersonnelsLoading, sendRequest: getAssignedPersonnels } = useApi<
    any,
    any
  >(endpoints.job.assignedPersonnel(jobId), {
    method: 'GET',
  });

  const { loading: getAvailablePersonnelsLoading, sendRequest: getAvailablePersonnels } = useApi<
    any,
    any
  >(endpoints.job.availablePersonnels(jobId), {
    method: 'GET',
  });

  const { loading: assignPersonnelRequestLoading, sendRequest: assignPersonnelRequest } = useApi<
    any,
    any
  >(endpoints.job.assignPersonnel(jobId), {
    method: 'POST',
  });

  const {
    loading: acceptPersonnelAssignmentLoading,
    sendRequest: acceptPersonnelAssignmentRequest,
  } = useApi<any, any>(endpoints.job.acceptPersonnelAssignment, {
    method: 'POST',
  });

  const {
    loading: cancelPersonnelAssignmentLoading,
    sendRequest: cancelPersonnelAssignmentRequest,
  } = useApi<any, any>(endpoints.job.cancelPersonnelAssignment(jobId), {
    method: 'POST',
  });

  const { loading: placeBidLoading, sendRequest: placeBidRequest } = useApi<any, any>(
    endpoints.job.placeBid(jobId),
    {
      method: 'POST',
    },
  );

  const { loading: getJobBiddingLoading, sendRequest: getJobBiddingRequest } = useApi<any, any>(
    endpoints.job.getJobBidding(jobId),
    {
      method: 'GET',
    },
  );

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

  const acceptPersonnelAssignment = async (id: string) =>
    acceptPersonnelAssignmentRequest({}, { id });
  const cancelPersonnelAssignment = async (personnelId: string) =>
    cancelPersonnelAssignmentRequest({}, { personnelId });

  const getJobDetails = async () => {
    return await sendRequestDetails();
  };

  const getJobList = async () => {
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

    return {
      ...results,
      data: dataWithFormattedDates,
    };
  };

  const placeBid = async (payload: PlaceBidPayload) => {
    return placeBidRequest({
      body: payload,
    });
  };

  return {
    loading:
      listLoading ||
      detailsLoading ||
      acceptJobLoading ||
      getAssignedPersonnelsLoading ||
      getAvailablePersonnelsLoading ||
      assignPersonnelRequestLoading ||
      acceptPersonnelAssignmentLoading ||
      cancelPersonnelAssignmentLoading ||
      placeBidLoading ||
      getJobBiddingLoading,
    acceptJob,
    getAssignedPersonnels,
    getAvailablePersonnels,
    assignPersonnel,
    acceptPersonnelAssignment,
    cancelPersonnelAssignment,
    getJobDetails,
    getJobList,
    placeBid,
    getJobBidding: getJobBiddingRequest,
  };
};
