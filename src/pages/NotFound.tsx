
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import MainLayout from '@/components/layout/MainLayout';
import { Search } from 'lucide-react';

const NotFound = () => {
  return (
    <MainLayout>
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center py-16 animate-fade-in">
        <div className="flex flex-col items-center">
          <div className="relative">
            <div className="text-9xl font-bold text-primary/10">404</div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Search className="h-20 w-20 text-primary/50" />
            </div>
          </div>
          
          <h1 className="mt-6 text-3xl font-bold tracking-tight">Page not found</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-md">
            Sorry, we couldn't find the page you're looking for. It might have been moved or deleted.
          </p>
          
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg">
              <Link to="/">Go to Home</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/agencies">Browse Agencies</Link>
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default NotFound;
