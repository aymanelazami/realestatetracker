
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import AgencyForm from '@/components/agencies/AgencyForm';
import { Agency } from '@/types';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { mockAgencies } from '@/data/mockAgencies';

// Components
import LoadingSkeleton from '@/components/edit-agency/LoadingSkeleton';
import EditErrorState from '@/components/edit-agency/EditErrorState';
import EditNotFound from '@/components/edit-agency/EditNotFound';
import EditAgencyHeader from '@/components/edit-agency/EditAgencyHeader';

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
        <LoadingSkeleton />
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <EditErrorState error={error} onBack={() => navigate(-1)} />
      </MainLayout>
    );
  }

  if (!agency) {
    return (
      <MainLayout>
        <EditNotFound onNavigate={navigate} />
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto py-8">
        <EditAgencyHeader onBack={() => navigate(-1)} />
        <AgencyForm initialData={agency} isEditing={true} />
      </div>
    </MainLayout>
  );
};

export default EditAgency;
