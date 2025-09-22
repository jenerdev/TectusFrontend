'use client';

import { useBEM } from '@tectus/hooks';
import './AssignedPersonnel.scss';
import { UiAutocomplete, UiIcon, UiIconButton, UiTypography, useUiSnackbar } from '@tectus/ui';
import { useMemo, useState, useEffect} from 'react';
import { useJobApi } from '@/app/api';

export interface AssignedPersonnelProps {
  jobId: string;
  numberOfPersonnel: number;
  assignedPersonnels?: any[];
  availablePersonnels?: any[];
  onRefetch: () => void;
}

export function AssignedPersonnel({ jobId, numberOfPersonnel, assignedPersonnels = [], availablePersonnels = [], onRefetch }: AssignedPersonnelProps) {
  const { B, E } = useBEM('assigned-personnel');
  const {loading, assignPersonnel } = useJobApi({id: jobId});
  const { showSnackbar } = useUiSnackbar();
  const [addIndex, setAddIndex] = useState<number | null>(null);
  const [toAddPersonnel, addPersonnel] = useState<any | null>(null);

  const actionMapping = (index?: number) => ({
    accepted: <UiIcon name='Cancel' size='small'/>,
    assigned: <UiIcon name='Cancel' size='small'/>,
    requested: <UiIcon name='CheckCircle' size='small'/>,
    // invited: <UiIcon name='Cancel' size='small'/>,
  });


  useEffect(() => {
    if (!toAddPersonnel) return;    
    (async () => {
      const res = await assignPersonnel(toAddPersonnel.value);
      if(res.error) {
        showSnackbar(res.error.message || 'Failed to assign personnel', 'error');
        return
      }
      showSnackbar(`Successfully assigned ${toAddPersonnel.label}`, 'success');
      setAddIndex(null);
      addPersonnel(null);
      onRefetch();
    })()

  }, [toAddPersonnel])
  

  const isAllAssigned = useMemo(() => {
    return assignedPersonnels.filter( ap => ap.assignmentStatus === 'Accepted').length >= numberOfPersonnel;
  }, [assignedPersonnels, numberOfPersonnel]);

  const autoCompleteOptions = useMemo(() => {
    return availablePersonnels.map(ap => {
      return {
        label: `${(ap.user.name || 'Personnel') } - (${ap.user.email})`,
        value: ap.id
      }
    }).filter(option => !assignedPersonnels.find(ap => ap.id === option.value));
  }, [availablePersonnels, assignedPersonnels]);

  const onActrionHandler = (status: string, index: number) => {
    if(status === 'unassigned') {
      setAddIndex(index);
    }
  }

  return (
    <div className={B()}>
      <div className={E('header')}>
        <UiTypography variant='h6' bold>Assigned Personnel</UiTypography>
        
        <div className={E('count', isAllAssigned ? 'all-assigned' : '')}>
          <UiIcon name='Warning' />
          <UiTypography variant='h6' bold>{assignedPersonnels.length}/{numberOfPersonnel}</UiTypography>
        </div>
      </div>
      <ul className={E('list')}>
        {
          new Array(numberOfPersonnel).fill(null).map((_, index) => {

            const status = (assignedPersonnels[index]?.assignmentStatus || 'unassigned').toLowerCase();
            if(addIndex ===index) {
              return (
                <li className={E('personnel', 'add')} key={index}>
                  <UiAutocomplete placeholder='Personnel' fullWidth options={autoCompleteOptions} value={toAddPersonnel} onChange={addPersonnel} disabled={loading}/>
                  <UiIconButton disabled={loading} icon="Clear" onClick={() => {
                    addPersonnel(null);
                    setAddIndex(null);
                  }}/>
                </li>
              )
            }
            return (
              <li className={E('personnel')} key={index}>
                <span className={E('status', status)}></span>
                <UiTypography variant='h6' className={E('personnel-name')}>
                  {assignedPersonnels[index]?.fullName || assignedPersonnels[index]?.email || 'Unassigned'}
                </UiTypography>
                <span className={E('action', status)} onClick={() => onActrionHandler(status, index)}>
                  {actionMapping()[status as keyof typeof actionMapping] || <UiIcon name='AddCircle' size='small'  />}
                </span>
              </li>  
            )
          })
        }


        {/* <li className={E('personnel')}>
          <span className={E('status', 'accepted')}></span>
          <UiTypography variant='h6'>John Wick</UiTypography>
          <span className={E('action', 'remove')}>
            <UiIcon name='Cancel' size='small'/>
          </span>
        </li>    
        <li className={E('personnel')}>
          <span className={E('status', 'pending')}></span>
          <UiTypography variant='h6'>Jobh Wick</UiTypography>
          <span className={E('action', 'approve')}>
            <UiIcon name='CheckCircle' size='small'/>
          </span>
        </li>    
        <li className={E('personnel')}>
          <span className={E('status', 'declined')}></span>
          <UiTypography variant='h6'>John Wick</UiTypography>
          <span className={E('action')}>
            <UiIcon name='AddCircle' size='small'/>
          </span>
        </li>    
        <li className={E('personnel')}>
          <span className={E('status', 'requested')}></span>
          <UiTypography variant='h6'>Jobh Wick</UiTypography>
          <span className={E('action')}>
            <UiIcon name='AddCircle' size='small'/>
          </span>
        </li>    
        <li className={E('personnel')}>
          <span className={E('status')}></span>
          <UiTypography variant='h6'>Jobh Wick</UiTypography>
          <span className={E('action')}>
            <UiIcon name='AddCircle' size='small'/>
          </span>
        </li>     */}
      </ul>
    </div>
  );
}
