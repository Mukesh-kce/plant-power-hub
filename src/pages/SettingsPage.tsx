import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";
import { User, Bell, Monitor, Shield, Zap, Save } from "lucide-react";

export default function SettingsPage() {
  // Profile
  const [profile, setProfile] = useState({
    name: "Vikram Singh",
    email: "vikram@solarops.in",
    phone: "+91 98765 43210",
    role: "Plant Manager",
  });

  // Notifications
  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    smsAlerts: false,
    pushNotifications: true,
    criticalOnly: false,
    dailyDigest: true,
    weeklyReport: true,
  });

  // Display
  const [display, setDisplay] = useState({
    timezone: "Asia/Kolkata",
    dateFormat: "DD/MM/YYYY",
    units: "metric",
    refreshInterval: "30",
    compactMode: false,
  });

  // System
  const [system, setSystem] = useState({
    dataRetention: "90",
    autoResolveAlerts: false,
    maintenanceWindow: "02:00-04:00",
    apiRateLimit: "1000",
  });

  const handleSave = (section: string) => {
    toast({ title: "Settings Saved", description: `${section} settings updated successfully.` });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-xl font-semibold text-foreground">Settings</h1>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="bg-secondary/50 border border-border">
            <TabsTrigger value="profile" className="text-xs gap-1.5"><User className="h-3.5 w-3.5" /> Profile</TabsTrigger>
            <TabsTrigger value="notifications" className="text-xs gap-1.5"><Bell className="h-3.5 w-3.5" /> Notifications</TabsTrigger>
            <TabsTrigger value="display" className="text-xs gap-1.5"><Monitor className="h-3.5 w-3.5" /> Display</TabsTrigger>
            <TabsTrigger value="system" className="text-xs gap-1.5"><Zap className="h-3.5 w-3.5" /> System</TabsTrigger>
          </TabsList>

          {/* Profile */}
          <TabsContent value="profile" className="mt-4">
            <Card className="bg-card border-border">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-muted-foreground">Profile Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-xs">Full Name</Label>
                    <Input value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} className="text-sm" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs">Email</Label>
                    <Input value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} className="text-sm" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs">Phone</Label>
                    <Input value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} className="text-sm" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs">Role</Label>
                    <Input value={profile.role} disabled className="text-sm opacity-60" />
                  </div>
                </div>
                <Separator />
                <div className="space-y-1.5">
                  <Label className="text-xs">Change Password</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input type="password" placeholder="Current password" className="text-sm" />
                    <Input type="password" placeholder="New password" className="text-sm" />
                  </div>
                </div>
                <Button size="sm" onClick={() => handleSave("Profile")}>
                  <Save className="h-3.5 w-3.5 mr-1" /> Save Profile
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications */}
          <TabsContent value="notifications" className="mt-4">
            <Card className="bg-card border-border">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-muted-foreground">Notification Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { key: "emailAlerts" as const, label: "Email Alerts", desc: "Receive alert notifications via email" },
                  { key: "smsAlerts" as const, label: "SMS Alerts", desc: "Receive critical alerts via SMS" },
                  { key: "pushNotifications" as const, label: "Push Notifications", desc: "Browser push notifications for real-time alerts" },
                  { key: "criticalOnly" as const, label: "Critical Only", desc: "Only notify for high-severity alerts" },
                  { key: "dailyDigest" as const, label: "Daily Digest", desc: "Summary email at end of each day" },
                  { key: "weeklyReport" as const, label: "Weekly Report", desc: "Comprehensive weekly performance report" },
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 border border-border">
                    <div>
                      <p className="text-sm font-medium text-foreground">{item.label}</p>
                      <p className="text-[10px] text-muted-foreground">{item.desc}</p>
                    </div>
                    <Switch
                      checked={notifications[item.key]}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, [item.key]: checked })}
                    />
                  </div>
                ))}
                <Button size="sm" onClick={() => handleSave("Notification")}>
                  <Save className="h-3.5 w-3.5 mr-1" /> Save Preferences
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Display */}
          <TabsContent value="display" className="mt-4">
            <Card className="bg-card border-border">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-muted-foreground">Display Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-xs">Timezone</Label>
                    <Select value={display.timezone} onValueChange={(v) => setDisplay({ ...display, timezone: v })}>
                      <SelectTrigger className="text-sm"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Asia/Kolkata">IST (Asia/Kolkata)</SelectItem>
                        <SelectItem value="UTC">UTC</SelectItem>
                        <SelectItem value="America/New_York">EST (America/New_York)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs">Date Format</Label>
                    <Select value={display.dateFormat} onValueChange={(v) => setDisplay({ ...display, dateFormat: v })}>
                      <SelectTrigger className="text-sm"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                        <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                        <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs">Units</Label>
                    <Select value={display.units} onValueChange={(v) => setDisplay({ ...display, units: v })}>
                      <SelectTrigger className="text-sm"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="metric">Metric (kW, °C)</SelectItem>
                        <SelectItem value="imperial">Imperial (BTU, °F)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs">Auto-Refresh Interval</Label>
                    <Select value={display.refreshInterval} onValueChange={(v) => setDisplay({ ...display, refreshInterval: v })}>
                      <SelectTrigger className="text-sm"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">15 seconds</SelectItem>
                        <SelectItem value="30">30 seconds</SelectItem>
                        <SelectItem value="60">1 minute</SelectItem>
                        <SelectItem value="300">5 minutes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 border border-border">
                  <div>
                    <p className="text-sm font-medium text-foreground">Compact Mode</p>
                    <p className="text-[10px] text-muted-foreground">Reduce spacing and card sizes for denser layouts</p>
                  </div>
                  <Switch checked={display.compactMode} onCheckedChange={(c) => setDisplay({ ...display, compactMode: c })} />
                </div>
                <Button size="sm" onClick={() => handleSave("Display")}>
                  <Save className="h-3.5 w-3.5 mr-1" /> Save Display Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* System */}
          <TabsContent value="system" className="mt-4">
            <Card className="bg-card border-border">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-muted-foreground">System Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-xs">Data Retention (days)</Label>
                    <Input value={system.dataRetention} onChange={(e) => setSystem({ ...system, dataRetention: e.target.value })} className="text-sm" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs">Maintenance Window</Label>
                    <Input value={system.maintenanceWindow} onChange={(e) => setSystem({ ...system, maintenanceWindow: e.target.value })} className="text-sm" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs">API Rate Limit (req/min)</Label>
                    <Input value={system.apiRateLimit} onChange={(e) => setSystem({ ...system, apiRateLimit: e.target.value })} className="text-sm" />
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 border border-border">
                  <div>
                    <p className="text-sm font-medium text-foreground">Auto-Resolve Low Alerts</p>
                    <p className="text-[10px] text-muted-foreground">Automatically resolve low-severity alerts after SLA expiry</p>
                  </div>
                  <Switch checked={system.autoResolveAlerts} onCheckedChange={(c) => setSystem({ ...system, autoResolveAlerts: c })} />
                </div>
                <Separator />
                <div className="p-3 rounded-lg bg-destructive/5 border border-destructive/20">
                  <p className="text-sm font-medium text-destructive">Danger Zone</p>
                  <p className="text-[10px] text-muted-foreground mb-2">These actions are irreversible.</p>
                  <div className="flex gap-2">
                    <Button variant="destructive" size="sm" className="text-xs" onClick={() => toast({ title: "Cache Cleared", description: "All cached data has been purged." })}>
                      Clear Cache
                    </Button>
                    <Button variant="outline" size="sm" className="text-xs border-destructive/30 text-destructive hover:bg-destructive/10" onClick={() => toast({ title: "Export Started", description: "System logs export initiated." })}>
                      Export Logs
                    </Button>
                  </div>
                </div>
                <Button size="sm" onClick={() => handleSave("System")}>
                  <Save className="h-3.5 w-3.5 mr-1" /> Save System Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
