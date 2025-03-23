
import React, { useState, useCallback } from 'react';
import ErrorBoundary from '@/components/ui/error-boundary';

export function useErrorBoundary() {
  const [key, setKey] = useState(0);

  const reset = useCallback(() => {
    setKey(prevKey => prevKey + 1);
  }, []);

  const ErrorBoundaryWrapper = useCallback(
    ({ children, fallback }: { children: React.ReactNode; fallback?: React.ReactNode }) => (
      <ErrorBoundary key={key} fallback={fallback} onReset={reset}>
        {children}
      </ErrorBoundary>
    ),
    [key, reset]
  );

  return { ErrorBoundary: ErrorBoundaryWrapper, reset };
}
