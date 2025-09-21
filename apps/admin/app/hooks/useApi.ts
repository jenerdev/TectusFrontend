'use client';

import { useUserStore } from '@/store';
import { HttpState, useHttp } from '@tectus/hooks';
import { ref } from 'process';
import { useCallback } from 'react';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

export function useApi<TResponse = any, TBody = any>(
  endpoint: string,
  options = {},
): HttpState<TResponse> {
  const url = `${BASE_URL}${endpoint}`;
  const { updateTokens, auth } = useUserStore();

  const getToken = useCallback(() => {
    return auth?.idToken;
  }, [auth?.idToken]);

  const refreshAuthToken = useCallback(async () => {
    // const refreshTokenUrl = `${BASE_URL}api/user/refreshAuth?refreshToken=${refreshToken}`;
    const refreshTokenUrl = `${BASE_URL}api/go/user/refreshAuth?refreshToken=${auth?.refreshToken}`;
    const response = await fetch(refreshTokenUrl, { method: 'POST' });
    if (!response.ok) return;
    const newTokens = await response.json();
    updateTokens({
      token: newTokens.idToken,
      refreshToken: newTokens.refreshToken,
    });

    return newTokens;
  }, [auth, updateTokens]);

  return useHttp<TResponse, TBody>(url, { ...options, getToken, refreshAuthToken });
}
