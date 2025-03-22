
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import MessageSystem from '@/components/messaging/MessageSystem';

const Messages: React.FC = () => {
  return (
    <MainLayout>
      <div className="max-w-5xl mx-auto">
        <div className="space-y-6 py-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Messages</h1>
            <p className="text-muted-foreground">
              Communicate with agencies and support directly through our messaging system.
            </p>
          </div>
          
          <MessageSystem />
        </div>
      </div>
    </MainLayout>
  );
};

export default Messages;
