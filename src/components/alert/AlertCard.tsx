import React from 'react';
import { AlertTriangle, Package, Clock, TrendingUp, ExternalLink } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert } from '@/app/types/Alert';
import { formatDistanceToNow } from 'date-fns';

interface AlertCardProps {
  alert: Alert;
}

export const AlertCard: React.FC<AlertCardProps> = ({ alert }) => {
  const getSeverityConfig = (severity: string) => {
    switch (severity) {
      case 'critical':
        return {
          icon: <AlertTriangle className="h-4 w-4 text-red-600" />,
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
          badgeColor: 'bg-red-100 text-red-800 border-red-200',
          progressColor: 'bg-red-500'
        };
      case 'warning':
        return {
          icon: <AlertTriangle className="h-4 w-4 text-amber-600" />,
          bgColor: 'bg-amber-50',
          borderColor: 'border-amber-200',
          badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
          progressColor: 'bg-amber-500'
        };
      default:
        return {
          icon: <Package className="h-4 w-4 text-blue-600" />,
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-200',
          badgeColor: 'bg-blue-100 text-blue-800 border-blue-200',
          progressColor: 'bg-blue-500'
        };
    }
  };

  const config = getSeverityConfig(alert.severity);
  const stockPercentage = (alert.currentQuantity / alert.threshold) * 100;
  const isOutOfStock = alert.currentQuantity === 0;

  // Format the update time to be more concise
  const getUpdateTimeShort = () => {
    const timeAgo = formatDistanceToNow(alert.lastUpdated, { addSuffix: true });
    // Shorten the time format for better display
    return timeAgo
      .replace('less than a minute ago', '<1m')
      .replace('about ', '')
      .replace(' minutes ago', 'm')
      .replace(' minute ago', 'm')
      .replace(' hours ago', 'h')
      .replace(' hour ago', 'h')
      .replace(' days ago', 'd')
      .replace(' day ago', 'd');
  };

  return (
    <div className={`
      group rounded-lg border ${config.borderColor} 
      shadow-sm hover:shadow-md ${config.bgColor}
      transition-all duration-300
      hover:scale-[1.01] 
      overflow-hidden
    `}>
      {/* Severity Indicator Line */}
      <div className={`h-1 w-full ${config.progressColor}`} />

      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="flex-shrink-0">
              {config.icon}
            </div>
            <div>
              <h3 className="text-sm font-medium line-clamp-1">
                {alert.productName}
              </h3>
              <div className="flex items-center gap-1 mt-0.5">
                <Badge variant="outline" className={`${config.badgeColor} text-xs font-medium px-1.5 py-0 h-5`}>
                  {alert.severity.toUpperCase()}
                </Badge>
                <span className="text-xs text-muted-foreground">SKU: {alert.sku}</span>
              </div>
            </div>
          </div>
          
          <Badge variant="outline" className="text-xs">
            {alert.category}
          </Badge>
        </div>

        {/* Stock Information */}
        <div className="grid grid-cols-3 gap-2 mb-3">
          <div className="bg-background rounded p-2">
            <div className="flex items-center gap-1 mb-1">
              <Package className="w-3 h-3 text-muted-foreground" />
              <span className="text-xs font-medium text-muted-foreground">Stock</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className={`text-sm font-bold ${isOutOfStock ? 'text-red-600' : 'text-foreground'}`}>
                {alert.currentQuantity}
              </span>
              <span className="text-xs text-muted-foreground">units</span>
            </div>
          </div>

          <div className="bg-background rounded p-2">
            <div className="flex items-center gap-1 mb-1">
              <TrendingUp className="w-3 h-3 text-muted-foreground" />
              <span className="text-xs font-medium text-muted-foreground">Min</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-sm font-bold">{alert.threshold}</span>
              <span className="text-xs text-muted-foreground">units</span>
            </div>
          </div>

          <div className="bg-background rounded p-2 min-w-0">
            <div className="flex items-center gap-1 mb-1">
              <Clock className="w-3 h-3 text-muted-foreground flex-shrink-0" />
              <span className="text-xs font-medium text-muted-foreground truncate">Updated</span>
            </div>
            <span className="text-xs text-muted-foreground block truncate">
              {getUpdateTimeShort()}
            </span>
          </div>
        </div>

        {/* Stock Level Progress Bar */}
        <div className="mb-3">
          <div className="flex justify-between text-xs text-muted-foreground mb-1">
            <span>Stock Level</span>
            <span>{Math.round(stockPercentage)}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
            <div 
              className={`h-full ${config.progressColor} transition-all duration-500 ease-out`}
              style={{ width: `${Math.min(stockPercentage, 100)}%` }}
            />
          </div>
        </div>

        {/* Action Button */}
        <Button 
          size="sm"
          className={`w-full ${alert.severity === 'critical' ? 'bg-red-600 hover:bg-red-700' : 'bg-amber-600 hover:bg-amber-700'} 
            text-white h-8 rounded-md font-medium text-xs
          `}
        >
          Restock Now
        </Button>
      </div>
    </div>
  );
};


