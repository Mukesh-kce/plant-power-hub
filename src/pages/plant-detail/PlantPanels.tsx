import { Plant } from "@/data/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { Package, TrendingUp, AlertTriangle, Activity } from "lucide-react";

interface PlantPanelsProps {
  plant: Plant;
}

// Mock panel data
const generatePanelData = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: `P-${(i + 1).toString().padStart(4, '0')}`,
    output: Math.round(250 + Math.random() * 50),
    expected: 280,
    temperature: Math.round(40 + Math.random() * 15),
    status: Math.random() > 0.9 ? 'warning' : Math.random() > 0.95 ? 'offline' : 'online',
  }));
};

export default function PlantPanels({ plant }: PlantPanelsProps) {
  const [selectedPanel, setSelectedPanel] = useState<string>("all");
  const panels = generatePanelData(Math.min(plant.panelCount, 100)); // Show first 100

  const healthyPanels = panels.filter(p => p.status === 'online').length;
  const warningPanels = panels.filter(p => p.status === 'warning').length;
  const offlinePanels = panels.filter(p => p.status === 'offline').length;
  const avgOutput = Math.round(panels.reduce((sum, p) => sum + p.output, 0) / panels.length);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Panel Monitoring</h1>
          <p className="text-xs text-muted-foreground mt-1">
            {plant.panelCount.toLocaleString()} total panels • Showing sample of 100
          </p>
        </div>
        <Select value={selectedPanel} onValueChange={setSelectedPanel}>
          <SelectTrigger className="w-[200px] bg-secondary border-border">
            <SelectValue placeholder="Select panel" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Panels</SelectItem>
            {panels.slice(0, 20).map(panel => (
              <SelectItem key={panel.id} value={panel.id}>{panel.id}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-success/20 flex items-center justify-center">
                <Package className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Online</p>
                <p className="text-xl font-bold text-foreground">{healthyPanels}</p>
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
                <p className="text-xl font-bold text-foreground">{warningPanels}</p>
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
                <p className="text-xl font-bold text-foreground">{offlinePanels}</p>
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
                <p className="text-xs text-muted-foreground">Avg Output</p>
                <p className="text-xl font-bold text-foreground">{avgOutput}W</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-base">Panel Status Grid</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-8 md:grid-cols-12 lg:grid-cols-16 gap-2">
            {panels.map((panel) => (
              <div
                key={panel.id}
                className={`h-8 rounded flex items-center justify-center text-[10px] font-medium cursor-pointer transition-all hover:scale-110 ${
                  panel.status === 'online' 
                    ? 'bg-success/20 text-success border border-success/30' 
                    : panel.status === 'warning'
                    ? 'bg-warning/20 text-warning border border-warning/30'
                    : 'bg-destructive/20 text-destructive border border-destructive/30'
                }`}
                title={`${panel.id}: ${panel.output}W`}
              >
                {panel.id.split('-')[1]}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {selectedPanel !== "all" && (
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-base">Panel Details: {selectedPanel}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {panels.find(p => p.id === selectedPanel) && (
                <>
                  <div>
                    <p className="text-xs text-muted-foreground">Current Output</p>
                    <p className="text-lg font-bold text-foreground">
                      {panels.find(p => p.id === selectedPanel)?.output}W
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Expected</p>
                    <p className="text-lg font-bold text-foreground">
                      {panels.find(p => p.id === selectedPanel)?.expected}W
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Temperature</p>
                    <p className="text-lg font-bold text-foreground">
                      {panels.find(p => p.id === selectedPanel)?.temperature}°C
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Efficiency</p>
                    <p className="text-lg font-bold text-foreground">
                      {Math.round((panels.find(p => p.id === selectedPanel)!.output / panels.find(p => p.id === selectedPanel)!.expected) * 100)}%
                    </p>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
