
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

const ActivitySummary: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Latest updates and interactions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="bg-muted/30 p-8 rounded-lg flex items-center justify-center">
          <p className="text-muted-foreground">Activity data will be displayed here</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivitySummary;
