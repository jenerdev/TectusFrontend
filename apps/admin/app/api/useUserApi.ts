import { useApi } from '@/app/hooks';
import { LoginInForm, LoginResponse, LogoutResponse } from './models';
import endpoints from './endpoints';
import { HttpError } from '@tectus/hooks';


type useUserApiReturn = {
  loading: boolean;
  login: (values: LoginInForm) => Promise<{
        data: LoginResponse | null;
        error: HttpError | null;
    }>
  logout: () => Promise<{
        data: LogoutResponse | null;
        error: HttpError | null;
    }>
};

export const useUserApi = (): useUserApiReturn => {


  const { loading: loginLoading, sendRequest } = useApi<LoginResponse, LoginInForm>(
    endpoints.user.login,
    {
      method: 'POST',
    },
  );

  const { loading: logoutLoading, sendRequest: logoutRequest } = useApi<LogoutResponse, void>(
    endpoints.user.logout,
    {
      method: 'POST',
    },
  );

  const login = async (values: LoginInForm) => {
    const loginResult = await sendRequest({ body: values });
    return loginResult;
  }

  const logout = async () => {
    const logoutResult = await logoutRequest();
    return logoutResult;
  }

  return {
    loading: loginLoading || logoutLoading,
    login,
    logout,
  };
};
