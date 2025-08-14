'use client';
import {
  UiAutocomplete,
  UiButton,
  UiModal,
  UiSelect,
  UiSwitch,
  UiTextField,
  UiTypography,
  useUiSnackbar,
} from '@tectus/ui';
import { PageBanner } from '../components';
import { useBEM, useForm } from '@tectus/hooks';
import './submit-info-page.scss';
import { useRouter } from 'next/navigation';
import { UiCheckbox } from '@tectus/ui/UiCheckbox/UiCheckbox';
import { useUserStore } from '@/store';
import { useEffect, useMemo, useRef, useState } from 'react';
import { STATE_CITIES, VENDOR_SERVICES, VENDOR_VEHICLES } from '../constants';
import { FileAttachment, UiFileUpload } from '@tectus/ui';

export type ApplicationFormValues = {
  email: string;
  fullName: string;
  contactNumber: string;
  companyName: string;
  companyLegalEntity: string;
  companyAddressLine1: string;
  companyAddressLine2: string;
  yearFounded?: string;
  companyWebsite: string;
  numberOfEmployees: string;
  numberOfContractors: string;
  statesCovered: string[];
  citiesCovered: string[];
  servicesOffered: string[];
  vehiclesUsed?: string[];
  isInsured: boolean;
  insuranceProvider: string;
  isCompanyLicensed: boolean;
  companyBio: string;
};

type attachmentType = 'logo' | 'insurance' | 'license';
type fileAttachments = Record<attachmentType, FileAttachment[]>;

