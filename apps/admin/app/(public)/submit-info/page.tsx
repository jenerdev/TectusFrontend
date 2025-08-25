'use client';
import {
  UiButton,
  UiModal,
  UiSelect,
  UiTextField,
  UiTypography,
  useUiSnackbar,
  UiSelectProps,
} from '@tectus/ui';
import { useBEM, useForm } from '@tectus/hooks';
import './submit-info-page.scss';
import { useRouter } from 'next/navigation';
import { UiCheckbox } from '@tectus/ui';
import { User, UserStatus, UserSupportingDocument, useUserStore } from '@/store';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FileAttachment, UiFileUpload } from '@tectus/ui';
// import { isValidUSPhone } from '@tectus/utils'; TODO: need fix
import Image from 'next/image';
import { useApi, useApiErrorMessage, useProtectedRoute } from '@/app/hooks';
import { ApiErrorCode, STATE_CITIES, VENDOR_SERVICES, VENDOR_VEHICLES, RANGES_OF_NUMBER_OPTIONS } from '@/app/constants';

export interface ApplicationFormValues extends Omit<User, 'address' | 'yearFounded'> {
  companyAddressLine1: string;
  companyAddressLine2: string;
  yearFounded?: string;
}

type attachmentType = 'logo' | 'insurance' | 'license';
type fileAttachments = Record<attachmentType, FileAttachment[]>;


