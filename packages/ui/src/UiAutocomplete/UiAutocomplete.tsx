'use client';

import * as React from 'react';
import './UiAutocomplete.scss';
import { Autocomplete, AutocompleteProps, TextField } from '@mui/material';
import { useBEM } from '@tectus/hooks';

export interface UiAutocompleteOption {
  label: string;
  value: string | number;
}

export interface UiAutocompleteProps {
  id?: string;
  label?: string;
  placeholder?: string;
  value?: UiAutocompleteOption | UiAutocompleteOption[] | null;
  className?: string;
  size?: 'small' | 'medium';
  fullWidth?: boolean;
  multiple?: boolean;
  helperText?: string; // default helper text
  error?: boolean; // boolean flag from useForm
  disabled?: boolean;
  options?: UiAutocompleteOption[];

  // from useForm
  register?: ReturnType<any> & { error?: string }; // <-- allow error message
  onChange?: (value: any) => void;
}

export const UiAutocomplete: React.FC<UiAutocompleteProps> = ({
  register,
  helperText,
  error,
  onChange,
  ...props
}) => {
  const { B } = useBEM('ui-autocomplete');
  const size = props.size || 'medium';

  const fieldValue =
    register?.value ??
    props.value ??
    (props.multiple ? [] : null);

  // Prefer register.error message > prop.helperText
  const finalHelperText = register?.error || helperText;
  const isError = !!register?.error || error;

  return (
    <Autocomplete
      id={props.id}
      multiple={props.multiple}
      size={size}
      options={props.options || []}
      value={fieldValue}
      onChange={(_, newValue) => {
        if (register?.onChange) {
          register.onChange({
            target: { name: register.name, value: newValue }
          });
        }
        onChange?.(newValue);
      }}
      onBlur={register?.onBlur}
      getOptionLabel={(option) => option?.label || ''}
      fullWidth={props.fullWidth}
      disabled={props.disabled}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          label={props.label}
          placeholder={props.placeholder}
          size={size}
          error={isError}
          fullWidth={props.fullWidth}
          helperText={finalHelperText}
        />
      )}
    />
  );
};

export default UiAutocomplete;

