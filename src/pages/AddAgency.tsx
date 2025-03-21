
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import AgencyForm from '@/components/agencies/AgencyForm';

const AddAgency = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Add New Agency</h1>
          <p className="text-muted-foreground mt-1">
            Enter the details of the real estate agency you want to add.
          </p>
        </div>
        
        <AgencyForm />
      </div>
    </MainLayout>
  );
};

export default AddAgency;
