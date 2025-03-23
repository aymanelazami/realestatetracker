
import React from 'react';
import { Agency } from '@/types';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Building, MapPin, Calendar } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { formatDate } from '@/utils/dateUtils';

interface AgencyOverviewProps {
  agency: Agency;
}

const AgencyOverview: React.FC<AgencyOverviewProps> = ({ agency }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Agency Overview</CardTitle>
        <CardDescription>Basic information about your agency</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="h-20 w-20 md:h-24 md:w-24 rounded bg-primary/10 flex items-center justify-center">
            <Building className="h-10 w-10 text-primary" />
          </div>
          
          <div className="flex-1">
            <div className="flex flex-wrap gap-2 mb-2">
              {agency.category.map((cat, index) => (
                <span 
                  key={index} 
                  className="bg-secondary text-secondary-foreground text-xs px-2.5 py-0.5 rounded-full"
                >
                  {cat}
                </span>
              ))}
            </div>
            
            <h2 className="text-2xl font-bold">{agency.name}</h2>
            
            <div className="flex flex-wrap gap-4 text-muted-foreground mt-3">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>{agency.city}, {agency.country}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>Since {formatDate(agency.createdAt)}</span>
              </div>
            </div>
            
            <Separator className="my-4" />
            
            <p className="text-muted-foreground leading-relaxed">
              {agency.description || "No description provided."}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AgencyOverview;
