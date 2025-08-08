'use client';

import { useEffect,  } from 'react';
import { useAlertStore } from '@/store';
import { UiAlert } from '@tectus/ui';
import './GlobalAlert.scss';
import { useBEM } from '@tectus/hooks';

export const GlobalAlert = () => {
	const { B } = useBEM('global-alert');
  const { visible, message, severity, autoDismiss, dismissAfter, hideAlert } = useAlertStore();

  useEffect(() => {
    if (visible && autoDismiss) {
      const timer = setTimeout(() => hideAlert(), dismissAfter);
      return () => clearTimeout(timer);
    }
  }, [visible, hideAlert]);



  return (
    <div className={B( !visible ? 'hidden' : '' )}>
      <UiAlert severity={severity}>
        {message}
      </UiAlert>
    </div>
  );
};
