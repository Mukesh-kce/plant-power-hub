import { Plant, maintenanceVisits } from "@/data/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { HiCalendar, HiUser, HiWrench, HiCheckCircle, HiClock, HiExclamationTriangle } from "react-icons/hi2";

interface PlantMaintenanceProps {
  plant: Plant;
}

export default function PlantMaintenance({ plant }: PlantMaintenanceProps) {
  const getStatusBadge = (status: string) => {
    const variants: Record<string, { label: string; className: string }> = {
      completed: { label: "Completed", className: "bg-success/20 text-success border-success/30" },
      scheduled: { label: "Scheduled", className: "bg-primary/20 text-primary border-primary/30" },
      overdue: { label: "Overdue", className: "bg-destructive/20 text-destructive border-destructive/30" },
    };
    const config = variants[status] || variants.scheduled;
    return <Badge variant="outline" className={config.className}>{config.label}</Badge>;
  };

  const getTypeIcon = (type: string) => {
    return type === "preventive" ? (
      <HiCalendar className="h-4 w-4 text-primary" />
    ) : (
      <HiWrench className="h-4 w-4 text-warning" />
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-foreground">{plant.name} - Maintenance</h1>
        <p className="text-xs text-muted-foreground mt-1">
          O&M tracking • Preventive schedules • Work order history
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Completed MTD</p>
                <p className="text-2xl font-bold text-foreground">12</p>
              </div>
              <HiCheckCircle className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Scheduled</p>
                <p className="text-2xl font-bold text-foreground">3</p>
              </div>
              <HiClock className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Overdue</p>
                <p className="text-2xl font-bold text-destructive">1</p>
              </div>
              <HiExclamationTriangle className="h-8 w-8 text-destructive" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Next Visit</p>
                <p className="text-sm font-semibold text-foreground">Mar 5, 2024</p>
              </div>
              <HiCalendar className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Maintenance History */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-base">Maintenance History</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {maintenanceVisits.map((visit) => (
            <div key={visit.id} className="border border-border rounded-lg p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  {getTypeIcon(visit.type)}
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-foreground">{visit.id}</span>
                      {getStatusBadge(visit.status)}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {visit.type === "preventive" ? "Preventive Maintenance" : "Corrective Action"}
                    </p>
                  </div>
                </div>
                <div className="text-right text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                     <HiCalendar className="h-3 w-3" />
                    {visit.date}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                     <HiUser className="h-3 w-3 text-muted-foreground" />
                    <span className="text-foreground">{visit.technician}</span>
                  </div>
                  <span className="text-muted-foreground">Checklist: {visit.checklist}%</span>
                </div>
                <Progress value={visit.checklist} className="h-2" />
              </div>

              <div className="bg-muted/30 rounded p-2 text-xs text-foreground">
                <strong>Notes:</strong> {visit.notes}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
