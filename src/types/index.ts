
export interface Agency {
  id: string;
  name: string;
  description?: string;
  logo?: string;
  website?: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state?: string;
  zipCode?: string;
  country: string;
  category: string[];
  socialMedia: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    linkedin?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface AgencyFormData extends Omit<Agency, 'id' | 'createdAt' | 'updatedAt'> {}

export interface AgencyCardProps {
  agency: Agency;
  className?: string;
  style?: React.CSSProperties;
}

export interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: number;
    label: string;
    isPositive: boolean;
  };
}

export interface DashboardStats {
  totalAgencies: number;
  newAgenciesThisMonth: number;
  totalCategories: number;
  activeAgencies: number;
}

export type AgencyCategory = 
  | 'Residential'
  | 'Commercial'
  | 'Industrial'
  | 'Land'
  | 'Property Management'
  | 'Luxury'
  | 'Investment'
  | 'International';

export interface SearchFilters {
  category?: AgencyCategory | null;
  country?: string | null;
  city?: string | null;
  query?: string | null;
}
