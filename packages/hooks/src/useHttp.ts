'use client';
import { useState, useCallback, useEffect } from 'react';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface HttpOptions<TBody = any> {
  method?: HttpMethod;
  headers?: Record<string, string>;
  body?: TBody;
  auto?: boolean;
}

type HttpError = { message: string; statusCode?: number };

interface HttpState<TResponse> {
  data: TResponse | null;
  error: HttpError | null;
  loading: boolean;
  sendRequest: (
    overrideOptions?: Partial<HttpOptions>,
  ) => Promise<{ data: TResponse | null; error: HttpError | null }>;
}

export function useHttp<TResponse = any, TBody = any>(
  url: string,
  options: HttpOptions<TBody> = {},
): HttpState<TResponse> {
  const [data, setData] = useState<TResponse | null>(null);
  const [error, setError] = useState<HttpError | null>(null);
  const [loading, setLoading] = useState(false);

  const sendRequest = useCallback(
    async (
      overrideOptions?: Partial<HttpOptions>,
    ): Promise<{ data: TResponse | null; error: HttpError | null }> => {
      setLoading(true);
      setError(null);

      const finalOptions: HttpOptions = {
        method: options.method || 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...(options.headers || {}),
          ...(overrideOptions?.headers || {}),
        },
        ...options,
        ...overrideOptions,
      };

      const payload = finalOptions.body ? JSON.stringify(finalOptions.body) : undefined;

      console.log('🔼 Request:', {
        url,
        method: finalOptions.method,
        headers: finalOptions.headers,
        body: finalOptions.body,
      });

      try {
        const res = await fetch(url, {
          method: finalOptions.method,
          headers: finalOptions.headers,
          body: payload,
        });

        const contentType = res.headers.get('content-type') || '';

        if (!res.ok) {
          let message = 'Unknown error';
          try {
            if (contentType.includes('application/json')) {
              const json = await res.json();
              message = json.message || message;
            } else {
              message = await res.text();
            }
          } catch (e) {
            message = res.statusText;
          }

          const errObj: HttpError = {
            message,
            statusCode: res.status,
          };

          console.error('❌ Response Error:', errObj);
          setError(errObj);
          return { data: null, error: errObj };
        }

        const json = await res.json();
        console.log('✅ Response:', json);
        setData(json);
        return { data: json, error: null };
      } catch (err: any) {
        const fallbackError: HttpError = {
          message: err.message || 'Network error',
        };
        console.error('❌ Fetch Error:', fallbackError);
        setError(fallbackError);
        return { data: null, error: fallbackError };
      } finally {
        setLoading(false);
      }
    },
    [url, options],
  );

  useEffect(() => {
    if (options.auto) {
      sendRequest();
    }
  }, [sendRequest, options.auto]);

  return { data, error, loading, sendRequest };
}
