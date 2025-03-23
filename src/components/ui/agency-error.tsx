
import React from 'react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Home, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface AgencyErrorProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  showHomeButton?: boolean;
}

const AgencyError: React.FC<AgencyErrorProps> = ({
  title = "Something went wrong",
  message = "An error occurred while loading agency data.",
  onRetry,
  showHomeButton = true
}) => {
  const navigate = useNavigate();

  return (
    <div className="max-w-3xl mx-auto py-8 text-center">
      <div className="bg-destructive/10 dark:bg-destructive/20 p-8 rounded-lg">
        <AlertTitle className="text-2xl font-semibold text-destructive mb-4">
          {title}
        </AlertTitle>
        
        <AlertDescription className="text-muted-foreground mb-6 text-base">
          {message}
        </AlertDescription>
        
        <div className="flex justify-center gap-4">
          {onRetry && (
            <Button onClick={onRetry} variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
          )}
          
          {showHomeButton && (
            <Button onClick={() => navigate('/')}>
              <Home className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AgencyError;
