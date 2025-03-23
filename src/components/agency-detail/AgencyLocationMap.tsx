
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin } from 'lucide-react';

interface AgencyLocationMapProps {
  address: string;
  city: string;
  state?: string;
  zipCode?: string;
  country: string;
}

const AgencyLocationMap: React.FC<AgencyLocationMapProps> = ({
  address,
  city,
  state,
  zipCode,
  country,
}) => {
  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold mb-4">Location</h2>
        <div className="bg-muted/30 rounded-lg h-[300px] flex items-center justify-center">
          <div className="text-center p-6">
            <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
            <p className="text-muted-foreground">
              Interactive map will be displayed here
            </p>
          </div>
        </div>
        <div className="mt-4 flex items-start gap-2 text-muted-foreground">
          <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-foreground">{address}</p>
            <p>{city}{state ? `, ${state}` : ''} {zipCode || ''}</p>
            <p>{country}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AgencyLocationMap;
