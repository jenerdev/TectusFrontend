import { useBEM } from '@tectus/hooks';
import './InputWrapper.scss';

export interface InputWrapperProps {
  children: React.ReactNode; 
  className?: string;
  helperText?: string;
  isError?: boolean;
}

export function InputWrapper({
  children,
  className,
  helperText,
  isError = false,
}: InputWrapperProps) {
  const { B, E } = useBEM('input-wrapper', className);
  return (
    <div className={B()}>
      {children}
      {helperText && <span className={E('helper-text', isError ? ['error'] : [])}>{helperText}</span>}
    </div>
  );
}
