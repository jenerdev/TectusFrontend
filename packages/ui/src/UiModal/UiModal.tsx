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
import { UiTypography } from '../UiTypography';

interface ActionButton {
  label: string;
  action: string;
  variant?: UIButtonProps['variant'];
  closeOnClick?: boolean;
  color?: UIButtonProps['color'];
  fontWeight?: UIButtonProps['fontWeight'];
  disabled?: boolean;
}

export interface UiModalProps {
  open?: boolean;
  handleClose?: ModalProps['onClose'];
  title?: ModalProps['title'];
  subTitle?: string;
  children?: ReactNode;
  actionButtons?: ActionButton[];
  handleActionButton?: (action: string) => void;
  className?: string;
}

export function UiModal({
  open = false,
  title,
  subTitle,
  children,
  handleClose,
  actionButtons = [],
  handleActionButton,
  className
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
      className={`ui-modal ${className}`}
    >
      {title && <DialogTitle className="ui-modal__title">{title}</DialogTitle>}
      {subTitle && <UiTypography className="ui-modal__subtitle">{subTitle}</UiTypography>}

      <DialogContent className="ui-modal__content">{children}</DialogContent>

      {actionButtons.length > 0 && (
        <DialogActions className="ui-modal__actions">
          {actionButtons.map((button, index) => (
            <UiButton
              defaultMinWidth
              key={index}
              variant={button.variant || 'contained'}
              color={button.color || 'primary'}
              fontWeight={button.fontWeight}
              disabled={button.disabled}
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
