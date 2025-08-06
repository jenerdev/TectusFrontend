import { PageBanner } from '../components';
import { useBEM } from '@tectus/hooks';
import './dashboard-page.scss';

export default function Dashboard() {
  const { B, E } = useBEM('dashboard-page');

  return (
    <div className={B()}>
      <PageBanner
        title="Home"
        subtitle="Placeholder"
      />
      <div className={E('content')}>
        
      </div>
    </div>
  );
}
