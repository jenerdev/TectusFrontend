'use client';

import { useBEM } from '@tectus/hooks';
import './UserListFilter.scss';
import { UiMenu, UiSelect, UiTextField, UiTypography } from '@tectus/ui';
import UiIcon from '@tectus/ui/UiIcon/UiIcon';
import { ActionType } from '@/app/(protected)/components';

export interface UserListFilterProps {
  handleAction: (type: ActionType) => void
}

export function UserListFilter({ handleAction }: UserListFilterProps) {
  const { B, E } = useBEM('user-list-filter');

  return (
    <div className={B()}>
      <form className={E('form')}>
        <UiTextField label="Search users" size="small" endIcon="Search" className={E('field', 'search')} />
        <UiSelect
          className={E('field')}
          label="Filter by role"
          fullWidth
          options={[
            { label: 'Personnel', value: 'user' },
            { label: 'Admin', value: 'admin' },
            { label: 'Owner', value: 'owner' },
          ]}
          size="small"
        />
        <UiSelect
          className={E('field')}
          label="Filter by status"
          fullWidth
          size="small"
          options={[
            { label: 'Available', value: 'available' },
            { label: 'Clocked In', value: 'clocked_in' },
            { label: 'Busy', value: 'busy' },
            { label: 'Pending profile approval', value: 'pending_profile_approval' },
            { label: 'Invited', value: 'invited' },
            { label: 'Pending documents', value: 'pending_documents' },
            { label: 'Archived', value: 'archived' },
            { label: 'Removed', value: 'removed' },
          ]}
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
