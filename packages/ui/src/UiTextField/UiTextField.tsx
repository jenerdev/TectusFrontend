import * as React from 'react';
import MuiTextField, { TextFieldProps } from '@mui/material/TextField';
import { styled } from '@mui/material/styles';

// export interface TextFieldProps extends Omit<MuiTextFieldProps, 'name'> {
//   // Register function result from useForm
//   register?: ReturnType<any>; // generic fallback if you don't want to import your hook type
//   errorMessage?: string; // helper text from your form hook's errors
// }

export interface UiTextFieldProps {
  id?: TextFieldProps['id']; 
  name?: TextFieldProps['name']; 
  label?: TextFieldProps['label']; 
  placeholder?: TextFieldProps['placeholder']; 
  helperText?: TextFieldProps['helperText']; 
  type?: TextFieldProps['type'];
  error?: TextFieldProps['error']; 
  variant?: TextFieldProps['variant'];
  fullWidth?: TextFieldProps['fullWidth'];
  size?: TextFieldProps['size'];
  // Register function result from useForm
  register?: ReturnType<any>; // generic fallback if you don't want to import your hook type
}

export const UiTextField: React.FC<UiTextFieldProps> = ({
  register,
  ...props
}) => {
  const propsWithDefaults = {
    ...props,
    fullWidth: props.fullWidth || true,
    size: props.size || 'small',
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
