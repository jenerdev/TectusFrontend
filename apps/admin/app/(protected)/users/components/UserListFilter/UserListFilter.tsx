'use client';

import { useBEM } from '@tectus/hooks';
import './UserListFilter.scss';
import { UiMenu, UiSelect, UiSelectProps, UiTextField, UiIcon } from '@tectus/ui';
import { ActionType, FilterType, UserListFilterType } from '@/app/(protected)/components';

export interface UserListFilterProps {
  handleAction: (type: ActionType) => void;
  filterValues?: UserListFilterType;
  onFilterChange: (type: keyof UserListFilterType, value: string) => void;
  statusOptions?: UiSelectProps['options'];
  roleOptions?: UiSelectProps['options'];
}

export function UserListFilter({
  handleAction,
  filterValues = {
    key: '',
    role: 'all',
    status: 'all',
  },
  onFilterChange,
  statusOptions = [],
  roleOptions = [],
}: UserListFilterProps) {
  const { B, E } = useBEM('user-list-filter');

  return (
    <div className={B()}>
      <form className={E('form')}>
        <UiTextField
          label="Search users"
          size="small"
          endIcon="Search"
          className={E('field', 'search')}
          value={filterValues.key}
          onChange={(e) => onFilterChange(FilterType.Key, e.target.value)}
        />
        <UiSelect
          className={E('field')}
          label="Filter by role"
          fullWidth
          options={[
            // { label: 'All', value: 'all' },
            // { label: 'Personnel', value: 'user' },
            // { label: 'Admin', value: 'admin' },
            // { label: 'Owner', value: 'owner' },
            ...roleOptions
          ]}
          size="small"
          value={filterValues.role}
          onChange={(e) => onFilterChange(FilterType.Role, e.target.value as string)}
        />
        <UiSelect
          className={E('field')}
          label="Filter by status"
          fullWidth
          size="small"
          options={[
            // { label: 'All', value: 'all' },
            // { label: 'Available', value: 'available' },
            // { label: 'Clocked In', value: 'clocked_in' },
            // { label: 'Busy', value: 'busy' },
            // { label: 'Pending profile approval', value: 'pending_profile_approval' },
            // { label: 'Invited', value: 'invited' },
            // { label: 'Pending documents', value: 'pending_documents' },
            // { label: 'Archived', value: 'archived' },
            // { label: 'Removed', value: 'removed' },
            ...statusOptions,
          ]}
          value={filterValues.status}
          onChange={(e) => onFilterChange(FilterType.Status, e.target.value as string)}
        />
      </form>

      <UiMenu
        items={[
          {
            icon: <UiIcon name="MoreVert" />,
            type: 'icon',
            subMenuItems: [
              {
                label: 'Invite users by email',
                icon: <UiIcon name="PersonAdd" size="small" />,
                onClick: () => handleAction('invite_user'),
              },
              {
                label: 'Bulk invite users with profile (CSV)',
                icon: <UiIcon name="NoteAdd" size="small" />,
                onClick: () => handleAction('invite_user_bulk'),
              },
            ],
          },
        ]}
      />
    </div>
  );
}
