"use client"

import './UiButton.scss';
import { Button, ButtonProps, useMediaQuery, useTheme } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { JSX } from 'react';


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
  startIcon?: string;
}

export function UiButton(props: UIButtonProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const propsWithDefaults = {
    ...props,
    variant: props.variant || 'contained',
    type: props.type || 'button',
    size: props.size || (isMobile ? "large" : "small"),
  }

  // TEMP
  const getStartIcon = (name?: string) => {
    if (!name) return null;

    const icons: Record<string, JSX.Element> = {
      'upload': <CloudUploadIcon />,
    }

    return icons[name];
  }

  return (
     <Button {...propsWithDefaults} sx={{ mt: props.topspacing }} startIcon={getStartIcon(props.startIcon)}>
      {propsWithDefaults.children}
     </Button>
  );
}
