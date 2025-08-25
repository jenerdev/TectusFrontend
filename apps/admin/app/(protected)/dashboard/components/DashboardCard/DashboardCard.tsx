'use client';

import { useBEM } from '@tectus/hooks';
import './DashboardCard.scss';
import { UiCard, UiTypography } from '@tectus/ui';
import UiIcon from '@tectus/ui/UiIcon/UiIcon';

export interface DashboardCardProps {
  title: string;
  location?: string;
  earnings?: string;
  details?: {
    dateTime: string;
    rate: string;
    person: number;
  };
}

export function DashboardCard({ title, location, details, earnings }: DashboardCardProps) {
  const { B, E } = useBEM('dashboard-card');

  const { dateTime, rate, person } = details || {};

  return (
    <UiCard className={B()}>
      <UiTypography variant="h6" bold>
        {title}
      </UiTypography>

      {location && (
        <UiTypography className={E('info')}>
          <UiIcon name="Place" />
          {location}
        </UiTypography>
      )}

      {details && (
        <div className={E('details')}>
          <UiTypography variant="subtitle1" className={E('info')}>
            <UiIcon name="AccessTime" />
            {dateTime}
          </UiTypography>

          <UiTypography variant="subtitle1" className={E('info')}>
            <UiIcon name="PersonOutline" />
            {person}
          </UiTypography>

          <UiTypography variant="subtitle1" className={E('info')}>
            <UiIcon name="Payment" />
            {rate}
          </UiTypography>
        </div>
      )}

      {
        earnings && (
          <UiTypography variant="h4" bold className={E('earnings')}>
            {earnings}
          </UiTypography>
        )
      }
    </UiCard>
  );
}
