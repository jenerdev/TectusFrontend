'use client';

import { useUserStore } from '@/store/userStore';
import { HttpState, useHttp } from '@tectus/hooks';
import { get } from 'http';
import { useCallback } from 'react';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

export function useApi<TResponse = any, TBody = any>(
  endpoint: string,
  options = {},
): HttpState<TResponse> {
  const url = `${BASE_URL}${endpoint}`;
  const { token, refreshToken } = useUserStore();

  const getTokens = useCallback(() => {
    return { token, refreshToken };
  }, [token, refreshToken]);

  return useHttp<TResponse, TBody>(url, { ...options, getTokens });
}
