
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Building, Globe, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AgencyCardProps } from '@/types';
import { useIsMobile } from '@/hooks/use-mobile';

const AgencyCard: React.FC<AgencyCardProps> = ({ agency, className, style }) => {
  const isMobile = useIsMobile();
  
  return (
    <Link to={`/agency/${agency.id}`} className="block h-full w-full">
      <Card className={cn(
        "border overflow-hidden transition-all duration-300 h-full", 
        "hover:shadow-md hover:border-primary/20",
        "cursor-pointer",
        className
      )}
      style={style}
      >
        <CardContent className="p-4 sm:p-6 flex flex-col h-full">
          <div className="flex items-start justify-between gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div className="flex-1 min-w-0">
              <h3 className="text-lg sm:text-xl font-semibold mb-1 truncate">{agency.name}</h3>
              <div className="flex flex-wrap gap-1 sm:gap-1.5 mb-2 sm:mb-3">
                {agency.category.slice(0, isMobile ? 2 : 3).map((cat, index) => (
                  <Badge key={index} variant="secondary" className="text-xs animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                    {cat}
                  </Badge>
                ))}
                {agency.category.length > (isMobile ? 2 : 3) && (
                  <Badge variant="outline" className="text-xs">+{agency.category.length - (isMobile ? 2 : 3)}</Badge>
                )}
              </div>
            </div>

            {agency.logo ? (
              <div className="h-10 w-10 sm:h-14 sm:w-14 rounded bg-secondary/50 flex items-center justify-center overflow-hidden shrink-0">
                <img 
                  src={agency.logo} 
                  alt={`${agency.name} logo`} 
                  className="h-full w-full object-contain"
                />
              </div>
            ) : (
              <div className="h-10 w-10 sm:h-14 sm:w-14 rounded bg-primary/10 flex items-center justify-center shrink-0">
                <Building className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
              </div>
            )}
          </div>

          {agency.description && (
            <p className="text-muted-foreground text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2">
              {agency.description}
            </p>
          )}

          <div className="flex-1 space-y-1.5 sm:space-y-2.5 text-xs sm:text-sm">
            <div className="flex items-start gap-1.5 sm:gap-2">
              <MapPin className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary shrink-0 mt-0.5" />
              <span className="text-muted-foreground line-clamp-1">{agency.address}, {agency.city}, {agency.country}</span>
            </div>
            
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Phone className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
              <span className="text-muted-foreground">
                {agency.phone}
              </span>
            </div>
            
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Mail className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
              <span className="text-muted-foreground truncate">
                {agency.email}
              </span>
            </div>
            
            {agency.website && (
              <div className="flex items-center gap-1.5 sm:gap-2">
                <Globe className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary" />
                <span className="text-muted-foreground flex items-center truncate">
                  {agency.website.replace(/^https?:\/\//, '')}
                  <ExternalLink className="h-2.5 w-2.5 sm:h-3 sm:w-3 ml-1" />
                </span>
              </div>
            )}
          </div>
        </CardContent>
        
        <CardFooter className="p-4 sm:p-6 pt-0 mt-auto">
          <Button variant="outline" className="w-full text-sm h-9">
            View Details
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default AgencyCard;
