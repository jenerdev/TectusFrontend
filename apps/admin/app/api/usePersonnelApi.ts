import { useApi } from '@/app/hooks';
import { useEffect, useRef, useState } from 'react';
import { PersonnelModel } from './models';
import endpoints from './endpoints';
import { HttpError } from '@tectus/hooks';

type usePersonnelApiType = {
  loading: boolean;
  list: PersonnelModel[];
  refetch: () => void;
  createProfile: (data: any) => Promise<{
    data: any | null;
    error: HttpError | null;
  }>;
  getPersonnelDetails: (data?: any) => Promise<{
    data: any | null;
    error: HttpError | null;
  }>;
};

// TODO: add types for personnel remove type any

export const usePersonnelApi = (manual = false): usePersonnelApiType => {
  const [list, setList] = useState<PersonnelModel[]>([]);
  const [refetchFlag, setRefetchFlag] = useState(0);

  const loaded = useRef(false);

  const { loading: getPersonnelListLoading, sendRequest: getPersonnelList } = useApi<
    PersonnelModel[],
    any
  >(endpoints.personnel.list, {
    method: 'GET',
  });

  const { loading: createProfileLoading, sendRequest: createProfileRequest } = useApi<
    PersonnelModel[],
    any
  >(endpoints.personnel.create, {
    method: 'PUT',
  });

  const { loading: getPersonnelDetailsLoading, sendRequest: getPersonnelDetails } = useApi<
    PersonnelModel[],
    any
  >(endpoints.personnel.details, {
    method: 'GET',
  });

  useEffect(() => {
    if (refetchFlag === 0) return;
    loaded.current = false;
  }, [refetchFlag]);

  useEffect(() => {
    if (loaded.current || manual) return;
    (async () => {
      const results = await getPersonnelList();
      const personnels = (results?.data || []).map((item) => {
        const fullName = item.fullName === 'null null' ? '' : item.fullName;
        return { ...item, fullName };
      });
      setList(personnels);
    })();
    loaded.current = true;
  }, [refetchFlag, manual]);

  const refetch = () => {
    setRefetchFlag((prev) => prev + 1);
  };

  const createProfile = async (data: any) => createProfileRequest({ body: data });

  return {
    loading: getPersonnelListLoading || createProfileLoading || getPersonnelDetailsLoading,
    list,
    refetch,
    createProfile,
    getPersonnelDetails,
  };
};
