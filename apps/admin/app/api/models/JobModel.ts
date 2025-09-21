export interface JobModel {
  id: string;
  client: {
    id: string;
    email: string;
    emailVerified: boolean;
    role: string;
    name: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    phoneVerified: boolean;
    rating: number;
    countryCode: string;
    createdAt: string;
    updatedAt: string;
  };
  title: string;
  description: string;
  category: string;
  categories: string[] | null;
  type: 'Instant' | 'Scheduled' | string;
  startAt: string;
  endAt: string;
  location: {
    address: string;
    lat: number;
    lng: number;
  };
  budget: string;
  clientNotes: string;
  numberOfPersonnel: number;
  status: 'Draft' | 'Bidding' | string;
  awardedVendor: string | null;
  createdAt: string;
  updatedAt: string;
  isArmed: boolean;
}

export type JobStatusType = 'active' | 'bidding' | 'completed' | 'available' | 'accepted';
