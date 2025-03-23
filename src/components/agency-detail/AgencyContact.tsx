
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Phone, Mail, Globe, ExternalLink } from 'lucide-react';

interface AgencyContactProps {
  phone: string;
  email: string;
  website?: string;
}

const AgencyContact: React.FC<AgencyContactProps> = ({ phone, email, website }) => {
  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
        <ul className="space-y-4">
          <li className="flex items-start gap-3">
            <Phone className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-muted-foreground mb-1">Phone</p>
              <a href={`tel:${phone}`} className="font-medium hover:text-primary transition-colors">
                {phone}
              </a>
            </div>
          </li>
          
          <li className="flex items-start gap-3">
            <Mail className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-muted-foreground mb-1">Email</p>
              <a href={`mailto:${email}`} className="font-medium hover:text-primary transition-colors">
                {email}
              </a>
            </div>
          </li>
          
          {website && (
            <li className="flex items-start gap-3">
              <Globe className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground mb-1">Website</p>
                <a 
                  href={website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="font-medium hover:text-primary transition-colors flex items-center"
                >
                  {website.replace(/^https?:\/\//, '')}
                  <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </div>
            </li>
          )}
        </ul>
      </CardContent>
    </Card>
  );
};

export default AgencyContact;
