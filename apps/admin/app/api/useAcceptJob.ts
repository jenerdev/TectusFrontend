import { useApi } from '@/app/hooks';
import endpoints from './endpoints';
import { useEffect, useState } from 'react';
import { HttpError } from '@tectus/hooks';

type useAcceptJobType = {
  loading: boolean;
  acceptJob: (id: string) => void;
  result: {
    data: any;
    error: HttpError | null;
  } | null;
};

export const useAcceptJob = (): useAcceptJobType => {
  const [id, setId] = useState<string | null>(null);
  const [result, setResult] = useState<useAcceptJobType['result']>(null);

  const { loading, sendRequest } = useApi<any, any>(endpoints.job.accept(id || ''), {
    method: 'POST',
  });

  const acceptJob = (id: string) => {
    setId(id);
  };

  useEffect(() => {
    if (!id) return;
    (async () => {
      const res = await sendRequest();
      setResult(res);
    })();
  }, [id]);

  return {
    loading,
    acceptJob,
    result,
  };
};
