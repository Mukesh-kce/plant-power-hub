import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Performance from "./pages/Performance";
import Financial from "./pages/Financial";
import Energy from "./pages/Energy";
import Maintenance from "./pages/Maintenance";
import Reports from "./pages/Reports";
import Admin from "./pages/Admin";
import Alerts from "./pages/Alerts";
import Plants from "./pages/Plants";
import SettingsPage from "./pages/SettingsPage";
import PlantDetail from "./pages/PlantDetail";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/performance" element={<Performance />} />
          <Route path="/financial" element={<Financial />} />
          <Route path="/energy" element={<Energy />} />
          <Route path="/maintenance" element={<Maintenance />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/plants" element={<Plants />} />
          <Route path="/plants/:plantId/*" element={<PlantDetail />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
