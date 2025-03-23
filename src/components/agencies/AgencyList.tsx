
import React from 'react';
import { Agency } from '@/types';
import AgencyCard from '@/components/agencies/AgencyCard';
import AgencyListSkeleton from '@/components/agencies/AgencyListSkeleton';
import EmptyAgencyList from '@/components/agencies/EmptyAgencyList';

interface AgencyListProps {
  agencies: Agency[];
  loading: boolean;
  resetFilters: () => void;
}

const AgencyList: React.FC<AgencyListProps> = ({
  agencies,
  loading,
  resetFilters,
}) => {
  if (loading) {
    return <AgencyListSkeleton />;
  }

  if (agencies.length === 0) {
    return <EmptyAgencyList resetFilters={resetFilters} />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {agencies.map((agency, index) => (
        <AgencyCard 
          key={agency.id} 
          agency={agency} 
          className="animate-fade-in opacity-0"
          style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
        />
      ))}
    </div>
  );
};

export default AgencyList;
