"use client";

import React from 'react';
import * as MuiIcons from '@mui/icons-material';
import { SvgIconProps } from '@mui/material';

export interface UiIconProps  {
  name: keyof typeof MuiIcons; // Only valid icon names from MUI icons
  className?: string;
  size?: SvgIconProps['fontSize'];
  color?: SvgIconProps['color'];
}

const UiIcon: React.FC<UiIconProps> = ({ name, size, color }) => {
  const IconComponent = MuiIcons[name];

  if (!IconComponent) {
    console.warn(`Icon "${name}" does not exist in @mui/icons-material`);
    return null;
  }

  return <IconComponent sx={{ color }} fontSize={size} />;
};

export default UiIcon;
