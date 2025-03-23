
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { mockAgencies } from '@/data/mockAgencies';
import { Agency } from '@/types';
import AgencyDetailSkeleton from '@/components/agency-detail/AgencyDetailSkeleton';
import AgencyNotFound from '@/components/agency-detail/AgencyNotFound';
import AgencyHeader from '@/components/agency-detail/AgencyHeader';
import AgencyActions from '@/components/agency-detail/AgencyActions';
import AgencyAbout from '@/components/agency-detail/AgencyAbout';
import AgencyLocationMap from '@/components/agency-detail/AgencyLocationMap';
import AgencyContact from '@/components/agency-detail/AgencyContact';
import AgencySocialMedia from '@/components/agency-detail/AgencySocialMedia';
import AgencyMetadata from '@/components/agency-detail/AgencyMetadata';

const AgencyDetail = () => {
  const { id } = useParams<{ id: string }>();
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

  // If loading, show skeleton
  if (loading) {
    return (
      <MainLayout>
        <AgencyDetailSkeleton />
      </MainLayout>
    );
  }

  // If agency not found
  if (!agency) {
    return (
      <MainLayout>
        <AgencyNotFound />
      </MainLayout>
    );
  }

  // If agency is found
  return (
    <MainLayout>
      <div className="flex flex-col space-y-8">
        {/* Back link & actions */}
        <AgencyActions agencyId={agency.id} agencyName={agency.name} />

        {/* Agency header */}
        <AgencyHeader agency={agency} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-8">
            {/* Description */}
            <AgencyAbout description={agency.description} />
            
            {/* Map placeholder */}
            <AgencyLocationMap 
              address={agency.address}
              city={agency.city}
              state={agency.state}
              zipCode={agency.zipCode}
              country={agency.country}
            />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Information */}
            <AgencyContact 
              phone={agency.phone}
              email={agency.email}
              website={agency.website}
            />

            {/* Social Media */}
            <AgencySocialMedia socialMedia={agency.socialMedia} />

            {/* Metadata */}
            <AgencyMetadata 
              createdAt={agency.createdAt}
              updatedAt={agency.updatedAt}
              id={agency.id}
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default AgencyDetail;
