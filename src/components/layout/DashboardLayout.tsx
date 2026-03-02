import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { TopBar } from "./TopBar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [selectedPlant, setSelectedPlant] = useState("p1");
  const [selectedDateFilter, setSelectedDateFilter] = useState("Today");

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <TopBar
            selectedPlant={selectedPlant}
            onPlantChange={setSelectedPlant}
            selectedDateFilter={selectedDateFilter}
            onDateFilterChange={setSelectedDateFilter}
          />
          <main className="flex-1 overflow-auto p-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
