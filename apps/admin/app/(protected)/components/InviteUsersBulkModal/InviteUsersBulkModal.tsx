'use client';

import { useBEM } from '@tectus/hooks';
import './InviteUsersBulkModal.scss';
import { AppLink, FileAttachment, UiButton, UiFileUpload, UiModal, UiModalProps, UiSelect, UiTextField, UiTypography, useUiSnackbar } from '@tectus/ui';
import { useState } from 'react';

export interface InviteUsersBulkModalProps {
  open: boolean;
  onClose?: UiModalProps['handleClose'];
}

export function InviteUsersBulkModal({ open, onClose }: InviteUsersBulkModalProps) {
  const { B, E } = useBEM('invite-users-bulk-modal');
  const { showSnackbar } = useUiSnackbar();
  const [csv, setCsv] = useState<FileAttachment>();

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
          closeOnClick: true,
          fontWeight: 400,
          disabled: !csv,
        },
      ]}
      handleClose={onClose}
    >
      <ul className={E('instruction')}>
        <li>
          <AppLink href='#' target='_blank' className={E('download-template')} >
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
