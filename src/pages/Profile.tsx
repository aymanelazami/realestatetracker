
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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  User, 
  Mail, 
  Calendar, 
  Shield, 
  Save
} from 'lucide-react';
import { toast } from 'sonner';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || ''
  });
  const [isEditing, setIsEditing] = useState(false);

  if (!user) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-[50vh]">
          <p>Please login to view your profile.</p>
        </div>
      </MainLayout>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Update user info
    updateUser({
      name: formData.name,
      // For security reasons, we don't allow email updates in this simplified version
    });

    setIsEditing(false);
    toast.success('Profile updated successfully');
  };

  const toggleEdit = () => {
    if (isEditing) {
      // Reset form data if canceling edit
      setFormData({
        name: user.name,
        email: user.email
      });
    }
    setIsEditing(!isEditing);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <MainLayout>
      <div className="container mx-auto py-6 max-w-3xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">My Profile</h1>
            <p className="text-muted-foreground">
              Manage your personal information
            </p>
          </div>
          <Button 
            onClick={toggleEdit} 
            variant={isEditing ? "outline" : "default"}
          >
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Profile sidebar */}
          <Card className="md:col-span-1">
            <CardContent className="pt-6 flex flex-col items-center">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarFallback className="text-2xl">
                  {getInitials(user.name)}
                </AvatarFallback>
              </Avatar>
              <h3 className="font-medium text-lg">{user.name}</h3>
              <p className="text-muted-foreground text-sm text-center mt-1">{user.email}</p>
              
              <div className="mt-4 bg-secondary/50 w-full rounded-md p-3 flex items-center gap-2">
                <Shield className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">
                  {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Profile main content */}
          <Card className="md:col-span-3">
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                {isEditing 
                  ? 'Update your personal information below'
                  : 'View your personal information'
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        Full Name
                      </Label>
                      {isEditing ? (
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                        />
                      ) : (
                        <p className="text-muted-foreground py-2">{user.name}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        Email Address
                      </Label>
                      {isEditing ? (
                        <Input
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          disabled
                          className="bg-muted/30"
                        />
                      ) : (
                        <p className="text-muted-foreground py-2">{user.email}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Account Created
                    </Label>
                    <p className="text-muted-foreground">{formatDate(user.createdAt)}</p>
                  </div>

                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      Account Type
                    </Label>
                    <p className="text-muted-foreground capitalize">{user.role}</p>
                  </div>
                </div>

                {isEditing && (
                  <div className="mt-6">
                    <Button type="submit" className="w-full md:w-auto">
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                  </div>
                )}
              </form>
            </CardContent>
            {!isEditing && (
              <CardFooter className="flex justify-between border-t pt-6">
                <div className="text-sm text-muted-foreground">
                  Last updated: {formatDate(user.createdAt || new Date().toISOString())}
                </div>
              </CardFooter>
            )}
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Profile;
