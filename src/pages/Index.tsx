import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { KPICards } from "@/components/dashboard/KPICards";
import { PerformanceChart } from "@/components/dashboard/PerformanceChart";
import { InverterGrid } from "@/components/dashboard/InverterGrid";
import { AlertsPanel } from "@/components/dashboard/AlertsPanel";

const Index = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Executive Dashboard</h1>
          <p className="text-xs text-muted-foreground mt-1">Real-time plant overview • Rajasthan Solar Park</p>
        </div>

        <KPICards />

        <PerformanceChart />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <InverterGrid />
          </div>
          <AlertsPanel />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
