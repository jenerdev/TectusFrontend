'use client';

import { Page,  } from '../../components';
import { useBEM } from '@tectus/hooks';
// import './earnings-page.scss';

export default function EarningsPage() {
  const { B, E } = useBEM('earnings-page');



  return (
    <Page id="earnings-page" className={B()}>
      
      <div className={E('content')}>
        Earnings
      </div>
    </Page>
  );
}
