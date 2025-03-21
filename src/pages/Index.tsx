
import React from 'react';
import { Link } from 'react-router-dom';
import { Building, Search, BarChart, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import MainLayout from '@/components/layout/MainLayout';
import { cn } from '@/lib/utils';

const features = [
  {
    title: 'Store Agency Data',
    description: 'Securely store all your real estate agency information in one centralized location.',
    icon: <Building className="h-6 w-6" />,
    color: 'bg-blue-500/10 text-blue-500',
  },
  {
    title: 'Search & Filter',
    description: 'Quickly find agencies with powerful search and filtering capabilities.',
    icon: <Search className="h-6 w-6" />,
    color: 'bg-emerald-500/10 text-emerald-500',
  },
  {
    title: 'Analytics Dashboard',
    description: 'Visualize important metrics and track performance over time.',
    icon: <BarChart className="h-6 w-6" />,
    color: 'bg-purple-500/10 text-purple-500',
  },
  {
    title: 'Admin Controls',
    description: 'Manage users, permissions, and platform settings with ease.',
    icon: <Settings className="h-6 w-6" />,
    color: 'bg-amber-500/10 text-amber-500',
  },
];

const Index = () => {
  return (
    <MainLayout noPadding>
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-background z-0" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(120,120,255,0.15),transparent_65%)]" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-slide-up opacity-0" style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}>
              Real Estate Agency Management Platform
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 animate-slide-up opacity-0" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
              Store, manage, and analyze real estate agency data with our intuitive platform. Designed for simplicity and efficiency.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up opacity-0" style={{ animationDelay: '300ms', animationFillMode: 'forwards' }}>
              <Button asChild size="lg" className="text-base px-8">
                <Link to="/dashboard">Go to Dashboard</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-base px-8">
                <Link to="/agencies">Browse Agencies</Link>
              </Button>
            </div>
          </div>
          
          <div className="relative mt-16 max-w-5xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-20 h-16 bottom-0 top-auto" />
            
            <div className="rounded-xl overflow-hidden shadow-soft-lg border border-border/50 backdrop-blur-sm">
              <img 
                src="https://imagedelivery.net/3PeG6X3D-JHSxmWJuSphIw/75a649b6-b6aa-4c1a-e8bc-ed7a2b63d000/public" 
                alt="Dashboard preview" 
                className="w-full h-auto object-cover animate-fade-in opacity-0"
                style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Powerful Platform Features
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to efficiently manage real estate agency information in one platform.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="border shadow-soft hover:shadow-soft-lg transition-all duration-300 h-full animate-fade-in opacity-0" style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}>
                <CardContent className="p-6 flex flex-col h-full">
                  <div className={cn("p-3 rounded-lg w-fit mb-4", feature.color)}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(120,120,255,0.15),transparent_60%)]" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join our platform today and transform how you manage real estate agency information.
            </p>
            <Button asChild size="lg" className="text-base px-10">
              <Link to="/add-agency">Add Your First Agency</Link>
            </Button>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Index;
