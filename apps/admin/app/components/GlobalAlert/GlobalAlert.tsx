// packages/ui/Alert.tsx
'use client';

import { useEffect, useMemo } from 'react';
import { useAlertStore } from '@/store';
import { Alert, Icons } from '@tectus/ui';
import './GlobalAlert.scss';
import { useBEM } from '@tectus/hooks';

export const GlobalAlert = () => {
	const { B } = useBEM('global-alert');
  const { visible, message, type, autoDismiss, dismissAfter, hideAlert } = useAlertStore();

  const icon = useMemo((): (typeof Icons)[number] => {
    switch (type) {
      case 'success':
        return 'tsCheckCircle';
      case 'danger':
        return 'tsErrorOutlined';
      case 'warning':
        return 'tsWarning';
      default:
        return 'tsInfoOutlined';
    }
  }, [type]);

  useEffect(() => {
    if (visible && autoDismiss) {
      const timer = setTimeout(() => hideAlert(), dismissAfter);
      return () => clearTimeout(timer);
    }
  }, [visible, hideAlert]);



  return (
    <div className={B( !visible ? 'hidden' : '' )}>
      <Alert message={message} type={type} icon={icon} onClose={hideAlert} showCloseButton={!autoDismiss}/>
    </div>
  );
};
