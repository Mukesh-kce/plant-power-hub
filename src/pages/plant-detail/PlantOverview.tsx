import { Plant } from "@/data/mock-data";
import { KPICards } from "@/components/dashboard/KPICards";
import { PerformanceChart } from "@/components/dashboard/PerformanceChart";
import { InverterGrid } from "@/components/dashboard/InverterGrid";
import { AlertsPanel } from "@/components/dashboard/AlertsPanel";
import { PlantArchitecture3D } from "@/components/plant-detail/PlantArchitecture3D";

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

      <PlantArchitecture3D plant={plant} />

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
