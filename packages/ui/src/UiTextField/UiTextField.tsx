"use client";

import * as React from 'react';
import MuiTextField, { TextFieldProps } from '@mui/material/TextField';
import { useTheme } from '@mui/material/styles';

export interface UiTextFieldProps {
  id?: string; 
  name?: string; 
  label?: string; 
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
  // Register function result from useForm
  register?: ReturnType<any>; // generic fallback if you don't want to import your hook type
}

export const UiTextField: React.FC<UiTextFieldProps> = ({
  register,
  ...props
}) => {
  const theme = useTheme(); 

  const propsWithDefaults = {
    ...props,
    fullWidth: props.fullWidth || true,
    size: 'medium',
    type: props.type || 'text',
  };
  return (
    <MuiTextField
      {...(register || {})}
      {...propsWithDefaults}
    />
  );
};

export default UiTextField;
