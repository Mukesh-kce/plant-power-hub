import { Plant, inverters } from "@/data/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { Cpu, Activity, Thermometer, AlertTriangle } from "lucide-react";

interface PlantInvertersProps {
  plant: Plant;
}

export default function PlantInverters({ plant }: PlantInvertersProps) {
  const [selectedInverter, setSelectedInverter] = useState<string>("all");

  const onlineInverters = inverters.filter(i => i.status === 'online').length;
  const warningInverters = inverters.filter(i => i.status === 'warning').length;
  const offlineInverters = inverters.filter(i => i.status === 'offline').length;
  const totalOutput = inverters.reduce((sum, i) => sum + i.output, 0);

  const selectedInverterData = selectedInverter === "all" 
    ? null 
    : inverters.find(i => i.id === selectedInverter);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-success/20 text-success border-success/30';
      case 'warning': return 'bg-warning/20 text-warning border-warning/30';
      case 'offline': return 'bg-destructive/20 text-destructive border-destructive/30';
      default: return 'bg-muted/20 text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Inverter Monitoring</h1>
          <p className="text-xs text-muted-foreground mt-1">
            {plant.inverterCount} total inverters • Real-time performance and diagnostics
          </p>
        </div>
        <Select value={selectedInverter} onValueChange={setSelectedInverter}>
          <SelectTrigger className="w-[200px] bg-secondary border-border">
            <SelectValue placeholder="Select inverter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Inverters</SelectItem>
            {inverters.map(inverter => (
              <SelectItem key={inverter.id} value={inverter.id}>{inverter.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-success/20 flex items-center justify-center">
                <Cpu className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Online</p>
                <p className="text-xl font-bold text-foreground">{onlineInverters}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-warning/20 flex items-center justify-center">
                <AlertTriangle className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Warning</p>
                <p className="text-xl font-bold text-foreground">{warningInverters}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-destructive/20 flex items-center justify-center">
                <AlertTriangle className="h-5 w-5 text-destructive" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Offline</p>
                <p className="text-xl font-bold text-foreground">{offlineInverters}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center">
                <Activity className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Total Output</p>
                <p className="text-xl font-bold text-foreground">{totalOutput} kW</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-base">Inverter Status Grid</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {inverters.map((inverter) => (
              <Card 
                key={inverter.id} 
                className={`border ${getStatusColor(inverter.status)} cursor-pointer hover:scale-105 transition-transform`}
                onClick={() => setSelectedInverter(inverter.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-sm">{inverter.name}</h3>
                      <p className="text-xs opacity-80 mt-0.5">{inverter.statusDetail || inverter.status}</p>
                    </div>
                    <Cpu className="h-4 w-4" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>Output:</span>
                      <span className="font-semibold">{inverter.output} kW</span>
                    </div>
                    {inverter.temperature && (
                      <div className="flex justify-between text-xs">
                        <span>Temp:</span>
                        <span className="font-semibold">{inverter.temperature}°C</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {selectedInverterData && (
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-base">Detailed Diagnostics: {selectedInverterData.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Activity className="h-4 w-4 text-primary" />
                  <p className="text-xs text-muted-foreground">DC Input</p>
                </div>
                <p className="text-lg font-bold text-foreground">{selectedInverterData.output * 1.03} kW</p>
                <p className="text-xs text-muted-foreground mt-1">620V • 395A</p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Activity className="h-4 w-4 text-success" />
                  <p className="text-xs text-muted-foreground">AC Output</p>
                </div>
                <p className="text-lg font-bold text-foreground">{selectedInverterData.output} kW</p>
                <p className="text-xs text-muted-foreground mt-1">415V • 3-Phase</p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Thermometer className="h-4 w-4 text-warning" />
                  <p className="text-xs text-muted-foreground">Temperature</p>
                </div>
                <p className={`text-lg font-bold ${
                  selectedInverterData.temperature && selectedInverterData.temperature > 55 
                    ? 'text-destructive' 
                    : selectedInverterData.temperature && selectedInverterData.temperature > 50
                    ? 'text-warning'
                    : 'text-success'
                }`}>
                  {selectedInverterData.temperature}°C
                </p>
                <p className="text-xs text-muted-foreground mt-1">Normal: 35-50°C</p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Cpu className="h-4 w-4 text-primary" />
                  <p className="text-xs text-muted-foreground">Efficiency</p>
                </div>
                <p className="text-lg font-bold text-foreground">
                  {((selectedInverterData.output / (selectedInverterData.output * 1.03)) * 100).toFixed(1)}%
                </p>
                <p className="text-xs text-muted-foreground mt-1">MPPT: 99.2%</p>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-border">
              <h4 className="text-sm font-semibold text-foreground mb-3">Performance Metrics</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">Daily Energy</p>
                  <p className="text-sm font-semibold text-foreground">1,842 kWh</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Monthly Energy</p>
                  <p className="text-sm font-semibold text-foreground">54,260 kWh</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Uptime Today</p>
                  <p className="text-sm font-semibold text-success">9.2 hrs</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Power Factor</p>
                  <p className="text-sm font-semibold text-foreground">0.98</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Grid Frequency</p>
                  <p className="text-sm font-semibold text-foreground">50.01 Hz</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Last Maintenance</p>
                  <p className="text-sm font-semibold text-foreground">15 days ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
