'use client';

import { useBEM } from '@tectus/hooks';
import './UiCard.scss';

export interface UiCardProps {
  noPadding?: boolean;
  children: React.ReactNode;
  className?: string
}

export function UiCard({ className, noPadding, children }: UiCardProps) {
  const { B } = useBEM('ui-card', className);

  return <div className={B(noPadding ? 'no-padding' : '')}>{children}</div>;
}
