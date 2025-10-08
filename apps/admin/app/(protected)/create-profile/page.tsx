'use client';
import { UiButton, UiTextField, useUiSnackbar } from '@tectus/ui';
import { useBEM, useForm } from '@tectus/hooks';
import './create-profile.scss';
import { useRouter } from 'next/navigation';
import { PageBanner, useSignInForm } from '@/app/components';
import { usePersonnelApi } from '@/app/api';
import { useUserStore } from '@/store/userStore';
import { useMemo } from 'react';

type CreateProfileForm = {
  firstName: string;
  middleName: string;
  lastName: string;
  phoneNumber: string;
  bio: string;
};

export default function CreateProfile() {
  const router = useRouter();
  const { B, E } = useBEM('create-profile-page');
  const { showSnackbar } = useUiSnackbar();
  const { loading, createProfile } = usePersonnelApi(true)
  const { personnelInfo = {}, lastName, middleName, firstName, phoneNumber } = useUserStore((state) => state.personnel);

  const {
    register,
    handleSubmit,
    validate: { required, minLength },
    errors,
    reset,
    isValid
  } = useForm<CreateProfileForm>({
    firstName: firstName || '',
    middleName: middleName || '',
    lastName: lastName || '',
    phoneNumber: phoneNumber || '',
    bio: '',
  });

  const profileIsAlreadyCreated = useMemo(() => {
    return personnelInfo?.status !== "SignedUp";
  }, [personnelInfo?.status]);

  const actionLabel = useMemo(() => {
    return profileIsAlreadyCreated ? 'Update' : 'Create';
  }, [profileIsAlreadyCreated]);

  const handleOnSubmit = async (form: CreateProfileForm) => {
    const { middleName, ...values } = form;
    const res = await createProfile(values);

    if(res.error) {
      showSnackbar(res.error?.message, 'error');
      return;
    }
    showSnackbar('Profile created successfully', 'success');
    reset();
    const currentPersonnelData = useUserStore.getState().personnel;
    const fullName = [form.firstName, form.lastName].filter(Boolean).join(' ');
    useUserStore.getState().setPersonnel({
      ...currentPersonnelData,
      firstName: form.firstName,
      lastName: form.lastName,
      name: fullName,
      phoneNumber: form.phoneNumber,
      personnelInfo: {
        ...currentPersonnelData?.personnelInfo,
        contactNumber: form.phoneNumber,
        fullName,
        status: 'Pending'
      }
    });
    router.push('/application-submitted');
  };



  return (
    <div className={B()}>
      
      <div className={E('banner')}>
        <PageBanner
          title={`${actionLabel} your profile`}
          subtitle='Profile details are subject to approval by your company.'
          hideLogo
        />
      </div>

      <form className={E('form')} onSubmit={handleSubmit(handleOnSubmit)}>
        <UiTextField
          label="First name*"
          {...register('firstName', {
            ...required('Please enter your first name.'),
          })}
        />

        <UiTextField
          label="Middle name"
        />

        <UiTextField
          label="Last name*"
          {...register('lastName', {
            ...required('Please enter your last name.'),
          })}
        />

        <UiTextField
          label="Phone number*"
          {...register('phoneNumber', {
            ...required('Phone number is required.'),
            ...minLength(12, 'Invalid phone number'),
          })}
          helperText={errors.phoneNumber}
          error={Boolean(errors.phoneNumber)}
        />

        <UiTextField
          label="Bio*"
          {...register('bio', {
            ...required('Please enter your bio.'),
          })}
          type="text"
          helperText={errors.bio}
          error={Boolean(errors.bio)}
        />

        <UiButton type="submit" topspacing={3} loading={loading} disabled={!isValid}>
          {actionLabel} Profile
        </UiButton>
      </form>
    </div>
  );
}
