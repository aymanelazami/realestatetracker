
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Alert } from '@/components/ui/alert';
import ErrorBoundary from '@/components/ui/error-boundary';

// This component will intentionally throw an error when the button is clicked
const BuggyComponent = () => {
  const [shouldError, setShouldError] = useState(false);
  
  if (shouldError) {
    throw new Error('This is a test error');
  }
  
  return (
    <div className="p-4 border rounded-md">
      <h3 className="font-medium mb-2">Test Component</h3>
      <p className="text-muted-foreground mb-4">
        Click the button below to trigger an error
      </p>
      <Button onClick={() => setShouldError(true)}>
        Trigger Error
      </Button>
    </div>
  );
};

const ErrorTest = () => {
  const [key, setKey] = useState(0);
  
  return (
    <div className="space-y-4">
      <Alert>
        <p>This component demonstrates how the ErrorBoundary handles errors.</p>
      </Alert>
      
      <ErrorBoundary key={key} onReset={() => setKey(prev => prev + 1)}>
        <BuggyComponent />
      </ErrorBoundary>
    </div>
  );
};

export default ErrorTest;
