
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Building, Users, Tag, Globe, ArrowRight, TrendingUp, Filter } from 'lucide-react';
import StatCard from '@/components/dashboard/StatCard';
import MainLayout from '@/components/layout/MainLayout';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

// Mock data for recent agencies
const recentAgencies = [
  {
    id: '1',
    name: 'Skyline Properties',
    country: 'United States',
    category: ['Residential', 'Commercial'],
    createdAt: '2023-08-15T14:23:45Z',
  },
  {
    id: '2',
    name: 'City Living Real Estate',
    country: 'Canada',
    category: ['Residential', 'Luxury'],
    createdAt: '2023-08-12T09:15:22Z',
  },
  {
    id: '3',
    name: 'Global Investments',
    country: 'United Kingdom',
    category: ['Investment', 'Commercial'],
    createdAt: '2023-08-10T16:42:10Z',
  },
  {
    id: '4',
    name: 'Premium Properties',
    country: 'Australia',
    category: ['Luxury', 'Residential'],
    createdAt: '2023-08-08T11:30:00Z',
  },
];

// Mock data for categories
const categoryData = [
  { name: 'Residential', count: 45 },
  { name: 'Commercial', count: 32 },
  { name: 'Luxury', count: 18 },
  { name: 'Investment', count: 24 },
  { name: 'Industrial', count: 10 },
];

// Format date string
const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const Dashboard = () => {
  return (
    <MainLayout>
      <div className="flex flex-col space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Overview of your real estate agency platform.
            </p>
          </div>
          <Button asChild>
            <Link to="/add-agency">Add New Agency</Link>
          </Button>
        </div>

        {/* Statistics */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Agencies"
            value="134"
            icon={<Building className="h-5 w-5" />}
            trend={{ value: 12, label: "from last month", isPositive: true }}
          />
          <StatCard
            title="Unique Categories"
            value="8"
            icon={<Tag className="h-5 w-5" />}
            trend={{ value: 2, label: "new category", isPositive: true }}
          />
          <StatCard
            title="Countries Covered"
            value="24"
            icon={<Globe className="h-5 w-5" />}
            trend={{ value: 4, label: "from last month", isPositive: true }}
          />
          <StatCard
            title="Users"
            value="42"
            icon={<Users className="h-5 w-5" />}
            trend={{ value: 5, label: "from last month", isPositive: true }}
          />
        </div>

        {/* Tabs for different data views */}
        <Tabs defaultValue="agencies" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="agencies">Recent Agencies</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
          </TabsList>

          {/* Recent Agencies */}
          <TabsContent value="agencies" className="space-y-6">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle>Recently Added Agencies</CardTitle>
                  <Button variant="ghost" size="sm" asChild>
                    <Link to="/agencies" className="flex items-center gap-1">
                      View All <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-muted/50">
                          <th className="text-left p-3 font-medium">Agency Name</th>
                          <th className="text-left p-3 font-medium">Country</th>
                          <th className="text-left p-3 font-medium">Categories</th>
                          <th className="text-left p-3 font-medium">Date Added</th>
                          <th className="text-right p-3 font-medium">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {recentAgencies.map((agency) => (
                          <tr 
                            key={agency.id} 
                            className="bg-card hover:bg-muted/20 transition-colors"
                          >
                            <td className="p-3 font-medium">{agency.name}</td>
                            <td className="p-3 text-muted-foreground">{agency.country}</td>
                            <td className="p-3">
                              <div className="flex flex-wrap gap-1">
                                {agency.category.map((cat, i) => (
                                  <span 
                                    key={i} 
                                    className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full"
                                  >
                                    {cat}
                                  </span>
                                ))}
                              </div>
                            </td>
                            <td className="p-3 text-muted-foreground">
                              {formatDate(agency.createdAt)}
                            </td>
                            <td className="p-3 text-right">
                              <Button asChild variant="ghost" size="sm">
                                <Link to={`/agency/${agency.id}`}>View</Link>
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Categories */}
          <TabsContent value="categories" className="space-y-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Agency Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {categoryData.map((category, index) => (
                    <li key={index} className="flex items-center justify-between p-3 rounded-lg bg-card border">
                      <div className="flex items-center gap-3">
                        <div className="bg-primary/10 text-primary rounded-full p-2">
                          <Tag className="h-4 w-4" />
                        </div>
                        <span className="font-medium">{category.name}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-muted-foreground">{category.count} agencies</span>
                        <Button variant="ghost" size="sm" asChild>
                          <Link to={`/agencies?category=${category.name}`} className="flex items-center gap-1">
                            <Filter className="h-3.5 w-3.5" />
                            Filter
                          </Link>
                        </Button>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <div className="flex justify-between items-center w-full">
                  <span className="text-sm text-muted-foreground">Total 8 categories</span>
                  <Button variant="outline" size="sm">
                    Manage Categories
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Activity Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center bg-muted/10 rounded-lg">
              <div className="text-center space-y-3">
                <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto" />
                <p className="text-muted-foreground">
                  Chart visualization will be implemented here
                </p>
                <Button variant="outline" size="sm">
                  View Detailed Analytics
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
