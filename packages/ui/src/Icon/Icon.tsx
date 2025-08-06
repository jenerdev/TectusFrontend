import React from 'react';
import './Icon.scss'; // Assuming you have a corresponding SCSS file for styles
import { useBEM } from '@tectus/hooks';
import { Icons } from './Icon.types';

interface IconProps {
  name: typeof Icons[number];
  size?: 'xs' | 's' | 'm' | 'l';
  className?: string;
}

export const Icon: React.FC<IconProps> = ({ name, size, className }) => {
  const { B } = useBEM("ui-icon");
  return (
    <svg className={B(size, className)}>
      <use xlinkHref={`/icons.svg#${name}`}></use>
    </svg>
  );
};

