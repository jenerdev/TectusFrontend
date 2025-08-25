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
  className?: string;
  color?: TabsProps['color'];
}

export function UiTabs({
  onChange,
  value,
  variant,
  items,
  scrollButtons,
  allowScrollButtonsMobile,
  className,
  color
}: UiTabsProps) {
  return (
    <Tabs
      value={value}
      onChange={onChange}
      variant={variant}
      scrollButtons={scrollButtons}
      allowScrollButtonsMobile={allowScrollButtonsMobile}
      className={className} 
      sx={color ? {
        "& .MuiTabs-indicator": {
          backgroundColor: `${color}`, 
        },
        "& .MuiTab-root": {
          color: `${color}`, 
        },
        "& .Mui-selected": {
          color: `${color}`, 
        },
      } : {}}
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
