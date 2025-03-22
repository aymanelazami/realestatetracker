
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { 
  Switch 
} from '@/components/ui/switch';
import { 
  Bell, 
  Lock, 
  UserCog, 
  Globe, 
  Moon, 
  Sun, 
  AlertTriangle 
} from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

const Settings = () => {
  const { user } = useAuth();
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);
  
  if (!user) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-[50vh]">
          <p>Please login to view settings.</p>
        </div>
      </MainLayout>
    );
  }

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Password changed successfully');
  };

  const handleThemeChange = () => {
    setDarkMode(!darkMode);
    toast.success(`Theme changed to ${!darkMode ? 'dark' : 'light'} mode`);
  };

  return (
    <MainLayout>
      <div className="container mx-auto py-6 max-w-4xl">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account settings and preferences
          </p>
        </div>

        <Tabs defaultValue="account" className="w-full">
          <TabsList className="mb-8 grid grid-cols-3 md:grid-cols-4 max-w-xl">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>
          
          {/* Account Settings */}
          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserCog className="h-5 w-5" />
                  Account Preferences
                </CardTitle>
                <CardDescription>
                  Manage your account settings and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="language" className="text-base">Language</Label>
                    <div className="flex items-center">
                      <Globe className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>English</span>
                    </div>
                  </div>
                </div>
                
                <div className="border-t pt-6">
                  <div className="space-y-2">
                    <h3 className="font-medium">Danger Zone</h3>
                    <div className="bg-destructive/10 rounded-md p-4 flex items-center justify-between">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-destructive">Delete Account</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            Permanently delete your account and all of your data
                          </p>
                        </div>
                      </div>
                      <Button variant="destructive" size="sm">
                        Delete Account
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Notification Settings */}
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notification Preferences
                </CardTitle>
                <CardDescription>
                  Control how we communicate with you
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="font-medium">Email Notifications</p>
                      <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                    </div>
                    <Switch 
                      checked={emailNotifications}
                      onCheckedChange={setEmailNotifications}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="font-medium">Marketing Emails</p>
                      <p className="text-sm text-muted-foreground">Receive marketing and newsletter emails</p>
                    </div>
                    <Switch 
                      checked={marketingEmails}
                      onCheckedChange={setMarketingEmails}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={() => toast.success('Notification preferences saved')}>
                  Save Preferences
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          {/* Appearance Settings */}
          <TabsContent value="appearance">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {darkMode ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                  Appearance
                </CardTitle>
                <CardDescription>
                  Customize how the application looks
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="font-medium">Dark Mode</p>
                      <p className="text-sm text-muted-foreground">Toggle between light and dark mode</p>
                    </div>
                    <Switch 
                      checked={darkMode}
                      onCheckedChange={handleThemeChange}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Security Settings */}
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5" />
                  Security Settings
                </CardTitle>
                <CardDescription>
                  Manage your security preferences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleChangePassword} className="space-y-6">
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="current-password">Current Password</Label>
                        <Input id="current-password" type="password" />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="new-password">New Password</Label>
                        <Input id="new-password" type="password" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirm New Password</Label>
                        <Input id="confirm-password" type="password" />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <Button type="submit">Change Password</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Settings;
