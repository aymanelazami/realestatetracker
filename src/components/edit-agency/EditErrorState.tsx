
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface EditErrorStateProps {
  error: string;
  onBack: () => void;
}

const EditErrorState: React.FC<EditErrorStateProps> = ({ error, onBack }) => {
  return (
    <div className="max-w-3xl mx-auto py-8 text-center">
      <div className="bg-red-50 dark:bg-red-900/20 p-8 rounded-lg">
        <h2 className="text-2xl font-semibold text-red-600 dark:text-red-400 mb-2">
          {error}
        </h2>
        <p className="text-muted-foreground mb-6">
          Please check the URL and try again.
        </p>
        <Button onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Go Back
        </Button>
      </div>
    </div>
  );
};

export default EditErrorState;
