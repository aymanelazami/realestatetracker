import React from 'react';
import { Link } from 'react-router-dom';
import { Building, Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';
const Footer: React.FC = () => {
  return <footer className="w-full bg-secondary/50 backdrop-blur-sm border-t border-border py-12 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4 animate-fade-in" style={{
          animationDelay: '0ms'
        }}>
            <div className="flex items-center gap-2">
              <Building className="h-6 w-6 text-primary" />
              <span className="text-xl font-semibold">RealEstate Hub</span>
            </div>
            <p className="text-muted-foreground max-w-md">
              The ultimate platform for managing real estate agencies. Store, track, and analyze agency data with ease.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="space-y-4 animate-fade-in" style={{
          animationDelay: '100ms'
        }}>
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">Home</Link>
              </li>
              <li>
                
              </li>
              <li>
                <Link to="/agencies" className="text-muted-foreground hover:text-primary transition-colors">Agencies</Link>
              </li>
              <li>
                <Link to="/add-agency" className="text-muted-foreground hover:text-primary transition-colors">Add Agency</Link>
              </li>
              <li>
                
              </li>
            </ul>
          </div>

          <div className="space-y-4 animate-fade-in" style={{
          animationDelay: '200ms'
        }}>
            <h3 className="text-lg font-semibold">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" />
                <span>1234 Property Lane, Real Estate City</span>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4 text-primary" />
                <a href="mailto:info@realestatehub.com" className="hover:text-primary transition-colors">
                  info@realestatehub.com
                </a>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4 text-primary" />
                <a href="tel:+15555555555" className="hover:text-primary transition-colors">
                  +1 (555) 555-5555
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-4 border-t border-border/50 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} RealEstate Hub. All rights reserved.</p>
        </div>
      </div>
    </footer>;
};
export default Footer;