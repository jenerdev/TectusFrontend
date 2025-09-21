import { LoginDTO } from '@/app/api/models';

export interface SigninFormProps {
  onSubmit?: (data: LoginDTO) => void;
  loading?: boolean;
}
