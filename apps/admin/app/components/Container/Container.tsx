'use client';
import { useBEM } from '@tectus/hooks';
import './Container.scss'; 
import { useMemo } from 'react';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  noPadding?: boolean;
  inner?: boolean;
}

export function Container({ children, className, noPadding, inner }: ContainerProps) {
  const { B } = useBEM('container', className);

  const modifiers = useMemo(() => {
    return [
      noPadding ? 'no-padding' : '',
      inner ? 'inner' : '',
    ].filter(Boolean);
  }, [inner, noPadding]);

  return (
    <div className={B( modifiers )}>
      {children}
    </div>
  );
}
