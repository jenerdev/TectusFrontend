'use client';

import { useBEM } from '@tectus/hooks';
import './UserList.scss';
import { UiTable } from '@tectus/ui';

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
}

export function UserList({  }: UserListProps) {
  const { B, E } = useBEM('user-list');

  return (
    <div className={B()}>
      <UiTable
        className={E('table')}
        mobileColumns={[
          { key: 'name', label: 'Name' },
          { key: 'actions', label: 'Actions' },
        ]}
        columns={[
          { key: 'name', label: 'Name' },
          { key: 'email', label: 'Email' },
          { key: 'role', label: 'Role' },
          {
            key: 'status',
            label: 'Status',
            template: {
              td: (row) => (
                <span className={E('status', row.status)}>
                  {statusLabels[row.status as EmployeeStatusType]}
                </span>
              ),
            },
          },
          { key: 'actions', label: 'Actions' },
        ]}
        data={[
          { name: 'Alice Smith', email: 'alice@email.com', role: 'Admin', status: 'available' },
          { name: 'Bob Johnson', email: 'bob@email.com', role: 'User', status: 'archived' },
          {
            name: 'Charlie Brown',
            email: 'charlie@email.com',
            role: 'User',
            status: 'clocked_in',
          },
          { name: 'Diana Prince', email: 'diana@email.com', role: 'Admin', status: 'busy' },
          {
            name: 'Ethan Hunt',
            email: 'ethan@email.com',
            role: 'User',
            status: 'pending_profile_approval',
          },
          {
            name: 'Fiona Gallagher',
            email: 'fiona@email.com',
            role: 'User',
            status: 'invited',
          },
          {
            name: 'George Miller',
            email: 'george@email.com',
            role: 'User',
            status: 'pending_documents',
          },
          { name: 'Hannah Davis', email: 'hannah@email.com', role: 'Admin', status: 'removed' },
          { name: 'Ian Curtis', email: 'ian@email.com', role: 'User', status: 'available' },
          { name: 'Jenna Lee', email: 'jenna@email.com', role: 'User', status: 'clocked_in' },
        ]}
      />
    </div>
  );
}
