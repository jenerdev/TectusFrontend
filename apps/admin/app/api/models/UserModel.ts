export type LoginInForm = {
  email: string;
  password: string;
};

export interface LoginResponse {
  emailVerified: boolean;
  idToken: string;
  refreshToken: string;
  expiresIn: number;
}


export interface LogoutResponse {
  success: boolean;
  timestamp: string;
  message: string;
}