"use client";

import * as React from 'react';
import MuiTextField, { TextFieldProps } from '@mui/material/TextField';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';

// export interface TextFieldProps extends Omit<MuiTextFieldProps, 'name'> {
//   // Register function result from useForm
//   register?: ReturnType<any>; // generic fallback if you don't want to import your hook type
//   errorMessage?: string; // helper text from your form hook's errors
// }

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
  readonly?: boolean;
  disabled?: boolean;
  // Register function result from useForm
  register?: ReturnType<any>; // generic fallback if you don't want to import your hook type
}

export const UiTextField: React.FC<UiTextFieldProps> = ({
  register,
  ...props
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const propsWithDefaults = {
    ...props,
    fullWidth: props.fullWidth || true,
    size: props.size || (isMobile ? "large" : "small"),
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
