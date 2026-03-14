import { Plant, faults } from "@/data/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { HiExclamationTriangle, HiClock, HiUser, HiCheckCircle, HiXCircle, HiArrowPath } from "react-icons/hi2";

interface PlantFaultsProps {
  plant: Plant;
}

export default function PlantFaults({ plant }: PlantFaultsProps) {
  const getSeverityBadge = (severity: string) => {
    const variants: Record<string, { label: string; className: string; icon: any }> = {
      critical: { 
        label: "Critical", 
        className: "bg-destructive/20 text-destructive border-destructive/30",
        icon: HiXCircle
      },
      major: { 
        label: "Major", 
        className: "bg-warning/20 text-warning border-warning/30",
        icon: HiExclamationTriangle
      },
      minor: { 
        label: "Minor", 
        className: "bg-blue-500/20 text-blue-400 border-blue-500/30",
        icon: HiExclamationTriangle
      },
    };
    const config = variants[severity] || variants.minor;
    const Icon = config.icon;
    return (
      <Badge variant="outline" className={config.className}>
        <Icon className="h-3 w-3 mr-1" />
        {config.label}
      </Badge>
    );
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { label: string; className: string; icon: any }> = {
      open: { 
        label: "Open", 
        className: "bg-destructive/20 text-destructive border-destructive/30",
        icon: HiXCircle
      },
      "in-progress": { 
        label: "In Progress", 
        className: "bg-warning/20 text-warning border-warning/30",
        icon: HiArrowPath
      },
      resolved: { 
        label: "Resolved", 
        className: "bg-success/20 text-success border-success/30",
        icon: HiCheckCircle
      },
    };
    const config = variants[status] || variants.open;
    const Icon = config.icon;
    return (
      <Badge variant="outline" className={config.className}>
        <Icon className="h-3 w-3 mr-1" />
        {config.label}
      </Badge>
    );
  };

  const openFaults = faults.filter(f => f.status !== "resolved");
  const resolvedFaults = faults.filter(f => f.status === "resolved");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-foreground">{plant.name} - Faults & SLA</h1>
        <p className="text-xs text-muted-foreground mt-1">
          Fault lifecycle tracking • SLA monitoring • Resolution history
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Open Faults</p>
                <p className="text-2xl font-bold text-destructive">{openFaults.length}</p>
              </div>
              <HiXCircle className="h-8 w-8 text-destructive" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Critical</p>
                <p className="text-2xl font-bold text-destructive">
                  {faults.filter(f => f.severity === "critical" && f.status !== "resolved").length}
                </p>
              </div>
              <HiExclamationTriangle className="h-8 w-8 text-destructive" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Resolved MTD</p>
                <p className="text-2xl font-bold text-success">18</p>
              </div>
              <HiCheckCircle className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Avg. Resolution</p>
                <p className="text-xl font-bold text-foreground">2.4h</p>
              </div>
              <HiClock className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Open Faults */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-base">Active Faults</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {openFaults.map((fault) => (
            <div key={fault.id} className="border border-border rounded-lg p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-semibold text-foreground">{fault.id}</span>
                    {getSeverityBadge(fault.severity)}
                    {getStatusBadge(fault.status)}
                  </div>
                  <p className="text-sm text-foreground">{fault.description}</p>
                </div>
                {fault.slaCountdown !== "—" && (
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground mb-1">SLA Remaining</div>
                    <div className="text-lg font-bold text-destructive flex items-center gap-1">
                      <HiClock className="h-4 w-4" />
                      {fault.slaCountdown}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <HiClock className="h-3 w-3" />
                    Detected: {fault.detectedAt}
                  </div>
                  <div className="flex items-center gap-1">
                    <HiUser className="h-3 w-3" />
                    Assigned: {fault.assignee}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Resolved Faults */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-base">Recently Resolved</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {resolvedFaults.map((fault) => (
            <div key={fault.id} className="border border-border rounded-lg p-4 space-y-3 opacity-60">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-semibold text-foreground">{fault.id}</span>
                    {getSeverityBadge(fault.severity)}
                    {getStatusBadge(fault.status)}
                  </div>
                  <p className="text-sm text-foreground">{fault.description}</p>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <HiClock className="h-3 w-3" />
                    Detected: {fault.detectedAt}
                  </div>
                  <div className="flex items-center gap-1">
                    <HiUser className="h-3 w-3" />
                    Resolved by: {fault.assignee}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
