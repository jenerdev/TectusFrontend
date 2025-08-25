'use client';

import { useBEM } from '@tectus/hooks';
import './InviteUsersModal.scss';
import { UiButton, UiModal, UiModalProps, UiSelect, UiTextField, UiTypography } from '@tectus/ui';
import { useState } from 'react';

export interface InviteUsersModalProps {
  open: boolean;
  onClose?: UiModalProps['handleClose'];
}

export function InviteUsersModal({ open, onClose }: InviteUsersModalProps) {
  const { B, E } = useBEM('invite-users-modal');

  return (
    <UiModal
      className={B()}
      open={open}
      title="Invite Users"
      subTitle="Enter the email addresses of users you want to invite under your company."
      actionButtons={[
        {
          label: 'Cancel',
          action: 'cancel',
          variant: 'text',
          closeOnClick: true,
          color: 'inherit',
          fontWeight: 400,
        },
        {
          label: 'Send Invite',
          action: 'send_invite',
          variant: 'text',
          closeOnClick: true,
          fontWeight: 400,
        },
      ]}
      handleClose={onClose}
    >
      <form className={E('form')}>
        <div className={E('field-email-wrapper')}>
          <UiTextField
            label="Email*"
            placeholder="Enter email address"
            fullWidth
            multiline
            rows={4}
            helperText="One email address per line"
            className={E('field')}
          />

          <UiButton variant="text" fontWeight={400} className={E('upload-btn')}>
            <span>or</span>
            Upload CSV
          </UiButton>
        </div>

        <UiSelect
          className={E('field')}
          label="Role*"
          fullWidth
          options={[
            { label: 'Personnel', value: 'user' },
            { label: 'Admin', value: 'admin' },
            { label: 'Owner', value: 'owner' },
          ]}
          helperText="Specify the role to assign to these users"
        />
      </form>
    </UiModal>
  );
}
