
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';

interface FormActionsProps {
  isEditing: boolean;
  isSubmitting: boolean;
  onCancel?: () => void;
  hasErrors?: boolean;
}

const FormActions: React.FC<FormActionsProps> = ({ 
  isEditing, 
  isSubmitting, 
  onCancel,
  hasErrors = false
}) => {
  const navigate = useNavigate();
  
  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      navigate('/agencies');
    }
  };

  return (
    <div className="flex justify-end gap-3">
      {hasErrors && (
        <div className="flex items-center text-destructive mr-auto">
          <AlertCircle className="h-4 w-4 mr-1" />
          <span className="text-sm">Please fix the errors before submitting</span>
        </div>
      )}
      <Button 
        type="button" 
        variant="outline" 
        onClick={handleCancel}
        disabled={isSubmitting}
      >
        Cancel
      </Button>
      <Button type="submit" disabled={isSubmitting || hasErrors}>
        {isSubmitting ? 'Saving...' : isEditing ? 'Update Agency' : 'Add Agency'}
      </Button>
    </div>
  );
};

export default FormActions;
