import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useChartColors, useTooltipStyle } from "@/hooks/use-chart-colors";

const weeklyData = [
  { day: "Mon", gen: 16200 },
  { day: "Tue", gen: 17100 },
  { day: "Wed", gen: 15800 },
  { day: "Thu", gen: 17400 },
  { day: "Fri", gen: 16900 },
  { day: "Sat", gen: 17200 },
  { day: "Sun", gen: 14500 },
];

export function GenerationSummary() {
  const cc = useChartColors();
  const tooltipProps = useTooltipStyle();
  const totalWeek = weeklyData.reduce((s, d) => s + d.gen, 0);

  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-1">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Weekly Generation
          </CardTitle>
          <span className="text-xs font-bold text-foreground">
            {(totalWeek / 1000).toFixed(1)} MWh
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[120px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyData} margin={{ top: 4, right: 0, left: -20, bottom: 0 }}>
              <XAxis dataKey="day" tick={{ fontSize: 10, fill: cc.text }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: cc.text }} axisLine={false} tickLine={false} />
              <Tooltip
                {...tooltipProps}
                formatter={(value: number) => [`${(value / 1000).toFixed(1)} MWh`, "Generation"]}
              />
              <Bar dataKey="gen" fill={cc.primary} radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}