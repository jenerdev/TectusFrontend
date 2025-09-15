'use client';

import { useBEM } from '@tectus/hooks';
import './UserList.scss';
import { UiTable } from '@tectus/ui'; 
import { PersonnelModel } from '@/app/api/models';

export type ActionType = 'invite_user' | 'invite_user_bulk';

type EmployeeStatusType =
  | 'available'
  | 'clocked_in'
  | 'busy'
  | 'pending_profile_approval'
  | 'invited'
  | 'pending_documents'
  | 'archived'
  | 'removed';

const statusLabels: Record<EmployeeStatusType, string> = {
  available: 'Available',
  clocked_in: 'Clocked In',
  busy: 'Busy',
  pending_profile_approval: 'Pending profile approval',
  invited: 'Invited',
  pending_documents: 'Pending documents',
  archived: 'Archived',
  removed: 'Removed',
};


export interface UserListProps {
  data: PersonnelModel[];
  loading?: boolean;
}

export function UserList({ data, loading = false }: UserListProps) {
  const { B, E } = useBEM('user-list');

  return (
    <div className={B()}>
      <UiTable
        className={E('table')}
        loading={loading}
        columns={[
          { key: 'fullName', label: 'Name', isMobile: true },
          { key: 'email', label: 'Email' },
          { key: 'role', label: 'Role' },
          {
            key: 'status',
            label: 'Status',
            template: {
              td: (row) => (
                <span className={E('status', row.status)}>
                  {statusLabels[row.status as EmployeeStatusType] || row.status}
                </span>
              ),
            },
          },
          { key: 'actions', label: 'Actions', isMobile: true},
        ]}
        data={data}
      />
    </div>
  );
}
