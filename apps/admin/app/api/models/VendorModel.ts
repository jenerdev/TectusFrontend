export interface VendorSupportingDocument {
  type: string;
  file: string;
  expiry: string | null;
  details: string;
  error?: boolean;
}

export interface VendorModel {
  address: string;
  address2: string;
  approvalDate?: string;
  approvalNotes?: string;
  bio: string;
  citiesCovered: string[];
  companyName: string;
  contactNumber: string;
  countryCode: string;
  createdAt?: string;
  email?: string;
  emailVerified?: boolean;
  fullName: string;
  id?: string;
  imageUrl: string;
  insuranceProvider: string;
  isCompanyLicensed: boolean;
  isInsured: boolean;
  legalEntity: string;
  numberOfContractors: string;
  numberOfEmployees: string;
  ownerUserId?: string;
  role?: string;
  servicesOffered: string[];
  statesCovered: string[];
  status?: string;
  supportingDocuments: VendorSupportingDocument[];
  updatedAt?: string;
  vehiclesUsed: string[];
  website: string;
  yearFounded: number;
}

export interface VendorForm
  extends Omit<VendorModel, 'yearFounded' | 'emailVerified' | 'role' | 'status'> {
  yearFounded: string;
}
