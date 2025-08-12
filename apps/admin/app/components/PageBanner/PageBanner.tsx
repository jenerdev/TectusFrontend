import { useBEM } from '@tectus/hooks';
import './PageBanner.scss';
import { UiTypography } from '@tectus/ui';
import Image from 'next/image';

export interface PageBannerProps {
  title: string;
  subtitle?: string;
  hideLogo?: boolean;
}

export function PageBanner({ title, subtitle, hideLogo = false }: PageBannerProps) {
  const { B, E } = useBEM('page-banner');

  return (
    <div className={B()}>
      {!hideLogo && (
        <div className={E('logo')}>
          <Image src="/logo-tectus.png" alt="Logo" width={150} height={150} />
        </div>
      )}
      <UiTypography className={E('title')} variant="h4">
        {title}
      </UiTypography>
      {subtitle && (
        <UiTypography className={E('subtitle')} variant="subtitle1">
          <span className={E('subtitle')} dangerouslySetInnerHTML={{ __html: subtitle }} />
        </UiTypography>
      )}
    </div>
  );
}
