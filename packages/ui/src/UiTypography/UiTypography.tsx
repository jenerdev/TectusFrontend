import { TypographyProps, Typography } from '@mui/material';

export interface UiTypographyProps {
  variant?: TypographyProps['variant'];
  children: TypographyProps['children'];
  className?: TypographyProps['className'];
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
