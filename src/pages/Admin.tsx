
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Settings, Users, Database, FileText, Upload, Search, Check, X, MoreHorizontal } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

// Mock admin users
const mockUsers = [
  { 
    id: '1', 
    name: 'John Smith', 
    email: 'john@example.com', 
    role: 'Admin', 
    status: 'Active',
    lastLogin: '2023-09-15T10:30:00Z' 
  },
  { 
    id: '2', 
    name: 'Jane Doe', 
    email: 'jane@example.com', 
    role: 'Editor', 
    status: 'Active',
    lastLogin: '2023-09-14T15:45:00Z' 
  },
  { 
    id: '3', 
    name: 'Michael Johnson', 
    email: 'michael@example.com', 
    role: 'Viewer', 
    status: 'Invited',
    lastLogin: null 
  },
  { 
    id: '4', 
    name: 'Sarah Williams', 
    email: 'sarah@example.com', 
    role: 'Editor', 
    status: 'Active',
    lastLogin: '2023-09-13T09:20:00Z' 
  },
];

// Mock settings
const mockSettings = [
  {
    category: 'General',
    settings: [
      { id: 'platform_name', name: 'Platform Name', value: 'RealEstate Hub', type: 'text' },
      { id: 'contact_email', name: 'Contact Email', value: 'info@realestatehub.com', type: 'email' },
      { id: 'allow_signups', name: 'Allow New Signups', value: true, type: 'boolean' },
    ]
  },
  {
    category: 'Agencies',
    settings: [
      { id: 'require_approval', name: 'Require Admin Approval', value: true, type: 'boolean' },
      { id: 'max_categories', name: 'Maximum Categories per Agency', value: 5, type: 'number' },
      { id: 'enable_analytics', name: 'Enable Agency Analytics', value: true, type: 'boolean' },
    ]
  },
  {
    category: 'Appearance',
    settings: [
      { id: 'primary_color', name: 'Primary Brand Color', value: '#3B82F6', type: 'color' },
      { id: 'logo_url', name: 'Logo URL', value: '/logo.png', type: 'text' },
      { id: 'enable_dark_mode', name: 'Enable Dark Mode', value: true, type: 'boolean' },
    ]
  },
];

// Format date string for last login
const formatLastLogin = (dateString: string | null) => {
  if (!dateString) return 'Never';
  
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) {
    return 'Today';
  } else if (diffDays === 1) {
    return 'Yesterday';
  } else if (diffDays < 7) {
    return `${diffDays} days ago`;
  } else {
    return date.toLocaleDateString();
  }
};

