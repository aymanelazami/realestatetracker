
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { Agency } from '@/types';
import { mockAgencies } from '@/data/mockAgencies';

// Profile Components
import ProfileHeader from '@/components/agency-profile/ProfileHeader';
import ProfileLoading from '@/components/agency-profile/ProfileLoading';
import ProfileEmpty from '@/components/agency-profile/ProfileEmpty';
import AgencyOverview from '@/components/agency-profile/AgencyOverview';
import ActivitySummary from '@/components/agency-profile/ActivitySummary';
import ContactInformation from '@/components/agency-profile/ContactInformation';
import AccountStatus from '@/components/agency-profile/AccountStatus';
import EmptyProperties from '@/components/agency-profile/EmptyProperties';
import AnalyticsPlaceholder from '@/components/agency-profile/AnalyticsPlaceholder';
import SettingsPlaceholder from '@/components/agency-profile/SettingsPlaceholder';

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
        <ProfileLoading />
      </MainLayout>
    );
  }

  if (!agency) {
    return (
      <MainLayout>
        <ProfileEmpty />
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="flex flex-col space-y-8">
        <ProfileHeader agency={agency} />

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
                <AgencyOverview agency={agency} />
                <ActivitySummary />
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <ContactInformation agency={agency} />
                <AccountStatus agency={agency} />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="properties">
            <EmptyProperties />
          </TabsContent>
          
          <TabsContent value="analytics">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AnalyticsPlaceholder title="Profile Views" />
              <AnalyticsPlaceholder title="Engagement" />
            </div>
          </TabsContent>
          
          <TabsContent value="settings">
            <SettingsPlaceholder />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default AgencyProfile;
