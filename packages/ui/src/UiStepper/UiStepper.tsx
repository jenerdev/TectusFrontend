'use client';

import { FormControlLabel, MobileStepper, MobileStepperProps, Step, StepLabel, Stepper, StepperProps, Switch, SwitchProps } from '@mui/material';

export interface UiStepperProps { 
  variant?: MobileStepperProps['variant'];
  steps: number;
  position?: MobileStepperProps['position'];
  activeStep: number;
  nextButton: MobileStepperProps['nextButton'];
  backButton: MobileStepperProps['backButton'];
}

export function UiStepper(props: UiStepperProps) {


  return (
    <MobileStepper {...props} style={{backgroundColor: 'transparent'}}/>
  );
}
