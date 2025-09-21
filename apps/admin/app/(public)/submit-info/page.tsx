'use client';
import {
  UiButton,
  UiModal,
  UiSelect,
  UiTextField,
  UiTypography,
  useUiSnackbar,
  UiSelectProps,
  AppLink,
} from '@tectus/ui';
import { useBEM, useForm } from '@tectus/hooks';
import './submit-info-page.scss';
import { useRouter } from 'next/navigation';
import { UiCheckbox } from '@tectus/ui';
import { UserStatus, useUserStore } from '@/store';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FileAttachment, UiFileUpload } from '@tectus/ui';
// import { isValidUSPhone } from '@tectus/utils'; TODO: need fix
import Image from 'next/image';
import { useApi, useApiErrorMessage, useProtectedRoute } from '@/app/hooks';
import { ApiErrorCode, STATE_CITIES, VENDOR_SERVICES, VENDOR_VEHICLES, RANGES_OF_NUMBER_OPTIONS } from '@/app/constants';
import { VendorForm, VendorModel, VendorSupportingDocument } from '@/app/api/models';
import { useVendorApi } from '@/app/api';

type attachmentType = 'logo' | 'insurance' | 'license';
type fileAttachments = Record<attachmentType, FileAttachment[]>;


type GroupedOptions = NonNullable<UiSelectProps['groupedOptions']>;

const MAX_FILE_UPLOAD = 100;

