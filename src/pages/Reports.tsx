import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HiArrowDownTray, HiDocumentText } from "react-icons/hi2";

const reports = [
  { name: "Monthly Performance Report", type: "PDF", date: "Feb 2024" },
  { name: "SLA Compliance Report", type: "PDF", date: "Feb 2024" },
  { name: "Financial Summary", type: "Excel", date: "Feb 2024" },
  { name: "Annual PR Trend Analysis", type: "PDF", date: "FY 2023-24" },
  { name: "Inverter Health Report", type: "PDF", date: "Feb 2024" },
  { name: "Grid Availability Summary", type: "Excel", date: "Feb 2024" },
];

export default function Reports() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-xl font-semibold text-foreground">Reports</h1>
        <div className="space-y-2">
          {reports.map((r) => (
            <Card key={r.name} className="bg-card border-border">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <HiDocumentText className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium text-foreground">{r.name}</p>
                    <p className="text-[10px] text-muted-foreground">{r.type} • {r.date}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="text-primary text-xs">
                  <HiArrowDownTray className="h-3.5 w-3.5 mr-1" /> Download
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
