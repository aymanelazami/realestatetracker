
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { toast } from 'sonner';

import { Form } from '@/components/ui/form';
import { AgencyFormData } from '@/types';
import { formSchema } from './form/formSchema';

// Form components
import AgencyBasicInfo from './form/AgencyBasicInfo';
import AgencyAddressInfo from './form/AgencyAddressInfo';
import AgencySocialMediaInfo from './form/AgencySocialMediaInfo';
import AgencyLogoUpload from './form/AgencyLogoUpload';
import AgencyCategorySelector from './form/AgencyCategorySelector';
import FormActions from './form/FormActions';

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
          <AgencyLogoUpload 
            logoPreview={logoPreview} 
            setLogoPreview={setLogoPreview} 
          />

          {/* Basic Information */}
          <AgencyBasicInfo form={form} />

          {/* Address Information */}
          <AgencyAddressInfo form={form} />

          {/* Categories */}
          <AgencyCategorySelector 
            form={form}
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
          />

          {/* Social Media */}
          <AgencySocialMediaInfo form={form} />

          {/* Form Actions */}
          <FormActions 
            isEditing={isEditing} 
            isSubmitting={isSubmitting} 
          />
        </form>
      </Form>
    </div>
  );
};

export default AgencyForm;
