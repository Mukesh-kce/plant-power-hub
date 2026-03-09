import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { alerts } from "@/data/mock-data";
import { Clock, ChevronRight } from "lucide-react";

const severityStyles = {
  high: "bg-destructive/15 text-destructive border-destructive/30",
  medium: "bg-warning/15 text-warning border-warning/30",
  low: "bg-muted text-muted-foreground border-border",
};

export function AlertsPanel() {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Active Alerts
          </CardTitle>
          <Badge variant="destructive" className="text-[10px]">
            {alerts.length}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className="rounded-lg border border-border bg-secondary/30 p-3"
          >
            <div className="flex items-start justify-between gap-2 mb-1.5">
              <Badge className={`text-[10px] border ${severityStyles[alert.severity]}`}>
                {alert.severity.toUpperCase()}
              </Badge>
              <span className="text-[10px] text-muted-foreground">{alert.detectedAt}</span>
            </div>
            <p className="text-xs font-medium text-foreground mb-2">{alert.message}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span>SLA: {alert.slaRemaining}m remaining</span>
              </div>
              <Button variant="ghost" size="sm" className="h-6 text-[10px] text-primary px-2">
                Action <ChevronRight className="h-3 w-3 ml-0.5" />
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
