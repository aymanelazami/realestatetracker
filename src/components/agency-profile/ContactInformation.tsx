
import React from 'react';
import { Agency } from '@/types';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Phone, Mail, Globe, MapPin } from 'lucide-react';

interface ContactInformationProps {
  agency: Agency;
}

const ContactInformation: React.FC<ContactInformationProps> = ({ agency }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-start gap-3">
          <Phone className="h-5 w-5 text-primary shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-muted-foreground mb-1">Phone</p>
            <p className="font-medium">{agency.phone}</p>
          </div>
        </div>
        
        <div className="flex items-start gap-3">
          <Mail className="h-5 w-5 text-primary shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-muted-foreground mb-1">Email</p>
            <p className="font-medium">{agency.email}</p>
          </div>
        </div>
        
        {agency.website && (
          <div className="flex items-start gap-3">
            <Globe className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-muted-foreground mb-1">Website</p>
              <a 
                href={agency.website} 
                target="_blank" 
                rel="noopener noreferrer"
                className="font-medium hover:text-primary transition-colors"
              >
                {agency.website.replace(/^https?:\/\//, '')}
              </a>
            </div>
          </div>
        )}
        
        <div className="flex items-start gap-3">
          <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-muted-foreground mb-1">Address</p>
            <p className="font-medium">{agency.address}</p>
            <p className="text-sm text-muted-foreground">
              {agency.city}{agency.state ? `, ${agency.state}` : ''} {agency.zipCode || ''}
              <br />
              {agency.country}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContactInformation;
