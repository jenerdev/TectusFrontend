'use client';

import { Container, Page } from '../../components';
import { useBEM, useForm } from '@tectus/hooks';
import './profile-page.scss';
import {
  AppLink,
  FileAttachment,
  UiButton,
  UiCheckbox,
  UiFileUpload,
  UiIconButton,
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
import Image from 'next/image';

type GroupedOptions = NonNullable<UiSelectProps['groupedOptions']>;
type attachmentType = 'logo' | 'insurance' | 'license';
type fileAttachments = Record<attachmentType, FileAttachment[]>;

const MAX_FILE_UPLOAD = 100;

export default function ProfilePage() {
  const { B, E } = useBEM('profile-page');
  const user = useUserStore((state) => state.user);
  const { getErrorMessage } = useApiErrorMessage();
  const { showSnackbar } = useUiSnackbar();
  const [mode, setMode] = useState<'view' | 'edit'>('view');
  const [companyLogoError, setCompanyLogoError] = useState<boolean>(false);

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

  const [initialCurrentSupportingDocuments] = useState<
    UserSupportingDocument[]
  >(user?.supportingDocuments || []);

  const [currentSupportingDocuments, setCurrentSupportingDocuments] = useState<
    UserSupportingDocument[]
  >(initialCurrentSupportingDocuments);

  const [initialImageUrl] = useState<
    string
  >(user?.imageUrl || '');

  const [currentImageUrl, setCurrentImageUrl] = useState<
    string
  >(initialImageUrl);



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

  const isValidDocuments = (documents: UserSupportingDocument[]): boolean => {
    return documents.find((doc) => doc.error) ? false : true;
  };

  const onSubmitInternal = async (values: ApplicationFormValues) => {
    // if (files.logo.length === 0) {
    //   showSnackbar('Please upload a company logo.', 'error');
    //   return;
    // }

    if (values.isInsured || values.isCompanyLicensed) {
      const requiredDocs = [
        { enabled: values.isInsured, files: files.insurance, label: 'Certificate of Insurance', type: 'INSURANCE' },
        { enabled: values.isCompanyLicensed, files: files.license, label: 'License', type: 'LICENSE' },
      ];

      for (const { enabled, files: docFiles, label, type } of requiredDocs) {
        if (!enabled) continue;

        const hasExistingDocs = currentSupportingDocuments.find((doc) => doc.type === type);
        // Check if no files uploaded
        if (docFiles.length === 0 && !hasExistingDocs) {
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
    if (!isValidDocuments(insuranceDocuments)) {
      showSnackbar('Certificate of Insurance failed to upload. Please try again', 'error');
      return;
    }

    const licenseDocuments = await uploadPerAttachmentType('license');
    if (!isValidDocuments(licenseDocuments)) {
      showSnackbar('License failed to upload. Please try again', 'error');
      return;
    }

    const logoDocument = await uploadPerAttachmentType('logo');
    if (!isValidDocuments(logoDocument)) {
      showSnackbar('Company logo failed to upload. Please try again', 'error');
      return;
    }

    const allSupportingDocuments = [...insuranceDocuments, ...licenseDocuments, ...currentSupportingDocuments].map(
      ({ error, ...rest }) => rest,
    );

    let payload: User = {
      countryCode: 'US',
      fullName: values.fullName,
      companyName: values.companyName,
      legalEntity: values.legalEntity,
      address: [values.companyAddressLine1, values.companyAddressLine2].filter(Boolean).join(', '),
      yearFounded: Number(values.yearFounded),
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
      supportingDocuments: allSupportingDocuments,
      imageUrl: logoDocument[0]?.file || currentImageUrl,
      bio: values.bio,
    };

    if (Boolean(values.website)) {
      payload = {
        ...payload,
        website: values.website,
      };
    }

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
    setCurrentSupportingDocuments(initialCurrentSupportingDocuments);
    clearFiles('insurance');
    clearFiles('license');
    clearFiles('logo');

    setCurrentImageUrl(initialImageUrl);
    reset();
  };

  const handleRemoveDocument = (file: string) => {
    setCurrentSupportingDocuments((prev) => prev.filter((doc) => doc.file !== file));
  }

  const renderCurrentDocuments = (type: 'INSURANCE' | 'LICENSE') => {
    const documents = (currentSupportingDocuments || []).filter((doc) => doc.type === type);

    if (documents.length === 0) return null;

    const label = type === 'INSURANCE' ? 'Insurance' : 'License';

    return documents.map((doc, index) => (
      <div key={doc.file || `${type}-${index}`} className={E('current-document')}>
        <UiTypography variant="body1">
          {label} Document {index + 1}{' '}
        </UiTypography>

        <UiTypography variant="body1">
          {doc.expiry}
        </UiTypography>

        <div className={E('current-document-actions')}>
          
          <AppLink href={doc.file} target="_blank" rel="noopener noreferrer" download>
            <UiIconButton icon="Download" className={E('file-remove')} size='small' />
          </AppLink>

          <UiIconButton icon="Clear" className={E('file-remove')} size='small' disabled={isViewMode} onClick={() => handleRemoveDocument(doc.file)} />
        </div>
      </div>
    ));
  };

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
                    label="Company legal entity (Example: Tectus Protection, Inc)*"
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
                      <UiButton size="small" className={E('upload-button')} disabled={isViewMode}>
                        Change company logo*
                      </UiButton>
                    }
                    maxFiles={1}
                  />
                  {user?.imageUrl && !companyLogoError && (
                    <Image
                      src={user?.imageUrl}
                      alt="Company Logo"
                      height={100}
                      width={100}
                      style={{ height: '5rem', width: '5rem' }}
                      onError={() => {
                        setCompanyLogoError(true);
                      }}
                    />
                  )}
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

                      const isChecked = e.target.checked;
                      if (!isChecked) clearFiles('insurance');
                      setValue('isInsured', isChecked);
                    }}
                    className={E('company-insured')}
                    disabled={isViewMode}
                  />
                </div>

                {renderCurrentDocuments('INSURANCE')}

                <UiFileUpload
                  validTypes={['.pdf']}
                  onInvalidFile={() =>
                    showSnackbar('Invalid file type. Please upload a PDF file.', 'error')
                  }
                  isSubmitted={isSubmitAttempted}
                  files={files.insurance}
                  onFileUpload={(file) => handleFileUpload(file, 'insurance')}
                  onFileRemove={(index) => handleFileRemove(index, 'insurance')}
                  onExpiryChange={(index, expiry) => handleExpiryChange(index, expiry, 'insurance')}
                  disabled={
                    !values.isInsured || isViewMode || files.insurance.length >= MAX_FILE_UPLOAD
                  }
                  maxFiles={MAX_FILE_UPLOAD}
                  button={
                    <UiButton
                      size="small"
                      disabled={
                        !values.isInsured || isViewMode || files.insurance.length >= MAX_FILE_UPLOAD
                      }
                      className={E('upload-button')}
                    >
                      Add Certificate of Insurance
                    </UiButton>
                  }
                />
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

                {renderCurrentDocuments('LICENSE')}

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
                  disabled={
                    !values.isCompanyLicensed ||
                    isViewMode ||
                    files.license.length >= MAX_FILE_UPLOAD
                  }
                  maxFiles={MAX_FILE_UPLOAD}
                  button={
                    <UiButton
                      size="small"
                      disabled={
                        !values.isCompanyLicensed ||
                        isViewMode ||
                        files.license.length >= MAX_FILE_UPLOAD
                      }
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
              <UiButton type="button" onClick={() => {
                // TEMPORARY FIX to update isValid current value to enable update button
                setValue('isCompanyLicensed', values.isCompanyLicensed);
                setMode('edit');
              }}>
                Edit
              </UiButton>
            )}
          </div>
        </form>
      </Container>
    </Page>
  );
}
