'use client';

import * as React from 'react';
import './UiAutocomplete.scss';
import { useTheme } from '@mui/material/styles';
import { Autocomplete, TextField, useMediaQuery, AutocompleteProps } from '@mui/material';
import { useBEM } from '@tectus/hooks';

export interface UiAutocompleteOption {
  label: string;
  value: string | number;
}

export interface UiAutocompleteProps {
  id?: string;
  label?: string;
  value?: UiAutocompleteOption | null;
  className?: string;
  size?: 'small' | 'medium';
  fullWidth?: boolean;
  multiple?: boolean;
  options?: UiAutocompleteOption[];
  placeholder?: string;
  onChange?: (event: React.SyntheticEvent, value: UiAutocompleteOption | null) => void;
  // from react-hook-form register
  register?: ReturnType<any>;
  disabled?: boolean;
}

export const UiAutocomplete: React.FC<UiAutocompleteProps> = ({ register, ...props }) => {
  const { B } = useBEM('ui-autocomplete');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const size = props.size || (isMobile ? 'medium' : 'small');

  return (
    // <Autocomplete
    //   id={props.id}
    //   options={props.options || []}
    //   value={props.value || null}
    //   onChange={props.onChange}
    //   getOptionLabel={(option) => option.label || ''}
    //   fullWidth={props.fullWidth}
    //   disablePortal
    //   disabled={props.disabled}
    //   className={`${B(size)} ${props.className || ''}`}
    //   {...(register || {})}
    //   renderInput={(params) => (
    //     <TextField
    //       {...params}
    //       label={props.label}
    //       placeholder={props.placeholder}
    //       size={size}
    //     />
    //   )}
    // />
    <Autocomplete 
      id={props.id}
      size={size}
      options={props.options || []}
      getOptionLabel={(option) => option.label || ''}
      fullWidth={props.fullWidth}
      multiple={props.multiple}
      renderInput={(params) => (
        <TextField {...params} variant="outlined" label={props.label} placeholder={props.placeholder} />
      )}
    />
  );
};

export default UiAutocomplete;
