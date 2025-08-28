'use client';

import { useApi } from '@/app/hooks';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  ALL_OPTION,
  ApiPersonnel,
  DEFAULT_FILTERS,
  FilterType,
  Personnel,
  UserListFilterType,
} from './UserList.types';

export function useUserList() {
  const [filters, setFilters] = useState<UserListFilterType>(DEFAULT_FILTERS);
  const [data, setData] = useState<Personnel[]>([]);

  const { loading, sendRequest } = useApi<void, { data: ApiPersonnel[] }>('api/go/personnel', {
    method: 'GET',
  });

  const loaded = useRef(false);
  useEffect(() => {
    if (loaded.current) return;
    (async () => {
      const results = await sendRequest();
      setData(
        (results?.data || []).map((item: any) => ({
          name: item.fullName,
          email: item.email,
          role: item.user.role,
          status: item.status,
        })),
      );
    })();
    loaded.current = true;
  }, []);

  const updateFilter = (type: FilterType, value: string) => {
    setFilters((prev) => ({ ...prev, [type]: value }));
  };

  const finalData = useMemo(() => {
    if (!data) return [];

    return data.filter(({ email = '', name = '', role, status }) => {
      if (filters?.key) {
        const searchKey = filters.key.toLowerCase();
        if (!email?.toLowerCase().includes(searchKey) && !name?.toLowerCase().includes(searchKey))
          return false;
      }
      if (filters?.role !== 'all' && role !== filters?.role) return false;
      if (filters?.status !== 'all' && status !== filters?.status) return false;

      return true;
    });
  }, [data, filters]);

  const clearFilter = () => {
    setFilters(DEFAULT_FILTERS);
  };

  const roleOptions = useMemo(() => {
    return Array.from(new Set(data.map((item) => item.role))).map((role) => ({
      label: role,
      value: role,
    }));
  }, [data]);

  const statusOptions = useMemo(() => {
    return Array.from(new Set(data.map((item) => item.status))).map((status) => ({
      label: status,
      value: status,
    }));
  }, [data]);

  return {
    data: finalData,
    loading,
    filters,
    roleOptions: [ALL_OPTION, ...roleOptions],
    statusOptions: [ALL_OPTION, ...statusOptions],
    updateFilter,
    clearFilter,
  };
}
