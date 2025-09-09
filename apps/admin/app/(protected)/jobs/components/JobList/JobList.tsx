'use client';

import { useBEM } from '@tectus/hooks';
import './JobList.scss';
import { UiTable, UiTabs } from '@tectus/ui';
import { useState } from 'react';
import { JobStatusType } from '../../Job.types';
import { useJobList } from '../../useJobList';
import { useRouter, useSearchParams } from 'next/navigation';

export interface JobListProps {
  onSelectJob?: (job: any) => void;
}

export function JobList({ onSelectJob }: JobListProps) {
  const { B, E } = useBEM('job-list');
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") as JobStatusType;
  const [tab, setTab] = useState<JobStatusType>(initialTab || 'active');
  const { data, loading } = useJobList(tab);


  const tabOnChange = (value: JobStatusType) => {
    setTab(value);

    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", value);
    router.replace(`?${params.toString()}`);
  }

  return (
    <div className={B()}>
      <UiTabs
        className={E('tabs')}
        value={tab}
        items={[
          {
            label: 'Active Jobs',
            value: 'active',
          },
          {
            label: 'Jobs for Bidding',
            value: 'bidding',
          },
          {
            label: 'Completed Jobs',
            value: 'completed',
          },
        ]}
        onChange={(_, newValue) => tabOnChange(newValue)}
        color="#00cccc"
      />

      <UiTable
        className={E('table')}
        onSelectRow={(row) => onSelectJob?.(row)}
        variant="highlighted"
        loading={loading}
        columns={[
          {
            key: 'categories',
            label: 'Category',
            template: {
              td: (row) => row.categories.join(', '),
            },
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
          { key: 'numberOfPersonnel', label: 'Personnel Needed', width: '11rem',},
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
