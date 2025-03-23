
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface EditNotFoundProps {
  onNavigate: (path: string) => void;
}

const EditNotFound: React.FC<EditNotFoundProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-3xl mx-auto py-8 text-center">
      <div className="bg-muted p-8 rounded-lg">
        <h2 className="text-2xl font-semibold mb-2">Agency Not Found</h2>
        <p className="text-muted-foreground mb-6">
          The agency you're looking for doesn't exist.
        </p>
        <Button onClick={() => onNavigate('/agencies')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Agencies
        </Button>
      </div>
    </div>
  );
};

export default EditNotFound;
