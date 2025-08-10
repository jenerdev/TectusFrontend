"use client"

import './UiButton.scss';
import { Button, ButtonProps, useMediaQuery, useTheme } from '@mui/material';

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
  
  return (
     <Button {...propsWithDefaults} sx={{ mt: props.topspacing }}>
      {propsWithDefaults.children}
     </Button>
  );
}
