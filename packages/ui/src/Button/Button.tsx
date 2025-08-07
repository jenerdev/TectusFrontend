import { useBEM } from '@tectus/hooks';
import './Button.scss';
import { useMemo } from 'react';
import { Icon } from '../Icon';

export interface ButtonProps {
  children: React.ReactNode;
  variant?: 'text' | 'outlined' | 'contained';
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  loading?: boolean;
}

export function Button({
  children,
  variant = 'contained',
  className,
  type = 'button',
  onClick,
  disabled = false,
  loading = false,
}: ButtonProps) {
  const { B, E } = useBEM('button', className);

  const modifiers = useMemo(() => {
    return [
      variant, 
      ...(disabled ? ['disabled'] : []), 
      ...(loading ? ['loading'] : [])
    ];
  }, [variant, disabled, loading]);

  return (
    <button className={B(modifiers)} onClick={onClick} type={type} disabled={disabled}>
      {loading && (
        <div className={E('loading')}>
          <Icon name="tsSpinnerFill" size="m" />
        </div>
      )}

      <div className={E('content', modifiers)}>
        {children}
      </div>
    </button>
  );
}