export default function SubmitInfo() {
  const { B, E } = useBEM('submit-info-page');
  const router = useRouter();
  const user = useUserStore((state) => state.user);
  const [agreedWithTermsAndConditions, setAgreedWithTermsAndConditions] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const { showSnackbar } = useUiSnackbar();

  const [files, setFiles] = useState<fileAttachments>({
    insurance: [],
    logo: [],
    license: [],
  });

  const handleFileUpload = (file: File, type: attachmentType) => {
    setFiles((prev) => ({
      ...prev,
      [type]: [...(prev[type] || []), { file, expiry: '' }],
    }));
  };

  const handleFileRemove = (index: number, type: attachmentType) => {
    setFiles((prev) => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index),
    }));
  };

  const handleExpiryChange = (index: number, newExpiry: string, type: attachmentType) => {
    setFiles((prev) => ({
      ...prev,
      [type]: prev[type].map((item, i) => (i === index ? { ...item, expiry: newExpiry } : item)),
    }));
  };

  const onSubmitInternal = (values: ApplicationFormValues) => {

    if(files.logo.length === 0) {
      showSnackbar('Please upload a company logo.', 'error', {
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center',
        },
      });
      return;
    }

    if(values.isInsured || values.isCompanyLicensed) {
      const filesDontHaveExpiry = [...files.insurance, ...files.license].some((item) => !item.expiry);
      if(filesDontHaveExpiry){
        showSnackbar('File expiration dates are required.', 'error', {
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'center',
          },
        });
        return;
      }
    }

    console.log(values);
  };

  const {
    register,
    handleSubmit,
    validate: { required, url, minValue, maxValue },
    errors,
    setValue,
    values,
    reset,
    isSubmitAttempted,
    isValid
  } = useForm<ApplicationFormValues>({
    email: '',
    fullName: '',
    contactNumber: '',
    companyName: '',
    companyLegalEntity: '',
    companyAddressLine1: '',
    companyAddressLine2: '',
    yearFounded: '',
    companyWebsite: '',
    numberOfEmployees: '',
    numberOfContractors: '',
    statesCovered: [],
    citiesCovered: [],
    servicesOffered: [],
    vehiclesUsed: [],
    isInsured: false,
    insuranceProvider: '',
    isCompanyLicensed: false,
    companyBio: '',
  });

  useEffect(() => {
    if (user?.email && !values.email) {
      setValue('email', user.email);
    }
  }, [user?.email, setValue, values]);

  const statesCoveredRef = useRef<string>('');
  useEffect(() => {
    const allStates = (values.statesCovered || []).join(',');
    if (statesCoveredRef.current === allStates) return;
    statesCoveredRef.current = allStates;
    if (!values.citiesCovered) return;
    reset('citiesCovered');
  }, [values.statesCovered, reset]);

  const citiesCoveredOptions = useMemo(() => {
    if ((values.statesCovered || []).length === 0) return [];

    let cities: string[] = [];
    values.statesCovered.forEach((state) => {
      cities = cities.concat(STATE_CITIES[state] || []);
    });
    return cities.map((city) => ({ value: city, label: city })) || [];
  }, [values.statesCovered]);

  return (
    <div className={B()}>
      {/* <PageBanner
        hideLogo
        title="Submit your information"
        subtitle="Please provide your company details subject to verification by Tectus."
      /> */}

      <div className={E('form-scroll')}>
        <form className={E('form')} onSubmit={handleSubmit(onSubmitInternal)}>
          <div className={E('form-layout')}>
            <div className={E('form-left')}>
              <div className={E('form-section')}>
                <UiTypography variant="h5" fontWeight={700} className={E('form-section-title')}>
                  Contact Info
                </UiTypography>
                <div className={E('form-fields')}>
                  <UiTextField label="Email" readOnly {...register('email')} />
                  <UiTextField
                    label="Full name*"
                    {...register('fullName', {
                      ...required('Full name is required.'),
                    })}
                    helperText={errors.fullName}
                    error={Boolean(errors.fullName)}
                  />
                  <UiTextField
                    label="Phone number*"
                    {...register('contactNumber', {
                      ...required('Phone number is required.'),
                    })}
                    helperText={errors.contactNumber}
                    error={Boolean(errors.contactNumber)}
                  />
                </div>
              </div>

              <div className={E('form-section')}>
                <UiTypography variant="h5" fontWeight={700} className={E('form-section-title')}>
                  Company Information
                </UiTypography>
                <div className={E('form-fields')}>
                  <UiTextField
                    label="Company name (DBA or Trade Name)*"
                    {...register('companyName', {
                      ...required(),
                    })}
                    helperText={errors.companyName}
                    error={Boolean(errors.companyName)}
                  />

                  <UiTextField
                    label="Company legal entity*"
                    {...register('companyLegalEntity', {
                      ...required('Company Legal Entity is required.'),
                    })}
                    helperText={errors.companyLegalEntity}
                    error={Boolean(errors.companyLegalEntity)}
                  />
                  <UiTextField
                    label="Company address (Line 1)*"
                    {...register('companyAddressLine1', {
                      ...required('Company Address is required.'),
                    })}
                    helperText={errors.companyAddressLine1}
                    error={Boolean(errors.companyAddressLine1)}
                  />
                  <UiTextField
                    label="Company address (Line 2)"
                    {...register('companyAddressLine2', {
                      ...required('Company Address Line 2 is required.'),
                    })}
                    helperText={errors.companyAddressLine2}
                    error={Boolean(errors.companyAddressLine2)}
                  />
                  <UiTextField
                    label="Year Founded*"
                    type="number"
                    {...register('yearFounded', {
                      ...required('Year Founded is required.'),
                      ...minValue(1900, 'Please enter a valid year'),
                      ...maxValue(new Date().getFullYear(), 'Please enter a valid year'),
                    })}
                    helperText={errors.yearFounded}
                    error={Boolean(errors.yearFounded)}
                  />
                  <UiTextField
                    label="Website"
                    {...register('companyWebsite', {
                      ...url('Invalid website address.'),
                    })}
                    helperText={errors.companyWebsite}
                    error={Boolean(errors.companyWebsite)}
                  />
                  <UiTextField
                    label="Company bio*"
                    {...register('companyBio', {
                      ...required('Company bio is required.'),
                    })}
                    helperText={errors.companyBio}
                    error={Boolean(errors.companyBio)}
                    multiline
                    rows={3}
                  />


                  <UiFileUpload
                    accept={['.jpg', '.jpeg', '.png', '.gif', '.webp']}
                    files={files.logo}
                    onFileUpload={(file) => handleFileUpload(file, 'logo')}
                    onFileRemove={(index) => handleFileRemove(index, 'logo')}
                    onExpiryChange={(index, expiry) =>
                      handleExpiryChange(index, expiry, 'logo')
                    }
                    button={
                      <UiButton size="small" className={E('upload-button')}>
                        Upload company logo*
                      </UiButton>
                    }
                    maxFiles={1}
                  />
                </div>
              </div>

              <div className={E('form-section')}>
                <UiTypography variant="h5" fontWeight={700} className={E('form-section-title')}>
                  Company Stats
                </UiTypography>
                <div className={E('form-fields')}>
                  <UiSelect
                    label="Number of employees*"
                    options={[
                      { value: '1-9', label: '1-9' },
                      { value: '11-49', label: '11-49' },
                      { value: '50-99', label: '50-99' },
                      { value: '100-199', label: '100-199' },
                      { value: '200-249', label: '200-249' },
                      { value: '250-499', label: '250-499' },
                      { value: '500-999', label: '500-999' },
                      { value: '1,000+', label: '1,000+' },
                    ]}
                    fullWidth
                    register={register('numberOfEmployees', {
                      ...required('Number of employees is required.'),
                    })}
                    helperText={errors.numberOfEmployees}
                    error={Boolean(errors.numberOfEmployees)}
                  />
                  <UiSelect
                    label="Number of certified subcontractors*"
                    options={[
                      { value: '1-9', label: '1-9' },
                      { value: '11-49', label: '11-49' },
                      { value: '50-99', label: '50-99' },
                      { value: '100-199', label: '100-199' },
                      { value: '200-249', label: '200-249' },
                      { value: '250-499', label: '250-499' },
                      { value: '500-999', label: '500-999' },
                      { value: '1,000+', label: '1,000+' },
                    ]}
                    fullWidth
                    register={register('numberOfContractors', {
                      ...required('Number of contractors is required.'),
                    })}
                    helperText={errors.numberOfContractors}
                    error={Boolean(errors.numberOfContractors)}
                  />
                </div>
              </div>
            </div>
            <div className={E('form-right')}>
              <div className={E('form-section')}>
                <UiTypography variant="h5" fontWeight={700} className={E('form-section-title')}>
                  Service Areas
                </UiTypography>
                <div className={E('form-fields')}>
                  <UiSelect
                    label="States Covered"
                    options={Object.keys(STATE_CITIES).map((key) => ({ value: key, label: key }))}
                    fullWidth
                    register={register('statesCovered', {
                      ...required('States covered is required.'),
                    })}
                    helperText={errors.statesCovered}
                    error={Boolean(errors.statesCovered)}
                    multiple
                    showCheckboxOption
                  />

                  <UiSelect
                    label="Cities Covered"
                    options={citiesCoveredOptions}
                    fullWidth
                    register={register('citiesCovered', {
                      ...required('Cities covered is required.'),
                      disabled: (values.statesCovered || []).length === 0,
                    })}
                    helperText={errors.citiesCovered}
                    error={Boolean(errors.citiesCovered)}
                    disabled={(values.statesCovered || []).length === 0}
                    multiple
                    showCheckboxOption
                  />
                </div>
              </div>

              <div className={E('form-section')}>
                <UiTypography variant="h5" fontWeight={700} className={E('form-section-title')}>
                  Services
                </UiTypography>
                <div className={E('form-fields')}>
                  <UiSelect
                    label="Services provided*"
                    options={VENDOR_SERVICES.map((opt) => ({ value: opt, label: opt }))}
                    fullWidth
                    register={register('servicesOffered', {
                      ...required('Services provided is required.'),
                    })}
                    helperText={errors.servicesOffered}
                    error={Boolean(errors.servicesOffered)}
                    multiple
                    showCheckboxOption
                  />

                  <UiSelect
                    label="Vehicles used*"
                    options={VENDOR_VEHICLES.map((opt) => ({ value: opt, label: opt }))}
                    fullWidth
                    register={register('vehiclesUsed', {
                      ...required('Vehicles used is required.'),
                    })}
                    helperText={errors.vehiclesUsed}
                    error={Boolean(errors.vehiclesUsed)}
                    multiple
                    showCheckboxOption
                  />
                </div>
              </div>

              <div className={E('form-section')}>
                <UiTypography variant="h5" fontWeight={700} className={E('form-section-title')}>
                  Insurance Information
                </UiTypography>
                <div className={E('form-fields')}>
                  <UiCheckbox
                    label="My company is insured"
                    checked={values.isInsured}
                    onChange={(e) => {
                      reset('insuranceProvider');
                      setValue('isInsured', e.target.checked);
                    }}
                    className={E('company-insured')}
                  />

                  <UiTextField
                    label="Insurance provider*"
                    register={register('insuranceProvider', {
                      ...required('Insurance provider is required.'),
                      disabled: !values.isInsured,
                    })}
                    helperText={errors.insuranceProvider}
                    error={Boolean(errors.insuranceProvider)}
                    disabled={!values.isInsured}
                  />

                  <UiFileUpload
                    isSubmitted={isSubmitAttempted}
                    files={files.insurance}
                    onFileUpload={(file) => handleFileUpload(file, 'insurance')}
                    onFileRemove={(index) => handleFileRemove(index, 'insurance')}
                    onExpiryChange={(index, expiry) =>
                      handleExpiryChange(index, expiry, 'insurance')
                    }
                    button={
                      <UiButton
                        size="small"
                        disabled={!values.isInsured}
                        className={E('upload-button')}
                      >
                        Add Certificate of Insurance
                      </UiButton>
                    }
                  />
                </div>
              </div>

              <div className={E('form-section')}>
                <UiTypography variant="h5" fontWeight={700} className={E('form-section-title')}>
                  Licensing Information
                </UiTypography>
                <div className={E('form-fields')}>
                  <UiCheckbox
                    label="My company is licensed"
                    checked={values.isCompanyLicensed}
                    onChange={(e) => setValue('isCompanyLicensed', e.target.checked)}
                    className={E('company-licensed')}
                  />

                  <UiFileUpload
                    isSubmitted={isSubmitAttempted}
                    files={files.license}
                    onFileUpload={(file) => handleFileUpload(file, 'license')}
                    onFileRemove={(index) => handleFileRemove(index, 'license')}
                    onExpiryChange={(index, expiry) =>
                      handleExpiryChange(index, expiry, 'license')
                    }
                    button={
                      <UiButton
                        size="small"
                        disabled={!values.isCompanyLicensed}
                        className={E('upload-button')}
                      >
                        Add License
                      </UiButton>
                    }
                  />
                </div>
              </div>
            </div>
          </div>

          <UiCheckbox
            label={
              <UiTypography className={E('terms')} variant="caption">
                I accept the <span>Terms and Conditions</span>
              </UiTypography>
            }
            checked={agreedWithTermsAndConditions}
            onClick={() => setShowTerms(true)}
          />

          <UiButton type="submit" disabled={!agreedWithTermsAndConditions || !isValid}>
            Submit application
          </UiButton>
        </form>
      </div>

      <UiModal
        open={showTerms}
        handleClose={() => setShowTerms(false)}
        handleActionButton={(action) => setAgreedWithTermsAndConditions(action === 'accept')}
        title="Terms and Conditions"
        actionButtons={[
          {
            label: 'Decline',
            action: 'decline',
            variant: 'outlined',
            closeOnClick: true,
          },
          {
            label: 'Accept',
            action: 'accept',
            variant: 'contained',
            closeOnClick: true,
          },
        ]}
      >
        Welcome to Tectus! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit a
        maiores provident doloremque dolore ipsa fugiat at officiis, saepe unde libero architecto
        perspiciatis quod fuga ullam iste blanditiis ea ut! Lorem ipsum dolor sit amet, consectetur
        adipisicing elit. Reprehenderit a maiores provident doloremque dolore ipsa fugiat at
        officiis, saepe unde libero architecto perspiciatis quod fuga ullam iste blanditiis ea ut!
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit a maiores provident
        doloremque dolore ipsa fugiat at officiis, saepe unde libero architecto perspiciatis quod
        fuga ullam iste blanditiis ea ut! Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Reprehenderit a maiores provident doloremque dolore ipsa fugiat at officiis, saepe unde
        libero architecto perspiciatis quod fuga ullam iste blanditiis ea ut!
      </UiModal>
    </div>
  );
}
