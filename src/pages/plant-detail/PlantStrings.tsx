import { Plant, stringData } from "@/data/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { Cable, Activity, AlertTriangle } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

interface PlantStringsProps {
  plant: Plant;
}

export default function PlantStrings({ plant }: PlantStringsProps) {
  const [selectedString, setSelectedString] = useState<string>("all");

  const getImbalanceColor = (imbalance: number) => {
    if (imbalance < 5) return "hsl(var(--success))";
    if (imbalance < 15) return "hsl(var(--warning))";
    return "hsl(var(--destructive))";
  };

  const selectedStringData = selectedString === "all" 
    ? null 
    : stringData.find(s => s.name === selectedString);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-foreground">String Monitoring</h1>
          <p className="text-xs text-muted-foreground mt-1">
            {plant.stringCount} total strings • Real-time performance tracking
          </p>
        </div>
        <Select value={selectedString} onValueChange={setSelectedString}>
          <SelectTrigger className="w-[200px] bg-secondary border-border">
            <SelectValue placeholder="Select string" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Strings</SelectItem>
            {stringData.map(string => (
              <SelectItem key={string.name} value={string.name}>{string.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center">
                <Cable className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Total Strings</p>
                <p className="text-xl font-bold text-foreground">{stringData.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-success/20 flex items-center justify-center">
                <Activity className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Avg Output</p>
                <p className="text-xl font-bold text-foreground">
                  {(stringData.reduce((sum, s) => sum + s.output, 0) / stringData.length).toFixed(1)} kW
                </p>
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
                <p className="text-xs text-muted-foreground">High Imbalance</p>
                <p className="text-xl font-bold text-foreground">
                  {stringData.filter(s => s.imbalance > 10).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-base">String Output Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stringData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="name" 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                label={{ value: 'Output (kW)', angle: -90, position: 'insideLeft', fill: 'hsl(var(--muted-foreground))' }}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                }}
              />
              <Bar dataKey="output" radius={[8, 8, 0, 0]}>
                {stringData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getImbalanceColor(entry.imbalance)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-base">String Performance Table</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 px-3 text-xs font-medium text-muted-foreground">String</th>
                  <th className="text-right py-2 px-3 text-xs font-medium text-muted-foreground">Output</th>
                  <th className="text-right py-2 px-3 text-xs font-medium text-muted-foreground">Expected</th>
                  <th className="text-right py-2 px-3 text-xs font-medium text-muted-foreground">Imbalance</th>
                  <th className="text-center py-2 px-3 text-xs font-medium text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {stringData.map((string) => (
                  <tr key={string.name} className="border-b border-border/50 hover:bg-muted/20">
                    <td className="py-3 px-3 text-sm font-medium text-foreground">{string.name}</td>
                    <td className="text-right py-3 px-3 text-sm text-foreground">{string.output} kW</td>
                    <td className="text-right py-3 px-3 text-sm text-muted-foreground">{string.expected} kW</td>
                    <td className="text-right py-3 px-3 text-sm">
                      <span className={string.imbalance < 5 ? 'text-success' : string.imbalance < 15 ? 'text-warning' : 'text-destructive'}>
                        {string.imbalance.toFixed(1)}%
                      </span>
                    </td>
                    <td className="text-center py-3 px-3">
                      <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                        string.imbalance < 5 
                          ? 'bg-success/20 text-success' 
                          : string.imbalance < 15 
                          ? 'bg-warning/20 text-warning'
                          : 'bg-destructive/20 text-destructive'
                      }`}>
                        {string.imbalance < 5 ? 'Good' : string.imbalance < 15 ? 'Warning' : 'Critical'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {selectedStringData && (
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-base">Detailed Analysis: {selectedStringData.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-xs text-muted-foreground">Current Output</p>
                <p className="text-lg font-bold text-foreground">{selectedStringData.output} kW</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Expected Output</p>
                <p className="text-lg font-bold text-foreground">{selectedStringData.expected} kW</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Imbalance</p>
                <p className={`text-lg font-bold ${
                  selectedStringData.imbalance < 5 ? 'text-success' : 
                  selectedStringData.imbalance < 15 ? 'text-warning' : 'text-destructive'
                }`}>
                  {selectedStringData.imbalance.toFixed(1)}%
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Efficiency</p>
                <p className="text-lg font-bold text-foreground">
                  {((selectedStringData.output / selectedStringData.expected) * 100).toFixed(1)}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
