import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import AgencyCard from '@/components/agencies/AgencyCard';
import SearchInput from '@/components/ui/SearchInput';
import { Button } from '@/components/ui/button';
import { Plus, Filter, Check, X } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from '@/components/ui/sheet';
import { Agency, AgencyCategory, SearchFilters } from '@/types';

// Mock agencies data
const mockAgencies: Agency[] = [
  {
    id: '1',
    name: 'Skyline Properties',
    description: 'A leading residential and commercial real estate agency with over 20 years of experience in the market.',
    website: 'https://skylineproperties.com',
    email: 'info@skylineproperties.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main Street',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    country: 'United States',
    category: ['Residential', 'Commercial'],
    socialMedia: {
      facebook: 'https://facebook.com/skylineproperties',
      instagram: 'https://instagram.com/skylineproperties',
    },
    createdAt: '2023-08-15T14:23:45Z',
    updatedAt: '2023-08-15T14:23:45Z',
  },
  {
    id: '2',
    name: 'City Living Real Estate',
    description: 'Specialized in urban properties and luxury apartments in metropolitan areas.',
    website: 'https://cityliving.com',
    email: 'contact@cityliving.com',
    phone: '+1 (555) 987-6543',
    address: '456 Urban Avenue',
    city: 'Toronto',
    state: 'ON',
    zipCode: 'M5V 2A8',
    country: 'Canada',
    category: ['Residential', 'Luxury'],
    socialMedia: {
      instagram: 'https://instagram.com/cityliving',
      linkedin: 'https://linkedin.com/company/cityliving',
    },
    createdAt: '2023-08-12T09:15:22Z',
    updatedAt: '2023-08-12T09:15:22Z',
  },
  {
    id: '3',
    name: 'Global Investments',
    description: 'International real estate investment firm focusing on commercial properties and development opportunities.',
    website: 'https://globalinvest.com',
    email: 'investors@globalinvest.com',
    phone: '+44 20 1234 5678',
    address: '10 Financial Square',
    city: 'London',
    country: 'United Kingdom',
    category: ['Investment', 'Commercial', 'International'],
    socialMedia: {
      linkedin: 'https://linkedin.com/company/globalinvestments',
      twitter: 'https://twitter.com/globalinvestments',
    },
    createdAt: '2023-08-10T16:42:10Z',
    updatedAt: '2023-08-10T16:42:10Z',
  },
  {
    id: '4',
    name: 'Premium Properties',
    description: 'Luxury real estate specialists with a portfolio of exclusive properties in prime locations.',
    website: 'https://premiumproperties.com.au',
    email: 'hello@premiumproperties.com.au',
    phone: '+61 2 9876 5432',
    address: '25 Harbor View',
    city: 'Sydney',
    state: 'NSW',
    zipCode: '2000',
    country: 'Australia',
    category: ['Luxury', 'Residential'],
    socialMedia: {
      instagram: 'https://instagram.com/premiumproperties',
      facebook: 'https://facebook.com/premiumproperties',
    },
    createdAt: '2023-08-08T11:30:00Z',
    updatedAt: '2023-08-08T11:30:00Z',
  },
  {
    id: '5',
    name: 'Industrial Spaces',
    description: 'Specialized in industrial real estate, warehouses, and manufacturing facilities.',
    website: 'https://industrialspaces.net',
    email: 'info@industrialspaces.net',
    phone: '+1 (555) 234-5678',
    address: '789 Factory Road',
    city: 'Chicago',
    state: 'IL',
    zipCode: '60607',
    country: 'United States',
    category: ['Industrial', 'Commercial'],
    socialMedia: {},
    createdAt: '2023-08-05T13:45:30Z',
    updatedAt: '2023-08-05T13:45:30Z',
  },
  {
    id: '6',
    name: 'Land Development Co.',
    description: 'Specialists in land acquisition and development for residential and commercial projects.',
    website: 'https://landdevelopment.co',
    email: 'projects@landdevelopment.co',
    phone: '+1 (555) 876-5432',
    address: '567 Opportunity Drive',
    city: 'Phoenix',
    state: 'AZ',
    zipCode: '85001',
    country: 'United States',
    category: ['Land', 'Investment'],
    socialMedia: {
      linkedin: 'https://linkedin.com/company/landdevelopment',
    },
    createdAt: '2023-08-03T10:20:15Z',
    updatedAt: '2023-08-03T10:20:15Z',
  },
];

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
  const [agencies, setAgencies] = useState<Agency[]>([]);
  const [filteredAgencies, setFilteredAgencies] = useState<Agency[]>([]);
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

  // Generate filter chips
  const filterChips = () => {
    const chips = [];
    
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
                      value={filters.category || ''}
                      onValueChange={(value) => 
                        setFilters({ ...filters, category: value as AgencyCategory || null })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All Categories</SelectItem>
                        {CATEGORIES.map((category) => (
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
                      value={filters.country || ''}
                      onValueChange={(value) => 
                        setFilters({ ...filters, country: value || null })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All Countries</SelectItem>
                        {COUNTRIES.map((country) => (
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
          </div>
          
          {/* Active Filters */}
          {filterChips().length > 0 && (
            <div className="flex flex-wrap gap-2 items-center pt-1">
              <span className="text-sm text-muted-foreground">Active filters:</span>
              {filterChips().map((chip, index) => (
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
              {filterChips().length > 0 && (
                <button 
                  onClick={resetFilters}
                  className="text-sm text-primary hover:text-primary/80 transition-colors"
                >
                  Clear all
                </button>
              )}
            </div>
          )}
        </div>

        {/* Agencies Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((_, index) => (
              <div 
                key={index} 
                className="h-[300px] bg-muted/30 rounded-lg animate-pulse"
              />
            ))}
          </div>
        ) : filteredAgencies.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAgencies.map((agency, index) => (
              <AgencyCard 
                key={agency.id} 
                agency={agency} 
                className="animate-fade-in opacity-0"
                style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
              />
            ))}
          </div>
        ) : (
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
        )}
      </div>
    </MainLayout>
  );
};

export default Agencies;
