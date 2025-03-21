
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import {
  Building,
  Globe,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Calendar,
  Edit,
  ArrowLeft,
  ExternalLink,
  Trash2,
} from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { toast } from 'sonner';
import { Agency } from '@/types';
import { cn } from '@/lib/utils';

// Mock agencies data (same as in Agencies.tsx)
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
    createdAt: '2023-08-03T10:20:15Z',
    updatedAt: '2023-08-03T10:20:15Z',
  },
];

// Format date string
const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const AgencyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [agency, setAgency] = useState<Agency | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch agency details
  useEffect(() => {
    setLoading(true);
    
    // Simulate API request
    setTimeout(() => {
      const foundAgency = mockAgencies.find(a => a.id === id);
      setAgency(foundAgency || null);
      setLoading(false);
    }, 800);
  }, [id]);

  // Handle delete agency
  const handleDeleteAgency = () => {
    // In a real app, you would send a request to delete the agency
    console.log('Deleting agency:', id);
    
    // Show success toast
    toast.success('Agency deleted successfully!');
    
    // Navigate back to agencies list
    navigate('/agencies');
  };

  // If loading, show skeleton
  if (loading) {
    return (
      <MainLayout>
        <div className="animate-pulse space-y-8">
          <div className="h-8 w-48 bg-muted/50 rounded-md"></div>
          <div className="h-12 w-3/4 bg-muted/50 rounded-md"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="h-[400px] bg-muted/30 rounded-lg col-span-2"></div>
            <div className="h-[400px] bg-muted/30 rounded-lg"></div>
          </div>
        </div>
      </MainLayout>
    );
  }

  // If agency not found
  if (!agency) {
    return (
      <MainLayout>
        <div className="text-center py-12">
          <div className="bg-muted/30 inline-flex items-center justify-center p-6 rounded-full mb-4">
            <Building className="h-10 w-10 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Agency Not Found</h2>
          <p className="text-muted-foreground max-w-md mx-auto mb-6">
            The agency you're looking for doesn't exist or has been removed.
          </p>
          <Button asChild>
            <Link to="/agencies">Back to Agencies</Link>
          </Button>
        </div>
      </MainLayout>
    );
  }

  // If agency is found
  return (
    <MainLayout>
      <div className="flex flex-col space-y-8">
        {/* Back link & actions */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <Button asChild variant="ghost" className="w-fit -ml-2">
            <Link to="/agencies" className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Agencies
            </Link>
          </Button>
          
          <div className="flex gap-2">
            <Button asChild variant="outline">
              <Link to={`/edit-agency/${agency.id}`}>
                <Edit className="mr-2 h-4 w-4" />
                Edit Agency
              </Link>
            </Button>
            
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete the
                    agency "{agency.name}" and all associated data.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDeleteAgency}>
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>

        {/* Agency header */}
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="h-20 w-20 md:h-24 md:w-24 rounded bg-primary/10 flex items-center justify-center">
            <Building className="h-10 w-10 text-primary" />
          </div>
          
          <div className="flex-1">
            <div className="flex flex-wrap gap-2 mb-2">
              {agency.category.map((cat, index) => (
                <Badge key={index} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                  {cat}
                </Badge>
              ))}
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{agency.name}</h1>
            
            <div className="flex items-center text-muted-foreground gap-6">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>{agency.city}, {agency.country}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>Added {formatDate(agency.createdAt)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-8">
            {/* Description */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">About</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {agency.description || "No description provided."}
                </p>
              </CardContent>
            </Card>
            
            {/* Map placeholder */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Location</h2>
                <div className="bg-muted/30 rounded-lg h-[300px] flex items-center justify-center">
                  <div className="text-center p-6">
                    <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground">
                      Interactive map will be displayed here
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex items-start gap-2 text-muted-foreground">
                  <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground">{agency.address}</p>
                    <p>{agency.city}{agency.state ? `, ${agency.state}` : ''} {agency.zipCode || ''}</p>
                    <p>{agency.country}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Information */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Phone</p>
                      <a href={`tel:${agency.phone}`} className="font-medium hover:text-primary transition-colors">
                        {agency.phone}
                      </a>
                    </div>
                  </li>
                  
                  <li className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Email</p>
                      <a href={`mailto:${agency.email}`} className="font-medium hover:text-primary transition-colors">
                        {agency.email}
                      </a>
                    </div>
                  </li>
                  
                  {agency.website && (
                    <li className="flex items-start gap-3">
                      <Globe className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Website</p>
                        <a 
                          href={agency.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="font-medium hover:text-primary transition-colors flex items-center"
                        >
                          {agency.website.replace(/^https?:\/\//, '')}
                          <ExternalLink className="h-3 w-3 ml-1" />
                        </a>
                      </div>
                    </li>
                  )}
                </ul>
              </CardContent>
            </Card>

            {/* Social Media */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Social Media</h2>
                
                {Object.entries(agency.socialMedia).filter(([_, url]) => url).length > 0 ? (
                  <div className="grid grid-cols-2 gap-4">
                    {agency.socialMedia.facebook && (
                      <a 
                        href={agency.socialMedia.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                          "flex items-center gap-2 p-3 rounded-lg",
                          "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20",
                          "transition-colors"
                        )}
                      >
                        <Facebook className="h-5 w-5" />
                        <span className="font-medium">Facebook</span>
                      </a>
                    )}
                    
                    {agency.socialMedia.instagram && (
                      <a 
                        href={agency.socialMedia.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                          "flex items-center gap-2 p-3 rounded-lg",
                          "bg-pink-500/10 text-pink-500 hover:bg-pink-500/20",
                          "transition-colors"
                        )}
                      >
                        <Instagram className="h-5 w-5" />
                        <span className="font-medium">Instagram</span>
                      </a>
                    )}
                    
                    {agency.socialMedia.twitter && (
                      <a 
                        href={agency.socialMedia.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                          "flex items-center gap-2 p-3 rounded-lg",
                          "bg-sky-500/10 text-sky-500 hover:bg-sky-500/20",
                          "transition-colors"
                        )}
                      >
                        <Twitter className="h-5 w-5" />
                        <span className="font-medium">Twitter</span>
                      </a>
                    )}
                    
                    {agency.socialMedia.linkedin && (
                      <a 
                        href={agency.socialMedia.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                          "flex items-center gap-2 p-3 rounded-lg",
                          "bg-blue-600/10 text-blue-600 hover:bg-blue-600/20",
                          "transition-colors"
                        )}
                      >
                        <Linkedin className="h-5 w-5" />
                        <span className="font-medium">LinkedIn</span>
                      </a>
                    )}
                  </div>
                ) : (
                  <p className="text-muted-foreground">No social media profiles available.</p>
                )}
              </CardContent>
            </Card>

            {/* Metadata */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Metadata</h2>
                <dl className="space-y-4">
                  <div>
                    <dt className="text-sm text-muted-foreground">Created On</dt>
                    <dd className="font-medium">{formatDate(agency.createdAt)}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-muted-foreground">Last Updated</dt>
                    <dd className="font-medium">{formatDate(agency.updatedAt)}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-muted-foreground">ID</dt>
                    <dd className="font-medium text-xs truncate text-muted-foreground">
                      {agency.id}
                    </dd>
                  </div>
                </dl>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default AgencyDetail;
