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

  console.log({ data1: data });
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
            key: 'location',
            label: 'Location',
            template: {
              td: (row) => row.location?.address,
            },
          },
          {
            key: 'startAt',
            label: 'Date & Time',
            width: '11rem',
          },
          { key: 'tags', label: 'Tags', isMobile: true },
          { key: 'numberOfPersonnel', label: 'Personnel Needed', width: '11rem' },
          {
            key: 'budget',
            label: 'Rate',
            template: {
              td: (row) => {
                // const rate = parseFloat(row.budget) / (row.numberOfPersonnel || 1);
                const rate = `${parseFloat(row.budget)}/hr`;
                return <span className={E('rate')}>{rate}</span>;
              },
            },
          },
          { key: 'actions', label: 'Actions', isMobile: true },
        ]}
        data={data}
      />
    </div>
  );
}
