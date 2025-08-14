'use client';

import * as React from 'react';
import MuiTextField, { TextFieldProps } from '@mui/material/TextField';
import { InputAdornment } from '@mui/material';
import UiIcon from '../UiIcon/UiIcon';
import { useBEM } from '@tectus/hooks';
import './UiTextField.scss';

export interface UiTextFieldProps {
  id?: string;
  name?: string;
  label?: string;
  className?: string;
  placeholder?: string;
  helperText?: string;
  type?: TextFieldProps['type'];
  error?: boolean;
  variant?: TextFieldProps['variant'];
  fullWidth?: boolean;
  size?: TextFieldProps['size'];
  value?: TextFieldProps['value'];
  readOnly?: boolean;
  disabled?: boolean;
  maxRows?: number;
  rows?: number;
  multiline?: boolean; 
  register?: ReturnType<any>;  
  onChange?: TextFieldProps['onChange'];
  disablePastDates?: boolean
}

export const UiTextField: React.FC<UiTextFieldProps> = ({ ...props }) => {
  const {
    id,
    name,
    label,
    className,
    placeholder,
    helperText,
    type = 'text',
    error,
    variant = 'filled',
    fullWidth = true,
    size = 'medium',
    value,
    readOnly,
    disabled,
    maxRows,
    rows,
    multiline,
    register,
    onChange,
    disablePastDates,
  } = props;

  const { B, E } = useBEM('ui-text-field', className);



  const isDateField = type === 'date';

  return (
    <MuiTextField
      id={id}
      name={name}
      label={label}
      placeholder={placeholder}
      helperText={helperText}
      type={type}
      error={error}
      variant={variant}
      fullWidth={fullWidth}
      size={size}
      value={value}
      readOnly={readOnly}
      disabled={disabled}
      maxRows={maxRows}
      rows={rows}
      multiline={multiline}
      onChange={onChange}

      {...(register || {})}
      className={B()}
      slotProps={{
        ...(isDateField
          ? {
              inputLabel: { shrink: true },
            }
          : {}),
        input: {
          readOnly: readOnly,
          endAdornment: error ? (
            <InputAdornment position="end">
              <UiIcon name="Error" className={E('error-icon')} />
            </InputAdornment>
          ) : null,

          ...( disablePastDates && isDateField ? {
            inputProps: { 
              min: new Date().toISOString().split('T')[0] 
            },
          } : {})
          
        },
      }}
    />
  );
};

export default UiTextField;
