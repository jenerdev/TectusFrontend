'use client';

import { useBEM } from '@tectus/hooks';
import './EmployeesOverview.scss';
import { UiMenu, UiTable, UiTypography } from '@tectus/ui';
import UiIcon from '@tectus/ui/UiIcon/UiIcon';
import { ActionType, UserList } from '@/app/(protected)/components';

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
  handleAction: (type: ActionType) => void
}

export function EmployeesOverview({ handleAction }: EmployeesOverviewProps) {
  const { B, E } = useBEM('employees-overview');

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
      <UserList />
    </div>
  );
}
