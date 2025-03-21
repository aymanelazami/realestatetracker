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

export type UserRole = 'admin' | 'agency' | 'visitor';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  agencyId?: string;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role?: UserRole;
}
