import { TypographyProps, Typography } from '@mui/material';

export interface UiTypographyProps {
  variant?: TypographyProps['variant'];
  children: TypographyProps['children'];
  className?: string;
  fontWeight?: TypographyProps['fontWeight'];
}

export function UiTypography(props: UiTypographyProps) {
  const propsWithDefaults = {
    ...props,
    variant: props.variant || 'body2',
  }

  return (
    <Typography {...propsWithDefaults}>
      {props.children}
    </Typography>
  );
}
