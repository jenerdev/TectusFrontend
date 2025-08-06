import { useBEM } from '@tectus/hooks';
import './Button.scss';
import { useMemo } from 'react';

export interface ButtonProps {
  children: React.ReactNode;
  variant?: 'text' | 'outlined' | 'contained';
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export function Button({
  children,
  variant = 'contained',
  className,
  type = 'button',
  onClick,
  disabled = false,
}: ButtonProps) {
  const { B } = useBEM('button', className);

  const modifiers = useMemo(() => {
    return [
      variant,
      ...(disabled ? ['disabled']: [])
    ];
  }, [variant, disabled])

  return (
    <button className={B(modifiers)} onClick={onClick} type={type} disabled={disabled}>
      {children}
    </button>
  );
}
