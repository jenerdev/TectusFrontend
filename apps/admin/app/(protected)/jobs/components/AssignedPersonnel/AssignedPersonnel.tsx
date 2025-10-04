'use client';

import { useBEM } from '@tectus/hooks';
import './AssignedPersonnel.scss';
import { UiAutocomplete, UiIcon, UiIconButton, UiTypography, useUiSnackbar } from '@tectus/ui';
import { useMemo, useState, useEffect, useCallback} from 'react';
import { useJobApi } from '@/app/api';
import { on } from 'events';

export interface AssignedPersonnelProps {
  jobId: string;
  numberOfPersonnel: number;
  assignedPersonnels?: any[];
  availablePersonnels?: any[];
  onRefetch: () => void;
}

export function AssignedPersonnel({ jobId, numberOfPersonnel, assignedPersonnels = [], availablePersonnels = [], onRefetch }: AssignedPersonnelProps) {
  const { B, E } = useBEM('assigned-personnel');
  const {loading, assignPersonnel, acceptPersonnelAssignment, cancelPersonnelAssignment } = useJobApi({id: jobId});
  const { showSnackbar } = useUiSnackbar();
  const [addIndex, setAddIndex] = useState<number | null>(null);
  const [toAddPersonnel, addPersonnel] = useState<any | null>(null);

  const buttonMapping = {
    accepted: <UiIcon name='Cancel' size='small'/>,
    assigned: <UiIcon name='Cancel' size='small'/>,
    declined: <UiIcon name='Cancel' size='small'/>,
    requested: <UiIcon name='CheckCircle' size='small'/>,
    // invited: <UiIcon name='Cancel' size='small'/>,
  };


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

  const cancelPersonnel = useCallback(async (personnelId: string, name: string) => {
    const res = await cancelPersonnelAssignment(personnelId);
    if(res.error) {
      showSnackbar(res.error.message || `Failed to remove ${name}`, 'error');
      return
    }
    showSnackbar(`Successfully removed ${name}`, 'success');
    onRefetch();
  }, [])

  const onActrionHandler = useCallback((status: string, index: number) => {
    const assignment = assignedPersonnels[index];
    const name = assignment?.fullName || assignment?.email || 'Personnel';
    const actionMapping = {
      unassigned: () => setAddIndex(index),
      assigned: () => cancelPersonnel(assignment.id, name),
      declined: () => cancelPersonnel(assignment.id, name),
      accepted: () => cancelPersonnel(assignment.id, name),
      // Note: Accept personnel requested to join
      requested: async () => {
        const assignment = assignedPersonnels[index];
        const res = await acceptPersonnelAssignment(assignment.assignmentId);
        if(res.error) {
          showSnackbar(res.error.message || `Failed to accept ${name}`, 'error');
          return
        }
        showSnackbar(`Successfully accepted ${name}`, 'success');
        onRefetch();
      }
    }
    const targetMapping = actionMapping[status as keyof typeof actionMapping];
    if(targetMapping) targetMapping();
  }, [assignedPersonnels]);

  return (
    <div className={B()}>
      <div className={E('header')}>
        <UiTypography variant='h6' bold>Assigned Personnel</UiTypography>
        
        <div className={E('count', isAllAssigned ? 'all-assigned' : '')}>
          {!isAllAssigned && <UiIcon name='Warning' />}
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
                  {buttonMapping[status as keyof typeof buttonMapping] || <UiIcon name='AddCircle' size='small'  />}
                </span>
              </li>  
            )
          })
        }
      </ul>
    </div>
  );
}
