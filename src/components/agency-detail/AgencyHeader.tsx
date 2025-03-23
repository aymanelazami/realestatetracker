
import React from 'react';
import { Agency } from '@/types';
import { Building, MapPin, Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/utils/dateUtils';

interface AgencyHeaderProps {
  agency: Agency;
}

const AgencyHeader: React.FC<AgencyHeaderProps> = ({ agency }) => {
  return (
    <div className="flex flex-col md:flex-row gap-6 items-start">
      <div className="h-20 w-20 md:h-24 md:w-24 rounded bg-primary/10 flex items-center justify-center">
        <Building className="h-10 w-10 text-primary" />
      </div>
      
      <div className="flex-1">
        <div className="flex flex-wrap gap-2 mb-2">
          {agency.category.map((cat, index) => (
            <Badge key={index} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
              {cat}
            </Badge>
          ))}
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold mb-2">{agency.name}</h1>
        
        <div className="flex items-center text-muted-foreground gap-6">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span>{agency.city}, {agency.country}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>Added {formatDate(agency.createdAt)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgencyHeader;
