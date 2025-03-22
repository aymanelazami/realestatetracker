
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import AgencyForm from '@/components/agencies/AgencyForm';
import { Agency } from '@/types';
import { useAuth } from '@/contexts/AuthContext';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

// Mock agencies data (same as in other files)
const mockAgencies: Agency[] = [
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
    createdAt: '2023-08-12T09:15:22Z',
    updatedAt: '2023-08-12T09:15:22Z',
  },
  {
    id: '3',
    name: 'Commercial Property Experts',
    description: 'The leading commercial property agency specializing in office spaces, retail, and industrial properties.',
    website: 'https://commercialpropexperts.com',
    email: 'info@cpe.com',
    phone: '+1 (555) 333-4444',
    address: '789 Business Blvd',
    city: 'Chicago',
    state: 'IL',
    zipCode: '60601',
    country: 'United States',
    category: ['Commercial', 'Industrial'],
    socialMedia: {
      linkedin: 'https://linkedin.com/company/commercial-property-experts',
      twitter: 'https://twitter.com/cpexperts',
    },
    createdAt: '2023-07-05T11:30:00Z',
    updatedAt: '2023-07-20T14:15:30Z',
  },
];

const EditAgency = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [agency, setAgency] = useState<Agency | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError('Agency ID is required');
      setLoading(false);
      return;
    }

    // Simulate API request to fetch agency data
    const timer = setTimeout(() => {
      const foundAgency = mockAgencies.find(a => a.id === id);
      
      if (foundAgency) {
        // Check if user has permission to edit this agency
        const hasPermission = 
          user?.role === 'admin' || 
          (user?.role === 'agency' && user?.agencyId === foundAgency.id);
        
        if (hasPermission) {
          setAgency(foundAgency);
        } else {
          setError('You do not have permission to edit this agency');
          toast.error('You do not have permission to edit this agency');
        }
      } else {
        setError('Agency not found');
        toast.error('Agency not found');
      }
      
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [id, user]);

  if (loading) {
    return (
      <MainLayout>
        <div className="max-w-3xl mx-auto py-8 space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-4 w-72 mt-2" />
            </div>
            <Skeleton className="h-10 w-24" />
          </div>
          
          <div className="space-y-6">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-24 w-full" />
            <div className="grid grid-cols-2 gap-4">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <div className="max-w-3xl mx-auto py-8 text-center">
          <div className="bg-red-50 dark:bg-red-900/20 p-8 rounded-lg">
            <h2 className="text-2xl font-semibold text-red-600 dark:text-red-400 mb-2">
              {error}
            </h2>
            <p className="text-muted-foreground mb-6">
              Please check the URL and try again.
            </p>
            <Button onClick={() => navigate(-1)}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go Back
            </Button>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!agency) {
    return (
      <MainLayout>
        <div className="max-w-3xl mx-auto py-8 text-center">
          <div className="bg-muted p-8 rounded-lg">
            <h2 className="text-2xl font-semibold mb-2">Agency Not Found</h2>
            <p className="text-muted-foreground mb-6">
              The agency you're looking for doesn't exist.
            </p>
            <Button onClick={() => navigate('/agencies')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Agencies
            </Button>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto py-8">
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate(-1)}
            className="mr-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Edit Agency</h1>
            <p className="text-muted-foreground">Update agency information</p>
          </div>
        </div>
        
        <AgencyForm initialData={agency} isEditing={true} />
      </div>
    </MainLayout>
  );
};

export default EditAgency;
