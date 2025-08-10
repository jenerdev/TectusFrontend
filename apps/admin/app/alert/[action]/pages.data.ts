import { PageContent, PageKey } from './types';

export const actionPagesData: Record<PageKey, PageContent> = {
  'individual-signup': {
    title: 'Individual application not yet available',
    subtitle: 'Sorry, individual accounts are invite only.',
    button: {
      text: 'OK',
      link: '/',
    },
  },
  'verify-email': {
    title: 'Verify your email',
    subtitle: 'Please check your email for the verification link we sent you.',
    button: {
      text: 'Refresh',
    },
  },
  'reset-password': {
    title: 'Reset password',
    subtitle: 'Please check your email for the password reset link',
    button: {
      text: 'Ok',
      link: '/reset-password',
    },
  },
  'application-submitted': {
    title: 'Application submitted',
    subtitle: 'Thanks for submitting your application. You’ll be notified once reviewed.',
    button: {
      text: 'Refresh',
      link: '/alert/application-approved',
    },
  },
  'application-rejected': {
    title: 'Application rejected',
    subtitle: 'We’re sorry to inform you that your application has been rejected.',
    button: {
      text: 'OK',
    },
  },
  'application-approved': {
    title: 'Welcome to Tectus GO',
    subtitle: 'Your application has been approved!',
    button: {
      text: 'Continue',
      link: '/dashboard',
    },
  },
};
