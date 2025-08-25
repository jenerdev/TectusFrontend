import { TypographyProps, Typography } from '@mui/material';

export interface UiTypographyProps {
  variant?: TypographyProps['variant'];
  children: TypographyProps['children'];
  className?: string;
  fontWeight?: TypographyProps['fontWeight'];
  color?: TypographyProps['color'];
  onClick?: TypographyProps['onClick'];
  bold?: boolean;
}

export function UiTypography({
  variant = 'body2',
  children,
  className,
  fontWeight,
  color,
  onClick,
  bold,
}: UiTypographyProps) {
  return (
    <Typography
      variant={variant}
      className={className}
      fontWeight={fontWeight}
      color={color}
      onClick={onClick}
      {...(bold && { fontWeight: 700 })}
    >
      {children}
    </Typography>
  );
}
