
import { useBEM } from '@tectus/hooks';
import './PageBanner.scss';


export interface PageBannerProps {  
    title: string;
    subtitle?: string;    
    hideLogo?: boolean;
}

export function PageBanner({
    title,
    subtitle,
    hideLogo = false
}: PageBannerProps) {
    const { B, E } = useBEM('page-banner');

    return (
        <div className={B()}>
            {
                !hideLogo && <div className={E('logo')}></div>
            }
            <h1 className={E('title')}>{title}</h1>
            {subtitle && <h2 className={E('subtitle')} dangerouslySetInnerHTML={{ __html: subtitle }} />}
        </div>
    );
}
