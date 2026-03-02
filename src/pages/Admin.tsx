import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { plants, formatINR } from "@/data/mock-data";

const getHealthColor = (s: number) => s >= 85 ? "text-success" : s >= 70 ? "text-warning" : "text-destructive";
const getHealthBg = (s: number) => s >= 85 ? "bg-success/15" : s >= 70 ? "bg-warning/15" : "bg-destructive/15";

const slaBreaches = [
  { plant: "Karnataka PV Station", fault: "INV-03 Overtemp", breachBy: "2h 15m" },
  { plant: "Gujarat Sun Farm", fault: "String 2A Underperform", breachBy: "0h 45m" },
];

export default function Admin() {
  const sorted = [...plants].sort((a, b) => b.healthScore - a.healthScore);
  const highRisk = [...plants].sort((a, b) => a.healthScore - b.healthScore).slice(0, 2);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-xl font-semibold text-foreground">Admin Panel</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <Card className="bg-card border-border lg:col-span-2">
            <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Portfolio Health Ranking</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              {sorted.map((p, i) => (
                <div key={p.id} className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 border border-border">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-muted-foreground w-5">#{i + 1}</span>
                    <div>
                      <p className="text-sm font-medium text-foreground">{p.name}</p>
                      <p className="text-[10px] text-muted-foreground">{p.location} • {p.capacity} kWp</p>
                    </div>
                  </div>
                  <div className={`text-xl font-bold ${getHealthColor(p.healthScore)} ${getHealthBg(p.healthScore)} px-3 py-1 rounded-lg`}>
                    {p.healthScore}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="space-y-4">
            <Card className="bg-card border-border">
              <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">High Risk Plants</CardTitle></CardHeader>
              <CardContent className="space-y-2">
                {highRisk.map((p) => (
                  <div key={p.id} className="p-3 rounded-lg bg-destructive/5 border border-destructive/20">
                    <p className="text-sm font-medium text-foreground">{p.name}</p>
                    <p className="text-xs text-destructive">Health: {p.healthScore}/100</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm text-muted-foreground">SLA Breaches</CardTitle>
                  <Badge variant="destructive" className="text-[10px]">{slaBreaches.length}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                {slaBreaches.map((b, i) => (
                  <div key={i} className="p-3 rounded-lg bg-destructive/5 border border-destructive/20">
                    <p className="text-xs font-medium text-foreground">{b.fault}</p>
                    <p className="text-[10px] text-muted-foreground">{b.plant}</p>
                    <p className="text-[10px] text-destructive mt-1">Breached by {b.breachBy}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
