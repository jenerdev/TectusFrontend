import { HttpError } from '@tectus/hooks';

export type LoginDTO = {
  email: string;
  password: string;
};

export interface LogoutResponse {
  success: boolean;
  timestamp: string;
  message: string;
}

export enum AuthRoleEnum {
  PROVIDER = 'provider',
  PERSONNEL = 'personnel',
}

export interface AuthModel {
  idToken: string;
  refreshToken: string;
  expiresIn: number;
  emailVerified: boolean;
  role: AuthRoleEnum;
}

export interface ChangePasswordDTO {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ChangePasswordResponse {
  message: string;
  success: boolean;
}
