
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface EditAgencyHeaderProps {
  onBack: () => void;
}

const EditAgencyHeader: React.FC<EditAgencyHeaderProps> = ({ onBack }) => {
  return (
    <div className="flex items-center mb-6">
      <Button 
        variant="ghost" 
        size="sm"
        onClick={onBack}
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
  );
};

export default EditAgencyHeader;
