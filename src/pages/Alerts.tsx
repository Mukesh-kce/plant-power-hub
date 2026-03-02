import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { alerts } from "@/data/mock-data";
import { Clock, ChevronRight } from "lucide-react";

const sevStyles = {
  high: "bg-destructive/15 text-destructive border-destructive/30",
  medium: "bg-warning/15 text-warning border-warning/30",
  low: "bg-muted text-muted-foreground border-border",
};

export default function Alerts() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-foreground">Active Alerts</h1>
          <Badge variant="destructive">{alerts.length} Active</Badge>
        </div>
        <div className="space-y-3">
          {alerts.map((alert) => (
            <Card key={alert.id} className="bg-card border-border">
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
                <Button variant="ghost" size="sm" className="text-primary text-xs shrink-0">
                  Resolve <ChevronRight className="h-3 w-3 ml-0.5" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
