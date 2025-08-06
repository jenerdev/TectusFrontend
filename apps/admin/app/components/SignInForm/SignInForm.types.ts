export type SigninFormValues = {
  email: string;
  password: string;
};

export interface SigninFormProps {
  onSubmit?: (data: SigninFormValues) => void;
  loading?: boolean;
}

export interface SigninPostResponse {
  emailVerified: boolean;
  idToken: string;
  refreshToken: string;
  expiresIn: number;
}
