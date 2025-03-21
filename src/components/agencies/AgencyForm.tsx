
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { X, Plus, Upload } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { AgencyFormData, AgencyCategory } from '@/types';

// Category options
const CATEGORIES: AgencyCategory[] = [
  'Residential',
  'Commercial',
  'Industrial',
  'Land',
  'Property Management',
  'Luxury',
  'Investment',
  'International',
];

// Form validation schema
const formSchema = z.object({
  name: z.string().min(2, { message: 'Agency name must be at least 2 characters.' }),
  description: z.string().optional(),
  website: z.string().url({ message: 'Please enter a valid URL.' }).optional().or(z.literal('')),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  phone: z.string().min(5, { message: 'Please enter a valid phone number.' }),
  address: z.string().min(5, { message: 'Address is required.' }),
  city: z.string().min(2, { message: 'City is required.' }),
  state: z.string().optional(),
  zipCode: z.string().optional(),
  country: z.string().min(2, { message: 'Country is required.' }),
  category: z.array(z.string()).min(1, { message: 'Select at least one category.' }),
  socialMedia: z.object({
    facebook: z.string().url({ message: 'Please enter a valid URL.' }).optional().or(z.literal('')),
    instagram: z.string().url({ message: 'Please enter a valid URL.' }).optional().or(z.literal('')),
    twitter: z.string().url({ message: 'Please enter a valid URL.' }).optional().or(z.literal('')),
    linkedin: z.string().url({ message: 'Please enter a valid URL.' }).optional().or(z.literal('')),
  }),
});

interface AgencyFormProps {
  initialData?: Partial<AgencyFormData>;
  isEditing?: boolean;
}

const AgencyForm: React.FC<AgencyFormProps> = ({ 
  initialData, 
  isEditing = false 
}) => {
  const navigate = useNavigate();
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    initialData?.category || []
  );
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || '',
      description: initialData?.description || '',
      website: initialData?.website || '',
      email: initialData?.email || '',
      phone: initialData?.phone || '',
      address: initialData?.address || '',
      city: initialData?.city || '',
      state: initialData?.state || '',
      zipCode: initialData?.zipCode || '',
      country: initialData?.country || '',
      category: initialData?.category || [],
      socialMedia: {
        facebook: initialData?.socialMedia?.facebook || '',
        instagram: initialData?.socialMedia?.instagram || '',
        twitter: initialData?.socialMedia?.twitter || '',
        linkedin: initialData?.socialMedia?.linkedin || '',
      },
    },
  });

  // Handle logo upload
  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Create a preview URL
      const reader = new FileReader();
      reader.onload = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Add a category
  const addCategory = (category: string) => {
    if (!selectedCategories.includes(category)) {
      const updatedCategories = [...selectedCategories, category];
      setSelectedCategories(updatedCategories);
      form.setValue('category', updatedCategories);
    }
  };

  // Remove a category
  const removeCategory = (category: string) => {
    const updatedCategories = selectedCategories.filter(c => c !== category);
    setSelectedCategories(updatedCategories);
    form.setValue('category', updatedCategories);
  };

  // Form submission
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    try {
      // In a real app, you would send this data to your backend
      console.log("Form data:", { ...values, logo: logoPreview });
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success toast
      toast.success(
        isEditing ? 'Agency updated successfully!' : 'Agency added successfully!'
      );
      
      // Navigate back to the agencies list
      navigate('/agencies');
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Agency Logo */}
          <div className="mb-6">
            <FormLabel>Agency Logo</FormLabel>
            <div className="mt-2 flex items-center gap-4">
              <div className={`h-24 w-24 rounded-md border-2 border-dashed border-border flex items-center justify-center overflow-hidden ${logoPreview ? 'border-solid' : ''}`}>
                {logoPreview ? (
                  <img 
                    src={logoPreview} 
                    alt="Agency logo preview" 
                    className="h-full w-full object-contain"
                  />
                ) : (
                  <Upload className="h-8 w-8 text-muted-foreground" />
                )}
              </div>
              <div>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => document.getElementById('logo-upload')?.click()}
                  className="mb-2"
                >
                  {logoPreview ? 'Change Logo' : 'Upload Logo'}
                </Button>
                {logoPreview && (
                  <Button 
                    type="button" 
                    variant="ghost" 
                    onClick={() => setLogoPreview(null)}
                    size="sm"
                    className="text-muted-foreground"
                  >
                    Remove
                  </Button>
                )}
                <input 
                  id="logo-upload" 
                  type="file" 
                  accept="image/*" 
                  onChange={handleLogoUpload} 
                  className="hidden" 
                />
                <p className="text-sm text-muted-foreground mt-1">
                  Recommended: 300x300px, max 2MB
                </p>
              </div>
            </div>
          </div>

          {/* Basic Information */}
          <div className="grid gap-6 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Agency Name*</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter agency name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address*</FormLabel>
                  <FormControl>
                    <Input placeholder="contact@agency.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number*</FormLabel>
                  <FormControl>
                    <Input placeholder="+1 (555) 555-5555" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Website</FormLabel>
                  <FormControl>
                    <Input placeholder="https://www.agency.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Enter a brief description of the agency" 
                    className="min-h-[120px]"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Address Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Address Information</h3>
            
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Street Address*</FormLabel>
                  <FormControl>
                    <Input placeholder="123 Main St" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid gap-6 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City*</FormLabel>
                    <FormControl>
                      <Input placeholder="New York" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>State/Province</FormLabel>
                    <FormControl>
                      <Input placeholder="NY" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="zipCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Zip/Postal Code</FormLabel>
                    <FormControl>
                      <Input placeholder="10001" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country*</FormLabel>
                    <FormControl>
                      <Input placeholder="United States" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <FormItem>
              <FormLabel>Categories* (Select at least one)</FormLabel>
              <div className="flex flex-wrap gap-2 mb-2">
                {selectedCategories.map((category) => (
                  <Badge 
                    key={category}
                    variant="secondary"
                    className="py-1.5 pl-2 pr-1 flex items-center gap-1"
                  >
                    {category}
                    <button
                      type="button"
                      onClick={() => removeCategory(category)}
                      className="ml-1 rounded-full p-0.5 hover:bg-secondary-foreground/10"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              
              <Select
                onValueChange={(value) => addCategory(value)}
                value=""
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.filter(c => !selectedCategories.includes(c)).map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              {form.formState.errors.category && (
                <p className="text-sm font-medium text-destructive mt-2">
                  {form.formState.errors.category.message as string}
                </p>
              )}
            </FormItem>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Social Media</h3>
            
            <div className="grid gap-6 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="socialMedia.facebook"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Facebook</FormLabel>
                    <FormControl>
                      <Input placeholder="https://facebook.com/agency" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="socialMedia.instagram"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Instagram</FormLabel>
                    <FormControl>
                      <Input placeholder="https://instagram.com/agency" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="socialMedia.twitter"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Twitter</FormLabel>
                    <FormControl>
                      <Input placeholder="https://twitter.com/agency" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="socialMedia.linkedin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>LinkedIn</FormLabel>
                    <FormControl>
                      <Input placeholder="https://linkedin.com/company/agency" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-3">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => navigate('/agencies')}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : isEditing ? 'Update Agency' : 'Add Agency'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AgencyForm;
