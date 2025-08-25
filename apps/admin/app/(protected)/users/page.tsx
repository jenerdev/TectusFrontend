'use client';

import { Container, Page } from '../../components';
import { useBEM } from '@tectus/hooks';
import { ActionType, InviteUsersBulkModal, InviteUsersModal, UserList } from '../components';
import { UserListFilter } from './components';
import './users-page.scss';
import { useState } from 'react';

export default function SchedulePage() {
  const { B, E } = useBEM('users-page');

    const [openInviteModal, setOpenInviteModal] = useState(false);
    const [openInviteBulkModal, setOpenInviteBulkModal] = useState(false);

  const userListFilterHandleAction = (action: ActionType) => {
    if (action === 'invite_user') setOpenInviteModal(true);
    if (action === 'invite_user_bulk')  setOpenInviteBulkModal(true);
  }

  return (
    <Page id="users-page" className={B()}>
      <Container inner className={E('container')}>
        <UserListFilter handleAction={userListFilterHandleAction} />
        <UserList />
      </Container>

      <InviteUsersModal open={openInviteModal} onClose={() => setOpenInviteModal(false)} />
      <InviteUsersBulkModal open={openInviteBulkModal} onClose={() => setOpenInviteBulkModal(false)} />
    </Page>
  );
}
