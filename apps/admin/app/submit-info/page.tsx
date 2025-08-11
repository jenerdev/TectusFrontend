'use client';
import { UiButton, UiStepper, UiTextField } from '@tectus/ui';
import { PageBanner } from '../components';
import { useBEM } from '@tectus/hooks';
import './submit-info-page.scss';
import { useRouter } from 'next/navigation';
// import { useCallback, useState } from 'react';

export default function SubmitInfo() {
  const { B, E } = useBEM('submit-info-page');
  const router = useRouter();
  // const [step, setStep] = useState(0);

  const handleSubmit = () => {
    router.push('alert/application-submitted');
  };

  const steps = ['Contact Info', 'Company Info', 'Personnel'];

  // const changeStep = useCallback(
  //   (action: 'next' | 'back') => {
  //     if (action === 'next') {
  //       if (step >= steps.length - 1) {
  //         return;
  //       }
  //       setStep(step + 1);
  //     } else {
  //       if (step <= 0) {
  //         return;
  //       }
  //       setStep(step - 1);
  //     }
  //   },
  //   [step],
  // );

  return (
    <div className={B()}>
      <PageBanner
        hideLogo
        title="Submit your information"
        subtitle="Please provide your company details subject to verification by Tectus."
      />

      <div className={E('form-scroll')}>
        <form className={E('form')}>
          <UiTextField placeholder="Company name" />
        </form>
      </div>

      <UiButton onClick={handleSubmit}>Submit Application</UiButton>

      {/* <UiStepper
        steps={steps.length}
        activeStep={step}
        backButton={<UiButton onClick={() => changeStep('back')}>back</UiButton>}
        nextButton={<UiButton onClick={() => changeStep('next')}>next</UiButton>}
      /> */}
    </div>
  );
}
