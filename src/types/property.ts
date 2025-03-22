
export type PropertyType = 
  | 'Apartment'
  | 'House'
  | 'Commercial'
  | 'Land'
  | 'Office'
  | 'Retail'
  | 'Industrial'
  | 'Storage'
  | 'Other';

export type PropertyStatus = 
  | 'For Sale'
  | 'For Rent'
  | 'Sold'
  | 'Rented'
  | 'Under Contract'
  | 'Off Market';

export interface Property {
  id: string;
  title: string;
  description: string;
  type: PropertyType;
  status: PropertyStatus;
  price: number;
  area: number; // in square feet/meters
  bedrooms: number;
  bathrooms: number;
  features: string[];
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  latitude?: number;
  longitude?: number;
  images: string[];
  agencyId: string;
  createdAt: string;
  updatedAt: string;
}

export interface PropertyFormData extends Omit<Property, 'id' | 'createdAt' | 'updatedAt' | 'images'> {
  images: File[];
}
