
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface FormActionsProps {
  isEditing: boolean;
  isSubmitting: boolean;
  onCancel?: () => void;
}

const FormActions: React.FC<FormActionsProps> = ({ 
  isEditing, 
  isSubmitting, 
  onCancel 
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
      <Button 
        type="button" 
        variant="outline" 
        onClick={handleCancel}
        disabled={isSubmitting}
      >
        Cancel
      </Button>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Saving...' : isEditing ? 'Update Agency' : 'Add Agency'}
      </Button>
    </div>
  );
};

export default FormActions;
