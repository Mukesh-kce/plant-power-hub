import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { inverters } from "@/data/mock-data";

const statusStyles = {
  online: "border-success/30 bg-success/5",
  warning: "border-warning/30 bg-warning/5",
  offline: "border-destructive/30 bg-destructive/5",
};

const dotStyles = {
  online: "bg-success",
  warning: "bg-warning",
  offline: "bg-destructive",
};

export function InverterGrid() {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          Inverter Status
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
          {inverters.map((inv) => (
            <div
              key={inv.id}
              className={`rounded-lg border p-3 ${statusStyles[inv.status]}`}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className={`h-2 w-2 rounded-full ${dotStyles[inv.status]} ${inv.status === "warning" ? "animate-pulse-glow" : ""}`} />
                <span className="text-xs font-medium text-foreground">{inv.name}</span>
              </div>
              <div className="text-lg font-bold text-foreground">{inv.output} kW</div>
              {inv.statusDetail && (
                <span className="text-[10px] text-warning">{inv.statusDetail}</span>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
