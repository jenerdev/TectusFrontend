export type ConfirmPasswordValues = {
  password: string;
  confirmPassword: string;
};

export type ResetPasswordPayload = {
  email: string;
  oobCode: string;
  newPassword: string;
};
