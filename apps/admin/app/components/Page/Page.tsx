'use client';
import { useBEM } from '@tectus/hooks';
import './Page.scss'; 

interface PageProps {
    id?: string,
    className?: string,
    children: React.ReactNode
}

export function Page({
    id,
    children,
    className
}: PageProps) {
  const { B, E } = useBEM('page', className); 

  return (
    <div className={B(id)}> 
      {children}
    </div>
  );
}
