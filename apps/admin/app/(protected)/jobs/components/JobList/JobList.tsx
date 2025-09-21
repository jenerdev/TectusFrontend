'use client';

import { useBEM } from '@tectus/hooks';
import './JobList.scss';
import { UiTable } from '@tectus/ui';
import { JobModel } from '@/app/api/models';

export interface JobListProps {
  loading: boolean;
  data?: JobModel[];
  onSelectJob?: (job: any) => void;
}

export function JobList({ onSelectJob, loading, data = [] }: JobListProps) {
  const { B, E } = useBEM('job-list');
  return (
    <div className={B()}>
      <UiTable
        className={E('table')}
        onSelectRow={(row) => onSelectJob?.(row)}
        variant="highlighted"
        loading={loading}
        columns={[
          {
            key: 'title',
            label: 'Title',
            isMobile: true,
          },
          {
            key: 'category',
            label: 'Category',
            isMobile: true,
          },
          {
            key: 'location',
            label: 'Location',
            template: {
              td: (row) => row.location?.address,
            },
          },
          {
            key: 'startAt',
            label: 'Start Date',
            width: '11rem',
          },
          {
            key: 'endAt',
            label: 'End Date',
            width: '11rem',
          },
          { key: 'numberOfPersonnel', label: 'Personnel', width: '11rem' },
          {
            key: 'fee',
            label: 'Fee',
            template: {
              td: (row) => {
                if(!row.fee)return '-';
                return <span className={E('fee')}>${row.fee}</span>;
              },
            },
          },
          {
            key: 'rate',
            label: 'Effective Rate',
            template: {
              td: (row) => {
                const amount = parseFloat(row.fee || row.budget || '0');
                const rate = (amount / (row.numberOfPersonnel || 1)).toFixed(2);
                return `$${rate}/person/hr`;
              },
            },
          },
        ]}
        data={data}
      />
    </div>
  );
}
