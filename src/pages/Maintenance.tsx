import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { faults, maintenanceVisits } from "@/data/mock-data";
import { Progress } from "@/components/ui/progress";

const sevStyles = {
  critical: "bg-destructive/15 text-destructive border-destructive/30",
  major: "bg-warning/15 text-warning border-warning/30",
  minor: "bg-muted text-muted-foreground border-border",
};

const statusStyles = {
  open: "bg-destructive/15 text-destructive",
  "in-progress": "bg-warning/15 text-warning",
  resolved: "bg-success/15 text-success",
  completed: "bg-success/15 text-success",
  scheduled: "bg-primary/15 text-primary",
  overdue: "bg-destructive/15 text-destructive",
};

export default function Maintenance() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-xl font-semibold text-foreground">O&M / SLA Management</h1>

        <Card className="bg-card border-border">
          <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Fault Lifecycle</CardTitle></CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Fault ID</TableHead><TableHead>Severity</TableHead><TableHead>Description</TableHead>
                  <TableHead>Detected</TableHead><TableHead>Assignee</TableHead><TableHead>SLA</TableHead><TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {faults.map((f) => (
                  <TableRow key={f.id}>
                    <TableCell className="font-mono text-xs">{f.id}</TableCell>
                    <TableCell><Badge className={`text-[10px] border ${sevStyles[f.severity]}`}>{f.severity}</Badge></TableCell>
                    <TableCell className="text-xs">{f.description}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{f.detectedAt}</TableCell>
                    <TableCell className="text-xs">{f.assignee}</TableCell>
                    <TableCell className="text-xs font-mono">{f.slaCountdown}</TableCell>
                    <TableCell><Badge className={`text-[10px] ${statusStyles[f.status]}`}>{f.status}</Badge></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Maintenance Visits</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {maintenanceVisits.map((v) => (
                <div key={v.id} className="flex items-center gap-4 p-3 rounded-lg bg-secondary/30 border border-border">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono text-muted-foreground">{v.id}</span>
                      <Badge className={`text-[10px] ${statusStyles[v.status]}`}>{v.status}</Badge>
                      <Badge variant="outline" className="text-[10px]">{v.type}</Badge>
                    </div>
                    <p className="text-xs text-foreground">{v.technician} • {v.date}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">{v.notes}</p>
                  </div>
                  <div className="w-24 shrink-0">
                    <p className="text-[10px] text-muted-foreground mb-1">Checklist</p>
                    <Progress value={v.checklist} className="h-1.5" />
                    <p className="text-[10px] text-right text-muted-foreground mt-0.5">{v.checklist}%</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
