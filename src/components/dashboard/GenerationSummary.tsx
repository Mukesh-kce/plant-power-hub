import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

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
              <XAxis dataKey="day" tick={{ fontSize: 10, fill: "hsl(215, 15%, 55%)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "hsl(215, 15%, 55%)" }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(220, 25%, 10%)",
                  border: "1px solid hsl(220, 15%, 18%)",
                  borderRadius: "8px",
                  fontSize: "11px",
                  color: "hsl(210, 40%, 93%)",
                }}
                formatter={(value: number) => [`${(value / 1000).toFixed(1)} MWh`, "Generation"]}
              />
              <Bar dataKey="gen" fill="hsl(var(--primary))" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
