'use client';

import { Container, Page } from '../../components';
import { useBEM } from '@tectus/hooks';
import {
  ActionType,
  InviteFormValues,
  InviteUsersBulkModal,
  InviteUsersModal,
  UserList,
  useUserList,
} from '../components';
import { UserListFilter } from './components';
import './users-page.scss';
import { useState } from 'react';

export default function SchedulePage() {
  const { B, E } = useBEM('users-page');
  const { data, loading, filters, updateFilter, statusOptions, roleOptions, refetch } = useUserList();

  const [openInviteModal, setOpenInviteModal] = useState(false);
  const [openInviteBulkModal, setOpenInviteBulkModal] = useState(false);

  const userListFilterHandleAction = (action: ActionType) => {
    if (action === 'invite_user') setOpenInviteModal(true);
    if (action === 'invite_user_bulk') setOpenInviteBulkModal(true);
  };

  return (
    <Page id="users-page" className={B()}>
      <Container inner className={E('container')}>
        <UserListFilter
          handleAction={userListFilterHandleAction}
          filterValues={filters}
          onFilterChange={updateFilter}
          statusOptions={statusOptions}
          roleOptions={roleOptions}
        />
        <UserList data={data} loading={loading} />
      </Container>

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
        open={openInviteBulkModal}
        onClose={() => setOpenInviteBulkModal(false)}
        refetchUsers={refetch}
      />
    </Page>
  );
}
