import { useApi } from '@/app/hooks';
import { VendorForm, VendorModel } from './models';
import endpoints from './endpoints';
import { HttpError } from '@tectus/hooks';

type GetVendorDetailsResponse = {
  data: VendorModel | null;
  error: HttpError | null;
};
type useVendorApiType = {
  loading: boolean;
  getVendorDetails: (auth?: {
    token: string;
    refreshToken: string;
  }) => Promise<GetVendorDetailsResponse>;

  saveVendorDetails: (
    data: VendorModel,
  ) => Promise<{ data: VendorModel | null; error: HttpError | null }>;
};

export const useVendorApi = (): useVendorApiType => {
  const { loading: loadingGetVendor, sendRequest } = useApi<VendorModel, void>(
    endpoints.user.vendor.details,
    {
      method: 'GET',
    },
  );

  const { loading: vendorLoading, sendRequest: vendorRequest } = useApi<VendorModel, any>(
    `api/go/user/me`,
    {
      method: 'PUT',
    },
  );

  const getVendorDetails = async (auth?: {
    token: string;
    refreshToken: string;
  }): Promise<GetVendorDetailsResponse> => {
    const result = await sendRequest(auth);
    return result;
  };

  const saveVendorDetails = async (data: VendorModel) => await vendorRequest({ body: data });

  return {
    loading: loadingGetVendor || vendorLoading,
    getVendorDetails,
    saveVendorDetails,
  };
};
