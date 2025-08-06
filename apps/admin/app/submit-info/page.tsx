"use client";
import { Button, Input } from '@tectus/ui';
import { PageBanner } from '../components';
import { useBEM } from '@tectus/hooks';
import './submit-info-page.scss';
import { useRouter } from 'next/navigation';

export default function SubmitInfo() {
  const { B, E } = useBEM('submit-info-page');
  const router = useRouter();


  const handleSubmit = () => {
    router.push('alert/application-submitted');
  }

  return (
    <div className={B()}>
      <PageBanner
        hideLogo
        title="Submit your information"
        subtitle="Please provide your company details subject to verification by Tectus."
      />
      <div className={E('form-scroll')}>
        <form className={E('form')}>
          <Input placeholder="Company name" name="company-name" id="company-name" /> 
          <Input placeholder="Company name" name="company-name" id="company-name" /> 
          <Input placeholder="Company name" name="company-name" id="company-name" /> 
          <Input placeholder="Company name" name="company-name" id="company-name" /> 
          <Input placeholder="Company name" name="company-name" id="company-name" /> 
          <Input placeholder="Company name" name="company-name" id="company-name" /> 
          <Input placeholder="Company name" name="company-name" id="company-name" /> 
          <Input placeholder="Company name" name="company-name" id="company-name" /> 
          <Input placeholder="Company name" name="company-name" id="company-name" /> 
          <Input placeholder="Company name" name="company-name" id="company-name" /> 
          <Input placeholder="Company name" name="company-name" id="company-name" /> 
        </form>      
      </div>

      
      <Button onClick={handleSubmit}>Submit Application</Button>
    </div>
  );
}
