
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { formatDate } from '@/utils/dateUtils';

interface AgencyMetadataProps {
  createdAt: string;
  updatedAt: string;
  id: string;
}

const AgencyMetadata: React.FC<AgencyMetadataProps> = ({ createdAt, updatedAt, id }) => {
  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold mb-4">Metadata</h2>
        <dl className="space-y-4">
          <div>
            <dt className="text-sm text-muted-foreground">Created On</dt>
            <dd className="font-medium">{formatDate(createdAt)}</dd>
          </div>
          <div>
            <dt className="text-sm text-muted-foreground">Last Updated</dt>
            <dd className="font-medium">{formatDate(updatedAt)}</dd>
          </div>
          <div>
            <dt className="text-sm text-muted-foreground">ID</dt>
            <dd className="font-medium text-xs truncate text-muted-foreground">
              {id}
            </dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  );
};

export default AgencyMetadata;
