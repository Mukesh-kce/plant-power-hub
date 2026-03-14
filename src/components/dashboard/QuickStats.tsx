import { Card, CardContent } from "@/components/ui/card";
import { HiBattery50, HiSun, HiChartBar, HiBolt } from "react-icons/hi2";

const stats = [
  { label: "Active Power", value: "4.58 MW", icon: HiBolt, color: "text-primary" },
  { label: "PR Today", value: "78.4%", icon: HiChartBar, color: "text-success" },
  { label: "Peak Irradiance", value: "950 W/m²", icon: HiSun, color: "text-warning" },
  { label: "Grid Export", value: "32.4 MWh", icon: HiBattery50, color: "text-primary" },
];

export function QuickStats() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {stats.map((stat) => (
        <Card key={stat.label} className="bg-card border-border">
          <CardContent className="p-3 flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-secondary flex items-center justify-center shrink-0">
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </div>
            <div>
              <div className="text-lg font-bold text-foreground leading-tight">{stat.value}</div>
              <div className="text-[10px] text-muted-foreground">{stat.label}</div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
