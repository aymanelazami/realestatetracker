
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Building, Mail, Phone, MapPin, Edit, Globe, User, Calendar } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Agency } from '@/types';
import { cn } from '@/lib/utils';

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

const AgencyProfile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [agency, setAgency] = useState<Agency | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || user.role !== 'agency') {
      navigate('/dashboard');
      return;
    }

    setLoading(true);
    
    // Simulate API request to fetch agency data based on user.agencyId
    setTimeout(() => {
      // For demo, we'll use the first agency if user.agencyId is not set
      const agencyId = user.agencyId || '1';
      const foundAgency = mockAgencies.find(a => a.id === agencyId);
      setAgency(foundAgency || null);
      setLoading(false);
    }, 800);
  }, [user, navigate]);

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

  if (!agency) {
    return (
      <MainLayout>
        <div className="text-center py-12">
          <div className="bg-muted/30 inline-flex items-center justify-center p-6 rounded-full mb-4">
            <Building className="h-10 w-10 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Agency Profile Not Found</h2>
          <p className="text-muted-foreground max-w-md mx-auto mb-6">
            It looks like you don't have an agency profile yet.
          </p>
          <Button asChild>
            <a href="/add-agency">Create Agency Profile</a>
          </Button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="flex flex-col space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">My Agency Profile</h1>
            <p className="text-muted-foreground">Manage your agency's information and settings</p>
          </div>
          <Button asChild>
            <a href={`/edit-agency/${agency.id}`}>
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </a>
          </Button>
        </div>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="properties">Properties</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="md:col-span-2 space-y-8">
                {/* Agency Overview */}
                <Card>
                  <CardHeader>
                    <CardTitle>Agency Overview</CardTitle>
                    <CardDescription>Basic information about your agency</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col md:flex-row gap-6 items-start">
                      <div className="h-20 w-20 md:h-24 md:w-24 rounded bg-primary/10 flex items-center justify-center">
                        <Building className="h-10 w-10 text-primary" />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex flex-wrap gap-2 mb-2">
                          {agency.category.map((cat, index) => (
                            <span 
                              key={index} 
                              className="bg-secondary text-secondary-foreground text-xs px-2.5 py-0.5 rounded-full"
                            >
                              {cat}
                            </span>
                          ))}
                        </div>
                        
                        <h2 className="text-2xl font-bold">{agency.name}</h2>
                        
                        <div className="flex flex-wrap gap-4 text-muted-foreground mt-3">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            <span>{agency.city}, {agency.country}</span>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span>Since {formatDate(agency.createdAt)}</span>
                          </div>
                        </div>
                        
                        <Separator className="my-4" />
                        
                        <p className="text-muted-foreground leading-relaxed">
                          {agency.description || "No description provided."}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Activity Summary Placeholder */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Latest updates and interactions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-muted/30 p-8 rounded-lg flex items-center justify-center">
                      <p className="text-muted-foreground">Activity data will be displayed here</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Contact Information */}
                <Card>
                  <CardHeader>
                    <CardTitle>Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Phone className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Phone</p>
                        <p className="font-medium">{agency.phone}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Mail className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Email</p>
                        <p className="font-medium">{agency.email}</p>
                      </div>
                    </div>
                    
                    {agency.website && (
                      <div className="flex items-start gap-3">
                        <Globe className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Website</p>
                          <a 
                            href={agency.website} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="font-medium hover:text-primary transition-colors"
                          >
                            {agency.website.replace(/^https?:\/\//, '')}
                          </a>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Address</p>
                        <p className="font-medium">{agency.address}</p>
                        <p className="text-sm text-muted-foreground">
                          {agency.city}{agency.state ? `, ${agency.state}` : ''} {agency.zipCode || ''}
                          <br />
                          {agency.country}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Account Status */}
                <Card>
                  <CardHeader>
                    <CardTitle>Account Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <User className="h-5 w-5 text-primary" />
                        <span className="font-medium">Active</span>
                      </div>
                      <span className="px-2.5 py-0.5 bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400 rounded-full text-xs font-medium">
                        Verified
                      </span>
                    </div>
                    
                    <Separator className="my-4" />
                    
                    <div className="text-sm">
                      <dl className="space-y-2">
                        <div className="flex justify-between">
                          <dt className="text-muted-foreground">Account Type:</dt>
                          <dd className="font-medium">Agency</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-muted-foreground">Last Updated:</dt>
                          <dd>{formatDate(agency.updatedAt)}</dd>
                        </div>
                      </dl>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="properties">
            <Card>
              <CardContent className="p-12">
                <div className="text-center">
                  <Building className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No Properties Yet</h3>
                  <p className="text-muted-foreground max-w-md mx-auto mb-6">
                    You don't have any properties listed yet. Add your first property to showcase it to potential clients.
                  </p>
                  <Button>Add Your First Property</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="analytics">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Views</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted/30 h-[200px] rounded-md flex items-center justify-center">
                    <p className="text-muted-foreground">Analytics chart will be displayed here</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Engagement</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted/30 h-[200px] rounded-md flex items-center justify-center">
                    <p className="text-muted-foreground">Analytics chart will be displayed here</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Profile Settings</CardTitle>
                <CardDescription>Manage your agency profile settings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-muted/30 p-8 rounded-lg flex items-center justify-center">
                  <p className="text-muted-foreground">Settings options will be displayed here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default AgencyProfile;
