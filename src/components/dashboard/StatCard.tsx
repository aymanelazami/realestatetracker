
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { StatCardProps } from '@/types';

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, trend }) => {
  return (
    <Card className="shadow-soft hover:shadow-soft-lg transition-shadow duration-300 overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1.5">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <div className="flex items-baseline gap-1">
              <h3 className="text-2xl font-bold">{value}</h3>
              
              {trend && (
                <div className={cn(
                  "flex items-center text-xs font-medium",
                  trend.isPositive ? "text-emerald-500" : "text-rose-500"
                )}>
                  {trend.isPositive ? (
                    <ArrowUp className="h-3 w-3 mr-0.5" />
                  ) : (
                    <ArrowDown className="h-3 w-3 mr-0.5" />
                  )}
                  {Math.abs(trend.value)}% {trend.label}
                </div>
              )}
            </div>
          </div>
          
          <div className={cn(
            "p-3 rounded-full bg-primary/10 text-primary",
            "animate-fade-in"
          )}>
            {icon}
          </div>
        </div>
        
        <div className="mt-4 h-1 w-full bg-secondary overflow-hidden rounded-full">
          <div className="bg-primary h-full w-3/4 rounded-full animate-pulse-soft"></div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
