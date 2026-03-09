import * as React from "react";
import { Search, FileText, BarChart3, DollarSign, Zap, AlertCircle, Wrench, Settings, LayoutDashboard, Package } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { plants } from "@/data/mock-data";

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const navigate = useNavigate();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(true);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [onOpenChange]);

  const runCommand = React.useCallback((command: () => void) => {
    onOpenChange(false);
    command();
  }, [onOpenChange]);

  const mainPages = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/" },
    { name: "Plants Overview", icon: Package, path: "/plants" },
    { name: "Performance Analytics", icon: BarChart3, path: "/performance" },
    { name: "Financial Reports", icon: DollarSign, path: "/financial" },
    { name: "Energy Optimization", icon: Zap, path: "/energy" },
    { name: "Active Alerts", icon: AlertCircle, path: "/alerts" },
    { name: "Maintenance & SLA", icon: Wrench, path: "/maintenance" },
    { name: "Reports", icon: FileText, path: "/reports" },
    { name: "Admin Panel", icon: Settings, path: "/admin" },
    { name: "Settings", icon: Settings, path: "/settings" },
  ];

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange} className="top-[60px]">
      <CommandInput placeholder="Search for pages, plants, or features..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        
        <CommandGroup heading="Pages">
          {mainPages.map((page) => (
            <CommandItem
              key={page.path}
              onSelect={() => runCommand(() => navigate(page.path))}
              className="flex items-center gap-2"
            >
              <page.icon className="h-4 w-4 text-muted-foreground" />
              <span>{page.name}</span>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Plants">
          {plants.map((plant) => (
            <CommandItem
              key={plant.id}
              onSelect={() => runCommand(() => navigate(`/plants/${plant.id}`))}
              className="flex items-center gap-2"
            >
              <Package className="h-4 w-4 text-muted-foreground" />
              <div>
                <div className="font-medium">{plant.name}</div>
                <div className="text-xs text-muted-foreground">{plant.location} • {plant.capacity} kWp</div>
              </div>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Quick Actions">
          <CommandItem
            onSelect={() => runCommand(() => navigate("/plants"))}
            className="flex items-center gap-2"
          >
            <Search className="h-4 w-4 text-muted-foreground" />
            <span>View all plants</span>
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => navigate("/alerts"))}
            className="flex items-center gap-2"
          >
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
            <span>View active alerts</span>
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => navigate("/performance"))}
            className="flex items-center gap-2"
          >
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
            <span>Check performance metrics</span>
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => navigate("/financial"))}
            className="flex items-center gap-2"
          >
            <DollarSign className="h-4 w-4 text-muted-foreground" />
            <span>Review financial data</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
