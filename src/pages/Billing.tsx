
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, Calendar, RefreshCw } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import SubscriptionPlans from '@/components/subscription/SubscriptionPlans';
import { SubscriptionPlanDetails } from '@/types';
import { useAuth } from '@/contexts/AuthContext';

const Billing = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlanDetails | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Simulate an agency subscription - in a real app, this would come from the backend
  const mockAgencySubscription = {
    plan: 'Basic',
    status: 'Active',
    expiryDate: '2023-12-31',
    nextBillingDate: '2023-12-01',
    amount: '$9.99',
    autoRenew: true,
  };

  const handlePlanSelect = (plan: SubscriptionPlanDetails) => {
    setSelectedPlan(plan);
  };

  const handleSubmitPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPlan) {
      toast({
        title: 'No plan selected',
        description: 'Please select a subscription plan first.',
        variant: 'destructive',
      });
      return;
    }

    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      toast({
        title: 'Payment Successful',
        description: `You have successfully subscribed to the ${selectedPlan.name} plan.`,
      });
      
      // In a real app, you would update the user's subscription in the database
      navigate('/settings');
    }, 1500);
  };

  const handleCancelSubscription = () => {
    toast({
      title: 'Are you sure?',
      description: 'Your subscription will continue until the end of the current billing period.',
    });
    
    // In a real app, you would show a confirmation dialog first
    setTimeout(() => {
      toast({
        title: 'Subscription Canceled',
        description: 'Your subscription has been canceled.',
      });
    }, 1000);
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => navigate('/settings')}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-bold">Subscription & Billing</h1>
          </div>
        </div>

        {user?.role === 'agency' ? (
          <Tabs defaultValue="current-plan">
            <TabsList className="mb-8">
              <TabsTrigger value="current-plan">Current Plan</TabsTrigger>
              <TabsTrigger value="upgrade">Upgrade Plan</TabsTrigger>
              <TabsTrigger value="billing-history">Billing History</TabsTrigger>
            </TabsList>
            
            <TabsContent value="current-plan">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>Current Subscription</CardTitle>
                    <CardDescription>Your current plan and billing details</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-muted/50 rounded-lg">
                        <div>
                          <h3 className="text-lg font-medium">{mockAgencySubscription.plan} Plan</h3>
                          <p className="text-sm text-muted-foreground">
                            Status: <span className="text-emerald-600 font-medium">{mockAgencySubscription.status}</span>
                          </p>
                        </div>
                        <Button onClick={() => navigate('/billing?tab=upgrade')}>
                          Upgrade Plan
                        </Button>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <h4 className="text-sm font-medium mb-2">Billing Information</h4>
                          <p className="text-sm">
                            Next billing date: <span className="font-medium">{mockAgencySubscription.nextBillingDate}</span>
                          </p>
                          <p className="text-sm">
                            Amount: <span className="font-medium">{mockAgencySubscription.amount}/month</span>
                          </p>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium mb-2">Auto-Renewal</h4>
                          <div className="flex items-center justify-between">
                            <p className="text-sm">
                              Your subscription will {mockAgencySubscription.autoRenew ? '' : 'not '}
                              automatically renew.
                            </p>
                            <Button variant="outline" size="sm">
                              <RefreshCw className="h-4 w-4 mr-2" />
                              {mockAgencySubscription.autoRenew ? 'Turn Off' : 'Turn On'}
                            </Button>
                          </div>
                        </div>
                      </div>
                      
                      <div className="pt-4 border-t flex justify-end">
                        <Button variant="outline" className="text-destructive" onClick={handleCancelSubscription}>
                          Cancel Subscription
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Payment Methods</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-3 border rounded-lg flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <CreditCard className="h-5 w-5 text-primary" />
                          <div>
                            <p className="text-sm font-medium">•••• 4242</p>
                            <p className="text-xs text-muted-foreground">Expires 12/25</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">Edit</Button>
                      </div>
                      
                      <Button variant="outline" className="w-full">
                        Add Payment Method
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="upgrade">
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-2">Upgrade Your Subscription</h2>
                <p className="text-muted-foreground">
                  Choose a plan that works best for your agency needs. You can upgrade or downgrade anytime.
                </p>
              </div>
              
              <SubscriptionPlans 
                currentPlan={mockAgencySubscription.plan}
                onSelectPlan={handlePlanSelect}
              />
              
              {selectedPlan && (
                <Card className="mt-8">
                  <CardHeader>
                    <CardTitle>Payment Information</CardTitle>
                    <CardDescription>Enter your payment details to subscribe</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmitPayment} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="cardName">Cardholder Name</Label>
                          <Input id="cardName" placeholder="John Smith" required />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="cardNumber">Card Number</Label>
                          <Input id="cardNumber" placeholder="4242 4242 4242 4242" required />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="expiryDate">Expiry Date</Label>
                          <Input id="expiryDate" placeholder="MM/YY" required />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="cvv">CVV</Label>
                          <Input id="cvv" placeholder="123" required />
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center p-4 bg-muted/50 rounded-lg">
                        <div>
                          <p className="font-medium">Total amount:</p>
                          <p className="text-sm text-muted-foreground">Billed monthly</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-bold">${selectedPlan.price}/month</p>
                          <p className="text-sm text-muted-foreground">plus applicable taxes</p>
                        </div>
                      </div>
                      
                      <div className="flex justify-end">
                        <Button type="submit" size="lg" disabled={isProcessing}>
                          {isProcessing ? 'Processing...' : 'Subscribe Now'}
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            
            <TabsContent value="billing-history">
              <Card>
                <CardHeader>
                  <CardTitle>Billing History</CardTitle>
                  <CardDescription>View your previous invoices and payments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <div className="p-4 text-center text-muted-foreground">
                      <Calendar className="h-10 w-10 mx-auto mb-2 text-muted-foreground/70" />
                      <p>No billing history available yet.</p>
                      <p className="text-sm">Your payment history will appear here once you've made payments.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        ) : (
          <Card>
            <CardContent className="p-8 text-center">
              <h2 className="text-xl font-semibold mb-4">Agency Subscription Required</h2>
              <p className="text-muted-foreground mb-6">
                Subscription plans are only available for agency accounts. Please register as an agency to access subscription features.
              </p>
              <Button asChild>
                <a href="/register?role=agency">Register as Agency</a>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </MainLayout>
  );
};

export default Billing;
