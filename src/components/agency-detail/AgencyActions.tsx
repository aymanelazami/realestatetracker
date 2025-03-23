
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { toast } from 'sonner';

interface AgencyActionsProps {
  agencyId: string;
  agencyName: string;
}

const AgencyActions: React.FC<AgencyActionsProps> = ({ agencyId, agencyName }) => {
  const navigate = useNavigate();

  // Handle delete agency
  const handleDeleteAgency = () => {
    // In a real app, you would send a request to delete the agency
    console.log('Deleting agency:', agencyId);
    
    // Show success toast
    toast.success('Agency deleted successfully!');
    
    // Navigate back to agencies list
    navigate('/agencies');
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <Button asChild variant="ghost" className="w-fit -ml-2">
        <Link to="/agencies" className="flex items-center">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Agencies
        </Link>
      </Button>
      
      <div className="flex gap-2">
        <Button asChild variant="outline">
          <Link to={`/edit-agency/${agencyId}`}>
            <Edit className="mr-2 h-4 w-4" />
            Edit Agency
          </Link>
        </Button>
        
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the
                agency "{agencyName}" and all associated data.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteAgency}>
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default AgencyActions;
