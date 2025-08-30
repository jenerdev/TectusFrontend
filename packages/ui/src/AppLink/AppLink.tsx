import { useBEM } from '@tectus/hooks';
import NextLink from 'next/link';
import './AppLink.scss';
import { UiTypography } from '../UiTypography';

export interface AppLinkProps {
  href: string;
  className?: string;
  children?: React.ReactNode;
  target?: React.HTMLAttributeAnchorTarget;
  download?: boolean;
  rel?: string;
}

export function AppLink({ href, className, children, target, download, rel }: AppLinkProps) {
  const { B } = useBEM('app-link');
  return (
    <NextLink href={href} className={B(undefined, className)} target={target} download={download} rel={rel}>
      <UiTypography variant="body2">{children}</UiTypography>
    </NextLink>
  );
}
