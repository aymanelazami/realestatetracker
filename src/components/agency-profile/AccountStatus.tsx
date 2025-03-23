
import React from 'react';
import { Agency } from '@/types';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { User } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { formatDate } from '@/utils/dateUtils';

interface AccountStatusProps {
  agency: Agency;
}

const AccountStatus: React.FC<AccountStatusProps> = ({ agency }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <User className="h-5 w-5 text-primary" />
            <span className="font-medium">Active</span>
          </div>
          <span className="px-2.5 py-0.5 bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400 rounded-full text-xs font-medium">
            Verified
          </span>
        </div>
        
        <Separator className="my-4" />
        
        <div className="text-sm">
          <dl className="space-y-2">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Account Type:</dt>
              <dd className="font-medium">Agency</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Last Updated:</dt>
              <dd>{formatDate(agency.updatedAt)}</dd>
            </div>
          </dl>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccountStatus;
