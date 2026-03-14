import { Plant, energyData } from "@/data/mock-data";
import { KPICards } from "@/components/dashboard/KPICards";
import { PerformanceChart } from "@/components/dashboard/PerformanceChart";
import { InverterGrid } from "@/components/dashboard/InverterGrid";
import { AlertsPanel } from "@/components/dashboard/AlertsPanel";
import { PlantArchitecture3D } from "@/components/plant-detail/PlantArchitecture3D";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { HiBolt, HiChartBar, HiArrowTrendingUp, HiSun, HiFire, HiCloud, HiBeaker, HiSignal } from "react-icons/hi2";

interface PlantOverviewProps {
  plant: Plant;
}

export default function PlantOverview({ plant }: PlantOverviewProps) {
  // Mock detailed plant metrics
  const powerFactorData = energyData.pfTrend.slice(0, 24);
  
  const stringPerformance = [
    { name: "String 1", output: 95, expected: 100 },
    { name: "String 2", output: 92, expected: 100 },
    { name: "String 3", output: 98, expected: 100 },
    { name: "String 4", output: 88, expected: 100 },
    { name: "String 5", output: 96, expected: 100 },
    { name: "String 6", output: 94, expected: 100 },
  ];

  const environmentalData = [
    { time: "06:00", irradiance: 120, temp: 22, humidity: 65 },
    { time: "08:00", irradiance: 450, temp: 26, humidity: 58 },
    { time: "10:00", irradiance: 720, temp: 31, humidity: 52 },
    { time: "12:00", irradiance: 950, temp: 36, humidity: 45 },
    { time: "14:00", irradiance: 880, temp: 38, humidity: 42 },
    { time: "16:00", irradiance: 620, temp: 35, humidity: 48 },
    { time: "18:00", irradiance: 280, temp: 30, humidity: 55 },
  ];

  const gridMetrics = {
    voltage: 415,
    frequency: 50.02,
    powerFactor: energyData.powerFactor,
    activePower: 4580,
    reactivePower: 240,
    exportEnergy: 32450,
  };

  const performanceMetrics = {
    pr: 78.4,
    cuf: 22.1,
    specificYield: 4.2,
    degradation: 0.7,
    soiling: 2.3,
    dcAcRatio: 1.15,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-foreground">{plant.name} Overview</h1>
        <p className="text-xs text-muted-foreground mt-1">
          Real-time monitoring • {plant.capacity.toLocaleString()} kWp • Commissioned {plant.commissionedDate}
        </p>
      </div>

      <PlantArchitecture3D plant={plant} />

      <KPICards />

      {/* Detailed Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-muted-foreground">Performance Ratio</span>
              <HiArrowTrendingUp className="h-4 w-4 text-primary" />
            </div>
            <div className="text-2xl font-bold text-foreground">{performanceMetrics.pr}%</div>
            <div className="text-xs text-success mt-1">+2.1% from target</div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-muted-foreground">Capacity Utilization</span>
              <HiChartBar className="h-4 w-4 text-primary" />
            </div>
            <div className="text-2xl font-bold text-foreground">{performanceMetrics.cuf}%</div>
            <div className="text-xs text-muted-foreground mt-1">Annual average</div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-muted-foreground">Specific Yield</span>
              <HiSignal className="h-4 w-4 text-primary" />
            </div>
            <div className="text-2xl font-bold text-foreground">{performanceMetrics.specificYield}</div>
            <div className="text-xs text-muted-foreground mt-1">kWh/kWp/day</div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-muted-foreground">DC/AC Ratio</span>
              <HiBolt className="h-4 w-4 text-primary" />
            </div>
            <div className="text-2xl font-bold text-foreground">{performanceMetrics.dcAcRatio}</div>
            <div className="text-xs text-success mt-1">Optimal range</div>
          </CardContent>
        </Card>
      </div>

      {/* Power Factor & Grid Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <HiBolt className="h-4 w-4" />
              Power Factor Trend (24h)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={powerFactorData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" fontSize={10} />
                <YAxis domain={[0.85, 1.0]} stroke="hsl(var(--muted-foreground))" fontSize={10} />
                <Tooltip 
                  contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }}
                  formatter={(value: number) => value.toFixed(3)}
                />
                <Line type="monotone" dataKey="pf" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-3 gap-2 mt-3 text-xs">
              <div className="bg-muted/30 p-2 rounded">
                <div className="text-muted-foreground">Current PF</div>
                <div className="font-semibold text-foreground">{gridMetrics.powerFactor.toFixed(3)}</div>
              </div>
              <div className="bg-muted/30 p-2 rounded">
                <div className="text-muted-foreground">Grid Voltage</div>
                <div className="font-semibold text-foreground">{gridMetrics.voltage}V</div>
              </div>
              <div className="bg-muted/30 p-2 rounded">
                <div className="text-muted-foreground">Frequency</div>
                <div className="font-semibold text-foreground">{gridMetrics.frequency} Hz</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <HiSignal className="h-4 w-4" />
              Grid Connection Metrics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded">
                <span className="text-sm text-muted-foreground">Active Power</span>
                <span className="text-lg font-bold text-foreground">{gridMetrics.activePower} kW</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded">
                <span className="text-sm text-muted-foreground">Reactive Power</span>
                <span className="text-lg font-bold text-foreground">{gridMetrics.reactivePower} kVAR</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded">
                <span className="text-sm text-muted-foreground">Energy Export Today</span>
                <span className="text-lg font-bold text-success">{gridMetrics.exportEnergy.toLocaleString()} kWh</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded">
                <span className="text-sm text-muted-foreground">Power Factor Status</span>
                <span className={`text-sm font-semibold ${gridMetrics.powerFactor >= 0.95 ? 'text-success' : 'text-warning'}`}>
                  {gridMetrics.powerFactor >= 0.95 ? 'Good' : 'Penalty Risk'}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Environmental Conditions */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <HiSun className="h-4 w-4" />
            Environmental Conditions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={environmentalData}>
              <defs>
                <linearGradient id="irradianceGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" fontSize={10} />
              <YAxis yAxisId="left" stroke="hsl(var(--muted-foreground))" fontSize={10} />
              <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--muted-foreground))" fontSize={10} />
              <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }} />
              <Legend />
              <Area yAxisId="left" type="monotone" dataKey="irradiance" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#irradianceGradient)" name="Irradiance (W/m²)" />
              <Line yAxisId="right" type="monotone" dataKey="temp" stroke="#f59e0b" strokeWidth={2} name="Temperature (°C)" />
            </AreaChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-4 gap-2 mt-3 text-xs">
            <div className="bg-muted/30 p-2 rounded flex items-center gap-2">
              <HiSun className="h-4 w-4 text-primary" />
              <div>
                <div className="text-muted-foreground">Current Irr.</div>
                <div className="font-semibold">{environmentalData[environmentalData.length - 1].irradiance} W/m²</div>
              </div>
            </div>
            <div className="bg-muted/30 p-2 rounded flex items-center gap-2">
              <HiFire className="h-4 w-4 text-warning" />
              <div>
                <div className="text-muted-foreground">Amb. Temp</div>
                <div className="font-semibold">{environmentalData[environmentalData.length - 1].temp}°C</div>
              </div>
            </div>
            <div className="bg-muted/30 p-2 rounded flex items-center gap-2">
              <HiBeaker className="h-4 w-4 text-blue-400" />
              <div>
                <div className="text-muted-foreground">Humidity</div>
                <div className="font-semibold">{environmentalData[environmentalData.length - 1].humidity}%</div>
              </div>
            </div>
            <div className="bg-muted/30 p-2 rounded flex items-center gap-2">
              <HiCloud className="h-4 w-4 text-muted-foreground" />
              <div>
                <div className="text-muted-foreground">Wind Speed</div>
                <div className="font-semibold">12 km/h</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* String Performance */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-base">String-Level Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={stringPerformance}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={10} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={10} />
              <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }} />
              <Legend />
              <Bar dataKey="output" fill="hsl(var(--primary))" name="Actual Output %" radius={[4, 4, 0, 0]} />
              <Bar dataKey="expected" fill="hsl(var(--muted))" name="Expected %" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Losses & Degradation */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-muted-foreground">Soiling Loss</span>
              <HiBeaker className="h-4 w-4 text-warning" />
            </div>
            <div className="text-2xl font-bold text-warning">{performanceMetrics.soiling}%</div>
            <div className="text-xs text-muted-foreground mt-1">Cleaning recommended</div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-muted-foreground">Annual Degradation</span>
              <HiArrowTrendingUp className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="text-2xl font-bold text-foreground">{performanceMetrics.degradation}%</div>
            <div className="text-xs text-success mt-1">Within warranty limits</div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-muted-foreground">Module Temp</span>
              <HiFire className="h-4 w-4 text-warning" />
            </div>
            <div className="text-2xl font-bold text-foreground">52°C</div>
            <div className="text-xs text-warning mt-1">+14°C above ambient</div>
          </CardContent>
        </Card>
      </div>

      <PerformanceChart />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <InverterGrid />
        </div>
        <AlertsPanel />
      </div>
    </div>
  );
}
