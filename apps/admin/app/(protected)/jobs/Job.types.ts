export interface Job {
  id: string;
  title: string;
  description: string;
  categories: string[];
  type: 'Instant' | string; // can be a union if there are other possible values
  startAt: string; // ISO date string
  endAt: string; // ISO date string
  location: {
    address: string;
    lat: number;
    lng: number;
  }; // refine if you know the shape
  budget: string;
  clientNotes: string;
  numberOfPersonnel: number;
  status: 'Draft' | string; // union type if other statuses exist
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

export type JobStatusType = 'active' | 'bidding' | 'completed' | 'available';
