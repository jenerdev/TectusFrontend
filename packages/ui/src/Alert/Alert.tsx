import { useBEM } from '@tectus/hooks';
import './Alert.scss';
import { useMemo } from 'react';
import { Icon, Icons } from '../Icon';

export interface AlertProps {
  icon?: (typeof Icons)[number];
  message: string;
  type?: 'success' | 'danger' | 'info' | 'warning';
  variant?: 'filled' | 'outlined';
  onClose?: () => void;
  title?: string;
  showCloseButton?: boolean;
}

export function Alert({
  icon,
  message,
  type = 'info',
  variant,
  onClose,
  title,
  showCloseButton = true,
}: AlertProps) {
  const { B, E } = useBEM('alert');

  return (
    <div className={B([type, variant || ''])}>
      {icon && <Icon name={icon} className={E('icon')} />}

      <div className={E('text')}>
        {title && <strong className={E('title')}>{title}</strong>}
        <p className={E('message')}>{message}</p>
      </div>

      {showCloseButton && (
        <button className={E('close-button')} onClick={onClose}>
          <Icon name="tsCloseBasic" size="m" />
        </button>
      )}
    </div>
  );
}
