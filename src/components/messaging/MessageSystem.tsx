import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import { Send } from 'lucide-react';
import { toast } from 'sonner';

// Mock data for messages
const mockConversations = [
  {
    id: '1',
    with: {
      id: 'agency1',
      name: 'Luxury Homes LLC',
      avatar: '/placeholder.svg',
      initials: 'LH',
    },
    messages: [
      {
        id: 'm1',
        senderId: 'agency1',
        text: 'Hello, I saw your interest in one of our properties. How can I help you?',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
      },
      {
        id: 'm2',
        senderId: 'currentUser',
        text: 'Hi! Yes, I was wondering if the property is still available?',
        timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(), // 1 hour ago
      },
      {
        id: 'm3',
        senderId: 'agency1',
        text: "Yes, it's still available. Would you like to schedule a viewing?",
        timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
      },
    ],
  },
  {
    id: '2',
    with: {
      id: 'agency2',
      name: 'Urban Properties',
      avatar: '/placeholder.svg',
      initials: 'UP',
    },
    messages: [
      {
        id: 'm4',
        senderId: 'currentUser',
        text: "I'm interested in listing my property with your agency. What are your rates?",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
      },
      {
        id: 'm5',
        senderId: 'agency2',
        text: 'Thanks for reaching out! Our standard commission rate is 2.5%. Would you like to arrange a consultation?',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 23).toISOString(), // 23 hours ago
      },
    ],
  },
];

const MessageSystem: React.FC = () => {
  const { user } = useAuth();
  const [conversations, setConversations] = useState(mockConversations);
  const [activeConversation, setActiveConversation] = useState<string | null>(mockConversations[0]?.id || null);
  const [newMessage, setNewMessage] = useState('');

  const selectedConversation = conversations.find(conv => conv.id === activeConversation);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !activeConversation) return;

    const updatedConversations = conversations.map(conv => {
      if (conv.id === activeConversation) {
        return {
          ...conv,
          messages: [
            ...conv.messages,
            {
              id: `m${Date.now()}`,
              senderId: 'currentUser',
              text: newMessage,
              timestamp: new Date().toISOString(),
            },
          ],
        };
      }
      return conv;
    });

    setConversations(updatedConversations);
    setNewMessage('');
    toast.success('Message sent successfully!');
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (!user) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Messages</CardTitle>
          <CardDescription>
            Please log in to access your messages.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Messages</CardTitle>
        <CardDescription>
          Communicate with agencies and support directly through our messaging system.
        </CardDescription>
      </CardHeader>
      <Separator />
      <div className="grid md:grid-cols-[280px_1fr] h-[600px]">
        {/* Conversation List */}
        <div className="border-r">
          <ScrollArea className="h-[536px]">
            {conversations.map(conversation => (
              <div
                key={conversation.id}
                className={`p-4 cursor-pointer hover:bg-accent transition-colors ${
                  activeConversation === conversation.id ? 'bg-accent' : ''
                }`}
                onClick={() => setActiveConversation(conversation.id)}
              >
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={conversation.with.avatar} alt={conversation.with.name} />
                    <AvatarFallback>{conversation.with.initials}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 overflow-hidden">
                    <p className="font-medium">{conversation.with.name}</p>
                    <p className="text-sm text-muted-foreground truncate">
                      {conversation.messages[conversation.messages.length - 1].text}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </ScrollArea>
        </div>

        {/* Message Area */}
        <div className="flex flex-col h-full">
          {selectedConversation ? (
            <>
              <div className="p-4 border-b">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={selectedConversation.with.avatar} alt={selectedConversation.with.name} />
                    <AvatarFallback>{selectedConversation.with.initials}</AvatarFallback>
                  </Avatar>
                  <p className="font-medium">{selectedConversation.with.name}</p>
                </div>
              </div>

              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {selectedConversation.messages.map(message => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.senderId === 'currentUser' ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      <div
                        className={`max-w-[80%] px-4 py-2 rounded-lg ${
                          message.senderId === 'currentUser'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-secondary'
                        }`}
                      >
                        <p>{message.text}</p>
                        <p className={`text-xs mt-1 ${
                          message.senderId === 'currentUser'
                            ? 'text-primary-foreground/80'
                            : 'text-muted-foreground'
                        }`}>
                          {formatTime(message.timestamp)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              <CardFooter className="border-t p-4 gap-2">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <Button size="icon" onClick={handleSendMessage}>
                  <Send className="h-4 w-4" />
                </Button>
              </CardFooter>
            </>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-muted-foreground">Select a conversation to start messaging</p>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default MessageSystem;
