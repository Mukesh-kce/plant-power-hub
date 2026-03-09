import { LayoutDashboard, Package, Cable, Cpu, Wrench, AlertTriangle } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";
import { Plant } from "@/data/mock-data";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";

interface PlantDetailSidebarProps {
  plant: Plant;
}

const navItems = [
  { title: "Overview", url: "", icon: LayoutDashboard },
  { title: "Panels", url: "/panels", icon: Package },
  { title: "Strings", url: "/strings", icon: Cable },
  { title: "Inverters", url: "/inverters", icon: Cpu },
];

const omNavItems = [
  { title: "Maintenance", url: "/maintenance", icon: Wrench },
  { title: "Faults & SLA", url: "/faults", icon: AlertTriangle },
];

export function PlantDetailSidebar({ plant }: PlantDetailSidebarProps) {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();

  return (
    <Sidebar collapsible="icon" className="border-r border-border">
      <SidebarHeader className="p-4">
        {!collapsed ? (
          <div className="space-y-3">
            <img 
              src={plant.image} 
              alt={plant.name}
              className="w-full h-32 object-cover rounded-lg"
            />
            <div>
              <h2 className="font-bold text-sm text-foreground">{plant.name}</h2>
              <p className="text-xs text-muted-foreground mt-1">{plant.location}</p>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <p className="text-muted-foreground">Capacity</p>
                <p className="font-semibold text-foreground">{plant.capacity.toLocaleString()} kWp</p>
              </div>
              <div>
                <p className="text-muted-foreground">Health</p>
                <p className="font-semibold text-success">{plant.healthScore}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Area</p>
                <p className="font-semibold text-foreground">{plant.area} acres</p>
              </div>
              <div>
                <p className="text-muted-foreground">Panels</p>
                <p className="font-semibold text-foreground">{plant.panelCount.toLocaleString()}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <Package className="h-4 w-4 text-primary-foreground" />
          </div>
        )}
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const fullUrl = `/plants/${plant.id}${item.url}`;
                const isActive = location.pathname === fullUrl;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={isActive}>
                      <NavLink
                        to={fullUrl}
                        end
                        className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors hover:bg-sidebar-accent"
                        activeClassName="bg-sidebar-accent text-primary font-medium"
                      >
                        <item.icon className="h-4 w-4 shrink-0" />
                        {!collapsed && <span>{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
