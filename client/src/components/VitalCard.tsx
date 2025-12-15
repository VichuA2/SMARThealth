import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface VitalCardProps {
  title: string;
  value: string | number;
  unit?: string;
  trend?: 'up' | 'down' | 'stable';
  status?: 'normal' | 'warning' | 'critical';
  icon: LucideIcon;
  className?: string;
  lastUpdated?: string;
}

export const VitalCard: React.FC<VitalCardProps> = ({
  title,
  value,
  unit,
  trend,
  status = 'normal',
  icon: Icon,
  className,
  lastUpdated
}) => {
  const getStatusColor = () => {
    switch (status) {
      case 'warning': return 'border-warning text-warning';
      case 'critical': return 'border-destructive text-destructive';
      default: return 'border-success text-success';
    }
  };

  const getTrendIcon = () => {
    if (!trend) return null;
    switch (trend) {
      case 'up': return '↗️';
      case 'down': return '↘️';
      default: return '→';
    }
  };

  return (
    <Card className={cn("border-2 hover:shadow-md transition-shadow", getStatusColor(), className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <Icon className="h-8 w-8" />
          {trend && (
            <span className="text-2xl">{getTrendIcon()}</span>
          )}
        </div>
        
        <div className="space-y-2">
          <h3 className="font-medium text-muted-foreground text-sm uppercase tracking-wide">
            {title}
          </h3>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-bold text-foreground">{value}</span>
            {unit && <span className="text-sm text-muted-foreground">{unit}</span>}
          </div>
          {lastUpdated && (
            <p className="text-xs text-muted-foreground">
              Updated {lastUpdated}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};