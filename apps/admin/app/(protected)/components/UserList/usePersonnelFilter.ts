'use client';

import { useMemo, useState } from 'react';
import {
  ALL_OPTION,
  DEFAULT_FILTERS,
  FilterType,
  UserListFilterType,
} from './UserList.types';
import { PersonnelModel } from '@/app/api/models';

export function usePersonnelFilter(list: PersonnelModel[] = []) {
  const [filters, setFilters] = useState<UserListFilterType>(DEFAULT_FILTERS);

  const updateFilter = (type: FilterType, value: string) => {
    setFilters((prev) => ({ ...prev, [type]: value }));
  };

  const finalData = useMemo(() => {
    if (!list) return [];

    return list.filter(({ email = '', fullName = '', role, status }) => {
      if (filters?.key) {
        const searchKey = filters.key.toLowerCase();
        if (!email?.toLowerCase().includes(searchKey) && !fullName?.toLowerCase().includes(searchKey))
          return false;
      }
      if (filters?.role !== 'all' && role !== filters?.role) return false;
      if (filters?.status !== 'all' && status !== filters?.status) return false;

      return true;
    });
  }, [list, filters]);

  const clearFilter = () => {
    setFilters(DEFAULT_FILTERS);
  };

  const roleOptions = useMemo(() => {
    return Array.from(new Set(list.map((item) => item.role))).map((role) => ({
      label: role,
      value: role,
    }));
  }, [list]);

  const statusOptions = useMemo(() => {
    return Array.from(new Set(list.map((item) => item.status))).map((status) => ({
      label: status,
      value: status,
    }));
  }, [list]);

  return {
    data: finalData,
    filters,
    roleOptions: [ALL_OPTION, ...roleOptions],
    statusOptions: [ALL_OPTION, ...statusOptions],
    updateFilter,
    clearFilter,
  };
}
