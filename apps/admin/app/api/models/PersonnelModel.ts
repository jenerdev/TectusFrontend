export interface PersonnelModel {
  id: string;
  email: string;
  role: 'personnel' | 'admin';
  status: string;
  fullName: string | null;
  isActive: boolean;
}
