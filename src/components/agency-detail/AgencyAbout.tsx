
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface AgencyAboutProps {
  description: string;
}

const AgencyAbout: React.FC<AgencyAboutProps> = ({ description }) => {
  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold mb-4">About</h2>
        <p className="text-muted-foreground leading-relaxed">
          {description || "No description provided."}
        </p>
      </CardContent>
    </Card>
  );
};

export default AgencyAbout;
