"use client"

import './UiCheckbox.scss';
import {  Checkbox, CheckboxProps, FormControlLabel, useMediaQuery, useTheme } from '@mui/material';

export interface UiCheckboxProps {
  checked?: boolean;
  disabled?: boolean;
  size?: CheckboxProps['size'];
  label?: string;
}

export function UiCheckbox(props: UiCheckboxProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const propsWithDefaults = {
    ...props,
    size: props.size || (isMobile ? "medium" : "small"),
  }

  return (
   <FormControlLabel control={<Checkbox {...propsWithDefaults} />} label={props.label} />
  );
}
