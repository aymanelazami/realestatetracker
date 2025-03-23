
import React from 'react';
import { FormLabel } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';

interface AgencyLogoUploadProps {
  logoPreview: string | null;
  setLogoPreview: (preview: string | null) => void;
}

const AgencyLogoUpload: React.FC<AgencyLogoUploadProps> = ({ 
  logoPreview, 
  setLogoPreview 
}) => {
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

  return (
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
  );
};

export default AgencyLogoUpload;
