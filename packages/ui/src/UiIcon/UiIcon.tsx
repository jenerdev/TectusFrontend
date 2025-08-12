"use client";

import React from 'react';
import * as MuiIcons from '@mui/icons-material';
import { SvgIconProps } from '@mui/material';

export interface UiIconProps extends SvgIconProps {
  name: keyof typeof MuiIcons; // Only valid icon names from MUI icons
}

const UiIcon: React.FC<UiIconProps> = ({ name, ...props }) => {
  const IconComponent = MuiIcons[name];

  if (!IconComponent) {
    console.warn(`Icon "${name}" does not exist in @mui/icons-material`);
    return null;
  }

  return <IconComponent {...props} />;
};

export default UiIcon;
