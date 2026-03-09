import { useParams, Navigate, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { PlantDetailSidebar } from "@/components/layout/PlantDetailSidebar";
import { TopBar } from "@/components/layout/TopBar";
import { plants } from "@/data/mock-data";
import { useState } from "react";
import PlantOverview from "./plant-detail/PlantOverview";
import PlantPanels from "./plant-detail/PlantPanels";
import PlantStrings from "./plant-detail/PlantStrings";
import PlantInverters from "./plant-detail/PlantInverters";

export default function PlantDetail() {
  const { plantId } = useParams();
  const plant = plants.find(p => p.id === plantId);
  const [selectedDateFilter, setSelectedDateFilter] = useState("Today");

  if (!plant) {
    return <Navigate to="/plants" replace />;
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <PlantDetailSidebar plant={plant} />
        <div className="flex-1 flex flex-col min-w-0">
          <TopBar
            selectedPlant={plant.id}
            onPlantChange={(id) => window.location.href = `/plants/${id}`}
            selectedDateFilter={selectedDateFilter}
            onDateFilterChange={setSelectedDateFilter}
          />
          <main className="flex-1 overflow-auto p-6">
            <Routes>
              <Route index element={<PlantOverview plant={plant} />} />
              <Route path="panels" element={<PlantPanels plant={plant} />} />
              <Route path="strings" element={<PlantStrings plant={plant} />} />
              <Route path="inverters" element={<PlantInverters plant={plant} />} />
            </Routes>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
