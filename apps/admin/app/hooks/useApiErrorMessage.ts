'use client';

import { ApiErrorCode, apiErrorMessageMapping } from '../constants';

export function useApiErrorMessage() {
  const getErrorMessage = (code: ApiErrorCode) => {
    return apiErrorMessageMapping[code] || apiErrorMessageMapping.GENERIC;
  };
  return {
    getErrorMessage,
  };
}
