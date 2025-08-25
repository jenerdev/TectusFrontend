'use client';
import { Link, Tab, Tabs, TabsProps } from '@mui/material';
import './UiTabs.scss';

export interface UiTabsProps {
  onChange?: TabsProps['onChange'];
  value?: TabsProps['value'];
  items: { label: string; path?: string }[];
  variant?: TabsProps['variant'];
  scrollButtons?: TabsProps['scrollButtons'];
  allowScrollButtonsMobile?: TabsProps['allowScrollButtonsMobile'];
  className?: string
}

export function UiTabs({
  onChange,
  value,
  variant,
  items,
  scrollButtons,
  allowScrollButtonsMobile,
  className
}: UiTabsProps) {
  return (
    <Tabs
      value={value}
      onChange={onChange}
      variant={variant}
      scrollButtons={scrollButtons}
      allowScrollButtonsMobile={allowScrollButtonsMobile}
      className={className}
    >
      {items.map(({ label, path }, index) => (
        <Tab
          key={index}
          label={label}
          sx={{ textTransform: 'none' }}
          {...(path ? { component: Link, href: path } : {})}
        />
      ))}
    </Tabs>
  );
}
