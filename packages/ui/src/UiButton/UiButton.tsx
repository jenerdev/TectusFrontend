import './UiButton.scss';
import { Button, ButtonProps } from '@mui/material';

export interface UIButtonProps {
  variant?: ButtonProps['variant'];
  size?: ButtonProps['size'];
  children: ButtonProps['children'];
  className?: ButtonProps['className'];
  onClick?: ButtonProps['onClick'];
  type?: ButtonProps['type'];
  disabled?: ButtonProps['disabled'];
  loading?: ButtonProps['loading'];
  fullWidth?: ButtonProps['fullWidth'];

  topSpacing?: number;
}

export function UiButton(props: UIButtonProps) {
  const propsWithDefaults = {
    ...props,
    variant: props.variant || 'contained',
    type: props.type || 'button',
    size: props.size || 'medium',
  }

  return (
     <Button {...propsWithDefaults} sx={{ mt: props.topSpacing }}>
      {propsWithDefaults.children}
     </Button>
  );
}
