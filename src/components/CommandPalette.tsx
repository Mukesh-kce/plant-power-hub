import * as React from "react";
import { HiMagnifyingGlass, HiDocumentText, HiChartBar, HiCurrencyDollar, HiBolt, HiExclamationCircle, HiWrench, HiCog6Tooth, HiSquares2X2, HiArchiveBox } from "react-icons/hi2";
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
    { name: "Dashboard", icon: HiSquares2X2, path: "/" },
    { name: "Plants Overview", icon: HiArchiveBox, path: "/plants" },
    { name: "Performance Analytics", icon: HiChartBar, path: "/performance" },
    { name: "Financial Reports", icon: HiCurrencyDollar, path: "/financial" },
    { name: "Energy Optimization", icon: HiBolt, path: "/energy" },
    { name: "Active Alerts", icon: HiExclamationCircle, path: "/alerts" },
    { name: "Maintenance & SLA", icon: HiWrench, path: "/maintenance" },
    { name: "Reports", icon: HiDocumentText, path: "/reports" },
    { name: "Admin Panel", icon: HiCog6Tooth, path: "/admin" },
    { name: "Settings", icon: HiCog6Tooth, path: "/settings" },
  ];

  return (
    <CommandDialog 
      open={open} 
      onOpenChange={onOpenChange}
      dialogContentClassName="sm:top-[80px] sm:translate-y-0"
    >
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
              <HiArchiveBox className="h-4 w-4 text-muted-foreground" />
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
            <HiMagnifyingGlass className="h-4 w-4 text-muted-foreground" />
            <span>View all plants</span>
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => navigate("/alerts"))}
            className="flex items-center gap-2"
          >
            <HiExclamationCircle className="h-4 w-4 text-muted-foreground" />
            <span>View active alerts</span>
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => navigate("/performance"))}
            className="flex items-center gap-2"
          >
            <HiChartBar className="h-4 w-4 text-muted-foreground" />
            <span>Check performance metrics</span>
          </CommandItem>
          <CommandItem
            onSelect={() => runCommand(() => navigate("/financial"))}
            className="flex items-center gap-2"
          >
            <HiCurrencyDollar className="h-4 w-4 text-muted-foreground" />
            <span>Review financial data</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
