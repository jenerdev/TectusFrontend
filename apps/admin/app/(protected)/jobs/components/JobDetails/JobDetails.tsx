'use client';

import { useBEM } from '@tectus/hooks';
import './JobDetails.scss';
import {
  UiTypography,
  UiIcon,
  UiIconProps,
  UiTypographyProps,
  UiButton,
  UiTextField,
} from '@tectus/ui';
import { GoogleMap } from '@/app/components';
import { useMemo, useState } from 'react';
import { JobModel } from '@/app/api/models/JobModel';
import { AssignedPersonnel } from '../AssignedPersonnel';

export type JobDetailsActionType = 'accept' | 'back' | 'refetch';

export interface JobDetailsProps {
  job: JobModel;
  actionHandler: (action: JobDetailsActionType) => void;
  loading?: boolean;
  assignedPersonnels?: any[];
  availablePersonnels?: any[];
}

export function JobDetails({ job, actionHandler, loading, assignedPersonnels = [], availablePersonnels = []}: JobDetailsProps) {
  const { B, E } = useBEM('job-details');
  const isForBidding = useMemo(() => job.status === 'Bidding' && job.type === 'Scheduled', [job]);
  const isAccepted = useMemo(() => {
    if(job.type === 'Scheduled') return job.status === 'Awarded';
    if(job.type === 'Instant') return job.status === 'Accepted';
    return false;
  }, [job]);
  const isForAccept = useMemo(() => job.type === 'Instant' && job.status !== 'Accepted', [job]);

  const [bidAmount, setBidAmount] = useState<number>(Number(job.budget));

  const renderInfo = ({
    value,
    icon,
    className,
    variant = 'h6',
  }: {
    value: string;
    icon?: UiIconProps['name'];
    className: string;
    variant?: UiTypographyProps['variant'];
  }) => {
    return (
      <UiTypography className={E('info', className)} variant={variant} fontWeight={400}>
        {icon && <UiIcon name={icon} />} {value}
      </UiTypography>
    );
  };

  const rate = useMemo(() => {
    const budget = Number(job.budget) || 0;
    const computedRate = (budget / Number(job.numberOfPersonnel)).toFixed(2);

    return `≈ $${computedRate}/person/hour`;
  }, [job.budget, job.numberOfPersonnel]);

  const formattedDate = useMemo(() => {
    const formatter = new Intl.DateTimeFormat('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });

    let start = formatter.format(new Date(job.startAt)).replace(',', '');
    let end = formatter.format(new Date(job.endAt)).replace(',', '');
    return `${start} ~ ${end}`;
  }, [job]);

  const totalHours = useMemo(() => {
    const startDate = new Date(job.startAt);
    const endDate = new Date(job.endAt);
    const diffMs = endDate.getTime() - startDate.getTime();
    const diffHours = Math.round(diffMs / (1000 * 60 * 60)); // rounded to nearest hour
    return diffHours;
  }, [job]);

  const jobId = useMemo(() => {
    return job.id.slice(0, 8).toUpperCase();
  }, [job]);

  const googleMapPinLocation = useMemo(() => {
    if (!job.location) return [];

    return [
      {
        lat: job.location?.lat,
        lng: job.location?.lng,
        title: job.location?.address,
        pinColor: 'blue' as const,
      },
    ];
  }, [job.location]);

  return (
    <div className={B()}>
      {/* LEFT */}
      <div className={E('section', 'left')}>
        <div className={E('info-group')}>
          <UiTypography className={E('service-category')} variant="h4" fontWeight={700}>
            {job.title}
          </UiTypography>

          {renderInfo({
            value: `Job #${jobId}`,
            className: 'id',
            variant: 'h6',
          })}
        </div>

        <div className={E('info-group', 'price')}>
          {isForBidding ? (
            <>
              <UiTypography className={E('price')} variant="h4" fontWeight={700}>
                For Bidding
              </UiTypography>
              {renderInfo({
                value: `≈ 3 bids from others`,
                className: 'rate',
              })}
            </>
          ) : (
            <>
              <UiTypography className={E('price')} variant="h4" fontWeight={700}>
                ${job.budget}
              </UiTypography>
              {renderInfo({
                value: rate,
                className: 'rate',
              })}
            </>
          )}
        </div>

        <div className={E('info-group')}>

          {renderInfo({
            value: job.category,
            icon: 'Book',
            className: 'category',
          })}

          {renderInfo({
            value: job.location?.address || '~',
            icon: 'Place',
            className: 'address',
          })}

          {renderInfo({
            value: formattedDate, //'09/06/2025 9:00 AM ~ 09/06/2025 5:00 PM',
            icon: 'CalendarToday',
            className: 'datetime',
          })}

          {renderInfo({
            value: `${totalHours} hours`,
            icon: 'WatchLater',
            className: 'duration',
          })}

          {renderInfo({
            value: `${job.numberOfPersonnel} security personnel`,
            icon: 'Group',
            className: 'personnel',
          })}

          {job.isArmed && renderInfo({
            value: 'Armed',
            icon: 'Shield',
            className: 'type',
          })}
        </div>

        <div className={E('info-group')}>
          {renderInfo({
            value: 'Job details',
            icon: 'Assignment',
            className: 'details',
          })}

          <UiTypography className={E('details')} variant="body2">
            {job.description}
          </UiTypography>
        </div>
      </div>

      {/* RIGHT */}
      <div className={E('section', 'right')}>
        
        <div className={E('section-content')}>
          <GoogleMap
            height="12.5rem"
            heightTabletLg="31.25rem"
            locations={googleMapPinLocation}
          />
          {
            isAccepted && 
            <div className={E('assigned-personnel-desktop')}>
              <AssignedPersonnel 
                jobId={job.id} 
                numberOfPersonnel={job.numberOfPersonnel} 
                assignedPersonnels={assignedPersonnels} 
                availablePersonnels={availablePersonnels} 
                onRefetch={() => actionHandler('refetch')} />
            </div>
          }
        </div>


        {isForBidding && (
          <div className={E('place-bid', 'desktop')}>
            <UiTextField
              label="Bid amount"
              prefix="$"
              helperText={rate}
              value={bidAmount}
              onChange={(e) => setBidAmount(Number(e.target.value))}
            />
            <UiButton className={E('bid-button')}>Place Bid</UiButton>
          </div>
        )}
        
        <div className={E('buttons', 'desktop')}>
          <UiButton variant="outlined" onClick={() => actionHandler('back')}>
            Back
          </UiButton>

          {isForAccept && <UiButton className={E('accept-button')} onClick={() => actionHandler('accept')} loading={loading}>Accept Job</UiButton>}
        </div>
      </div>

      <div className="pop-out-modal">
        {isForAccept && (
          <div className={E('accept-job')}>
            <div>
              <UiTypography className={E('price')} variant="h4" fontWeight={700}>
                ${job.budget}
              </UiTypography>
              {renderInfo({
                value: rate,
                className: 'rate',
              })}
            </div>
            <UiButton className={E('accept-button')} onClick={() => actionHandler('accept')} loading={loading}>Accept Job</UiButton>
          </div>
        )}

        {
          isForBidding && <div className={E('for-bidding')}>
            <div>
              <UiTypography className={E('price')} variant="h4" fontWeight={700}>
                For Bidding
              </UiTypography>

              {renderInfo({
                value: '≈ 3 bids from others',
                className: 'rate',
              })}
            </div>

            <div className={E('for-bidding-input')}>
              <UiTextField
                label="Bid amount"
                prefix="$"
                helperText={rate}
                value={bidAmount}
                onChange={(e) => setBidAmount(Number(e.target.value))}
              />
              <UiButton className={E('bid-button')}>Place Bid</UiButton>
            </div>
          </div>
        }

        {
          isAccepted && <AssignedPersonnel 
            jobId={job.id} 
            numberOfPersonnel={job.numberOfPersonnel} 
            assignedPersonnels={assignedPersonnels} 
            availablePersonnels={availablePersonnels} 
            onRefetch={() => actionHandler('refetch')} />
        }

        <UiButton
          className={E('cancel')}
          variant="outlined"
          onClick={() => actionHandler('back')}
        >
          Back
        </UiButton>
      </div>
    </div>
  );
}
