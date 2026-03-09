import { Bell, ChevronDown, User, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { plants } from "@/data/mock-data";
import { useState } from "react";
import { CommandPalette } from "@/components/CommandPalette";

const dateFilters = ["Today", "7D", "30D", "Custom"];

interface TopBarProps {
  selectedPlant: string;
  onPlantChange: (id: string) => void;
  selectedDateFilter: string;
  onDateFilterChange: (filter: string) => void;
}

export function TopBar({
  selectedPlant,
  onPlantChange,
  selectedDateFilter,
  onDateFilterChange,
}: TopBarProps) {
  const [commandOpen, setCommandOpen] = useState(false);

  return (
    <>
      <header className="h-14 border-b border-border bg-card flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center gap-3">
          <SidebarTrigger className="text-muted-foreground hover:text-foreground" />

          <Select value={selectedPlant} onValueChange={onPlantChange}>
            <SelectTrigger className="w-[220px] h-9 bg-secondary border-border text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {plants.map((p) => (
                <SelectItem key={p.id} value={p.id}>
                  {p.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex gap-1">
            {dateFilters.map((f) => (
              <Button
                key={f}
                variant={selectedDateFilter === f ? "default" : "ghost"}
                size="sm"
                className="h-8 text-xs px-3"
                onClick={() => onDateFilterChange(f)}
              >
                {f}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Global Search */}
          <Button
            variant="outline"
            size="sm"
            className="h-9 w-[240px] justify-start text-sm text-muted-foreground font-normal border-border hover:bg-accent"
            onClick={() => setCommandOpen(true)}
          >
            <Search className="h-4 w-4 mr-2" />
            <span>Search features...</span>
            <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
              <span className="text-xs">⌘</span>K
            </kbd>
          </Button>

          <Button variant="ghost" size="icon" className="relative h-9 w-9">
            <Bell className="h-4 w-4" />
            <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-destructive text-[10px] text-destructive-foreground flex items-center justify-center font-medium">
              3
            </span>
          </Button>
          <Badge variant="secondary" className="text-xs font-normal">
            Plant Manager
          </Badge>
          <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center">
            <User className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>
      </header>

      <CommandPalette open={commandOpen} onOpenChange={setCommandOpen} />
    </>
  );
}