export default function SubmitInfo() {
  const { B, E } = useBEM('submit-info-page');
  const { getErrorMessage } = useApiErrorMessage();
  const router = useRouter();
  const vendor = useUserStore((state) => state.vendor);
  const [agreedWithTermsAndConditions, setAgreedWithTermsAndConditions] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const { showSnackbar } = useUiSnackbar();

  // TODO: create a model and hook for this on /api
  const { loading: uploadLoading, sendRequest: uploadRequest } = useApi(`files/images/upload`, {
    method: 'POST',
  });

  const { loading: vendorLoading, saveVendorDetails } = useVendorApi();

  const [files, setFiles] = useState<fileAttachments>({
    insurance: [],
    logo: [],
    license: [],
  });

  const uploadPerAttachmentType = useCallback(
    async (type: attachmentType): Promise<VendorSupportingDocument[]> => {
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
          error: Boolean(res.error),
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

  const isValidDocuments = (documents: VendorSupportingDocument[]): boolean => {
    return documents.find(doc => doc.error) ? false : true;
  };

  const onSubmitInternal = async (values: VendorForm) => {
    if (files.logo.length === 0) {
      showSnackbar('Please upload a company logo.', 'error');
      return;
    }

    if (values.isInsured || values.isCompanyLicensed) {
      const requiredDocs = [
        { enabled: values.isInsured, files: files.insurance, label: 'Certificate of Insurance' },
        { enabled: values.isCompanyLicensed, files: files.license, label: 'License' },
      ];

      for (const { enabled, files: docFiles, label } of requiredDocs) {
        if (!enabled) continue;

        // Check if no files uploaded
        if (docFiles.length === 0) {
          showSnackbar(`Please upload at least one ${label}.`, 'error', {
            anchorOrigin: { vertical: 'bottom', horizontal: 'left' },
          });
          return;
        }

        // Check if any file is missing expiry
        const hasMissingExpiry = docFiles.some((file) => !file.expiry);
        if (hasMissingExpiry) {
          showSnackbar(`${label} expiration dates are required.`, 'error');
          return;
        }
      }
    }

    const insuranceDocuments = await uploadPerAttachmentType('insurance');
    if(!isValidDocuments(insuranceDocuments)) {
      showSnackbar('Certificate of Insurance failed to upload. Please try again', 'error');
      return;
    }

    const licenseDocuments = await uploadPerAttachmentType('license');
    if(!isValidDocuments(licenseDocuments)) {
      showSnackbar('License failed to upload. Please try again', 'error');
      return;
    }

    const logoDocument = await uploadPerAttachmentType('logo');
    if(!isValidDocuments(logoDocument)) {
      showSnackbar('Company logo failed to upload. Please try again', 'error');
      return;
    }

    const allSupportingDocuments = [...insuranceDocuments, ...licenseDocuments].map(({ error, ...rest }) => rest);

    const {email, ...formValues} = values;
    let payload: VendorModel = {
      ...formValues,
      countryCode: 'US',
      yearFounded: Number(values.yearFounded),
      supportingDocuments: allSupportingDocuments,
      imageUrl: logoDocument[0]?.file || '',
    };

    const submitDetailsResult = await saveVendorDetails(payload);

    if (submitDetailsResult.error) {
      const errorMessage = getErrorMessage(submitDetailsResult.error?.message as ApiErrorCode);
      showSnackbar(errorMessage, 'error');
      return;
    }

    if(vendor){
      useUserStore.getState().setVendor({
        ...vendor,
        ...payload,
        yearFounded: Number(payload.yearFounded),
        status: UserStatus.PENDING,
      });
    }

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
  } = useForm<VendorForm>({
    email: '',
    fullName: '',
    contactNumber: '',
    companyName: '',
    legalEntity: '',
    address: '',
    address2: '',
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
    countryCode: 'US',
    imageUrl: '',
    insuranceProvider: '',
    supportingDocuments: []
  });

  useEffect(() => {
    if (vendor?.email && !values.email) {
      setValue('email', vendor.email);
    }
  }, [vendor?.email, setValue, values]);

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
            <Image src="/logo-tectus-go.png" alt="Logo" width={60} height={60} />
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
                    label="Company legal entity (Example: Tectus Protection, Inc)*"
                    {...register('legalEntity', {
                      ...required('Company Legal Entity is required.'),
                    })}
                    helperText={errors.legalEntity}
                    error={Boolean(errors.legalEntity)}
                  />
                  <UiTextField
                    label="Company address (Line 1)*"
                    {...register('address', {
                      ...required('Company Address Line 1 is required.'),
                    })}
                    helperText={errors.address}
                    error={Boolean(errors.address)}
                    googlePlaces
                    googlePlacesCountry="US"
                    onPlaceSelected={(place) => {
                      setValue('address', place.formatted_address);
                    }}
                  />
                  <UiTextField
                    label="Company address (Line 2)"
                    {...register('address2', {
                      // ...required('Company Address Line 2 is required.'),
                    })}
                    helperText={errors.address2}
                    error={Boolean(errors.address2)}
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
                    // onInvalidFile={() =>
                    //   showSnackbar('Invalid file type. Please upload a valid image file.', 'error')
                    // }
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
                    label="Number of Independent Contractors*"
                    options={RANGES_OF_NUMBER_OPTIONS}
                    fullWidth
                    register={register('numberOfContractors', {
                      ...required('Number of Independent Contractors is required.'),
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
                      const isChecked = e.target.checked;
                      if (!isChecked) clearFiles('insurance');
                      setValue('isInsured', isChecked);
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
                    disabled={!values.isInsured || files.insurance.length >= MAX_FILE_UPLOAD}
                    maxFiles={MAX_FILE_UPLOAD}
                    button={
                      <UiButton
                        size="small"
                        disabled={!values.isInsured || files.insurance.length >= MAX_FILE_UPLOAD}
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
                    disabled={!values.isCompanyLicensed || files.license.length >= MAX_FILE_UPLOAD}
                    maxFiles={MAX_FILE_UPLOAD}
                    button={
                      <UiButton
                        size="small"
                        disabled={!values.isCompanyLicensed || files.license.length >= MAX_FILE_UPLOAD}
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
                // onClick={() => setShowTerms(true)}
              >
                I accept the <AppLink href="/terms-and-conditions" target='_blank'>Terms and Conditions</AppLink>
              </UiTypography>
            }
            checked={agreedWithTermsAndConditions}
            onChange={(e) => setAgreedWithTermsAndConditions(e.target.checked)}
          />

          <UiButton
            type="submit"
            disabled={!agreedWithTermsAndConditions || !isValid || files.logo.length === 0}
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
