
import React from 'react';

interface AgencyListSkeletonProps {
  count?: number;
}

const AgencyListSkeleton: React.FC<AgencyListSkeletonProps> = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <div 
          key={index} 
          className="h-[300px] bg-muted/30 rounded-lg animate-pulse"
        />
      ))}
    </div>
  );
};

export default AgencyListSkeleton;
