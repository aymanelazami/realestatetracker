
import { z } from 'zod';

// Form validation schema
export const formSchema = z.object({
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

export type FormSchemaType = z.infer<typeof formSchema>;

export function formatFormErrors(errors: Record<string, string[]>) {
  return Object.entries(errors).map(([field, messages]) => ({
    field,
    message: messages.join(', ')
  }));
}

export const getErrorsFromZodError = (result: z.ZodError) => {
  const errors: Record<string, string[]> = {};
  
  result.errors.forEach((error) => {
    const path = error.path.join('.');
    if (!errors[path]) {
      errors[path] = [];
    }
    errors[path].push(error.message);
  });
  
  return errors;
};
