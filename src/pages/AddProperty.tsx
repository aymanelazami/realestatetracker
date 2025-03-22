
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import PropertyForm from '@/components/properties/PropertyForm';
import { Building } from 'lucide-react';

const AddProperty = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Building className="h-6 w-6 text-primary" />
          <h1 className="text-3xl font-bold tracking-tight">Add New Property</h1>
        </div>
        <p className="text-muted-foreground">
          Enter the details of the property you want to add to your agency's portfolio.
        </p>
        
        <PropertyForm />
      </div>
    </MainLayout>
  );
};

export default AddProperty;
