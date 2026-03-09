import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { KPICards } from "@/components/dashboard/KPICards";
import { PerformanceChart } from "@/components/dashboard/PerformanceChart";
import { InverterGrid } from "@/components/dashboard/InverterGrid";
import { AlertsPanel } from "@/components/dashboard/AlertsPanel";
import { PlantMapOverview } from "@/components/dashboard/PlantMapOverview";
import { WeatherWidget } from "@/components/dashboard/WeatherWidget";
import { GenerationSummary } from "@/components/dashboard/GenerationSummary";
import { QuickStats } from "@/components/dashboard/QuickStats";

const Index = () => {
  return (
    <DashboardLayout>
      <div className="space-y-4">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Executive Dashboard</h1>
          <p className="text-xs text-muted-foreground mt-0.5">Real-time plant overview • Rajasthan Solar Park</p>
        </div>

        {/* KPI Cards */}
        <KPICards />

        {/* Quick Stats Row */}
        <QuickStats />

        {/* Main Content: Chart + Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <div className="lg:col-span-3 space-y-4">
            <PerformanceChart />
            <InverterGrid />
          </div>
          <div className="space-y-4">
            <WeatherWidget />
            <GenerationSummary />
            <PlantMapOverview />
          </div>
        </div>

        {/* Alerts Full Width */}
        <AlertsPanel />
      </div>
    </DashboardLayout>
  );
};

export default Index;
