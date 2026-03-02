import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { hourlyData } from "@/data/mock-data";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export function PerformanceChart() {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          Expected vs Actual Generation
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={hourlyData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="expectedGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(210, 100%, 56%)" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="hsl(210, 100%, 56%)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="actualGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(142, 50%, 45%)" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="hsl(142, 50%, 45%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 15%, 18%)" />
              <XAxis dataKey="time" tick={{ fontSize: 11, fill: "hsl(215, 15%, 55%)" }} stroke="hsl(220, 15%, 18%)" />
              <YAxis tick={{ fontSize: 11, fill: "hsl(215, 15%, 55%)" }} stroke="hsl(220, 15%, 18%)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(220, 25%, 10%)",
                  border: "1px solid hsl(220, 15%, 18%)",
                  borderRadius: "8px",
                  fontSize: "12px",
                  color: "hsl(210, 40%, 93%)",
                }}
              />
              <Area
                type="monotone"
                dataKey="expected"
                stroke="hsl(210, 100%, 56%)"
                fill="url(#expectedGrad)"
                strokeWidth={2}
                name="Expected (kWh)"
              />
              <Area
                type="monotone"
                dataKey="actual"
                stroke="hsl(142, 50%, 45%)"
                fill="url(#actualGrad)"
                strokeWidth={2}
                name="Actual (kWh)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
