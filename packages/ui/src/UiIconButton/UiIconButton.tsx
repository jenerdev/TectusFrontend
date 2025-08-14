"use client"

import './UiIconButton.scss';
import { IconButton, IconButtonProps } from '@mui/material';
import { UiIconProps } from '../UiIcon';
import UiIcon from '../UiIcon/UiIcon';
import { useBEM } from '@tectus/hooks';


export interface UiIconButtonProps {
  className?: string;
  icon: UiIconProps['name'];
  size?: IconButtonProps['size'];
  onClick?: IconButtonProps['onClick'];
}

export function UiIconButton({
  className,
  icon,
  size,
  onClick
}: UiIconButtonProps) {

  const { B } = useBEM('ui-icon-button', className);

  return (
    <IconButton className={B()} size={size} onClick={onClick}>
      <UiIcon name={icon} />
    </IconButton>
  );
}
