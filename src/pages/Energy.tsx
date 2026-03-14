import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { energyData } from "@/data/mock-data";
import { HiLightBulb } from "react-icons/hi2";
import { useChartColors, useTooltipStyle } from "@/hooks/use-chart-colors";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, ReferenceLine,
} from "recharts";

const riskColors = { low: "text-success", medium: "text-warning", high: "text-destructive" };

export default function Energy() {
  const cc = useChartColors();
  const tooltipProps = useTooltipStyle();
  const loadSample = energyData.loadProfile.filter((_, i) => i % 2 === 0);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-xl font-semibold text-foreground">Energy Optimization</h1>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bg-card border-border"><CardContent className="p-4">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Contract Demand</p>
            <p className="text-2xl font-bold text-foreground">{energyData.contractDemand} kVA</p>
          </CardContent></Card>
          <Card className="bg-card border-border"><CardContent className="p-4">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Max Demand</p>
            <p className="text-2xl font-bold text-primary">{energyData.currentMaxDemand} kVA</p>
          </CardContent></Card>
          <Card className="bg-card border-border"><CardContent className="p-4">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Risk Level</p>
            <p className={`text-2xl font-bold capitalize ${riskColors[energyData.riskLevel]}`}>{energyData.riskLevel}</p>
          </CardContent></Card>
          <Card className="bg-card border-border"><CardContent className="p-4">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Power Factor</p>
            <p className="text-2xl font-bold text-warning">{energyData.powerFactor}</p>
          </CardContent></Card>
        </div>

        <Card className="bg-card border-border">
          <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">15-min Load Profile</CardTitle></CardHeader>
          <CardContent>
            <div className="h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={loadSample}>
                  <defs>
                    <linearGradient id="loadGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={cc.primary} stopOpacity={0.3} />
                      <stop offset="95%" stopColor={cc.primary} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke={cc.border} />
                  <XAxis dataKey="time" tick={{ fontSize: 10, fill: cc.text }} stroke={cc.border} interval={3} />
                  <YAxis tick={{ fontSize: 11, fill: cc.text }} stroke={cc.border} />
                  <ReferenceLine y={energyData.contractDemand} stroke={cc.destructive} strokeDasharray="5 5" label={{ value: "Contract", position: "right", fill: cc.destructive, fontSize: 10 }} />
                  <Tooltip {...tooltipProps} />
                  <Area type="monotone" dataKey="demand" stroke={cc.primary} fill="url(#loadGrad)" strokeWidth={1.5} name="Demand (kVA)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card className="bg-card border-border">
            <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Power Factor Trend</CardTitle></CardHeader>
            <CardContent>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={energyData.pfTrend}>
                    <CartesianGrid strokeDasharray="3 3" stroke={cc.border} />
                    <XAxis dataKey="time" tick={{ fontSize: 10, fill: cc.text }} stroke={cc.border} interval={3} />
                    <YAxis domain={[0.85, 1]} tick={{ fontSize: 11, fill: cc.text }} stroke={cc.border} />
                    <ReferenceLine y={0.9} stroke={cc.warning} strokeDasharray="5 5" label={{ value: "Min PF", position: "right", fill: cc.warning, fontSize: 10 }} />
                    <Tooltip {...tooltipProps} />
                    <Line type="monotone" dataKey="pf" stroke={cc.warning} strokeWidth={2} dot={false} name="Power Factor" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Recommendations</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {energyData.recommendations.map((rec, i) => (
                <div key={i} className="flex gap-3 items-start p-3 rounded-lg bg-secondary/30 border border-border">
                  <HiLightBulb className="h-4 w-4 text-warning shrink-0 mt-0.5" />
                  <p className="text-xs text-foreground leading-relaxed">{rec}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}