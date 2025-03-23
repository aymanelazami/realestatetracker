
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SocialMedia {
  facebook?: string;
  instagram?: string;
  twitter?: string;
  linkedin?: string;
}

interface AgencySocialMediaProps {
  socialMedia: SocialMedia;
}

const AgencySocialMedia: React.FC<AgencySocialMediaProps> = ({ socialMedia }) => {
  const hasSocialMedia = Object.entries(socialMedia).filter(([_, url]) => url).length > 0;

  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold mb-4">Social Media</h2>
        
        {hasSocialMedia ? (
          <div className="grid grid-cols-2 gap-4">
            {socialMedia.facebook && (
              <a 
                href={socialMedia.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "flex items-center gap-2 p-3 rounded-lg",
                  "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20",
                  "transition-colors"
                )}
              >
                <Facebook className="h-5 w-5" />
                <span className="font-medium">Facebook</span>
              </a>
            )}
            
            {socialMedia.instagram && (
              <a 
                href={socialMedia.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "flex items-center gap-2 p-3 rounded-lg",
                  "bg-pink-500/10 text-pink-500 hover:bg-pink-500/20",
                  "transition-colors"
                )}
              >
                <Instagram className="h-5 w-5" />
                <span className="font-medium">Instagram</span>
              </a>
            )}
            
            {socialMedia.twitter && (
              <a 
                href={socialMedia.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "flex items-center gap-2 p-3 rounded-lg",
                  "bg-sky-500/10 text-sky-500 hover:bg-sky-500/20",
                  "transition-colors"
                )}
              >
                <Twitter className="h-5 w-5" />
                <span className="font-medium">Twitter</span>
              </a>
            )}
            
            {socialMedia.linkedin && (
              <a 
                href={socialMedia.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "flex items-center gap-2 p-3 rounded-lg",
                  "bg-blue-600/10 text-blue-600 hover:bg-blue-600/20",
                  "transition-colors"
                )}
              >
                <Linkedin className="h-5 w-5" />
                <span className="font-medium">LinkedIn</span>
              </a>
            )}
          </div>
        ) : (
          <p className="text-muted-foreground">No social media profiles available.</p>
        )}
      </CardContent>
    </Card>
  );
};

export default AgencySocialMedia;
