
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Building, Globe, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AgencyCardProps } from '@/types';

const AgencyCard: React.FC<AgencyCardProps> = ({ agency, className, style }) => {
  return (
    <Link to={`/agency/${agency.id}`} className="block h-full">
      <Card className={cn(
        "border overflow-hidden transition-all duration-300 h-full", 
        "hover:shadow-md hover:border-primary/20",
        "cursor-pointer",
        className
      )}
      style={style}
      >
        <CardContent className="p-6 flex flex-col h-full">
          <div className="flex items-start justify-between gap-3 mb-4">
            <div className="flex-1 min-w-0">
              <h3 className="text-xl font-semibold mb-1 truncate">{agency.name}</h3>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {agency.category.slice(0, 3).map((cat, index) => (
                  <Badge key={index} variant="secondary" className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                    {cat}
                  </Badge>
                ))}
                {agency.category.length > 3 && (
                  <Badge variant="outline">+{agency.category.length - 3}</Badge>
                )}
              </div>
            </div>

            {agency.logo ? (
              <div className="h-14 w-14 rounded bg-secondary/50 flex items-center justify-center overflow-hidden">
                <img 
                  src={agency.logo} 
                  alt={`${agency.name} logo`} 
                  className="h-full w-full object-contain"
                />
              </div>
            ) : (
              <div className="h-14 w-14 rounded bg-primary/10 flex items-center justify-center">
                <Building className="h-6 w-6 text-primary" />
              </div>
            )}
          </div>

          {agency.description && (
            <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
              {agency.description}
            </p>
          )}

          <div className="flex-1 space-y-2.5">
            <div className="flex items-start gap-2 text-sm">
              <MapPin className="h-4 w-4 text-primary shrink-0 mt-0.5" />
              <span className="text-muted-foreground">{agency.address}, {agency.city}, {agency.country}</span>
            </div>
            
            <div className="flex items-center gap-2 text-sm">
              <Phone className="h-4 w-4 text-primary" />
              <span className="text-muted-foreground">
                {agency.phone}
              </span>
            </div>
            
            <div className="flex items-center gap-2 text-sm">
              <Mail className="h-4 w-4 text-primary" />
              <span className="text-muted-foreground truncate">
                {agency.email}
              </span>
            </div>
            
            {agency.website && (
              <div className="flex items-center gap-2 text-sm">
                <Globe className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground flex items-center truncate">
                  {agency.website.replace(/^https?:\/\//, '')}
                  <ExternalLink className="h-3 w-3 ml-1" />
                </span>
              </div>
            )}
          </div>
        </CardContent>
        
        <CardFooter className="p-6 pt-0 mt-auto">
          <Button variant="outline" className="w-full">
            View Details
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default AgencyCard;
