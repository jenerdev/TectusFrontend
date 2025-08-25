'use client';

import { Container, GoogleMap, Page } from '../../components';
import { useBEM } from '@tectus/hooks';
import './jobs-page.scss';

export default function JobsPage() {
  const { B, E } = useBEM('jobs-page');

  return (
    <Page id="jobs-page" className={B()}>
      <Container inner className={E('container')}>
        <GoogleMap />
      </Container>
    </Page>
  );
}
