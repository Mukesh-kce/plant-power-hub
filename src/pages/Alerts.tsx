import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { alerts as initialAlerts, Alert } from "@/data/mock-data";
import { Clock, ChevronRight, CheckCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const sevStyles = {
  high: "bg-destructive/15 text-destructive border-destructive/30",
  medium: "bg-warning/15 text-warning border-warning/30",
  low: "bg-muted text-muted-foreground border-border",
};

export default function Alerts() {
  const [activeAlerts, setActiveAlerts] = useState<Alert[]>(initialAlerts);
  const [resolvedIds, setResolvedIds] = useState<Set<string>>(new Set());

  const handleResolve = (id: string, message: string) => {
    setResolvedIds((prev) => new Set(prev).add(id));
    setTimeout(() => {
      setActiveAlerts((prev) => prev.filter((a) => a.id !== id));
      toast({ title: "Alert Resolved", description: message });
    }, 400);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-foreground">Active Alerts</h1>
          <Badge variant="destructive">{activeAlerts.length} Active</Badge>
        </div>
        {activeAlerts.length === 0 ? (
          <Card className="bg-card border-border">
            <CardContent className="p-8 text-center">
              <CheckCircle className="h-10 w-10 text-primary mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">All alerts resolved</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {activeAlerts.map((alert) => (
              <Card
                key={alert.id}
                className={`bg-card border-border transition-all duration-300 ${resolvedIds.has(alert.id) ? "opacity-0 scale-95" : ""}`}
              >
                <CardContent className="p-4 flex items-center gap-4">
                  <Badge className={`text-xs border shrink-0 ${sevStyles[alert.severity]}`}>
                    {alert.severity.toUpperCase()}
                  </Badge>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">{alert.message}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-[10px] text-muted-foreground">Detected: {alert.detectedAt}</span>
                      <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" /> SLA: {alert.slaRemaining}m
                      </span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-primary text-xs shrink-0"
                    onClick={() => handleResolve(alert.id, alert.message)}
                    disabled={resolvedIds.has(alert.id)}
                  >
                    Resolve <ChevronRight className="h-3 w-3 ml-0.5" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}