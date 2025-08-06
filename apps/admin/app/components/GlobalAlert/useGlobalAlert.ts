// packages/hooks/useAlert.ts

import { useAlertStore } from '@/store';

export const useGlobalAlert = () => {
  const { showAlert, hideAlert } = useAlertStore();
  return { showAlert, hideAlert };
};
