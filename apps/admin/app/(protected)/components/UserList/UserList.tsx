'use client';

import { useBEM } from '@tectus/hooks';
import './UserList.scss';
import { UiTable } from '@tectus/ui';
import { useApi } from '@/app/hooks';
import { useEffect, useRef, useState } from 'react';

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

interface Personnel {
  name: string;
  email: string;
  role: string;
  status: string;
}

export interface UserListProps {
}

export function UserList({  }: UserListProps) {
  const { B, E } = useBEM('user-list');
  // const [list, setList] = useState<Personnel[]>([]);

  // const { loading, sendRequest } = useApi<
  //   any,
  //   any
  // >(`api/go/personnel`, {
  //   method: 'GET',
  // });

  // const loaded = useRef(false);
  // useEffect(() => {
  //   if (loaded.current) return;
  //   (async () => {      
  //     const results = await sendRequest();   
  //     setList(results.data.map((item: any) => ({
  //       name: item.fullName,
  //       email: item.email,
  //       role: item.user.role,
  //       status: item.status,
  //     })));
  //   })();
  //   loaded.current = true;
  // }, [])

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
        // data={list}
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
