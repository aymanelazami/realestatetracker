
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole, LoginCredentials, RegisterData } from '@/types';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<boolean>;
  register: (data: RegisterData) => Promise<boolean>;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data for development purposes
const MOCK_USERS = [
  {
    id: '1',
    email: 'admin@realestate.com',
    name: 'Admin User',
    role: 'admin' as UserRole,
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    email: 'agency@realestate.com',
    name: 'Agency User',
    role: 'agency' as UserRole,
    agencyId: '1',
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    email: 'user@realestate.com',
    name: 'Regular User',
    role: 'visitor' as UserRole,
    createdAt: new Date().toISOString(),
  },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Mock API call - in production, this would be a real API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const foundUser = MOCK_USERS.find(u => u.email === credentials.email);
      
      if (foundUser) {
        setUser(foundUser);
        localStorage.setItem('user', JSON.stringify(foundUser));
        toast({
          title: 'Login Successful',
          description: `Welcome back, ${foundUser.name}!`,
        });
        return true;
      } else {
        toast({
          variant: 'destructive',
          title: 'Login Failed',
          description: 'Invalid email or password.',
        });
        return false;
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Login Error',
        description: 'An error occurred during login.',
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterData): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Check if user already exists
      const userExists = MOCK_USERS.some(u => u.email === data.email);
      
      if (userExists) {
        toast({
          variant: 'destructive',
          title: 'Registration Failed',
          description: 'An account with this email already exists.',
        });
        return false;
      }
      
      // In a real app, this would send data to your backend
      const newUser: User = {
        id: String(MOCK_USERS.length + 1),
        email: data.email,
        name: data.name,
        role: data.role || 'visitor',
        createdAt: new Date().toISOString(),
      };
      
      // For demo purposes, we'll just set this user as authenticated
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      
      toast({
        title: 'Registration Successful',
        description: 'Your account has been created.',
      });
      return true;
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Registration Error',
        description: 'An error occurred during registration.',
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast({
      title: 'Logged Out',
      description: 'You have been successfully logged out.',
    });
  };

  const updateUser = (updatedData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updatedData };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      // Show success toast when the user is updated
      toast({
        title: 'Profile Updated',
        description: 'Your profile has been successfully updated.',
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
