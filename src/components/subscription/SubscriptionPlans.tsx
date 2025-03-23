
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, X } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { SubscriptionPlanDetails } from '@/types';

// Define subscription plans
const SUBSCRIPTION_PLANS: SubscriptionPlanDetails[] = [
  {
    id: 'Basic',
    name: 'Basic',
    price: 9.99,
    billingCycle: 'monthly',
    propertyLimit: 5,
    features: [
      '5 property listings',
      'Standard visibility',
      'Basic analytics',
      'Email support',
      'Single agent account',
    ],
  },
  {
    id: 'Standard',
    name: 'Standard',
    price: 24.99,
    billingCycle: 'monthly',
    propertyLimit: 15,
    features: [
      '15 property listings',
      'Enhanced visibility',
      'Advanced analytics',
      'Priority email support',
      'Up to 3 agent accounts',
      'Featured listings (2 per month)',
    ],
    recommended: true,
  },
  {
    id: 'Premium',
    name: 'Premium',
    price: 49.99,
    billingCycle: 'monthly',
    propertyLimit: 50,
    features: [
      '50 property listings',
      'Maximum visibility',
      'Comprehensive analytics',
      'Priority phone & email support',
      'Unlimited agent accounts',
      'Featured listings (5 per month)',
      'Social media promotion',
      'Virtual tours integration',
    ],
  },
];

interface SubscriptionPlansProps {
  currentPlan?: string;
  onSelectPlan?: (plan: SubscriptionPlanDetails) => void;
}

const SubscriptionPlans: React.FC<SubscriptionPlansProps> = ({ 
  currentPlan = 'None',
  onSelectPlan,
}) => {
  const [selectedPlan, setSelectedPlan] = useState<string>(currentPlan);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const { toast } = useToast();
  const navigate = useNavigate();

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
    const plan = SUBSCRIPTION_PLANS.find(p => p.id === planId);
    if (plan && onSelectPlan) {
      onSelectPlan(plan);
    }
  };

  const handleSubscribe = (plan: SubscriptionPlanDetails) => {
    // In a real application, this would redirect to a checkout page
    console.log(`Selected plan: ${plan.name}, Billing cycle: ${billingCycle}`);
    toast({
      title: 'Plan Selected',
      description: `You've selected the ${plan.name} plan. Redirecting to checkout...`,
    });
    // Redirect to a payment page
    navigate('/billing');
  };

  // Calculate yearly price (20% discount)
  const getPrice = (basePrice: number) => {
    if (billingCycle === 'yearly') {
      const yearlyPrice = (basePrice * 12) * 0.8; // 20% discount
      return yearlyPrice.toFixed(2);
    }
    return basePrice.toFixed(2);
  };

  const getBillingLabel = (price: number) => {
    if (billingCycle === 'yearly') {
      return `$${getPrice(price)}/year`;
    }
    return `$${price.toFixed(2)}/month`;
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-center">
        <RadioGroup 
          className="flex items-center space-x-2 p-1 bg-muted rounded-lg" 
          defaultValue={billingCycle}
          onValueChange={(value) => setBillingCycle(value as 'monthly' | 'yearly')}
        >
          <div className={cn(
            "flex items-center space-x-1 rounded-md px-3 py-1.5 cursor-pointer",
            billingCycle === 'monthly' ? "bg-background shadow-sm" : "hover:bg-background/50"
          )}>
            <RadioGroupItem value="monthly" id="monthly" className="sr-only" />
            <label htmlFor="monthly" className="text-sm font-medium cursor-pointer">
              Monthly
            </label>
          </div>
          <div className={cn(
            "flex items-center space-x-1 rounded-md px-3 py-1.5 cursor-pointer",
            billingCycle === 'yearly' ? "bg-background shadow-sm" : "hover:bg-background/50"
          )}>
            <RadioGroupItem value="yearly" id="yearly" className="sr-only" />
            <label htmlFor="yearly" className="text-sm font-medium cursor-pointer">
              Yearly
              <span className="ml-1.5 text-xs text-emerald-600 font-semibold">Save 20%</span>
            </label>
          </div>
        </RadioGroup>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {SUBSCRIPTION_PLANS.map((plan) => (
          <Card 
            key={plan.id}
            className={cn(
              "flex flex-col h-full",
              plan.recommended ? "border-primary" : "",
              selectedPlan === plan.id ? "ring-2 ring-primary" : ""
            )}
          >
            {plan.recommended && (
              <div className="bg-primary text-primary-foreground text-center py-1 text-sm font-medium">
                Recommended
              </div>
            )}
            
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription>
                <div className="mt-1">
                  <span className="text-2xl font-bold">${getPrice(plan.price)}</span>
                  <span className="text-muted-foreground ml-1">
                    /{billingCycle === 'yearly' ? 'year' : 'month'}
                  </span>
                </div>
                <p className="mt-2 text-sm">Up to {plan.propertyLimit} property listings</p>
              </CardDescription>
            </CardHeader>
            
            <CardContent className="flex-grow">
              <ul className="space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            
            <CardFooter className="flex flex-col pt-0">
              <Button 
                variant={plan.id === selectedPlan ? "default" : "outline"}
                className="w-full mb-2"
                onClick={() => handlePlanSelect(plan.id)}
              >
                {plan.id === selectedPlan ? 'Selected' : 'Select Plan'}
              </Button>
              
              {plan.id === selectedPlan && (
                <Button 
                  className="w-full"
                  onClick={() => handleSubscribe(plan)}
                >
                  Subscribe Now
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionPlans;
