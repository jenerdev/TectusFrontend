"use client"

import './UiButton.scss';
import { Button, ButtonProps } from '@mui/material';
import { UiIconProps } from '../UiIcon';
import UiIcon from '../UiIcon/UiIcon';
import { useBEM } from '@tectus/hooks';


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
  startIcon?: UiIconProps['name'];
  defaultMinWidth?: boolean;
  color?: ButtonProps['color'];
  fontWeight?: number;
}

export function UiButton({
  variant = 'contained',
  size = 'large',
  children,
  className,
  onClick,
  type = 'button',
  disabled,
  loading,
  fullWidth,
  topspacing = 0,
  startIcon,
  defaultMinWidth,
  color,
  fontWeight
}: UIButtonProps) {

  const { B } = useBEM('ui-button', className);

  const getStartIcon = (name?: UiIconProps['name']) => {
    if (!name) return null;
    return <UiIcon name={name} />;
  }

  return (
     <Button  
        variant={variant}
        size={size}
        className={B( defaultMinWidth ? 'default-min-width' : '')}
        onClick={onClick}
        type={type}
        disabled={disabled}
        loading={loading}
        fullWidth={fullWidth}
        sx={{ mt: topspacing}} 
        startIcon={getStartIcon(startIcon)}
        color={color}
        style={{ fontWeight } }
    >
      {children}
     </Button>
  );
}
