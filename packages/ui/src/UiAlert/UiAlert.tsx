import { useBEM } from '@tectus/hooks';
import './UiAlert.scss';
import { Alert, AlertProps } from '@mui/material';

export interface UiAlertProps {
  severity: AlertProps['severity'];
  children?: AlertProps['children'];
  variant?: AlertProps['variant'];
}

export function UiAlert(props: UiAlertProps) {
  const { B, E } = useBEM('alert');

  const defaultProps = {
    ...props,
    serverity: props.severity || 'info',
    variant: props.variant || 'filled',
  }

  return (

    <Alert {...defaultProps} >
      {props.children}
    </Alert>
  );
}