const Admin = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [updatedSettings, setUpdatedSettings] = useState<Record<string, any>>({});

  // Handle search
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  // Filter users based on search query
  const filteredUsers = mockUsers.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle setting change
  const handleSettingChange = (id: string, value: any) => {
    setUpdatedSettings(prev => ({
      ...prev,
      [id]: value
    }));
  };

  // Get current setting value
  const getSettingValue = (id: string, defaultValue: any) => {
    return updatedSettings.hasOwnProperty(id) ? updatedSettings[id] : defaultValue;
  };

  // Handle settings save
  const handleSaveSettings = () => {
    console.log('Updated settings:', updatedSettings);
    toast.success('Settings saved successfully!');
    setUpdatedSettings({});
  };

  return (
    <MainLayout>
      <div className="flex flex-col space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Manage users, settings, and platform configuration.
          </p>
        </div>

        <Tabs defaultValue="users" className="space-y-8">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Users</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">Settings</span>
            </TabsTrigger>
            <TabsTrigger value="data" className="flex items-center gap-2">
              <Database className="h-4 w-4" />
              <span className="hidden sm:inline">Data</span>
            </TabsTrigger>
          </TabsList>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <CardTitle>User Management</CardTitle>
                  <Button>
                    <Users className="h-4 w-4 mr-2" />
                    Invite User
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      placeholder="Search users..."
                      value={searchQuery}
                      onChange={handleSearch}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="rounded-lg border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Last Login</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredUsers.length > 0 ? (
                        filteredUsers.map((user) => (
                          <TableRow key={user.id}>
                            <TableCell className="font-medium">{user.name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>
                              <span className={cn(
                                "px-2 py-1 rounded-full text-xs",
                                user.role === 'Admin' ? "bg-primary/10 text-primary" :
                                user.role === 'Editor' ? "bg-amber-500/10 text-amber-500" :
                                "bg-slate-500/10 text-slate-500"
                              )}>
                                {user.role}
                              </span>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                <span className={cn(
                                  "h-2 w-2 rounded-full",
                                  user.status === 'Active' ? "bg-emerald-500" : "bg-amber-500"
                                )} />
                                {user.status}
                              </div>
                            </TableCell>
                            <TableCell>{formatLastLogin(user.lastLogin)}</TableCell>
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>Edit User</DropdownMenuItem>
                                  <DropdownMenuItem>Change Role</DropdownMenuItem>
                                  <DropdownMenuItem className="text-destructive">
                                    Delete User
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                            No users found matching your search.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Platform Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {mockSettings.map((section) => (
                    <div key={section.category} className="space-y-4">
                      <h3 className="text-lg font-medium">{section.category}</h3>
                      <Separator />
                      
                      <div className="space-y-6">
                        {section.settings.map((setting) => (
                          <div key={setting.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div>
                              <label 
                                htmlFor={setting.id} 
                                className="text-sm font-medium"
                              >
                                {setting.name}
                              </label>
                            </div>
                            
                            <div className="flex-shrink-0">
                              {setting.type === 'boolean' ? (
                                <Switch
                                  id={setting.id}
                                  checked={getSettingValue(setting.id, setting.value)}
                                  onCheckedChange={(checked) => handleSettingChange(setting.id, checked)}
                                />
                              ) : setting.type === 'number' ? (
                                <Input
                                  id={setting.id}
                                  type="number"
                                  value={getSettingValue(setting.id, setting.value)}
                                  onChange={(e) => handleSettingChange(setting.id, parseInt(e.target.value))}
                                  className="w-24"
                                />
                              ) : setting.type === 'color' ? (
                                <div className="flex items-center gap-2">
                                  <div 
                                    className="h-6 w-6 rounded-full border"
                                    style={{ backgroundColor: getSettingValue(setting.id, setting.value) }}
                                  />
                                  <Input
                                    id={setting.id}
                                    type="text"
                                    value={getSettingValue(setting.id, setting.value)}
                                    onChange={(e) => handleSettingChange(setting.id, e.target.value)}
                                    className="w-32"
                                  />
                                </div>
                              ) : (
                                <Input
                                  id={setting.id}
                                  type={setting.type}
                                  value={getSettingValue(setting.id, setting.value)}
                                  onChange={(e) => handleSettingChange(setting.id, e.target.value)}
                                  className="w-full sm:w-64"
                                />
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 flex justify-end">
                  <Button
                    onClick={handleSaveSettings}
                    disabled={Object.keys(updatedSettings).length === 0}
                  >
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Data Tab */}
          <TabsContent value="data" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Export Data */}
              <Card>
                <CardHeader>
                  <CardTitle>Export Data</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Export your platform data in various formats for backup or analysis.
                  </p>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-primary" />
                        <span>Agencies Data (CSV)</span>
                      </div>
                      <Button size="sm" variant="outline">Export</Button>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-primary" />
                        <span>Agencies Data (JSON)</span>
                      </div>
                      <Button size="sm" variant="outline">Export</Button>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-primary" />
                        <span>Users Data (CSV)</span>
                      </div>
                      <Button size="sm" variant="outline">Export</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Import Data */}
              <Card>
                <CardHeader>
                  <CardTitle>Import Data</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Import data from external sources to populate your platform.
                  </p>
                  
                  <div className="border-2 border-dashed rounded-lg p-6 text-center space-y-3">
                    <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Upload className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Drag and drop files or</p>
                      <p className="text-sm text-muted-foreground mb-2">
                        Supported formats: CSV, JSON
                      </p>
                      <Button size="sm">Browse Files</Button>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-emerald-500" />
                      <span>Data validation</span>
                    </div>
                    <Switch checked={true} />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Database Status */}
            <Card>
              <CardHeader>
                <CardTitle>Database Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 border rounded-lg">
                      <p className="text-sm text-muted-foreground mb-1">Total Agencies</p>
                      <p className="text-2xl font-bold">134</p>
                    </div>
                    
                    <div className="p-4 border rounded-lg">
                      <p className="text-sm text-muted-foreground mb-1">Database Size</p>
                      <p className="text-2xl font-bold">4.2 MB</p>
                    </div>
                    
                    <div className="p-4 border rounded-lg">
                      <p className="text-sm text-muted-foreground mb-1">Last Backup</p>
                      <p className="text-2xl font-bold">2 days ago</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-end gap-3">
                    <Button variant="outline">Run Backup</Button>
                    <Button variant="outline" className="text-destructive border-destructive">
                      Clear Cache
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Admin;
