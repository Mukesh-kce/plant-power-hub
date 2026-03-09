import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { hourlyData } from "@/data/mock-data";
import { useChartColors, useTooltipStyle } from "@/hooks/use-chart-colors";
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
  const cc = useChartColors();
  const tooltipProps = useTooltipStyle();

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
                  <stop offset="5%" stopColor={cc.primary} stopOpacity={0.2} />
                  <stop offset="95%" stopColor={cc.primary} stopOpacity={0} />
                </linearGradient>
                <linearGradient id="actualGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={cc.success} stopOpacity={0.2} />
                  <stop offset="95%" stopColor={cc.success} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={cc.border} />
              <XAxis dataKey="time" tick={{ fontSize: 11, fill: cc.text }} stroke={cc.border} />
              <YAxis tick={{ fontSize: 11, fill: cc.text }} stroke={cc.border} />
              <Tooltip {...tooltipProps} />
              <Area type="monotone" dataKey="expected" stroke={cc.primary} fill="url(#expectedGrad)" strokeWidth={2} name="Expected (kWh)" />
              <Area type="monotone" dataKey="actual" stroke={cc.success} fill="url(#actualGrad)" strokeWidth={2} name="Actual (kWh)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}