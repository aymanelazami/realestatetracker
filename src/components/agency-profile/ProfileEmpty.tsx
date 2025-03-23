
import React from 'react';
import { Button } from '@/components/ui/button';
import { Building } from 'lucide-react';

const ProfileEmpty: React.FC = () => {
  return (
    <div className="text-center py-12">
      <div className="bg-muted/30 inline-flex items-center justify-center p-6 rounded-full mb-4">
        <Building className="h-10 w-10 text-muted-foreground" />
      </div>
      <h2 className="text-2xl font-bold mb-2">Agency Profile Not Found</h2>
      <p className="text-muted-foreground max-w-md mx-auto mb-6">
        It looks like you don't have an agency profile yet.
      </p>
      <Button asChild>
        <a href="/add-agency">Create Agency Profile</a>
      </Button>
    </div>
  );
};

export default ProfileEmpty;
