export type ApiErrorCode = 'GENERIC' | 'INVALID_OOB_CODE' | 'INVALID_LOGIN_CREDENTIALS';

export const apiErrorMessageMapping: Record<ApiErrorCode, string> = {
  GENERIC: 'An unknown error occurred. Please try again later.',
  INVALID_OOB_CODE:
    'The link or code you used is invalid or has expired. Please request a new one and try again.',
  INVALID_LOGIN_CREDENTIALS: 'Invalid email or password. Please try again.',
};
