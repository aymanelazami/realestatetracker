
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search, User, Building, Home, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import ProfileDropdown from '@/components/auth/ProfileDropdown';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, user } = useAuth();

  // Base nav links available to all users
  const baseNavLinks = [
    { label: 'Home', path: '/', icon: <Home className="h-4 w-4 mr-1" /> },
  ];

  // Additional nav links based on authentication status
  const authNavLinks = isAuthenticated 
    ? [
        { label: 'Dashboard', path: '/dashboard', icon: <Building className="h-4 w-4 mr-1" /> },
        { label: 'Agencies', path: '/agencies', icon: <Search className="h-4 w-4 mr-1" /> },
      ]
    : [];

  // Admin-only links
  const adminNavLinks = isAuthenticated && user?.role === 'admin'
    ? [
        { label: 'Admin', path: '/admin', icon: <Shield className="h-4 w-4 mr-1" /> },
      ]
    : [];
    
  // Agency-only links
  const agencyLinks = isAuthenticated && user?.role === 'agency'
    ? [
        { label: 'My Profile', path: '/agency-profile', icon: <User className="h-4 w-4 mr-1" /> },
      ]
    : [];

  // Combine all relevant nav links
  const navLinks = [...baseNavLinks, ...authNavLinks, ...adminNavLinks, ...agencyLinks];

  // Control header appearance on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when changing routes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Check if Add Agency button should be shown
  // Only admin or non-agency users can add agencies
  const showAddAgencyButton = isAuthenticated && 
    (user?.role === 'admin' || user?.role === 'visitor');

  return (
    <header 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out-expo',
        isScrolled 
          ? 'py-2 bg-background/80 backdrop-blur-lg shadow-soft' 
          : 'py-4 bg-transparent'
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link 
          to="/" 
          className="flex items-center gap-2 text-foreground font-semibold text-xl"
          aria-label="RealEstate Hub Home"
        >
          <Building className="h-6 w-6 text-primary" />
          <span className="animate-fade-in">RealEstate Hub</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                'px-4 py-2 rounded-md text-sm font-medium transition-all duration-200',
                'flex items-center hover:bg-secondary',
                location.pathname === link.path
                  ? 'text-primary bg-primary/10'
                  : 'text-foreground/80 hover:text-foreground'
              )}
            >
              {link.icon}
              {link.label}
            </Link>
          ))}
          
          {isAuthenticated ? (
            <>
              {showAddAgencyButton && (
                <Button asChild variant="outline" className="ml-2">
                  <Link to="/add-agency">Add Agency</Link>
                </Button>
              )}
              <div className="ml-2">
                <ProfileDropdown />
              </div>
            </>
          ) : (
            <>
              <Button asChild variant="outline" className="ml-2">
                <Link to="/login">Sign In</Link>
              </Button>
              <Button asChild className="ml-2">
                <Link to="/register">Register</Link>
              </Button>
            </>
          )}
        </nav>

        {/* Mobile Menu Toggle */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-1 rounded-md hover:bg-secondary"
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-lg shadow-soft animate-slide-in-right">
          <nav className="container mx-auto px-4 py-2 flex flex-col space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  'px-4 py-3 rounded-md text-sm font-medium transition-all duration-200',
                  'flex items-center hover:bg-secondary',
                  location.pathname === link.path
                    ? 'text-primary bg-primary/10'
                    : 'text-foreground/80 hover:text-foreground'
                )}
              >
                {link.icon}
                {link.label}
              </Link>
            ))}
            
            {isAuthenticated ? (
              <>
                {showAddAgencyButton && (
                  <Button asChild className="mt-2 w-full justify-center">
                    <Link to="/add-agency">Add Agency</Link>
                  </Button>
                )}
                <Button 
                  variant="outline" 
                  className="mt-2 w-full justify-center"
                  onClick={() => useAuth().logout()}
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Button asChild variant="outline" className="mt-2 w-full justify-center">
                  <Link to="/login">Sign In</Link>
                </Button>
                <Button asChild className="mt-2 w-full justify-center">
                  <Link to="/register">Register</Link>
                </Button>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
