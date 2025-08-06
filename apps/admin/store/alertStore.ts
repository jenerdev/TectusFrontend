import { AlertProps } from '@tectus/ui';
import { create } from 'zustand';

export interface AlertState {
  visible: boolean;
  message: string;
  type: AlertProps['type'];
  autoDismiss?: boolean;
  dismissAfter?: number; // in milliseconds
  showAlert: (
    message: string,
    type?: AlertProps['type'],
    autoDismiss?: boolean,
    dismissAfter?: number,
  ) => void;
  hideAlert: () => void;
}

export const useAlertStore = create<AlertState>((set) => ({
  visible: false,
  message: '',
  type: 'info',
  autoDismiss: false,
  dismissAfter: 5000,

  showAlert: (message, type = 'info', autoDismiss = false, dismissAfter = 5000) =>
    set({ visible: true, message, type, autoDismiss, dismissAfter }),

  hideAlert: () => set({ visible: false }),
}));