type GroupedOptions = NonNullable<UiSelectProps['groupedOptions']>;
export default function SubmitInfo() {
  const { B, E } = useBEM('submit-info-page');
  const { getErrorMessage } = useApiErrorMessage();
  const router = useRouter();
  const user = useUserStore((state) => state.user);
  const [agreedWithTermsAndConditions, setAgreedWithTermsAndConditions] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const { showSnackbar } = useUiSnackbar();

  const { loading: uploadLoading, sendRequest: uploadRequest } = useApi(`files/images/upload`, {
    method: 'POST',
  });

  const { loading: vendorLoading, sendRequest: vendorRequest } = useApi(`api/go/user/me`, {
    method: 'PUT',
  });

  const [files, setFiles] = useState<fileAttachments>({
    insurance: [],
    logo: [],
    license: [],
  });

  const uploadPerAttachmentType = useCallback(
    async (type: attachmentType): Promise<UserSupportingDocument[]> => {
      const filesToUpload = files[type].map((file) => file.file);
      if (filesToUpload.length === 0) return [];

      const uploadPromises = filesToUpload.map((file) => {
        const formData = new FormData();
        formData.append('file', file);

        return uploadRequest({
          body: formData,
          headers: {},
        });
      });
      const results = await Promise.all(uploadPromises);

      const parseResult = results.map((res, index) => {
        return {
          type: type.toUpperCase(),
          file: res.data?.url || '',
          expiry: files[type][index]?.expiry || null,
          details: res.error ? `Failed ${res.error.message}` : 'Upload successful',
        };
      });
      return parseResult;
    },
    [files],
  );

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

  const clearFiles = (type: attachmentType) => {
    setFiles((prev) => ({
      ...prev,
      [type]: [],
    }));
  };

  const onSubmitInternal = async (values: ApplicationFormValues) => {
    if (files.logo.length === 0) {
      showSnackbar('Please upload a company logo.', 'error');
      return;
    }

    if (values.isInsured || values.isCompanyLicensed) {
      const allFiles = [...files.insurance, ...files.license];
      const hasMissingExpiry = allFiles.some((file) => !file.expiry);

      // Check if no files uploaded
      if (allFiles.length === 0) {
        const docType = values.isInsured ? 'Certificate of Insurance' : 'License';
        showSnackbar(`Please upload at least one ${docType}.`, 'error', {
          anchorOrigin: { vertical: 'bottom', horizontal: 'left' },
        });
        return;
      }

      // Check if some files don't have expiry
      if (hasMissingExpiry) {
        showSnackbar('File expiration dates are required.', 'error');
        return;
      }
    }

    const insuranceDocuments = await uploadPerAttachmentType('insurance');
    const licenseDocuments = await uploadPerAttachmentType('license');
    const logoDocument = await uploadPerAttachmentType('logo');
    const payload: User = {
      countryCode: 'US',
      fullName: values.fullName,
      companyName: values.companyName,
      legalEntity: values.legalEntity,
      address: [values.companyAddressLine1, values.companyAddressLine2].filter(Boolean).join(', '),
      yearFounded: Number(values.yearFounded),
      website: values.website,
      statesCovered: values.statesCovered,
      citiesCovered: values.citiesCovered,
      vehiclesUsed: values.vehiclesUsed,
      servicesOffered: values.servicesOffered,
      contactNumber: values.contactNumber,
      numberOfEmployees: values.numberOfEmployees,
      numberOfContractors: values.numberOfContractors,
      isInsured: values.isInsured,
      isCompanyLicensed: values.isCompanyLicensed,
      // insuranceProvider: values.insuranceProvider,
      supportingDocuments: [...insuranceDocuments, ...licenseDocuments],
      imageUrl: logoDocument[0]?.file,
      bio: values.bio,
    };

    const submitDetailsResult = await vendorRequest({
      body: payload,
    });

    if (submitDetailsResult.error) {
      const errorMessage = getErrorMessage(submitDetailsResult.error?.message as ApiErrorCode);
      showSnackbar(errorMessage, 'error');
      return;
    }

    useUserStore.getState().setUser({
      ...user,
      ...payload,
      status: UserStatus.PENDING,
    });

    router.push('/application-submitted');
  };

  const {
    register,
    handleSubmit,
    validate: { required, url, minValue, maxValue, custom, minLength },
    errors,
    setValue,
    values,
    reset,
    isSubmitAttempted,
    isValid,
  } = useForm<ApplicationFormValues>({
    email: '',
    fullName: '',
    contactNumber: '',
    companyName: '',
    legalEntity: '',
    companyAddressLine1: '',
    companyAddressLine2: '',
    yearFounded: '',
    website: '',
    numberOfEmployees: '',
    numberOfContractors: '',
    statesCovered: [],
    citiesCovered: [],
    servicesOffered: [],
    vehiclesUsed: [],
    isInsured: false,
    // insuranceProvider: '',
    isCompanyLicensed: false,
    bio: '',
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

    let citiesGroupedByState: GroupedOptions = [];
    (values.statesCovered || []).forEach((state) => {
      const stateCities = (STATE_CITIES[state] || []).map((city) => ({ value: city, label: city }));

      citiesGroupedByState = [
        ...citiesGroupedByState,
        {
          label: state,
          options: stateCities,
        },
      ];
    });
    return citiesGroupedByState;
  }, [values.statesCovered]);

  const { isChecking } = useProtectedRoute();
  if (isChecking) return;

  return (
    <div className={B()}>
      {/* TODO: Create separate component */}
      <div className="header">
        <div className="header__container">
          <div className="header__logo">
            <Image src="/logo-tectus.png" alt="Logo" width={60} height={60} />
          </div>
        </div>
      </div>

      <UiTypography variant="h5" fontWeight={700} className={E('title')}>
        Submit your application
      </UiTypography>

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
                      // ...custom(
                      //   () => isValidUSPhone(values.contactNumber),
                      //   'Invalid phone number.',
                      // ),
                      ...minLength(10, 'Invalid phone number'),
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
                    {...register('legalEntity', {
                      ...required('Company Legal Entity is required.'),
                    })}
                    helperText={errors.legalEntity}
                    error={Boolean(errors.legalEntity)}
                  />
                  <UiTextField
                    label="Company address (Line 1)*"
                    {...register('companyAddressLine1')}
                    helperText={errors.companyAddressLine1}
                    error={Boolean(errors.companyAddressLine1)}
                    googlePlaces
                    googlePlacesCountry="US"
                    onPlaceSelected={(place) => {
                      setValue('companyAddressLine1', place.formatted_address);
                    }}
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
                    {...register('website', {
                      ...url('Invalid website address.'),
                    })}
                    helperText={errors.website}
                    error={Boolean(errors.website)}
                  />
                  <UiTextField
                    label="Company bio*"
                    {...register('bio', {
                      ...required('Company bio is required.'),
                    })}
                    helperText={errors.bio}
                    error={Boolean(errors.bio)}
                    multiline
                    rows={3}
                  />

                  <UiFileUpload
                    accept={['.jpg', '.jpeg', '.png', '.gif', '.webp']}
                    files={files.logo}
                    onFileUpload={(file) => handleFileUpload(file, 'logo')}
                    onFileRemove={(index) => handleFileRemove(index, 'logo')}
                    onExpiryChange={(index, expiry) => handleExpiryChange(index, expiry, 'logo')}
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
                  Personnel Stats
                </UiTypography>
                <div className={E('form-fields')}>
                  <UiSelect
                    label="Number of employees*"
                    options={RANGES_OF_NUMBER_OPTIONS}
                    fullWidth
                    register={register('numberOfEmployees', {
                      ...required('Number of employees is required.'),
                    })}
                    helperText={errors.numberOfEmployees}
                    error={Boolean(errors.numberOfEmployees)}
                  />
                  <UiSelect
                    label="Number of certified subcontractors*"
                    options={RANGES_OF_NUMBER_OPTIONS}
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
                    groupedOptions={citiesCoveredOptions}
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
                      // const isChecked = e.target.checked;
                      // if (!isChecked) clearFiles('insurance');
                      // setValue('isInsured', isChecked);

                      // setTimeout(() => {
                      //   reset('insuranceProvider');
                      // }, 250);
                      setValue('isInsured', e.target.checked);
                    }}
                    className={E('company-insured')}
                  />

                  {/* <UiTextField
                    label="Insurance provider*"
                    register={register('insuranceProvider', {
                      ...required('Insurance provider is required.'),
                      disabled: !values.isInsured,
                    })}
                    helperText={errors.insuranceProvider}
                    error={Boolean(errors.insuranceProvider)}
                    disabled={!values.isInsured}
                  /> */}

                  <UiFileUpload
                    validTypes={['.pdf']}
                    onInvalidFile={() =>
                      showSnackbar('Invalid file type. Please upload a PDF file.', 'error')
                    }
                    isSubmitted={isSubmitAttempted}
                    files={files.insurance}
                    onFileUpload={(file) => handleFileUpload(file, 'insurance')}
                    onFileRemove={(index) => handleFileRemove(index, 'insurance')}
                    onExpiryChange={(index, expiry) =>
                      handleExpiryChange(index, expiry, 'insurance')
                    }
                    disabled={!values.isInsured}
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
                    onChange={(e) => {
                      const isChecked = e.target.checked;
                      if (!isChecked) clearFiles('license');
                      setValue('isCompanyLicensed', isChecked);
                    }}
                    className={E('company-licensed')}
                  />

                  <UiFileUpload
                    validTypes={['.pdf']}
                    onInvalidFile={() =>
                      showSnackbar('Invalid file type. Please upload a PDF file.', 'error')
                    }
                    isSubmitted={isSubmitAttempted}
                    files={files.license}
                    onFileUpload={(file) => handleFileUpload(file, 'license')}
                    onFileRemove={(index) => handleFileRemove(index, 'license')}
                    onExpiryChange={(index, expiry) => handleExpiryChange(index, expiry, 'license')}
                    disabled={!values.isCompanyLicensed}
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
              <UiTypography
                className={E('terms')}
                variant="caption"
                onClick={() => setShowTerms(true)}
              >
                I accept the <span>Terms and Conditions</span>
              </UiTypography>
            }
            checked={agreedWithTermsAndConditions}
            onChange={(e) => setAgreedWithTermsAndConditions(e.target.checked)}
          />

          <UiButton
            type="submit"
            disabled={!agreedWithTermsAndConditions || !isValid}
            loading={uploadLoading || vendorLoading}
          >
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
            variant: 'text',
            closeOnClick: true,
            fontWeight: 400,
          color: 'inherit',
          },
          {
            label: 'Accept',
            action: 'accept',
            variant: 'text',
            closeOnClick: true,
            fontWeight: 400,

          },
        ]}
      >
        Welcome to Tectus! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit a
        maiores provident doloremque dolore ipsa fugiat at officiis, saepe unde libero architecto
        perspiciatis quod fuga ullam iste blanditiis ea ut! Lorem ipsum dolor sit amet, consectetur
        adipisicing elit. Reprehenderit a maiores provident doloremque dolore ipsa fugiat at
        officiis, saepe unde libero architecto perspiciatis quod fuga ullam iste blanditiis ea ut!
        <br />
        <br />
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit a maiores provident
        doloremque dolore ipsa fugiat at officiis, saepe unde libero architecto perspiciatis quod
        fuga ullam iste blanditiis ea ut! Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Reprehenderit a maiores provident doloremque dolore ipsa fugiat at officiis, saepe unde
        libero architecto perspiciatis quod fuga ullam iste blanditiis ea ut!
      </UiModal>
    </div>
  );
}
