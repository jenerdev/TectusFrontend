'use client';

import { useBEM } from '@tectus/hooks';
import './UserList.scss';
import { UiButton, UiTable, useUiSnackbar } from '@tectus/ui'; 
import { PersonnelModel } from '@/app/api/models';
import { usePersonnelApi } from '@/app/api';
import { useState } from 'react';

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
  const { approvePersonnel, loading: approvingLoading } = usePersonnelApi();
  const { showSnackbar } = useUiSnackbar();

  const [inProgressId, setInProgressId] = useState<string | null>(null);
  const [approvedPersonnels, setApprovedPersonnels] = useState<string[]>([]);


  const actionHandler = async (action: string, user: PersonnelModel) => {
    setInProgressId(user.id);
    if (action === 'approve') {
      const { data, error } = await approvePersonnel(user.id);
      setInProgressId(null);
      if (error) {
        showSnackbar(`Error approving personnel: ${user.email}`, 'error');
      } else {
        showSnackbar(`Personnel approved successfully: ${user.email}`, 'success');
        setApprovedPersonnels((prev) => [...prev, user.id]);
      }
    }
  }

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
              td: (row) => {
                let status = row.status
                if(row.status === 'Pending' && approvedPersonnels.includes(row.id)) {
                  status = 'Approved'
                }

                return (
                  <span className={E('status', status)}>
                    {statusLabels[status as EmployeeStatusType] || status}
                  </span>
                )
              },
            },
          },
          { 
            key: 'actions', 
            label: 'Actions', 
            isMobile: true,
            template: {
              td: (row) => {
                let actions = [];
                if(row.status === 'Pending' && !approvedPersonnels.includes(row.id)) {
                  actions.push({
                    label: 'Approve',
                    action: 'approve',
                  });
                }
                
                return (
                  <ul className={E('actions')}>
                    {actions.map((actionItem, index) => (
                      <li key={index} className={E('action')}>
                        <UiButton 
                          size='small' 
                          loading={inProgressId === row.id && approvingLoading} 
                          onClick={() => actionHandler(actionItem.action, row as PersonnelModel)}
                        >
                          {actionItem.label}
                        </UiButton>
                      </li>
                    ))}
                  </ul>
                )
              },
            },
          },
        ]}
        data={data}
      />
    </div>
  );
}
