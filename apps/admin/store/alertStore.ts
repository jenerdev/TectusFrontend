import { UiAlertProps } from '@tectus/ui';
import { create } from 'zustand';

export interface AlertState {
  severity: UiAlertProps['severity'];
  visible: boolean;
  message: string;
  autoDismiss?: boolean;
  dismissAfter?: number; // in milliseconds
  showAlert: (
    message: string,
    serverity?: UiAlertProps['severity'],
    autoDismiss?: boolean,
    dismissAfter?: number,
  ) => void;
  hideAlert: () => void;
}

export const useAlertStore = create<AlertState>((set) => ({
  severity: 'info',
  visible: false,
  message: '',
  autoDismiss: false,
  dismissAfter: 5000,

  showAlert: (message, severity = 'info', autoDismiss = false, dismissAfter = 5000) =>
    set({ visible: true, message, severity, autoDismiss, dismissAfter }),

  hideAlert: () => set({ visible: false }),
}));
