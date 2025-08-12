'use client';

import * as React from 'react'; 
import './UiSelect.scss';
import { useTheme } from '@mui/material/styles';
import { FormControl, InputLabel, MenuItem, Select, SelectProps, MenuItemProps } from '@mui/material';
import { useBEM } from '@tectus/hooks';

export interface UiSelectProps {
  id?: string;
  label?: string;
  value?: SelectProps['value'];
  className?: string;
  size?: SelectProps['size'];
  fullWidth?: boolean;
  options?: Array<MenuItemProps & { label: string }>;
  // Register function result from useForm
  register?: ReturnType<any>; // generic fallback if you don't want to import your hook type
}

export const UiSelect: React.FC<UiSelectProps> = ({ register, ...props }) => {
  const { B } = useBEM('ui-select');
  const size = 'medium'; 

  return (
    <FormControl fullWidth={props.fullWidth} className={B(size)}>
      {props.label && <InputLabel id={props.id}>{props.label}</InputLabel>}
      <Select
        labelId={props.id}
        id={props.id}
        value={props.value}
        label={props.label} 
        className={props.className}
        size={size}
        {...(register || {})}
      >
        {props.options?.map((option) => (
          <MenuItem key={option.value as string} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default UiSelect;
