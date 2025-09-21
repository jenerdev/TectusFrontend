import { useApi } from '@/app/hooks';
import {
  LoginDTO,
  AuthModel,
  LogoutResponse,
  ChangePasswordDTO,
  ChangePasswordResponse,
} from './models';
import endpoints from './endpoints';
import { HttpError } from '@tectus/hooks';

type useAuthApiType = {
  loading: boolean;
  login: (values: LoginDTO) => Promise<{
    data: AuthModel | null;
    error: HttpError | null;
  }>;
  logout: () => Promise<{
    data: LogoutResponse | null;
    error: HttpError | null;
  }>;

  changePassword: (values: ChangePasswordDTO) => Promise<{
    data: ChangePasswordResponse | null;
    error: HttpError | null;
  }>;
};

export const useAuthApi = (): useAuthApiType => {
  const { loading: loginLoading, sendRequest } = useApi<AuthModel, LoginDTO>(endpoints.user.login, {
    method: 'POST',
  });

  const { loading: logoutLoading, sendRequest: logoutRequest } = useApi<LogoutResponse, void>(
    endpoints.user.logout,
    {
      method: 'POST',
    },
  );

  const { loading: changePasswordLoading, sendRequest: changePasswordRequest } = useApi<
    ChangePasswordResponse,
    ChangePasswordDTO
  >(endpoints.user.changePassword, {
    method: 'PUT',
  });

  const login = async (values: LoginDTO) => await sendRequest({ body: values });

  const changePassword = async (values: ChangePasswordDTO) =>
    await changePasswordRequest({ body: values });

  return {
    loading: loginLoading || logoutLoading || changePasswordLoading,
    login,
    logout: logoutRequest,
    changePassword,
  };
};
