// 'use client';
// import { useState, useCallback, useEffect } from 'react';
// type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
// interface HttpOptions<TBody = any> {
//   method?: HttpMethod;
//   headers?: Record<string, string>;
//   body?: TBody;
//   auto?: boolean;
//   token?: string;
//   refreshToken?: string;
//   getTokens?: () => { token?: string; refreshToken?: string };
// }
// type HttpError = { message: string; statusCode?: number };
// export interface HttpState<TResponse> {
//   data: TResponse | null;
//   error: HttpError | null;
//   loading: boolean;
//   sendRequest: (
//     overrideOptions?: Partial<HttpOptions>,
//   ) => Promise<{ data: TResponse | null; error: HttpError | null }>;
// }
// export function useHttp<TResponse = any, TBody = any>(
//   url: string,
//   options: HttpOptions<TBody> = {},
// ): HttpState<TResponse> {
//   const [data, setData] = useState<TResponse | null>(null);
//   const [error, setError] = useState<HttpError | null>(null);
//   const [loading, setLoading] = useState(false);
//   const sendRequest = useCallback(
//     async (
//       overrideOptions?: Partial<HttpOptions>,
//     ): Promise<{ data: TResponse | null; error: HttpError | null }> => {
//       setLoading(true);
//       setError(null);
//       let { token, refreshToken } = options?.getTokens?.() || {};
//       if (overrideOptions?.token) token = overrideOptions.token;
//       if (overrideOptions?.refreshToken) refreshToken = overrideOptions.refreshToken;
//       const finalOptions: HttpOptions = {
//         method: options.method || 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           ...(options.headers || {}),
//           ...(token ? { Authorization: `Bearer ${token}` } : {}),
//           ...(overrideOptions?.headers || {}),
//         },
//         ...options,
//         ...overrideOptions,
//       };
//       const payload = finalOptions.body ? JSON.stringify(finalOptions.body) : undefined;
//       console.log('🔼 Request:', {
//         url,
//         method: finalOptions.method,
//         headers: finalOptions.headers,
//         body: finalOptions.body,
//       });
//       try {
//         const res = await fetch(url, {
//           method: finalOptions.method,
//           headers: finalOptions.headers,
//           body: payload,
//         });
//         const contentType = res.headers.get('content-type') || '';
//         if (!res.ok) {
//           let message = 'Unknown error';
//           try {
//             if (contentType.includes('application/json')) {
//               const json = await res.json();
//               message = json.message || message;
//             } else {
//               message = await res.text();
//             }
//           } catch (e) {
//             message = res.statusText;
//           }
//           const errObj: HttpError = {
//             message,
//             statusCode: res.status,
//           };
//           console.error('❌ Response Error:', errObj);
//           setError(errObj);
//           return { data: null, error: errObj };
//         }
//         const json = await res.json();
//         console.log('✅ Response:', json);
//         setData(json);
//         return { data: json, error: null };
//       } catch (err: any) {
//         const fallbackError: HttpError = {
//           message: err.message || 'Network error',
//         };
//         console.error('❌ Fetch Error:', fallbackError);
//         setError(fallbackError);
//         return { data: null, error: fallbackError };
//       } finally {
//         setLoading(false);
//       }
//     },
//     [url, options],
//   );
//   useEffect(() => {
//     if (options.auto) {
//       sendRequest();
//     }
//   }, [sendRequest, options.auto]);
//   return { data, error, loading, sendRequest };
// }
'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useHttp = useHttp;
const react_1 = require("react");
function useHttp(url, baseOptions = {}) {
    const [data, setData] = (0, react_1.useState)(null);
    const [error, setError] = (0, react_1.useState)(null);
    const [loading, setLoading] = (0, react_1.useState)(false);
    const sendRequest = (0, react_1.useCallback)(async (overrideOptions = {}) => {
        setLoading(true);
        setError(null);
        // Get tokens from baseOptions or overrideOptions
        const tokens = baseOptions.getTokens?.() || {};
        const token = overrideOptions.token ?? baseOptions.token ?? tokens.token;
        const refreshToken = overrideOptions.refreshToken ?? baseOptions.refreshToken ?? tokens.refreshToken;
        // Merge headers
        const headers = {
            'Content-Type': 'application/json',
            ...(baseOptions.headers ?? {}),
            ...(overrideOptions.headers ?? {}),
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        };
        const method = overrideOptions.method ?? baseOptions.method ?? 'GET';
        const body = overrideOptions.body ?? baseOptions.body;
        const payload = body ? JSON.stringify(body) : undefined;
        const finalUrl = url;
        console.log('🔼 Request:', { url: finalUrl, method, headers, body });
        try {
            const response = await fetch(finalUrl, { method, headers, body: payload });
            const contentType = response.headers.get('content-type') || '';
            const isJSON = contentType.includes('application/json');
            if (!response.ok) {
                const errorMessage = isJSON
                    ? (await response.json())?.message || response.statusText
                    : await response.text();
                const errObj = {
                    message: errorMessage || 'Unknown error',
                    statusCode: response.status,
                };
                console.error('❌ Response Error:', errObj);
                setError(errObj);
                return { data: null, error: errObj };
            }
            const jsonData = await response.json();
            console.log('✅ Response:', jsonData);
            setData(jsonData);
            return { data: jsonData, error: null };
        }
        catch (err) {
            const fallbackError = {
                message: err?.message || 'Network error',
            };
            console.error('❌ Fetch Error:', fallbackError);
            setError(fallbackError);
            return { data: null, error: fallbackError };
        }
        finally {
            setLoading(false);
        }
    }, [url, baseOptions]);
    (0, react_1.useEffect)(() => {
        if (baseOptions.auto) {
            sendRequest();
        }
    }, [sendRequest, baseOptions.auto]);
    return { data, error, loading, sendRequest };
}
