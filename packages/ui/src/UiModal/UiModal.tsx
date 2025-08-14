'use client';

import './UiModal.scss';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  ModalProps,
  Slide,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import React, { forwardRef, memo, ReactNode } from 'react';
import { UiButton, UIButtonProps } from '../UiButton';

interface ActionButton {
  label: string;
  action: string;
  variant?: UIButtonProps['variant'];
  closeOnClick?: boolean;
}

export interface UiModalProps {
  open?: boolean;
  handleClose?: ModalProps['onClose'];
  title?: string | ReactNode;
  children?: ReactNode;
  actionButtons?: ActionButton[];
  handleActionButton?: (action: string) => void;
}

export function UiModal({
  open = false,
  title,
  children,
  handleClose,
  actionButtons = [],
  handleActionButton,
}: UiModalProps) {
  const onActionClick = (btn: ActionButton) => {
    handleActionButton?.(btn.action);
    if (btn.closeOnClick) {
      handleClose?.({}, 'backdropClick');
    }
  };

  return (
    <Dialog
      open={open}
      keepMounted
      onClose={handleClose}
      className="ui-modal"
    >
      {title && <DialogTitle className="ui-modal__title">{title}</DialogTitle>}

      <DialogContent className="ui-modal__content">{children}</DialogContent>

      {actionButtons.length > 0 && (
        <DialogActions className="ui-modal__actions">
          {actionButtons.map((button, index) => (
            <UiButton
              key={index}
              variant={button.variant || 'contained'}
              onClick={() => {
                

                onActionClick(button);
              }}
            >
              {button.label}
            </UiButton>
          ))}
        </DialogActions>
      )}
    </Dialog>
  );
}
