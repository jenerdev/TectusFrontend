'use client';
import { useState, useCallback, useEffect } from 'react';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface Tokens {
  token?: string;
  refreshToken?: string;
}

interface RefreshedTokens {
  idToken: string;
  refreshToken: string;
}

export interface HttpOptions<TBody = any> {
  method?: HttpMethod;
  headers?: Record<string, string>;
  body?: TBody;
  auto?: boolean;
  token?: string;
  refreshToken?: string;
  getToken?: () => string | undefined;
  refreshAuthToken?: () => Promise<RefreshedTokens | null>;
}

export type HttpError = {
  statusCode: number;
  error: string;
  code: string;
  message: string;
};

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

      const getTokenValue = baseOptions.getToken?.();
      let token = overrideOptions.token ?? baseOptions.token ?? getTokenValue;

      const body = overrideOptions.body ?? baseOptions.body;
      const isFormData = body instanceof FormData;

      const defaultHeaders: Record<string, string> = isFormData
        ? {}
        : { 'Content-Type': 'application/json' };

      const headers: Record<string, string> = {
        ...defaultHeaders,
        ...(baseOptions.headers ?? {}),
        ...(overrideOptions.headers ?? {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      };

      const method = overrideOptions.method ?? baseOptions.method ?? 'GET';
      const payload = isFormData ? body : body ? JSON.stringify(body) : undefined;

      const attemptRequest = async (
        customHeaders: Record<string, string> = headers,
        retry = true,
      ): Promise<{ data: TResponse | null; error: HttpError | null }> => {
        try {
          const response = await fetch(url, {
            method,
            headers: customHeaders,
            body: payload,
          });

          if (!response.ok) {
            const errorResponse = await response.json().catch(() => ({}));
            const errObj: HttpError = {
              statusCode: response.status,
              error: errorResponse.error ?? 'RequestError',
              code: errorResponse.code ?? 'UNKNOWN_ERROR',
              message: errorResponse.message ?? 'Request failed',
            };

            // Retry if token expired and handler provided
            if (response.status === 403 && retry && token && baseOptions.refreshAuthToken) {
              const newTokens = await baseOptions.refreshAuthToken();
              if (newTokens?.idToken) {
                token = newTokens.idToken;

                // TODO: remove refreshToken here
                // update token on user store

                return attemptRequest(
                  { ...headers, Authorization: `Bearer ${token}` },
                  false, // prevent infinite retry
                );
              }
            }

            setError(errObj);
            return { data: null, error: errObj };
          }

          const jsonData = await response.json().catch(() => null);
          setData(jsonData);
          return { data: jsonData, error: null };
        } catch (err: any) {
          const fallbackError: HttpError = {
            statusCode: 500,
            error: 'FetchError',
            code: 'NETWORK_ERROR',
            message: err instanceof Error ? err.message : 'Unknown error',
          };
          setError(fallbackError);
          return { data: null, error: fallbackError };
        } finally {
          setLoading(false);
        }
      };

      return attemptRequest();
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
