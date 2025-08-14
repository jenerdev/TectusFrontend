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
  'reset-password': {
    title: 'Reset password',
    subtitle: 'Please check your email for the password reset link',
    button: {
      text: 'Ok',
      link: '/reset-password',
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
