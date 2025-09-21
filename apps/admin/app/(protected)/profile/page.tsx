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
import {
  ApiErrorCode,
  RANGES_OF_NUMBER_OPTIONS,
  STATE_CITIES,
  VENDOR_SERVICES,
  VENDOR_VEHICLES,
} from '@/app/constants';
import { UserStatus, useUserStore } from '@/store';
import { useCallback, useMemo, useState } from 'react';
import { useApi } from '@/app/hooks/useApi';
import { useApiErrorMessage } from '@/app/hooks';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { AuthRoleEnum, VendorForm, VendorSupportingDocument } from '@/app/api/models';
import { useVendorApi } from '@/app/api';

type GroupedOptions = NonNullable<UiSelectProps['groupedOptions']>;
type attachmentType = 'logo' | 'insurance' | 'license';
type fileAttachments = Record<attachmentType, FileAttachment[]>;

const MAX_FILE_UPLOAD = 100;

export default function ProfilePage() {
  const { B, E } = useBEM('profile-page');
  const vendor = useUserStore((state) => state.vendor);
  const { getErrorMessage } = useApiErrorMessage();
  const { showSnackbar } = useUiSnackbar();
  const [mode, setMode] = useState<'view' | 'edit'>('view');
  const [companyLogoError, setCompanyLogoError] = useState<boolean>(false);
  const userStatus = useUserStore.getState().getUserStatus();
  const router = useRouter();

  const isViewMode = mode === 'view';

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

  const [initialCurrentSupportingDocuments] = useState<VendorSupportingDocument[]>(
    vendor?.supportingDocuments || [],
  );

  const [currentSupportingDocuments, setCurrentSupportingDocuments] = useState<
    VendorSupportingDocument[]
  >(initialCurrentSupportingDocuments);

  const [initialImageUrl] = useState<string>(vendor?.imageUrl || '');

  const [currentImageUrl, setCurrentImageUrl] = useState<string>(initialImageUrl);

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
    email: vendor?.email || '',
    fullName: vendor?.fullName || '',
    contactNumber: vendor?.contactNumber || '',
    companyName: vendor?.companyName || '',
    legalEntity: vendor?.legalEntity || '',
    address: vendor?.address || '',
    address2: vendor?.address2 || '',
    yearFounded: String(vendor?.yearFounded) || '',
    website: vendor?.website || '',
    numberOfEmployees: vendor?.numberOfEmployees || '',
    numberOfContractors: vendor?.numberOfContractors || '',
    statesCovered: vendor?.statesCovered || [],
    citiesCovered: vendor?.citiesCovered || [],
    servicesOffered: vendor?.servicesOffered || [],
    vehiclesUsed: vendor?.vehiclesUsed || [],
    isInsured: Boolean(vendor?.isInsured),
    isCompanyLicensed: Boolean(vendor?.isCompanyLicensed),
    bio: vendor?.bio || '',
    countryCode: vendor?.countryCode || 'US',
    imageUrl: vendor?.imageUrl || '',
    insuranceProvider: vendor?.insuranceProvider || '',
    supportingDocuments: vendor?.supportingDocuments || [],
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

  const isValidDocuments = (documents: VendorSupportingDocument[]): boolean => {
    return documents.find((doc) => doc.error) ? false : true;
  };

  const onSubmitInternal = async (values: VendorForm) => {
    // if (files.logo.length === 0) {
    //   showSnackbar('Please upload a company logo.', 'error');
    //   return;
    // }

    if (values.isInsured || values.isCompanyLicensed) {
      const requiredDocs = [
        {
          enabled: values.isInsured,
          files: files.insurance,
          label: 'Certificate of Insurance',
          type: 'INSURANCE',
        },
        {
          enabled: values.isCompanyLicensed,
          files: files.license,
          label: 'License',
          type: 'LICENSE',
        },
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

    const allSupportingDocuments = [
      ...insuranceDocuments,
      ...licenseDocuments,
      ...currentSupportingDocuments,
    ].map(({ error, ...rest }) => rest);


    const {email, ...formValues} = values;
    const payload = {
      ...formValues,
      countryCode: 'US',
      imageUrl: logoDocument[0]?.file || currentImageUrl,
      supportingDocuments: allSupportingDocuments,
      yearFounded: Number(values.yearFounded),
    };

    const submitDetailsResult = await saveVendorDetails(payload);

    if (submitDetailsResult.error) {
      const errorMessage = getErrorMessage(submitDetailsResult.error?.message as ApiErrorCode);
      showSnackbar(errorMessage, 'error');
      return;
    }

    useUserStore.getState().setVendor({
      ...vendor,
      ...payload,
      email: vendor?.email || '',
      emailVerified: vendor?.emailVerified || false,
      yearFounded: Number(vendor?.yearFounded),
      role: vendor?.role as AuthRoleEnum,
      status: vendor?.status as string,
    });


    setCurrentSupportingDocuments(allSupportingDocuments);
    clearFiles('insurance');
    clearFiles('license');

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
  };

  const renderCurrentDocuments = (type: 'INSURANCE' | 'LICENSE') => {
    const documents = (currentSupportingDocuments || []).filter((doc) => doc.type === type);

    if (documents.length === 0) return null;

    const label = type === 'INSURANCE' ? 'Insurance' : 'License';

    return documents.map((doc, index) => (
      <div key={doc.file || `${type}-${index}`} className={E('current-document')}>
        <UiTypography variant="body1">
          {label} Document {index + 1}{' '}
        </UiTypography>

        <UiTypography variant="body1">{doc.expiry}</UiTypography>

        <div className={E('current-document-actions')}>
          <AppLink href={doc.file} target="_blank" rel="noopener noreferrer" download>
            <UiIconButton icon="Visibility" className={E('file-remove')} size='small' />
          </AppLink>

          <UiIconButton
            icon="Clear"
            className={E('file-remove')}
            size="small"
            disabled={isViewMode}
            onClick={() => handleRemoveDocument(doc.file)}
          />
        </div>
      </div>
    ));
  };

  const onBackHandler = () => {
    router.push('/application-submitted')
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
                    {...register('address', {
                      ...required('Company Address is required.'),
                    })}
                    helperText={errors.address}
                    error={Boolean(errors.address)}
                    googlePlaces
                    googlePlacesCountry="US"
                    onPlaceSelected={(place) => {
                      setValue('address', place.formatted_address);
                    }}
                    readOnly={isViewMode}
                  />
                  <UiTextField
                    label="Company address (Line 2)"
                    {...register('address2')}
                    helperText={errors.address2}
                    error={Boolean(errors.address2)}
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
                  {vendor?.imageUrl && !companyLogoError && (
                    <Image
                      src={vendor?.imageUrl}
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
            {!isViewMode ? (
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
              <>
                {userStatus === UserStatus.PENDING && (
                  <UiButton type="button" variant="outlined" onClick={onBackHandler}>
                    Back
                  </UiButton>
                )}
                <UiButton
                  type="button"
                  onClick={() => {

                    // Note: add settimeout to fix clicking update button
                    setTimeout(() => {
                        // TEMPORARY FIX to update isValid current value to enable update button
                      setValue('isCompanyLicensed', values.isCompanyLicensed);
                      setMode('edit');
                    }, 250)
                  }}
                >
                  Edit
                </UiButton>
              </>
            )}
          </div>
        </form>
      </Container>
    </Page>
  );
}
