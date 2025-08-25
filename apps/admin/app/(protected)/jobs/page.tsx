'use client';

import { Container, GoogleMap, Page } from '../../components';
import { useBEM } from '@tectus/hooks';
import './jobs-page.scss';
import { UiTable, UiTabs } from '@tectus/ui';
import { useState } from 'react';

export default function JobsPage() {
  const { B, E } = useBEM('jobs-page');
  const [tab, setTab] = useState<number>(0);

  return (
    <Page id="jobs-page" className={B()}>
      <Container inner className={E('container')}>
        <GoogleMap />

        <div>
          <UiTabs
            className={E('tabs')}
            value={tab}
            items={[
              {
                label: 'Active Jobs',
              },
              {
                label: 'Jobs for Bidding',
              },
              {
                label: 'Completed Jobs',
              },
            ]}
            onChange={(_, newValue) => setTab(newValue)}
            color='#00cccc'
          />

          <UiTable
            className={E('table')}
            variant='highlighted'
            mobileColumns={[
              { key: 'category', label: 'Category' },
              { key: 'tags', label: 'Tags' },
              { key: 'actions', label: 'Actions' },
            ]}
            columns={[
              { key: 'category', label: 'Category' },
              { key: 'location', label: 'Location' },
              { key: 'datetime', label: 'Date & Time' },
              { key: 'tags', label: 'Tags' },
              { key: 'personnelNeeded', label: 'Personnel Needed' },
              {
                key: 'rate',
                label: 'Rate',
                template: {
                  td: (row) => <span className={E('rate')}>{row.rate}</span>,
                },
              },
              { key: 'actions', label: 'Actions' },
            ]}
            // data={list}
            data={[
              {
                category: 'Catering',
                location: 'New York, NY',
                datetime: '28 Aug 06:00 PM',
                tags: ['food', 'service'],
                personnelNeeded: 5,
                rate: '$25/hr',
                actions: '',
              },
              {
                category: 'Security',
                location: 'Los Angeles, CA',
                datetime: '02 Sept 09:00 AM',
                tags: ['night shift', 'guard'],
                personnelNeeded: 3,
                rate: '$20/hr',
                actions: '',
              },
              {
                category: 'Event Setup',
                location: 'Chicago, IL',
                datetime: '05 Sept 07:30 AM',
                tags: ['setup', 'equipment'],
                personnelNeeded: 8,
                rate: '$22/hr',
                actions: '',
              },
              {
                category: 'Logistics',
                location: 'Houston, TX',
                datetime: '10 Sept 12:00 PM',
                tags: ['transport', 'delivery'],
                personnelNeeded: 4,
                rate: '$30/hr',
                actions: '',
              },
              {
                category: 'Technical Support',
                location: 'Miami, FL',
                datetime: '15 Sept 02:00 PM',
                tags: ['IT', 'audio-visual'],
                personnelNeeded: 2,
                rate: '$35/hr',
                actions: '',
              },
              {
                category: 'Cleaning',
                location: 'Seattle, WA',
                datetime: '20 Sept 10:00 PM',
                tags: ['night shift', 'maintenance'],
                personnelNeeded: 6,
                rate: '$18/hr',
                actions: '',
              },
              {
                category: 'Hospitality',
                location: 'Boston, MA',
                datetime: '25 Sept 04:00 PM',
                tags: ['front desk', 'guests'],
                personnelNeeded: 4,
                rate: '$28/hr',
                actions: '',
              },
              {
                category: 'Medical Support',
                location: 'Denver, CO',
                datetime: '30 Sept 10:00 AM',
                tags: ['first aid', 'health'],
                personnelNeeded: 2,
                rate: '$40/hr',
                actions: '',
              },
              {
                category: 'Photography',
                location: 'San Francisco, CA',
                datetime: '03 Oct 03:00 PM',
                tags: ['event', 'media'],
                personnelNeeded: 1,
                rate: '$50/hr',
                actions: '',
              },
              {
                category: 'Stage Management',
                location: 'Las Vegas, NV',
                datetime: '07 Oct 07:00 PM',
                tags: ['concert', 'stage'],
                personnelNeeded: 3,
                rate: '$32/hr',
                actions: '',
              },
            ]}
          />
        </div>
      </Container>
    </Page>
  );
}
