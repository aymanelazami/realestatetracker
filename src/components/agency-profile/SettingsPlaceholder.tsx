
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

const SettingsPlaceholder: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Settings</CardTitle>
        <CardDescription>Manage your agency profile settings</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="bg-muted/30 p-8 rounded-lg flex items-center justify-center">
          <p className="text-muted-foreground">Settings options will be displayed here</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SettingsPlaceholder;
