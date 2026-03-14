import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { alerts as initialAlerts, Alert } from "@/data/mock-data";
import { HiClock, HiChevronRight, HiCheckCircle, HiPaperAirplane, HiExclamationTriangle, HiInformationCircle } from "react-icons/hi2";
import { toast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

const sevStyles = {
  high: "bg-destructive/15 text-destructive border-destructive/30",
  medium: "bg-warning/15 text-warning border-warning/30",
  low: "bg-muted text-muted-foreground border-border",
};

const statusStyles: Record<string, string> = {
  active: "bg-destructive/15 text-destructive border-destructive/30",
  "under-review": "bg-primary/15 text-primary border-primary/30",
};

type AlertStatus = "active" | "under-review";

export default function Alerts() {
  const [alertStatuses, setAlertStatuses] = useState<Record<string, AlertStatus>>(
    () => Object.fromEntries(initialAlerts.map((a) => [a.id, "active" as AlertStatus]))
  );
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
  const [notes, setNotes] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleResolveClick = (alert: Alert) => {
    setSelectedAlert(alert);
    setNotes("");
    setDialogOpen(true);
  };

  const handleForward = () => {
    if (!selectedAlert) return;
    setAlertStatuses((prev) => ({ ...prev, [selectedAlert.id]: "under-review" }));
    setDialogOpen(false);
    toast({
      title: "Forwarded for Review",
      description: `"${selectedAlert.message}" sent to maintenance team.`,
    });
    setSelectedAlert(null);
    setNotes("");
  };

  const activeCount = Object.values(alertStatuses).filter((s) => s === "active").length;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-foreground">Alerts</h1>
          <div className="flex gap-2">
            <Badge variant="destructive">{activeCount} Active</Badge>
            <Badge className="bg-primary/15 text-primary border border-primary/30">
              {Object.values(alertStatuses).filter((s) => s === "under-review").length} Under Review
            </Badge>
          </div>
        </div>

        <div className="space-y-3">
          {initialAlerts.map((alert) => {
            const status = alertStatuses[alert.id];
            return (
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
                        <HiClock className="h-3 w-3" /> SLA: {alert.slaRemaining}m
                      </span>
                    </div>
                  </div>
                  {status === "active" ? (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-primary text-xs shrink-0"
                      onClick={() => handleResolveClick(alert)}
                    >
                      Resolve <HiChevronRight className="h-3 w-3 ml-0.5" />
                    </Button>
                  ) : (
                    <Badge className={`text-[10px] border shrink-0 ${statusStyles["under-review"]}`}>
                      <HiInformationCircle className="h-3 w-3 mr-1" /> Under Review
                    </Badge>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <HiExclamationTriangle className="h-5 w-5 text-destructive" />
              Resolve Alert
            </DialogTitle>
            <DialogDescription>Review the issue details and forward to the maintenance team.</DialogDescription>
          </DialogHeader>

          {selectedAlert && (
            <div className="space-y-4">
              <div className="rounded-lg border border-border bg-secondary/30 p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <Badge className={`text-[10px] border ${sevStyles[selectedAlert.severity]}`}>
                    {selectedAlert.severity.toUpperCase()}
                  </Badge>
                  <span className="text-[10px] text-muted-foreground">ID: {selectedAlert.id}</span>
                </div>
                <p className="text-sm font-medium text-foreground">{selectedAlert.message}</p>
                <div className="flex items-center gap-4 text-[10px] text-muted-foreground">
                  <span>Detected: {selectedAlert.detectedAt}</span>
                  <span className="flex items-center gap-1">
                    <HiClock className="h-3 w-3" /> SLA: {selectedAlert.slaRemaining}m remaining
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground">Additional Notes (optional)</label>
                <Textarea
                  placeholder="Add context or instructions for the maintenance team..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="text-sm resize-none"
                  rows={3}
                />
              </div>
            </div>
          )}

          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleForward}>
              <HiPaperAirplane className="h-4 w-4 mr-1" /> Forward for Review
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
