
import { Agency } from '@/types';

// Mock agencies data for the application
export const mockAgencies: Agency[] = [
  {
    id: '1',
    name: 'Skyline Properties',
    description: 'A leading residential and commercial real estate agency with over 20 years of experience in the market. We specialize in high-rise condominiums, office spaces, and retail properties in metropolitan areas.',
    website: 'https://skylineproperties.com',
    email: 'info@skylineproperties.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main Street, Suite 500',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    country: 'United States',
    category: ['Residential', 'Commercial'],
    socialMedia: {
      facebook: 'https://facebook.com/skylineproperties',
      instagram: 'https://instagram.com/skylineproperties',
    },
    subscriptionPlan: 'Premium',
    subscriptionStatus: 'Active',
    propertyLimit: 50,
    createdAt: '2023-08-15T14:23:45Z',
    updatedAt: '2023-08-15T14:23:45Z',
  },
  {
    id: '2',
    name: 'City Living Real Estate',
    description: 'Specialized in urban properties and luxury apartments in metropolitan areas.',
    website: 'https://cityliving.com',
    email: 'contact@cityliving.com',
    phone: '+1 (555) 987-6543',
    address: '456 Urban Avenue',
    city: 'Toronto',
    state: 'ON',
    zipCode: 'M5V 2A8',
    country: 'Canada',
    category: ['Residential', 'Luxury'],
    socialMedia: {
      instagram: 'https://instagram.com/cityliving',
      linkedin: 'https://linkedin.com/company/cityliving',
    },
    subscriptionPlan: 'Standard',
    subscriptionStatus: 'Active',
    propertyLimit: 25,
    createdAt: '2023-08-12T09:15:22Z',
    updatedAt: '2023-08-12T09:15:22Z',
  },
  {
    id: '3',
    name: 'Global Investments',
    description: 'International real estate investment firm focusing on commercial properties and development opportunities.',
    website: 'https://globalinvest.com',
    email: 'investors@globalinvest.com',
    phone: '+44 20 1234 5678',
    address: '10 Financial Square',
    city: 'London',
    country: 'United Kingdom',
    category: ['Investment', 'Commercial', 'International'],
    socialMedia: {
      linkedin: 'https://linkedin.com/company/globalinvestments',
      twitter: 'https://twitter.com/globalinvestments',
    },
    subscriptionPlan: 'Premium',
    subscriptionStatus: 'Active',
    propertyLimit: 50,
    createdAt: '2023-08-10T16:42:10Z',
    updatedAt: '2023-08-10T16:42:10Z',
  },
  {
    id: '4',
    name: 'Premium Properties',
    description: 'Luxury real estate specialists with a portfolio of exclusive properties in prime locations.',
    website: 'https://premiumproperties.com.au',
    email: 'hello@premiumproperties.com.au',
    phone: '+61 2 9876 5432',
    address: '25 Harbor View',
    city: 'Sydney',
    state: 'NSW',
    zipCode: '2000',
    country: 'Australia',
    category: ['Luxury', 'Residential'],
    socialMedia: {
      instagram: 'https://instagram.com/premiumproperties',
      facebook: 'https://facebook.com/premiumproperties',
    },
    subscriptionPlan: 'Premium',
    subscriptionStatus: 'Active',
    propertyLimit: 50,
    createdAt: '2023-08-08T11:30:00Z',
    updatedAt: '2023-08-08T11:30:00Z',
  },
  {
    id: '5',
    name: 'Industrial Spaces',
    description: 'Specialized in industrial real estate, warehouses, and manufacturing facilities.',
    website: 'https://industrialspaces.net',
    email: 'info@industrialspaces.net',
    phone: '+1 (555) 234-5678',
    address: '789 Factory Road',
    city: 'Chicago',
    state: 'IL',
    zipCode: '60607',
    country: 'United States',
    category: ['Industrial', 'Commercial'],
    socialMedia: {},
    subscriptionPlan: 'Basic',
    subscriptionStatus: 'Active',
    propertyLimit: 10,
    createdAt: '2023-08-05T13:45:30Z',
    updatedAt: '2023-08-05T13:45:30Z',
  },
  {
    id: '6',
    name: 'Land Development Co.',
    description: 'Specialists in land acquisition and development for residential and commercial projects.',
    website: 'https://landdevelopment.co',
    email: 'projects@landdevelopment.co',
    phone: '+1 (555) 876-5432',
    address: '567 Opportunity Drive',
    city: 'Phoenix',
    state: 'AZ',
    zipCode: '85001',
    country: 'United States',
    category: ['Land', 'Investment'],
    socialMedia: {
      linkedin: 'https://linkedin.com/company/landdevelopment',
    },
    subscriptionPlan: 'Standard',
    subscriptionStatus: 'Active',
    propertyLimit: 25,
    createdAt: '2023-08-03T10:20:15Z',
    updatedAt: '2023-08-03T10:20:15Z',
  },
];
