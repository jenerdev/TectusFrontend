import { useApi } from '@/app/hooks';
import { useEffect, useRef, useState } from 'react';
import { PersonnelModel } from './models';
import endpoints from './endpoints';


type useGetJobReturn = {
  loading: boolean;
  list: PersonnelModel[];
  refetch: () => void;
};

export const usePersonnelApi = (): useGetJobReturn => {
  const [list, setList] = useState<PersonnelModel[]>([]); 
  const [refetchFlag, setRefetchFlag] = useState(0);

  const loaded = useRef(false);

  const { loading, sendRequest } = useApi<PersonnelModel[], any>(
    endpoints.vendor.personnels,
    {
      method: 'GET',
    },
  );

  useEffect(() => {
    if (refetchFlag === 0) return;
    loaded.current = false;
  }, [refetchFlag]);

  useEffect(() => {
    if (loaded.current) return;
    (async () => {
      const results = await sendRequest();
      const personnels = (results?.data || []).map( item => {
        const fullName = item.fullName === 'null null' ? '' : item.fullName;
        return {...item, fullName};
      });
      setList(personnels);
    })();
    loaded.current = true;
  }, [refetchFlag]);

  const refetch = () => {
    setRefetchFlag((prev) => prev + 1);
  };

  return {
    loading,
    list,
    refetch,
  };
};
