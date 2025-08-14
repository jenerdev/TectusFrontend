'use client';

import * as React from 'react';
import './UiSelect.scss';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectProps,
  MenuItemProps,
  FormHelperText,
  Checkbox,
  ListItemText,
  InputAdornment,
  FilledInput,
} from '@mui/material';
import { useBEM } from '@tectus/hooks';
import UiIcon from '../UiIcon/UiIcon';

export interface UiSelectProps {
  id?: string;
  label?: string;
  value?: SelectProps['value'];
  className?: string;
  size?: SelectProps['size'];
  fullWidth?: boolean;
  helperText?: string;
  error?: boolean;
  disabled?: boolean;
  multiple?: SelectProps['multiple'];
  options?: Array<MenuItemProps & { label: string }>;
  register?: ReturnType<any>; // props from useForm's register
  onSelect?: SelectProps['onSelect'];
  showCheckboxOption?: boolean;
  variant?: SelectProps['variant'];
}

export const UiSelect: React.FC<UiSelectProps> = ({
  id,
  label,
  value,
  className,
  size = 'medium',
  fullWidth,
  helperText,
  error,
  disabled,
  multiple,
  options,
  register,
  onSelect,
  showCheckboxOption = false,
  variant = 'filled',
}) => {
  const { B, E } = useBEM('ui-select');

  const finalValue = register?.value ?? value ?? '';

  return (
    <FormControl fullWidth={fullWidth} className={B(size)} error={error} variant={variant}>
      {label && <InputLabel id={`${id}-label`}>{label}</InputLabel>}

      <Select
        labelId={`${id}-label`}
        id={id}
        name={register?.name}
        value={finalValue}
        onChange={register?.onChange}
        onBlur={register?.onBlur}
        label={label}
        className={className}
        size={size}
        error={error}
        disabled={disabled}
        onSelect={onSelect}
        multiple={multiple}
        renderValue={(selected) => {
          if (Array.isArray(selected)) return selected.join(', ');
          return selected;
        }}
        input={
          <FilledInput
            endAdornment={
              error ? (
                <InputAdornment position="end">
                  <UiIcon name="Error" className={E('error-icon')}/>
                </InputAdornment>
              ) : null
            }
          />
        }
      >
        {options?.map((option) => (
          <MenuItem key={option.value as string} value={option.value}>
            {multiple && showCheckboxOption && (
              <Checkbox checked={finalValue.includes(option.value)} />
            )}
            <ListItemText primary={option.label} />
          </MenuItem>
        ))}
      </Select>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default UiSelect;
