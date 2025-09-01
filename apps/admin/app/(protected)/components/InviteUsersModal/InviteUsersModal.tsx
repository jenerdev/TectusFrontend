'use client';

import { useBEM, useForm } from '@tectus/hooks';
import './InviteUsersModal.scss';
import { UiButton, UiModal, UiModalProps, UiSelect, UiTextField, UiTypography, useUiSnackbar } from '@tectus/ui';
import { useEffect, useState } from 'react';
import { useApi } from '@/app/hooks';

export interface InviteFormValues {
  email: string;
  role: string;
}

export interface InviteUsersModalProps {
  open: boolean;
  onClose?: UiModalProps['handleClose'];
  refetchUsers?: () => void;
  switchToBulk?: () => void;
}



export function InviteUsersModal({ open, onClose, refetchUsers, switchToBulk }: InviteUsersModalProps) {
  const { B, E } = useBEM('invite-users-modal');
  const { showSnackbar } = useUiSnackbar();

  const { loading, sendRequest } = useApi<
    any,
    InviteFormValues
  >(`api/go/personnel/invite-employee`, {
    method: 'POST',
  });

  const {
    register,
    handleSubmit,
    validate: { required, email },
    errors,
    values,
    reset,
    isValid
  } = useForm<InviteFormValues>({
    email: '',
    role: '',
  });

  useEffect(() => {
    if(!open) {
      reset();
    }
  }, [open])

  const handleActionButton = async (action: string) => {
    if(action !== 'send_invite') return;

    const emails = values.email.split('\n').map(e => e.trim()).filter(e => e);
    const hasDuplicates = new Set(emails).size !== emails.length;
    if(hasDuplicates){
      showSnackbar("Duplicate email addresses found.", 'warning');
      return;
    }

    const calls = emails.map(email => {
      return sendRequest({ body: { email, role: values.role } });
    });
    const results = await Promise.all(calls);

    const mapResults = results.map((res, ndx) =>  ({
      email: emails[ndx],
      code: res.error?.code,
      message: res.error?.message
    }));

    mapResults.forEach(res => {
      if(Boolean(res.code)){
        const reason = res.code === 'USER_ALREADY_EXISTS' ? res.message : 'Failed to send invitation to:';
        const message = `${reason}: ${res.email}`;
        showSnackbar(message, 'error');
      } else {
        showSnackbar(`Invitation sent successfully to: ${res.email}`, 'success');
      }
    });

    if(refetchUsers) refetchUsers();

    if(onClose) onClose({}, 'escapeKeyDown');
  }

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
          closeOnClick: false,
          fontWeight: 400,
          disabled: !isValid,
          loading: loading,
        },
      ]}
      handleClose={onClose}
      handleActionButton={handleActionButton}
    >
      <form className={E('form')}>
        <div className={E('field-email-wrapper')}>
          <UiTextField
            label="Email*"
            placeholder="Enter email address"
            fullWidth
            multiline
            rows={4}
            className={E('field')}
            {...register('email', {
              ...required('Email is required.'),
              ...email('Invalid email address.', '\n'),
            })}
            helperText={Boolean(errors.email) ? errors.email : 'One email address per line'}
            error={Boolean(errors.email)}
          />

          <UiButton variant="text" fontWeight={400} className={E('upload-btn')} onClick={switchToBulk} >
            <span>or</span>
            Upload CSV
          </UiButton>
        </div>

        <UiSelect
          className={E('field')}
          label="Role*"
          fullWidth
          options={[
            { label: 'Personnel', value: 'personnel' },
            { label: 'Admin', value: 'admin' },
            { label: 'Owner', value: 'owner' },
          ]}
          register={register('role', {
            ...required('Role is required.'),
          })}
          helperText={
            Boolean(errors.role) ? errors.role : 'Specify the role to assign to these users'
          }
          error={Boolean(errors.role)}
        />
      </form>
    </UiModal>
  );
}
