'use client';
import { Link, Tab, Tabs, TabsProps } from '@mui/material';
import './UiTabs.scss';

export interface UiTabsProps {
  onChange?: TabsProps['onChange'];
  value?: TabsProps['value'];
  items: { label: string; value?: string; path?: string }[];
  variant?: TabsProps['variant'];
  scrollButtons?: TabsProps['scrollButtons'];
  allowScrollButtonsMobile?: TabsProps['allowScrollButtonsMobile'];
  className?: string;
  color?: TabsProps['color'];
  componentLink?: React.ElementType;
}

export function UiTabs({
  onChange,
  value,
  variant,
  items,
  scrollButtons,
  allowScrollButtonsMobile,
  className,
  color,
  componentLink
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
      {items.map(({ label, path, value }, index) => (
        <Tab
          key={index}
          label={label}
          sx={{ textTransform: 'none' }}
          value={value || index}
          {...(path ? { component: componentLink || Link, href: path } : {})}
        />
      ))}
    </Tabs>
  );
}
