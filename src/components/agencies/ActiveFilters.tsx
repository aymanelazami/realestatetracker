
import React from 'react';
import { SearchFilters } from '@/types';
import { X } from 'lucide-react';

interface FilterChip {
  label: string;
  onRemove: () => void;
}

interface ActiveFiltersProps {
  filters: SearchFilters;
  resetFilters: () => void;
  applyFilters: (filters: SearchFilters) => void;
}

const ActiveFilters: React.FC<ActiveFiltersProps> = ({
  filters,
  resetFilters,
  applyFilters,
}) => {
  // Generate filter chips
  const generateFilterChips = (): FilterChip[] => {
    const chips: FilterChip[] = [];
    
    if (filters.category) {
      chips.push({
        label: `Category: ${filters.category}`,
        onRemove: () => {
          const newFilters = { ...filters, category: null };
          applyFilters(newFilters);
        }
      });
    }
    
    if (filters.country) {
      chips.push({
        label: `Country: ${filters.country}`,
        onRemove: () => {
          const newFilters = { ...filters, country: null };
          applyFilters(newFilters);
        }
      });
    }
    
    return chips;
  };

  const filterChips = generateFilterChips();
  
  if (filterChips.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2 items-center pt-1">
      <span className="text-sm text-muted-foreground">Active filters:</span>
      {filterChips.map((chip, index) => (
        <div 
          key={index}
          className="bg-secondary text-secondary-foreground text-sm px-3 py-1 rounded-full flex items-center gap-1"
        >
          {chip.label}
          <button 
            onClick={chip.onRemove}
            className="ml-1 rounded-full p-0.5 hover:bg-muted"
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      ))}
      {filterChips.length > 0 && (
        <button 
          onClick={resetFilters}
          className="text-sm text-primary hover:text-primary/80 transition-colors"
        >
          Clear all
        </button>
      )}
    </div>
  );
};

export default ActiveFilters;
