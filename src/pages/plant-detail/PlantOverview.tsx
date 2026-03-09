import { Plant } from "@/data/mock-data";
import { KPICards } from "@/components/dashboard/KPICards";
import { PerformanceChart } from "@/components/dashboard/PerformanceChart";
import { InverterGrid } from "@/components/dashboard/InverterGrid";
import { AlertsPanel } from "@/components/dashboard/AlertsPanel";
import { lazy, Suspense } from "react";
import { Card } from "@/components/ui/card";

// Lazy load the 3D component to avoid blocking initial render
const PlantArchitecture3D = lazy(() => 
  import("@/components/plant-detail/PlantArchitecture3D").then(module => ({
    default: module.PlantArchitecture3D
  }))
);

interface PlantOverviewProps {
  plant: Plant;
}

export default function PlantOverview({ plant }: PlantOverviewProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-foreground">{plant.name} Overview</h1>
        <p className="text-xs text-muted-foreground mt-1">
          Real-time monitoring • {plant.capacity.toLocaleString()} kWp • Commissioned {plant.commissionedDate}
        </p>
      </div>

      <Suspense fallback={
        <Card className="w-full h-[600px] bg-card border-border flex items-center justify-center">
          <div className="text-center space-y-2">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="text-sm text-muted-foreground">Loading 3D visualization...</p>
          </div>
        </Card>
      }>
        <PlantArchitecture3D plant={plant} />
      </Suspense>

      <KPICards />
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
