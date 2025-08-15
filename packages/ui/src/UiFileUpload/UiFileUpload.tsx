'use client';

import './UiFileUpload.scss';
import React, { useRef } from 'react';
import { UiTextField } from '../UiTextField';
import { UiIconButton } from '../UiIconButton';
import { useBEM } from '@tectus/hooks';
import { FileUploaderProps } from './UiFileUpload.types';

export function UiFileUpload({
  files,
  onFileUpload,
  onFileRemove,
  onExpiryChange,
  button,
  maxFiles = 3,
	accept,
  isSubmitted,
  disabled
}: FileUploaderProps) {
  const { B, E } = useBEM('ui-file-upload');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const reachedMaxFiles = files.length >= maxFiles;

  const handleButtonClick = () => {
    if (reachedMaxFiles || disabled) return;
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      onFileUpload(selectedFile);
    }
    // Reset so the same file can be uploaded again
    event.target.value = '';
  };

  return (
    <div className={B()}>
      {
        (files.length === 0 || maxFiles > 1) && (
          <div onClick={handleButtonClick} className={E('upload-button')}>
            {button}
          </div>
        )
      }

      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
				accept={Array.isArray(accept) ? accept.join(',') : accept}
      />

      {files.length > 0 && maxFiles > 1 &&
        files.map((item, index) => (
          <div key={index} className={E('file')}>
            <UiTextField
              label="File"
              placeholder="File"
              value={item.file.name}
              readOnly
            />
            <UiTextField
              label="Expiry*"
              placeholder="Expiry*"
              type="date"
              value={item.expiry}
              onChange={(e) => onExpiryChange(index, e.target.value)}
              disablePastDates
              error={isSubmitted && !item.expiry}
            />
            <UiIconButton
              icon="Delete"
              className={E('file-remove')}
              onClick={() => onFileRemove(index)}
            />
          </div>
        ))}

				{
					files && maxFiles === 1 && files.length === 1 && (
						<div className={E('single-file')}>
							{files[0]?.file.name}

							<UiIconButton icon='Clear' size='small' onClick={() => onFileRemove(0)} className={E('single-file-remove')}/>
						</div>
					)
				}
    </div>
  );
}
