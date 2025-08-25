'use client';

import { Container, Page,  } from '../../components';
import { useBEM } from '@tectus/hooks';
import './schedule-page.scss';

export default function SchedulePage() {
  const { B, E } = useBEM('schedule-page');



  return (
    <Page id="schedule-page" className={B()}>      
      <Container inner className={E('container')}>
        Schedule Page
      </Container>
    </Page>
  );
}
