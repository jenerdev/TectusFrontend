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
