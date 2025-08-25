'use client';

import { Container, Page } from '../../components';
import { useBEM, useForm } from '@tectus/hooks';
import './profile-page.scss';
import {
  FileAttachment,
  UiButton,
  UiCheckbox,
  UiFileUpload,
  UiSelect,
  UiSelectProps,
  UiTextField,
  UiTypography,
  useUiSnackbar,
} from '@tectus/ui';
import { ApplicationFormValues } from '@/app/(public)/submit-info/page';
import {
  ApiErrorCode,
  RANGES_OF_NUMBER_OPTIONS,
  STATE_CITIES,
  VENDOR_SERVICES,
  VENDOR_VEHICLES,
} from '@/app/constants';
import { User, UserStatus, UserSupportingDocument, useUserStore } from '@/store';
import { useCallback, useMemo, useState } from 'react';
import { useApi } from '@/app/hooks/useApi';
import { useApiErrorMessage } from '@/app/hooks';

type GroupedOptions = NonNullable<UiSelectProps['groupedOptions']>;
type attachmentType = 'logo' | 'insurance' | 'license';
type fileAttachments = Record<attachmentType, FileAttachment[]>;

export default function ProfilePage() {
  const { B, E } = useBEM('profile-page');
  const user = useUserStore((state) => state.user);
  const { getErrorMessage } = useApiErrorMessage();
  const { showSnackbar } = useUiSnackbar();
  const [mode, setMode] = useState<'view' | 'edit'>('view');

  const isViewMode = mode === 'view';

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
    email: user?.email || '',
    fullName: user?.fullName || '',
    contactNumber: user?.contactNumber || '',
    companyName: user?.companyName || '',
    legalEntity: user?.legalEntity || '',
    companyAddressLine1: user?.address || '',
    companyAddressLine2: '',
    yearFounded: String(user?.yearFounded) || '',
    website: user?.website || '',
    numberOfEmployees: user?.numberOfEmployees || '',
    numberOfContractors: user?.numberOfContractors || '',
    statesCovered: user?.statesCovered || [],
    citiesCovered: user?.citiesCovered || [],
    servicesOffered: user?.servicesOffered || [],
    vehiclesUsed: user?.vehiclesUsed || [],
    isInsured: Boolean(user?.isInsured),
    isCompanyLicensed: Boolean(user?.isCompanyLicensed),
    bio: user?.bio,
  });

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
    });

    showSnackbar('Profile successfully updated', 'success');
    setMode('view');
  };

  const cancelEditHandler = () => {
    setMode('view');
    reset();
  }

  return (
    <Page id="profile-page" className={B()}>
      <Container inner className={E('container')}>
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
                    readOnly={isViewMode}
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
                    readOnly={isViewMode}
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
                    readOnly={isViewMode}
                  />

                  <UiTextField
                    label="Company legal entity*"
                    {...register('legalEntity', {
                      ...required('Company Legal Entity is required.'),
                    })}
                    helperText={errors.legalEntity}
                    error={Boolean(errors.legalEntity)}
                    readOnly={isViewMode}
                  />
                  <UiTextField
                    label="Company address (Line 1)*"
                    {...register('companyAddressLine1', {
                      ...required('Company Address is required.'),
                    })}
                    helperText={errors.companyAddressLine1}
                    error={Boolean(errors.companyAddressLine1)}
                    googlePlaces
                    googlePlacesCountry="US"
                    onPlaceSelected={(place) => {
                      setValue('companyAddressLine1', place.formatted_address);
                    }}
                    readOnly={isViewMode}
                  />
                  <UiTextField
                    label="Company address (Line 2)"
                    {...register('companyAddressLine2')}
                    helperText={errors.companyAddressLine2}
                    error={Boolean(errors.companyAddressLine2)}
                    readOnly={isViewMode}
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
                    readOnly={isViewMode}
                  />
                  <UiTextField
                    label="Website"
                    {...register('website', {
                      ...url('Invalid website address.'),
                    })}
                    helperText={errors.website}
                    error={Boolean(errors.website)}
                    readOnly={isViewMode}
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
                    readOnly={isViewMode}
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
                    disabled={isViewMode}
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
                    readOnly={isViewMode}
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
                    readOnly={isViewMode}
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
                    readOnly={isViewMode}
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
                    readOnly={isViewMode}
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
                    readOnly={isViewMode}
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
                    readOnly={isViewMode}
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
                    disabled={isViewMode}
                  />

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
                        disabled={!values.isInsured || isViewMode}
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
                    disabled={isViewMode}
                  />
                </div>

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
                      disabled={!values.isCompanyLicensed || isViewMode}
                      className={E('upload-button')}
                    >
                      Add License
                    </UiButton>
                  }
                />
              </div>
            </div>
          </div>

          <div className={E('buttons')}>
            {mode === 'edit' ? (
              <>
                <UiButton type="button" onClick={cancelEditHandler} variant="outlined">
                  Cancel
                </UiButton>

                <UiButton
                  type="submit"
                  disabled={!isValid}
                  loading={uploadLoading || vendorLoading}
                >
                  Update
                </UiButton>
              </>
            ) : (
              <UiButton type="button" onClick={() => setMode('edit')}>
                Edit
              </UiButton>
            )}
          </div>
        </form>
      </Container>
    </Page>
  );
}
