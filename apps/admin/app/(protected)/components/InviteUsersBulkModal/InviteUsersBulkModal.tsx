'use client';

import { useBEM } from '@tectus/hooks';
import './InviteUsersBulkModal.scss';
import { AppLink, FileAttachment, UiButton, UiFileUpload, UiModal, UiModalProps, UiSelect, UiTextField, UiTypography, useUiSnackbar } from '@tectus/ui';
import { useEffect, useState } from 'react';
import { useApi } from '@/app/hooks';

export interface InviteUsersBulkModalProps {
  open: boolean;
  onClose?: UiModalProps['handleClose'];
  refetchUsers?: () => void;
}

export function InviteUsersBulkModal({ open, onClose, refetchUsers }: InviteUsersBulkModalProps) {
  const { B, E } = useBEM('invite-users-bulk-modal');
  const { showSnackbar } = useUiSnackbar();
  const [csv, setCsv] = useState<FileAttachment>();

  // TODO: create a model and hook for this on /api
  const { loading, sendRequest } = useApi(`api/go/personnel/bulk-upload?dryRun=false&sendInvite=true`, {
    method: 'POST',
  });


  const handleActionButton = async () => {
    if(!csv)return;
    const formData = new FormData();
    formData.append('file', csv?.file);

    const result = await sendRequest({
      body: formData,
    });
    const {
      total = 0,
      inviteEmailsSent = 0,
      skipped = 0,
    } = result.data || {};

    const message = `📊 ${total} total processed — ✅ ${inviteEmailsSent} invite sent, ⚠️ ${skipped} skipped (some emails already exist)`;
    showSnackbar(message, 'info');
    if(refetchUsers) refetchUsers();
    if(onClose) onClose({}, 'escapeKeyDown');
  }

  useEffect(() => {
    if(!open) {
      setCsv(undefined);
    }
  }, [open])

  return (
    <UiModal
      className={B()}
      open={open}
      title="Invite Users"
      subTitle="Invite users under your company with pre-filled profile data."
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
          label: 'Upload CSV',
          action: 'upload_csv',
          variant: 'text',
          closeOnClick: false,
          fontWeight: 400,
          disabled: !csv,
          loading: loading,
        },
      ]}
      handleClose={onClose}
      handleActionButton={handleActionButton}
    >
      <ul className={E('instruction')}>
        <li>
          <AppLink href='/sample-bulk-upload-personnel.csv' target='_blank' download className={E('download-template')} >
            Download the CSV template
          </AppLink>
        </li>
        <li>
          <UiTypography variant='body1'>Fill out the template with your user data</UiTypography>
        </li>
        <li>
          <UiTypography variant='body1'>Upload the CSV file</UiTypography>
        </li>
      </ul>

      <UiFileUpload
        validTypes={['.csv']}
        onInvalidFile={() =>
          showSnackbar('Invalid file type. Please upload a CSV file.', 'error')
        }
        files={[csv].filter(Boolean) as FileAttachment[]}
        onFileUpload={(file: File) => setCsv({file})}
        onFileRemove={() => setCsv(undefined)}
        button={
          <UiButton size="small" className={E('upload-button')}>
            Select CSV data file
          </UiButton>
        }
        maxFiles={1}
      />
    </UiModal>
  );
}
