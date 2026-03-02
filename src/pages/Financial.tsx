import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { financialData, formatINR } from "@/data/mock-data";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
} from "recharts";

const chartColors = {
  bg: "hsl(220, 25%, 10%)",
  border: "hsl(220, 15%, 18%)",
  text: "hsl(215, 15%, 55%)",
  fg: "hsl(210, 40%, 93%)",
  primary: "hsl(210, 100%, 56%)",
  success: "hsl(142, 50%, 45%)",
};

const PIE_COLORS = ["hsl(0, 62%, 50%)", "hsl(38, 92%, 50%)", "hsl(210, 100%, 56%)", "hsl(270, 60%, 55%)"];

export default function Financial() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-xl font-semibold text-foreground">Financial Overview</h1>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Monthly Revenue", value: formatINR(financialData.monthlyRevenue), color: "text-success" },
            { label: "Expected Revenue", value: formatINR(financialData.expectedRevenue), color: "text-primary" },
            { label: "Revenue Gap", value: formatINR(financialData.revenueGap), color: "text-destructive" },
            { label: "Annual Projection", value: formatINR(financialData.annualProjection), color: "text-primary" },
          ].map((c) => (
            <Card key={c.label} className="bg-card border-border">
              <CardContent className="p-4">
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{c.label}</p>
                <p className={`text-2xl font-bold ${c.color}`}>{c.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-card border-border">
          <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Cumulative Revenue (₹ in Lakhs)</CardTitle></CardHeader>
          <CardContent>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={financialData.cumulativeRevenue}>
                  <defs>
                    <linearGradient id="expRevGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={chartColors.primary} stopOpacity={0.2} />
                      <stop offset="95%" stopColor={chartColors.primary} stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="actRevGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={chartColors.success} stopOpacity={0.2} />
                      <stop offset="95%" stopColor={chartColors.success} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke={chartColors.border} />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: chartColors.text }} stroke={chartColors.border} />
                  <YAxis tick={{ fontSize: 11, fill: chartColors.text }} stroke={chartColors.border} />
                  <Tooltip contentStyle={{ backgroundColor: chartColors.bg, border: `1px solid ${chartColors.border}`, borderRadius: "8px", fontSize: "12px", color: chartColors.fg }} />
                  <Area type="monotone" dataKey="expected" stroke={chartColors.primary} fill="url(#expRevGrad)" strokeWidth={2} name="Expected (₹L)" />
                  <Area type="monotone" dataKey="actual" stroke={chartColors.success} fill="url(#actRevGrad)" strokeWidth={2} name="Actual (₹L)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card className="bg-card border-border">
            <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Loss Breakdown</CardTitle></CardHeader>
            <CardContent>
              <div className="h-[250px] flex items-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={financialData.losses} dataKey="amount" nameKey="category" cx="50%" cy="50%" outerRadius={90} innerRadius={50} strokeWidth={0}>
                      {financialData.losses.map((_, i) => (
                        <Cell key={i} fill={PIE_COLORS[i]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: chartColors.bg, border: `1px solid ${chartColors.border}`, borderRadius: "8px", fontSize: "12px", color: chartColors.fg }}
                      formatter={(value: number) => formatINR(value)} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="space-y-2 pr-4">
                  {financialData.losses.map((l, i) => (
                    <div key={l.category} className="flex items-center gap-2 text-xs">
                      <span className="h-2.5 w-2.5 rounded-full shrink-0" style={{ backgroundColor: PIE_COLORS[i] }} />
                      <span className="text-muted-foreground whitespace-nowrap">{l.category}</span>
                      <span className="font-medium text-foreground">{l.percentage}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Tariff Impact</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {[
                { label: "Net Metering Balance", value: "+1,240 kWh", desc: "Export surplus this month" },
                { label: "Export vs Self-Consumption", value: "35% / 65%", desc: "Optimal self-consumption ratio" },
                { label: "Demand Charge Risk", value: "Medium", desc: "Peak demand at 93.6% of contract" },
              ].map((item) => (
                <div key={item.label} className="border-b border-border pb-3 last:border-0">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">{item.label}</span>
                    <span className="text-sm font-semibold text-foreground">{item.value}</span>
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{item.desc}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
