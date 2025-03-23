
import React from 'react';
import { FormItem, FormLabel } from '@/components/ui/form';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { formSchema } from './formSchema';
import { AgencyCategory } from '@/types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

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

interface AgencyCategorySelectorProps {
  form: UseFormReturn<z.infer<typeof formSchema>>;
  selectedCategories: string[];
  setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
}

const AgencyCategorySelector: React.FC<AgencyCategorySelectorProps> = ({ 
  form, 
  selectedCategories, 
  setSelectedCategories 
}) => {
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

  return (
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
  );
};

export default AgencyCategorySelector;
