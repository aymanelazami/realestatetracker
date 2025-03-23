
import React from 'react';
import { Button } from '@/components/ui/button';
import { Filter } from 'lucide-react';

interface EmptyAgencyListProps {
  resetFilters: () => void;
}

const EmptyAgencyList: React.FC<EmptyAgencyListProps> = ({ resetFilters }) => {
  return (
    <div className="text-center py-12">
      <div className="bg-muted/30 inline-flex items-center justify-center p-6 rounded-full mb-4">
        <Filter className="h-10 w-10 text-muted-foreground" />
      </div>
      <h3 className="text-xl font-medium mb-2">No agencies found</h3>
      <p className="text-muted-foreground max-w-md mx-auto mb-6">
        No agencies match your current search criteria. Try adjusting your filters or search query.
      </p>
      <Button onClick={resetFilters} variant="outline">
        Reset Filters
      </Button>
    </div>
  );
};

export default EmptyAgencyList;
