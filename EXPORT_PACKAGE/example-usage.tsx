/**
 * EXAMPLE USAGE - Copy these patterns to your new project
 */

// ============================================================================
// 1. App.tsx - Wrap your app with ThemeProvider
// ============================================================================

import { ThemeProvider } from "@/hooks/use-theme";
import { Toaster } from "@/components/ui/sonner";

function App() {
  return (
    <ThemeProvider>
      <YourRouterOrContent />
      <Toaster />
    </ThemeProvider>
  );
}

// ============================================================================
// 2. Theme Toggle Component - Add to Settings or TopBar
// ============================================================================

import { useTheme } from "@/hooks/use-theme";
import { Sun, Moon, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center gap-2">
      <Button
        variant={theme === "light" ? "default" : "ghost"}
        size="sm"
        onClick={() => setTheme("light")}
      >
        <Sun className="h-4 w-4" />
        <span className="ml-2">Light</span>
      </Button>
      
      <Button
        variant={theme === "dark" ? "default" : "ghost"}
        size="sm"
        onClick={() => setTheme("dark")}
      >
        <Moon className="h-4 w-4" />
        <span className="ml-2">Dark</span>
      </Button>
      
      <Button
        variant={theme === "system" ? "default" : "ghost"}
        size="sm"
        onClick={() => setTheme("system")}
      >
        <Monitor className="h-4 w-4" />
        <span className="ml-2">System</span>
      </Button>
    </div>
  );
}

// ============================================================================
// 3. Card Component Example - Using Semantic Tokens
// ============================================================================

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export function DashboardCard() {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-sm font-medium text-muted-foreground">
          Total Revenue
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground">$45,231.89</div>
        <p className="text-xs text-success mt-1">+20.1% from last month</p>
      </CardContent>
    </Card>
  );
}

// ============================================================================
// 4. Chart Component Example - Using useChartColors Hook
// ============================================================================

import { useChartColors, useTooltipStyle } from "@/hooks/use-chart-colors";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export function RevenueChart({ data }: { data: any[] }) {
  const cc = useChartColors();
  const tooltipProps = useTooltipStyle();

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke={cc.border} />
        <XAxis 
          dataKey="month" 
          stroke={cc.border}
          tick={{ fill: cc.text, fontSize: 11 }}
        />
        <YAxis 
          stroke={cc.border}
          tick={{ fill: cc.text, fontSize: 11 }}
        />
        <Tooltip {...tooltipProps} />
        <Line 
          type="monotone" 
          dataKey="revenue" 
          stroke={cc.primary}
          strokeWidth={2}
          name="Revenue"
        />
        <Line 
          type="monotone" 
          dataKey="profit" 
          stroke={cc.success}
          strokeWidth={2}
          name="Profit"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

// ============================================================================
// 5. Badge Component Examples - Status Indicators
// ============================================================================

import { Badge } from "@/components/ui/badge";

export function StatusBadges() {
  return (
    <div className="flex gap-2">
      {/* Success */}
      <Badge className="bg-success/10 text-success border-success/20">
        Active
      </Badge>
      
      {/* Warning */}
      <Badge className="bg-warning/10 text-warning border-warning/20">
        Pending
      </Badge>
      
      {/* Destructive */}
      <Badge className="bg-destructive/10 text-destructive border-destructive/20">
        Inactive
      </Badge>
      
      {/* Primary */}
      <Badge className="bg-primary/10 text-primary border-primary/20">
        Featured
      </Badge>
    </div>
  );
}

// ============================================================================
// 6. SVG Component Example - Theme-Aware Custom Graphics
// ============================================================================

import { useChartColors } from "@/hooks/use-chart-colors";

export function CustomSVGComponent() {
  const colors = useChartColors();

  return (
    <svg viewBox="0 0 200 100" className="w-full h-32">
      {/* Background */}
      <rect width="200" height="100" fill={colors.bg} />
      
      {/* Border */}
      <rect 
        width="200" 
        height="100" 
        fill="none" 
        stroke={colors.border} 
        strokeWidth="2" 
      />
      
      {/* Primary Circle */}
      <circle cx="50" cy="50" r="20" fill={colors.primary} />
      
      {/* Success Line */}
      <line 
        x1="100" 
        y1="30" 
        x2="150" 
        y2="70" 
        stroke={colors.success} 
        strokeWidth="3" 
      />
      
      {/* Text */}
      <text 
        x="100" 
        y="90" 
        textAnchor="middle" 
        fill={colors.fg}
        fontSize="12"
      >
        Theme-Aware
      </text>
    </svg>
  );
}

// ============================================================================
// 7. Dashboard Layout Example - Complete Page Structure
// ============================================================================

import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Top Bar */}
          <header className="h-14 border-b border-border bg-card px-4 flex items-center justify-between">
            <h1 className="text-lg font-semibold text-foreground">
              Dashboard
            </h1>
            <ThemeToggle />
          </header>
          
          {/* Main Content */}
          <main className="flex-1 overflow-auto p-4">
            <div className="max-w-7xl mx-auto space-y-4">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

// ============================================================================
// 8. Responsive Grid Layout Example
// ============================================================================

export function DashboardPage() {
  return (
    <div className="space-y-4">
      {/* Page Header */}
      <div>
        <h1 className="text-xl font-semibold text-foreground">Overview</h1>
        <p className="text-xs text-muted-foreground mt-0.5">
          Welcome back! Here's your summary
        </p>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardCard />
        <DashboardCard />
        <DashboardCard />
        <DashboardCard />
      </div>

      {/* Chart + Sidebar Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-3">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Revenue Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <RevenueChart data={[]} />
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-4">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-sm">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Sidebar content */}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
