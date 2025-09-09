'use client';

import { useBEM } from '@tectus/hooks';
import './EmployeesOverview.scss';
import { UiMenu, UiTypography, UiIcon } from '@tectus/ui';
import { ActionType, InviteUsersBulkModal, InviteUsersModal, UserList, useUserList } from '@/app/(protected)/components';
import { useState } from 'react';

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

export interface EmployeesOverviewProps {
}

export function EmployeesOverview({  }: EmployeesOverviewProps) {
  const { B, E } = useBEM('employees-overview');
  const [openInviteModal, setOpenInviteModal] = useState(false);
  const [openInviteBulkModal, setOpenInviteBulkModal] = useState(false);
  const { data, loading, refetch } = useUserList();

  const employeesOverviewHandleAction = (action: ActionType) => {
    if (action === 'invite_user') setOpenInviteModal(true);
    if (action === 'invite_user_bulk') setOpenInviteBulkModal(true);
  };

  return (
    <div className={B()}>
      <div className={E('banner')}>
        <UiTypography variant="h5" bold>
          User Overview
        </UiTypography>

        <UiMenu
          items={[
            {
              icon: <UiIcon name="MoreVert" />,
              type: 'icon',
              subMenuItems: [
                {
                  label: 'Invite users by email',
                  icon: <UiIcon name="PersonAdd" size="small" />,
                  onClick: () => employeesOverviewHandleAction('invite_user'),
                },
                {
                  label: 'Bulk invite users with profile (CSV)',
                  icon: <UiIcon name="NoteAdd" size="small" />,
                  onClick: () => employeesOverviewHandleAction('invite_user_bulk'),
                },
              ],
            },
          ]}
        />
      </div>
      <UserList data={data} loading={loading}/>

      <InviteUsersModal
        open={openInviteModal}
        onClose={() => setOpenInviteModal(false)}
        refetchUsers={refetch}
        switchToBulk={() => {
          setOpenInviteModal(false);
          setOpenInviteBulkModal(true);
        }}
      />
      <InviteUsersBulkModal
        refetchUsers={refetch}
        open={openInviteBulkModal}
        onClose={() => setOpenInviteBulkModal(false)}
      />
    </div>
  );
}
