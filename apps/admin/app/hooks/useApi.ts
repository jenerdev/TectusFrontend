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
  const { token, refreshToken, updateTokens } = useUserStore();

  const getToken = useCallback(() => {
    return token;
  }, [token]);

  const refreshAuthToken = useCallback(async () => {
    const refreshTokenUrl = `${BASE_URL}api/user/refreshAuth?refreshToken=${refreshToken}`;
    const response = await fetch(refreshTokenUrl, { method: 'POST' });
    if (!response.ok) return;
    const newTokens = await response.json();
    updateTokens({
      token: newTokens.idToken,
      refreshToken: newTokens.refreshToken,
    });

    return newTokens;
  }, [refreshToken, updateTokens]);

  return useHttp<TResponse, TBody>(url, { ...options, getToken, refreshAuthToken });
}
