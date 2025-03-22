
import React from 'react';
import { Link } from 'react-router-dom';
import { Building, MapPin, Star, Search, ArrowRight, Users, Shield, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import MainLayout from '@/components/layout/MainLayout';
import ThemeToggle from '@/components/theme/ThemeToggle';

// Mock featured agencies
const featuredAgencies = [
  {
    id: '1',
    name: 'Skyline Properties',
    description: 'Leading residential and commercial real estate specialists',
    location: 'New York, USA',
    categories: ['Residential', 'Commercial'],
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2600&q=80'
  },
  {
    id: '2',
    name: 'City Living Real Estate',
    description: 'Urban properties and luxury apartments in metropolitan areas',
    location: 'Toronto, Canada',
    categories: ['Residential', 'Luxury'],
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2600&q=80'
  },
  {
    id: '3',
    name: 'Commercial Property Experts',
    description: 'Specializing in office spaces, retail, and industrial properties',
    location: 'Chicago, USA',
    categories: ['Commercial', 'Industrial'],
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2600&q=80'
  }
];

// Mock testimonials
const testimonials = [
  {
    id: 1,
    content: "This platform has transformed how we connect with clients. The user-friendly interface and advanced filtering options have significantly increased our visibility.",
    author: "Sarah Johnson",
    role: "CEO, Skyline Properties",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    id: 2,
    content: "Since joining this platform, we've seen a 40% increase in qualified leads. The dashboard analytics provide valuable insights for our marketing strategy.",
    author: "Michael Chen",
    role: "Marketing Director, City Living Real Estate",
    avatar: "https://randomuser.me/api/portraits/men/46.jpg"
  },
  {
    id: 3,
    content: "The ability to showcase our properties and services in such detail has been invaluable. We've connected with international investors we wouldn't have reached otherwise.",
    author: "Emma Rodriguez",
    role: "Partner, Commercial Property Experts",
    avatar: "https://randomuser.me/api/portraits/women/63.jpg"
  }
];

const Index: React.FC = () => {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="py-12 md:py-20 px-4 sm:px-6 -mt-8 sm:-mt-12 mb-12 sm:mb-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-20">
            <div className="w-full lg:w-1/2 space-y-6 text-left">
              <div className="inline-flex">
                <Badge variant="outline" className="px-4 py-1 text-sm font-medium rounded-full fade-in-up">
                  Premier Real Estate Agency Directory
                </Badge>
              </div>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight fade-in-up">
                Find the <span className="text-primary">Perfect Agency</span> for Your Real Estate Needs
              </h1>
              
              <p className="text-xl text-muted-foreground fade-in-up-delay-1">
                Connect with top-rated real estate agencies worldwide. Whether you're buying, selling, or investing, find the right professional to guide you.
              </p>
              
              <div className="flex flex-wrap gap-4 pt-2 fade-in-up-delay-2">
                <Button asChild size="lg">
                  <Link to="/agencies">Browse Agencies</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/register">Register Your Agency</Link>
                </Button>
                <ThemeToggle size="default" variant="outline" className="hidden sm:flex" />
              </div>
              
              <div className="flex items-center gap-6 pt-4 fade-in-up-delay-2">
                <div className="flex items-center gap-2">
                  <Building className="h-5 w-5 text-primary" />
                  <span className="text-muted-foreground">134+ Agencies</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-primary" />
                  <span className="text-muted-foreground">24 Countries</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  <span className="text-muted-foreground">Verified Listings</span>
                </div>
              </div>
            </div>
            
            <div className="w-full lg:w-1/2 relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1560520031-3a4dc4e9de0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2400&q=80" 
                  alt="Real Estate Professionals"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-background border shadow-lg rounded-lg p-4 w-48 hidden sm:block">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-yellow-400" fill="currentColor" />
                    <span className="font-bold ml-1">4.8/5</span>
                  </div>
                  <span className="text-muted-foreground text-sm">800+ reviews</span>
                </div>
                <p className="text-sm mt-1">Trusted by thousands of clients worldwide</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto text-center mb-12">
          <Badge variant="outline" className="mb-4">Why Choose Our Platform</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">The Ultimate Real Estate Agency Directory</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover what makes our platform the preferred choice for finding and connecting with real estate professionals.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card className="border bg-card hover-card-animation">
            <CardContent className="pt-6">
              <div className="rounded-full bg-primary/10 p-3 w-12 h-12 flex items-center justify-center mb-4">
                <Search className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Search & Filtering</h3>
              <p className="text-muted-foreground">
                Find agencies by location, specialization, ratings and more with our advanced search tools.
              </p>
            </CardContent>
          </Card>
          
          <Card className="border bg-card hover-card-animation">
            <CardContent className="pt-6">
              <div className="rounded-full bg-primary/10 p-3 w-12 h-12 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Verified Professionals</h3>
              <p className="text-muted-foreground">
                Every agency on our platform is thoroughly vetted to ensure quality and professionalism.
              </p>
            </CardContent>
          </Card>
          
          <Card className="border bg-card hover-card-animation">
            <CardContent className="pt-6">
              <div className="rounded-full bg-primary/10 p-3 w-12 h-12 flex items-center justify-center mb-4">
                <Globe className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Global Coverage</h3>
              <p className="text-muted-foreground">
                Access agencies across 24 countries, whether you're buying locally or investing internationally.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Featured Agencies */}
      <section className="py-12 px-4 sm:px-6 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-8">
            <div>
              <Badge variant="outline" className="mb-2">Featured Partners</Badge>
              <h2 className="text-3xl font-bold">Top-Rated Agencies</h2>
            </div>
            <Button variant="ghost" asChild>
              <Link to="/agencies" className="flex items-center gap-2">
                View All 
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {featuredAgencies.map((agency) => (
              <Link key={agency.id} to={`/agency/${agency.id}`}>
                <Card className="overflow-hidden hover-card-animation h-full">
                  <div className="aspect-video w-full overflow-hidden">
                    <img 
                      src={agency.image} 
                      alt={agency.name}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  <CardContent className="p-5">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-xl">{agency.name}</h3>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400" fill="currentColor" />
                        <span className="ml-1 text-sm font-medium">{agency.rating}</span>
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground text-sm mb-3">
                      {agency.description}
                    </p>
                    
                    <div className="flex items-center text-sm text-muted-foreground mb-3">
                      <MapPin className="h-4 w-4 mr-1" />
                      {agency.location}
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {agency.categories.map((category, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {category}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto text-center mb-12">
          <Badge variant="outline" className="mb-4">Testimonials</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">What Our Users Say</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Hear from real estate professionals who have transformed their business through our platform.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="border bg-card testimonial-card">
              <CardContent className="pt-6">
                <p className="italic text-muted-foreground mb-6">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center gap-4">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.author}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="text-left">
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto text-center bg-primary/10 rounded-2xl p-8 sm:p-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Find Your Perfect Real Estate Partner?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied clients who have found their ideal real estate agency through our platform.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" asChild>
              <Link to="/agencies">Browse Agencies</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/register">Register Your Agency</Link>
            </Button>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Index;
