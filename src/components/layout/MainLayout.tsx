
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { cn } from '@/lib/utils';

interface MainLayoutProps {
  children: React.ReactNode;
  className?: string;
  fullWidth?: boolean;
  noPadding?: boolean;
}

const MainLayout: React.FC<MainLayoutProps> = ({ 
  children, 
  className, 
  fullWidth = false,
  noPadding = false
}) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main 
        className={cn(
          "flex-1 pt-20", 
          !noPadding && "px-4 py-8 md:py-12", 
          className
        )}
      >
        <div className={cn(
          !fullWidth && "container mx-auto",
          "animate-fade-in"
        )}>
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
