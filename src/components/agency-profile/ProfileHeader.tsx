
import React from 'react';
import { Agency } from '@/types';
import { Button } from '@/components/ui/button';
import { Edit } from 'lucide-react';

interface ProfileHeaderProps {
  agency: Agency;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ agency }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">My Agency Profile</h1>
        <p className="text-muted-foreground">Manage your agency's information and settings</p>
      </div>
      <Button asChild>
        <a href={`/edit-agency/${agency.id}`}>
          <Edit className="h-4 w-4 mr-2" />
          Edit Profile
        </a>
      </Button>
    </div>
  );
};

export default ProfileHeader;
