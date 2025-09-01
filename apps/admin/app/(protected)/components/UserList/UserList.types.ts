export interface Personnel {
  name: string;
  email: string;
  role: string;
  status: string;
}

export enum FilterType {
  Key = 'key',
  Role = 'role',
  Status = 'status',
}

export type UserListFilterType = { [key in FilterType]?: string };

export const DEFAULT_FILTERS: UserListFilterType = {
  key: '',
  role: 'all',
  status: 'all',
};

export const ALL_OPTION = { label: 'All', value: 'all' };

export type ApiPersonnel = {
  fullName: string;
  email: string;
  role: string;
  status: string;
};
