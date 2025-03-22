
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ContactForm from '@/components/support/ContactForm';
import SupportFAQ from '@/components/support/SupportFAQ';
import { MessageSquare, Mail, HelpCircle } from 'lucide-react';

const Support: React.FC = () => {
  return (
    <MainLayout>
      <div className="max-w-5xl mx-auto">
        <div className="space-y-6 py-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Support Center</h1>
            <p className="text-muted-foreground">
              Get help with your account, listings, or technical issues.
            </p>
          </div>

          <Tabs defaultValue="contact" className="space-y-4">
            <TabsList className="grid w-full md:w-auto md:inline-flex grid-cols-2 md:grid-cols-none">
              <TabsTrigger value="contact" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>Contact Us</span>
              </TabsTrigger>
              <TabsTrigger value="faq" className="flex items-center gap-2">
                <HelpCircle className="h-4 w-4" />
                <span>FAQ</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="contact" className="space-y-4">
              <Card>
                <CardHeader className="px-6">
                  <CardTitle>Contact Our Support Team</CardTitle>
                  <CardDescription>
                    Fill out the form below and we'll get back to you as soon as possible.
                  </CardDescription>
                </CardHeader>
                <CardContent className="px-6">
                  <ContactForm />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="px-6">
                  <CardTitle>Other Ways to Reach Us</CardTitle>
                  <CardDescription>
                    If you prefer, you can also contact us through these channels.
                  </CardDescription>
                </CardHeader>
                <CardContent className="px-6 grid gap-4 md:grid-cols-2">
                  <div className="flex flex-col items-start space-y-2 p-4 border rounded-lg hover:bg-accent transition-colors">
                    <Mail className="h-6 w-6 text-primary" />
                    <h3 className="font-medium">Email Support</h3>
                    <p className="text-sm text-muted-foreground">
                      For general inquiries and support
                    </p>
                    <a href="mailto:support@realestatehub.com" className="text-sm text-primary hover:underline">
                      support@realestatehub.com
                    </a>
                  </div>
                  
                  <div className="flex flex-col items-start space-y-2 p-4 border rounded-lg hover:bg-accent transition-colors">
                    <MessageSquare className="h-6 w-6 text-primary" />
                    <h3 className="font-medium">Live Chat</h3>
                    <p className="text-sm text-muted-foreground">
                      Available Monday-Friday, 9am-5pm EST
                    </p>
                    <button className="text-sm text-primary hover:underline">
                      Start a chat session
                    </button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="faq" className="space-y-4">
              <Card>
                <CardHeader className="px-6">
                  <CardTitle>Frequently Asked Questions</CardTitle>
                  <CardDescription>
                    Find answers to common questions about using RealEstate Hub.
                  </CardDescription>
                </CardHeader>
                <CardContent className="px-6">
                  <SupportFAQ />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </MainLayout>
  );
};

export default Support;
