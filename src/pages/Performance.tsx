import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { performanceMetrics, stringData, hourlyData } from "@/data/mock-data";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useChartColors, useTooltipStyle } from "@/hooks/use-chart-colors";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, ScatterChart, Scatter,
} from "recharts";

const degradationData = [
  { year: "Y1", pr: 82.1 }, { year: "Y2", pr: 81.4 }, { year: "Y3", pr: 80.6 },
  { year: "Y4", pr: 79.9 }, { year: "Y5", pr: 78.4 },
];

const mpptData = [
  { name: "MPPT-1", dcEff: 98.2, acEff: 96.5 },
  { name: "MPPT-2", dcEff: 97.8, acEff: 96.1 },
  { name: "MPPT-3", dcEff: 96.4, acEff: 94.8 },
  { name: "MPPT-4", dcEff: 98.0, acEff: 96.3 },
];

export default function Performance() {
  const cc = useChartColors();
  const tooltipProps = useTooltipStyle();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-xl font-semibold text-foreground">Performance Analytics</h1>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "PR %", value: `${performanceMetrics.pr}%`, color: "text-primary" },
            { label: "CUF", value: `${performanceMetrics.cuf}%`, color: "text-success" },
            { label: "Degradation", value: `${performanceMetrics.degradation}%/yr`, color: "text-warning" },
            { label: "System Efficiency", value: `${performanceMetrics.efficiency}%`, color: "text-primary" },
          ].map((m) => (
            <Card key={m.label} className="bg-card border-border">
              <CardContent className="p-4">
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{m.label}</p>
                <p className={`text-2xl font-bold ${m.color}`}>{m.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="overview">
          <TabsList className="bg-secondary">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="strings">String Level</TabsTrigger>
            <TabsTrigger value="mppt">MPPT Analysis</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4 mt-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card className="bg-card border-border">
                <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Degradation Trend</CardTitle></CardHeader>
                <CardContent>
                  <div className="h-[220px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={degradationData}>
                        <CartesianGrid strokeDasharray="3 3" stroke={cc.border} />
                        <XAxis dataKey="year" tick={{ fontSize: 11, fill: cc.text }} stroke={cc.border} />
                        <YAxis domain={[76, 84]} tick={{ fontSize: 11, fill: cc.text }} stroke={cc.border} />
                        <Tooltip {...tooltipProps} />
                        <Line type="monotone" dataKey="pr" stroke={cc.warning} strokeWidth={2} dot={{ r: 4, fill: cc.warning }} name="PR %" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Irradiance vs Output</CardTitle></CardHeader>
                <CardContent>
                  <div className="h-[220px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <ScatterChart>
                        <CartesianGrid strokeDasharray="3 3" stroke={cc.border} />
                        <XAxis dataKey="irradiance" name="Irradiance" tick={{ fontSize: 11, fill: cc.text }} stroke={cc.border} />
                        <YAxis dataKey="actual" name="Output" tick={{ fontSize: 11, fill: cc.text }} stroke={cc.border} />
                        <Tooltip {...tooltipProps} />
                        <Scatter data={hourlyData} fill={cc.primary} />
                      </ScatterChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="strings" className="space-y-4 mt-4">
            <Card className="bg-card border-border">
              <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">String Comparison</CardTitle></CardHeader>
              <CardContent>
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={stringData}>
                      <CartesianGrid strokeDasharray="3 3" stroke={cc.border} />
                      <XAxis dataKey="name" tick={{ fontSize: 10, fill: cc.text }} stroke={cc.border} />
                      <YAxis tick={{ fontSize: 11, fill: cc.text }} stroke={cc.border} />
                      <Tooltip {...tooltipProps} />
                      <Bar dataKey="expected" fill={cc.primary} opacity={0.4} name="Expected (kW)" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="output" fill={cc.success} name="Actual (kW)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-card border-border">
              <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Worst Performing Strings</CardTitle></CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow><TableHead>String</TableHead><TableHead>Output</TableHead><TableHead>Expected</TableHead><TableHead>Imbalance</TableHead></TableRow>
                  </TableHeader>
                  <TableBody>
                    {[...stringData].sort((a, b) => b.imbalance - a.imbalance).map((s) => (
                      <TableRow key={s.name}>
                        <TableCell className="font-medium">{s.name}</TableCell>
                        <TableCell>{s.output} kW</TableCell>
                        <TableCell>{s.expected} kW</TableCell>
                        <TableCell className={s.imbalance > 10 ? "text-destructive font-medium" : "text-warning"}>{s.imbalance}%</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="mppt" className="mt-4">
            <Card className="bg-card border-border">
              <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">MPPT Conversion Efficiency</CardTitle></CardHeader>
              <CardContent>
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={mpptData}>
                      <CartesianGrid strokeDasharray="3 3" stroke={cc.border} />
                      <XAxis dataKey="name" tick={{ fontSize: 11, fill: cc.text }} stroke={cc.border} />
                      <YAxis domain={[92, 100]} tick={{ fontSize: 11, fill: cc.text }} stroke={cc.border} />
                      <Tooltip {...tooltipProps} />
                      <Bar dataKey="dcEff" fill={cc.primary} name="DC Efficiency %" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="acEff" fill={cc.success} name="AC Efficiency %" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}