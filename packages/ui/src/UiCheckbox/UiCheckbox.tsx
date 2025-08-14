'use client';

import './UiCheckbox.scss';
import { Checkbox, CheckboxProps, FormControlLabel, FormControlLabelProps } from '@mui/material';

export interface UiCheckboxProps {
  checked?: boolean;
  disabled?: boolean;
  size?: CheckboxProps['size'];
  label?: FormControlLabelProps['label'];
  className?: string;
  onChange?: CheckboxProps['onChange'];
  onClick?: FormControlLabelProps['onClick'];
}

export function UiCheckbox({
  checked,
  disabled,
  size = 'medium',
  label,
  className,
  onChange,
  onClick,
}: UiCheckboxProps) {
  return (
    <FormControlLabel
      className={className}
      control={<Checkbox onChange={onChange} size={size} checked={checked} disabled={disabled} />}
      label={label}
      onClick={onClick}
    />
  );
}
