import { LoginInForm } from "@/app/api/models";

export interface SigninFormProps {
  onSubmit?: (data: LoginInForm) => void;
  loading?: boolean;
}

