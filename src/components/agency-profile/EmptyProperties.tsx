
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Building } from 'lucide-react';
import { Button } from '@/components/ui/button';

const EmptyProperties: React.FC = () => {
  return (
    <Card>
      <CardContent className="p-12">
        <div className="text-center">
          <Building className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">No Properties Yet</h3>
          <p className="text-muted-foreground max-w-md mx-auto mb-6">
            You don't have any properties listed yet. Add your first property to showcase it to potential clients.
          </p>
          <Button>Add Your First Property</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmptyProperties;
