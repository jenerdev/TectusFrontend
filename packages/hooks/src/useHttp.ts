'use client';
import { useState, useCallback, useEffect } from 'react';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface HttpOptions<TBody = any> {
  method?: HttpMethod;
  headers?: Record<string, string>;
  body?: TBody;
  auto?: boolean;
  token?: string;
  refreshToken?: string;
  getTokens?: () => { token?: string; refreshToken?: string };
}

type HttpError = { message: string; statusCode?: number };

export interface HttpState<TResponse> {
  data: TResponse | null;
  error: HttpError | null;
  loading: boolean;
  sendRequest: (
    overrideOptions?: Partial<HttpOptions>,
  ) => Promise<{ data: TResponse | null; error: HttpError | null }>;
}

export function useHttp<TResponse = any, TBody = any>(
  url: string,
  baseOptions: HttpOptions<TBody> = {},
): HttpState<TResponse> {
  const [data, setData] = useState<TResponse | null>(null);
  const [error, setError] = useState<HttpError | null>(null);
  const [loading, setLoading] = useState(false);

  const sendRequest = useCallback(
    async (
      overrideOptions: Partial<HttpOptions<TBody>> = {},
    ): Promise<{ data: TResponse | null; error: HttpError | null }> => {
      setLoading(true);
      setError(null);

      // Get tokens from baseOptions or overrideOptions
      const tokens = baseOptions.getTokens?.() || {};
      const token = overrideOptions.token ?? baseOptions.token ?? tokens.token;
      const refreshToken =
        overrideOptions.refreshToken ?? baseOptions.refreshToken ?? tokens.refreshToken;

      // Merge headers
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...(baseOptions.headers ?? {}),
        ...(overrideOptions.headers ?? {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      };

      const method = overrideOptions.method ?? baseOptions.method ?? 'GET';
      const body = overrideOptions.body ?? baseOptions.body;
      const payload = body ? JSON.stringify(body) : undefined;

      const finalUrl = url;

      try {
        const response = await fetch(finalUrl, { method, headers, body: payload });

        const contentType = response.headers.get('content-type') || '';
        const isJSON = contentType.includes('application/json');

        if (!response.ok) {
          const errorMessage = isJSON
            ? (await response.json())?.message || response.statusText
            : await response.text();

          const errObj: HttpError = {
            message: errorMessage || 'Unknown error',
            statusCode: response.status,
          };

          console.error('❌ Response Error:', errObj);
          setError(errObj);
          return { data: null, error: errObj };
        }

        const jsonData = await response.json();

        setData(jsonData);
        return { data: jsonData, error: null };
      } catch (err: any) {
        const fallbackError: HttpError = {
          message: err?.message || 'Network error',
        };
        console.error('❌ Fetch Error:', fallbackError);
        setError(fallbackError);
        return { data: null, error: fallbackError };
      } finally {
        setLoading(false);
      }
    },
    [url, baseOptions],
  );

  useEffect(() => {
    if (baseOptions.auto) {
      sendRequest();
    }
  }, [sendRequest, baseOptions.auto]);

  return { data, error, loading, sendRequest };
}
