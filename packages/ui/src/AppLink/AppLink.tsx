import { useBEM } from '@tectus/hooks';
import NextLink from 'next/link';
import './AppLink.scss';
import { UiTypography } from '../UiTypography';

export interface AppLinkProps {
  href: string;
  className?: string;
  children?: React.ReactNode;
}

export function AppLink({ href, className, children }: AppLinkProps) {
  const { B } = useBEM('app-link');
  return (
    <NextLink href={href} className={B(undefined, className)}>
      <UiTypography variant="body2">{children}</UiTypography>
    </NextLink>
  );
}
