
import React from 'react';
import { Link } from 'react-router-dom';
import { Building } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AgencyNotFound: React.FC = () => {
  return (
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
  );
};

export default AgencyNotFound;
