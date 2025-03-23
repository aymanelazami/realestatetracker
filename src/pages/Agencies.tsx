import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import SearchInput from '@/components/ui/SearchInput';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { AgencyCategory, SearchFilters } from '@/types';
import { mockAgencies } from '@/data/mockAgencies';
import AgencyFilterSheet from '@/components/agencies/AgencyFilterSheet';
import ActiveFilters from '@/components/agencies/ActiveFilters';
import AgencyList from '@/components/agencies/AgencyList';

// Category options
const CATEGORIES: AgencyCategory[] = [
  'Residential',
  'Commercial',
  'Industrial',
  'Land',
  'Property Management',
  'Luxury',
  'Investment',
  'International',
];

// Country options based on our mock data
const COUNTRIES = ['United States', 'Canada', 'United Kingdom', 'Australia'];

const Agencies = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [agencies, setAgencies] = useState([]);
  const [filteredAgencies, setFilteredAgencies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<SearchFilters>({
    category: null,
    country: null,
  });
  const [loading, setLoading] = useState(true);

  // Parse query parameters
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const categoryParam = queryParams.get('category');
    const countryParam = queryParams.get('country');
    const queryParam = queryParams.get('query');

    // Update filters from URL
    setFilters({
      category: categoryParam as AgencyCategory | null,
      country: countryParam,
      query: queryParam,
    });

    if (queryParam) {
      setSearchQuery(queryParam);
    }
  }, [location]);

  // Fetch agencies (using mock data for now)
  useEffect(() => {
    // Simulate API loading
    setLoading(true);
    setTimeout(() => {
      setAgencies(mockAgencies);
      setLoading(false);
    }, 800);
  }, []);

  // Apply filters and search
  useEffect(() => {
    let results = [...agencies];

    // Apply category filter
    if (filters.category) {
      results = results.filter(agency => 
        agency.category.includes(filters.category as string)
      );
    }

    // Apply country filter
    if (filters.country) {
      results = results.filter(agency => 
        agency.country === filters.country
      );
    }

    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(agency => 
        agency.name.toLowerCase().includes(query) ||
        agency.description?.toLowerCase().includes(query) ||
        agency.city.toLowerCase().includes(query)
      );
    }

    setFilteredAgencies(results);
  }, [agencies, filters, searchQuery]);

  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    
    // Update URL with search query
    const queryParams = new URLSearchParams(location.search);
    if (query) {
      queryParams.set('query', query);
    } else {
      queryParams.delete('query');
    }
    
    navigate({
      pathname: location.pathname,
      search: queryParams.toString()
    });
  };

  // Apply filters and update URL
  const applyFilters = (newFilters: SearchFilters) => {
    setFilters(newFilters);
    
    // Update URL with filter parameters
    const queryParams = new URLSearchParams();
    
    if (searchQuery) {
      queryParams.set('query', searchQuery);
    }
    
    if (newFilters.category) {
      queryParams.set('category', newFilters.category);
    }
    
    if (newFilters.country) {
      queryParams.set('country', newFilters.country);
    }
    
    navigate({
      pathname: location.pathname,
      search: queryParams.toString()
    });
  };

  // Reset filters
  const resetFilters = () => {
    setFilters({
      category: null,
      country: null,
    });
    
    // Remove filter parameters from URL, keep search query if exists
    const queryParams = new URLSearchParams();
    if (searchQuery) {
      queryParams.set('query', searchQuery);
    }
    
    navigate({
      pathname: location.pathname,
      search: queryParams.toString()
    });
  };

  return (
    <MainLayout>
      <div className="flex flex-col space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Agencies</h1>
            <p className="text-muted-foreground mt-1">
              Browse and search all real estate agencies.
            </p>
          </div>
          <Button asChild>
            <a href="/add-agency">
              <Plus className="h-4 w-4 mr-2" />
              Add Agency
            </a>
          </Button>
        </div>

        {/* Search and Filter Section */}
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-1">
              <SearchInput 
                onSearch={handleSearch} 
                placeholder="Search by name, description or location..." 
                initialValue={searchQuery}
              />
            </div>
            
            <AgencyFilterSheet 
              filters={filters}
              setFilters={setFilters}
              applyFilters={applyFilters}
              resetFilters={resetFilters}
              categories={CATEGORIES}
              countries={COUNTRIES}
            />
          </div>
          
          {/* Active Filters */}
          <ActiveFilters 
            filters={filters} 
            resetFilters={resetFilters} 
            applyFilters={applyFilters} 
          />
        </div>

        {/* Agencies Grid */}
        <AgencyList 
          agencies={filteredAgencies}
          loading={loading}
          resetFilters={resetFilters}
        />
      </div>
    </MainLayout>
  );
};

export default Agencies;
