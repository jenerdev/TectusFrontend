type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
interface HttpOptions<TBody = any> {
    method?: HttpMethod;
    headers?: Record<string, string>;
    body?: TBody;
    auto?: boolean;
    token?: string;
    refreshToken?: string;
    getTokens?: () => {
        token?: string;
        refreshToken?: string;
    };
}
type HttpError = {
    message: string;
    statusCode?: number;
};
export interface HttpState<TResponse> {
    data: TResponse | null;
    error: HttpError | null;
    loading: boolean;
    sendRequest: (overrideOptions?: Partial<HttpOptions>) => Promise<{
        data: TResponse | null;
        error: HttpError | null;
    }>;
}
export declare function useHttp<TResponse = any, TBody = any>(url: string, baseOptions?: HttpOptions<TBody>): HttpState<TResponse>;
export {};
//# sourceMappingURL=useHttp.d.ts.map