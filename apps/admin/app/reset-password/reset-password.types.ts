export type RepeatPasswordValues = {
  password: string;
  repeatPassword: string;
};

export type ResetPasswordPayload = {
  email: string;
  oobCode: string;
  newPassword: string;
};
