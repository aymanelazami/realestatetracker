
import React from 'react';

const ProfileLoading: React.FC = () => {
  return (
    <div className="animate-pulse space-y-8">
      <div className="h-8 w-48 bg-muted/50 rounded-md"></div>
      <div className="h-12 w-3/4 bg-muted/50 rounded-md"></div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="h-[400px] bg-muted/30 rounded-lg col-span-2"></div>
        <div className="h-[400px] bg-muted/30 rounded-lg"></div>
      </div>
    </div>
  );
};

export default ProfileLoading;
