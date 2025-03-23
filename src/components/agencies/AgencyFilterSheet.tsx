
import React from 'react';
import { AgencyCategory, SearchFilters } from '@/types';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Filter } from 'lucide-react';

interface AgencyFilterSheetProps {
  filters: SearchFilters;
  setFilters: React.Dispatch<React.SetStateAction<SearchFilters>>;
  applyFilters: (filters: SearchFilters) => void;
  resetFilters: () => void;
  categories: AgencyCategory[];
  countries: string[];
}

const AgencyFilterSheet: React.FC<AgencyFilterSheetProps> = ({
  filters,
  setFilters,
  applyFilters,
  resetFilters,
  categories,
  countries,
}) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2 h-auto py-2.5">
          <Filter className="h-4 w-4" />
          Filter
          {(filters.category || filters.country) && (
            <span className="ml-1 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {(filters.category ? 1 : 0) + (filters.country ? 1 : 0)}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Filter Agencies</SheetTitle>
          <SheetDescription>
            Apply filters to narrow down your search results.
          </SheetDescription>
        </SheetHeader>
        
        <div className="py-6 space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Category</label>
            <Select
              value={filters.category || 'all-categories'}
              onValueChange={(value) => 
                setFilters({ ...filters, category: value === 'all-categories' ? null : value as AgencyCategory })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-categories">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Country</label>
            <Select
              value={filters.country || 'all-countries'}
              onValueChange={(value) => 
                setFilters({ ...filters, country: value === 'all-countries' ? null : value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-countries">All Countries</SelectItem>
                {countries.map((country) => (
                  <SelectItem key={country} value={country}>
                    {country}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <SheetFooter className="flex sm:justify-between gap-2">
          <Button 
            type="button" 
            variant="outline" 
            onClick={resetFilters}
          >
            Reset Filters
          </Button>
          <Button 
            type="button" 
            onClick={() => applyFilters(filters)}
          >
            Apply Filters
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default AgencyFilterSheet;
