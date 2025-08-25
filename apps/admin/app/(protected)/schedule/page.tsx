'use client';

import { Page,  } from '../../components';
import { useBEM } from '@tectus/hooks';
// import './schedule-page.scss';

export default function SchedulePage() {
  const { B, E } = useBEM('schedule-page');



  return (
    <Page id="schedule-page" className={B()}>
      
      <div className={E('content')}>
        Schedule Page
      </div>
    </Page>
  );
}
