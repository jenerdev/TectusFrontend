"use client"

import { FormControlLabel, Switch, SwitchProps } from '@mui/material';

export interface UISwitchProps {
  label?: string;
  disabled?: boolean;
  required?: boolean;
  size?: SwitchProps['size'];
  color?: SwitchProps['color'];
  checked?: boolean;
  onChange?: SwitchProps['onChange'];
}

export function UiSwitch(props: UISwitchProps) {


  const propsWithDefaults = {
    ...props,
    disabled: props.disabled || false,
    required: props.required || false,
    size: props.size || 'medium',
    color: props.color || 'primary',
    checked: props.checked || false,
  };


  return (
     <FormControlLabel control={<Switch {...propsWithDefaults} />} label={props.label} />
  );
}
