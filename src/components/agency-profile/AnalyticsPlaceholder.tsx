
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface AnalyticsPlaceholderProps {
  title: string;
}

const AnalyticsPlaceholder: React.FC<AnalyticsPlaceholderProps> = ({ title }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-muted/30 h-[200px] rounded-md flex items-center justify-center">
          <p className="text-muted-foreground">Analytics chart will be displayed here</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AnalyticsPlaceholder;
