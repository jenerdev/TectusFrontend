"use client"

import './UiButton.scss';
import { Button, ButtonProps } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { JSX } from 'react';
import { UiIconProps } from '../UiIcon';
import UiIcon from '../UiIcon/UiIcon';


export interface UIButtonProps {
  variant?: ButtonProps['variant'];
  size?: ButtonProps['size'];
  children: ButtonProps['children'];
  className?: string;
  onClick?: ButtonProps['onClick'];
  type?: ButtonProps['type'];
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  topspacing?: number;

  // startIcon?: ButtonProps['startIcon'];
  // temporary
  startIcon?: UiIconProps['name'];
}

export function UiButton(props: UIButtonProps) {

  const propsWithDefaults = {
    ...props,
    variant: props.variant || 'contained',
    type: props.type || 'button',
    size: props.size || 'large',
  }

  // TEMP
  const getStartIcon = (name?: UiIconProps['name']) => {
    if (!name) return null;

    return <UiIcon name={name} />;
  }

  return (
     <Button {...propsWithDefaults} sx={{ mt: props.topspacing }} startIcon={getStartIcon(props.startIcon)}>
      {propsWithDefaults.children}
     </Button>
  );
}
