import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { plants, formatINR } from "@/data/mock-data";
import { toast } from "@/hooks/use-toast";
import {
  HiUsers, HiSignal, HiShieldCheck, HiCog6Tooth, HiMagnifyingGlass, HiPlus, HiPencilSquare, HiTrash, HiCheckCircle, HiXCircle, HiClock,
} from "react-icons/hi2";

const getHealthColor = (s: number) => s >= 85 ? "text-success" : s >= 70 ? "text-warning" : "text-destructive";
const getHealthBg = (s: number) => s >= 85 ? "bg-success/15" : s >= 70 ? "bg-warning/15" : "bg-destructive/15";

interface MockUser {
  id: string;
  name: string;
  email: string;
  role: "admin" | "manager" | "operator" | "viewer";
  status: "active" | "inactive";
  lastLogin: string;
  plant: string;
}

const initialUsers: MockUser[] = [
  { id: "u1", name: "Vikram Singh", email: "vikram@solarops.in", role: "admin", status: "active", lastLogin: "2024-03-02 14:30", plant: "All Plants" },
  { id: "u2", name: "Ravi Kumar", email: "ravi@solarops.in", role: "manager", status: "active", lastLogin: "2024-03-02 12:15", plant: "Rajasthan Solar Park" },
  { id: "u3", name: "Priya Shah", email: "priya@solarops.in", role: "operator", status: "active", lastLogin: "2024-03-02 09:45", plant: "Gujarat Sun Farm" },
  { id: "u4", name: "Amit Patel", email: "amit@solarops.in", role: "operator", status: "inactive", lastLogin: "2024-02-28 16:00", plant: "Karnataka PV Station" },
  { id: "u5", name: "Suresh M.", email: "suresh@solarops.in", role: "viewer", status: "active", lastLogin: "2024-03-01 11:00", plant: "Tamil Nadu Array" },
];

const auditLogs = [
  { time: "14:32", user: "Vikram Singh", action: "Updated SLA threshold", target: "System Config", type: "config" },
  { time: "12:18", user: "Ravi Kumar", action: "Resolved fault F-2024-004", target: "Rajasthan Solar Park", type: "fault" },
  { time: "11:45", user: "System", action: "Auto-generated daily report", target: "All Plants", type: "system" },
  { time: "09:30", user: "Priya Shah", action: "Acknowledged alert A3", target: "Gujarat Sun Farm", type: "alert" },
  { time: "08:15", user: "System", action: "Backup completed", target: "Database", type: "system" },
  { time: "07:00", user: "System", action: "Data sync started", target: "SCADA Gateway", type: "system" },
];

const slaBreaches = [
  { plant: "Karnataka PV Station", fault: "INV-03 Overtemp", breachBy: "2h 15m" },
  { plant: "Gujarat Sun Farm", fault: "String 2A Underperform", breachBy: "0h 45m" },
];

const roleColors: Record<string, string> = {
  admin: "bg-primary/15 text-primary border-primary/30",
  manager: "bg-warning/15 text-warning border-warning/30",
  operator: "bg-success/15 text-success border-success/30",
  viewer: "bg-muted text-muted-foreground border-border",
};

export default function Admin() {
  const [users, setUsers] = useState<MockUser[]>(initialUsers);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [addUserOpen, setAddUserOpen] = useState(false);
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "operator" as MockUser["role"], plant: "" });

  const sorted = [...plants].sort((a, b) => b.healthScore - a.healthScore);
  const highRisk = [...plants].sort((a, b) => a.healthScore - b.healthScore).slice(0, 2);

  const filteredUsers = users.filter((u) => {
    const matchSearch = u.name.toLowerCase().includes(searchQuery.toLowerCase()) || u.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchRole = roleFilter === "all" || u.role === roleFilter;
    return matchSearch && matchRole;
  });

  const handleAddUser = () => {
    if (!newUser.name || !newUser.email) return;
    const user: MockUser = {
      id: `u${Date.now()}`,
      ...newUser,
      status: "active",
      lastLogin: "Never",
      plant: newUser.plant || "Unassigned",
    };
    setUsers([...users, user]);
    setAddUserOpen(false);
    setNewUser({ name: "", email: "", role: "operator", plant: "" });
    toast({ title: "User Added", description: `${user.name} has been added as ${user.role}.` });
  };

  const toggleUserStatus = (id: string) => {
    setUsers(users.map((u) => u.id === id ? { ...u, status: u.status === "active" ? "inactive" : "active" } : u));
  };

  const deleteUser = (id: string, name: string) => {
    setUsers(users.filter((u) => u.id !== id));
    toast({ title: "User Removed", description: `${name} has been removed.` });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-xl font-semibold text-foreground">Admin Panel</h1>

        <Tabs defaultValue="users" className="w-full">
          <TabsList className="bg-secondary/50 border border-border">
            <TabsTrigger value="users" className="text-xs gap-1.5"><HiUsers className="h-3.5 w-3.5" /> Users</TabsTrigger>
            <TabsTrigger value="portfolio" className="text-xs gap-1.5"><HiSignal className="h-3.5 w-3.5" /> Portfolio</TabsTrigger>
            <TabsTrigger value="audit" className="text-xs gap-1.5"><HiShieldCheck className="h-3.5 w-3.5" /> Audit Log</TabsTrigger>
            <TabsTrigger value="system" className="text-xs gap-1.5"><HiCog6Tooth className="h-3.5 w-3.5" /> System</TabsTrigger>
          </TabsList>

          {/* Users */}
          <TabsContent value="users" className="mt-4 space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <HiMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search users..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-9 text-sm" />
              </div>
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-36 text-sm"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="manager">Manager</SelectItem>
                  <SelectItem value="operator">Operator</SelectItem>
                  <SelectItem value="viewer">Viewer</SelectItem>
                </SelectContent>
              </Select>
              <Button size="sm" onClick={() => setAddUserOpen(true)}>
                <HiPlus className="h-3.5 w-3.5 mr-1" /> Add User
              </Button>
            </div>

            <Card className="bg-card border-border">
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Plant</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Login</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((u) => (
                      <TableRow key={u.id}>
                        <TableCell>
                          <p className="text-sm font-medium text-foreground">{u.name}</p>
                          <p className="text-[10px] text-muted-foreground">{u.email}</p>
                        </TableCell>
                        <TableCell>
                          <Badge className={`text-[10px] border ${roleColors[u.role]}`}>{u.role}</Badge>
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground">{u.plant}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1.5">
                            {u.status === "active" ? (
                               <HiCheckCircle className="h-3.5 w-3.5 text-success" />
                            ) : (
                               <HiXCircle className="h-3.5 w-3.5 text-muted-foreground" />
                            )}
                            <span className="text-xs">{u.status}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground">{u.lastLogin}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-1">
                            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => toggleUserStatus(u.id)}>
                               <HiPencilSquare className="h-3.5 w-3.5" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive hover:text-destructive" onClick={() => deleteUser(u.id, u.name)}>
                               <HiTrash className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Portfolio */}
          <TabsContent value="portfolio" className="mt-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <Card className="bg-card border-border lg:col-span-2">
                <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Portfolio Health Ranking</CardTitle></CardHeader>
                <CardContent className="space-y-2">
                  {sorted.map((p, i) => (
                    <div key={p.id} className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 border border-border">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-mono text-muted-foreground w-5">#{i + 1}</span>
                        <div>
                          <p className="text-sm font-medium text-foreground">{p.name}</p>
                          <p className="text-[10px] text-muted-foreground">{p.location} • {p.capacity} kWp</p>
                        </div>
                      </div>
                      <div className={`text-xl font-bold ${getHealthColor(p.healthScore)} ${getHealthBg(p.healthScore)} px-3 py-1 rounded-lg`}>
                        {p.healthScore}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <div className="space-y-4">
                <Card className="bg-card border-border">
                  <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">High Risk Plants</CardTitle></CardHeader>
                  <CardContent className="space-y-2">
                    {highRisk.map((p) => (
                      <div key={p.id} className="p-3 rounded-lg bg-destructive/5 border border-destructive/20">
                        <p className="text-sm font-medium text-foreground">{p.name}</p>
                        <p className="text-xs text-destructive">Health: {p.healthScore}/100</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="bg-card border-border">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm text-muted-foreground">SLA Breaches</CardTitle>
                      <Badge variant="destructive" className="text-[10px]">{slaBreaches.length}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {slaBreaches.map((b, i) => (
                      <div key={i} className="p-3 rounded-lg bg-destructive/5 border border-destructive/20">
                        <p className="text-xs font-medium text-foreground">{b.fault}</p>
                        <p className="text-[10px] text-muted-foreground">{b.plant}</p>
                        <p className="text-[10px] text-destructive mt-1">Breached by {b.breachBy}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Audit Log */}
          <TabsContent value="audit" className="mt-4">
            <Card className="bg-card border-border">
              <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Today's Activity</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {auditLogs.map((log, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-secondary/30 border border-border">
                      <div className="flex items-center gap-1.5 shrink-0 mt-0.5">
                        <HiClock className="h-3.5 w-3.5 text-muted-foreground" />
                        <span className="text-xs font-mono text-muted-foreground">{log.time}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-foreground">
                          <span className="font-medium">{log.user}</span>
                          {" "}{log.action}
                        </p>
                        <p className="text-[10px] text-muted-foreground">{log.target}</p>
                      </div>
                      <Badge variant="outline" className="text-[10px] shrink-0">{log.type}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* System */}
          <TabsContent value="system" className="mt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              {[
                { label: "SCADA Gateway", status: "Online", ok: true },
                { label: "Database", status: "Healthy", ok: true },
                { label: "API Server", status: "Online", ok: true },
                { label: "Inverter Comms", status: "1 Offline", ok: false },
              ].map((s) => (
                <Card key={s.label} className="bg-card border-border">
                  <CardContent className="p-4 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] text-muted-foreground">{s.label}</p>
                      <p className={`text-sm font-medium ${s.ok ? "text-success" : "text-warning"}`}>{s.status}</p>
                    </div>
                    <div className={`h-3 w-3 rounded-full ${s.ok ? "bg-success" : "bg-warning"} animate-pulse`} />
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="bg-card border-border">
              <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Integration Status</CardTitle></CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Service</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Sync</TableHead>
                      <TableHead>Latency</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      { service: "Weather API", status: "Connected", lastSync: "2 min ago", latency: "120ms" },
                      { service: "Grid Operator", status: "Connected", lastSync: "5 min ago", latency: "340ms" },
                      { service: "SCADA System", status: "Connected", lastSync: "30 sec ago", latency: "45ms" },
                      { service: "Billing Gateway", status: "Degraded", lastSync: "15 min ago", latency: "2100ms" },
                    ].map((s) => (
                      <TableRow key={s.service}>
                        <TableCell className="text-sm">{s.service}</TableCell>
                        <TableCell>
                          <Badge className={`text-[10px] border ${s.status === "Connected" ? "bg-success/15 text-success border-success/30" : "bg-warning/15 text-warning border-warning/30"}`}>
                            {s.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground">{s.lastSync}</TableCell>
                        <TableCell className="text-xs font-mono">{s.latency}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Add User Dialog */}
      <Dialog open={addUserOpen} onOpenChange={setAddUserOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
            <DialogDescription>Create a new user account and assign a role.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label className="text-xs">Name</Label>
              <Input value={newUser.name} onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} className="text-sm" placeholder="Full name" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Email</Label>
              <Input value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} className="text-sm" placeholder="email@company.in" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Role</Label>
              <Select value={newUser.role} onValueChange={(v) => setNewUser({ ...newUser, role: v as MockUser["role"] })}>
                <SelectTrigger className="text-sm"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="manager">Manager</SelectItem>
                  <SelectItem value="operator">Operator</SelectItem>
                  <SelectItem value="viewer">Viewer</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Assigned Plant</Label>
              <Select value={newUser.plant} onValueChange={(v) => setNewUser({ ...newUser, plant: v })}>
                <SelectTrigger className="text-sm"><SelectValue placeholder="Select plant" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="All Plants">All Plants</SelectItem>
                  {plants.map((p) => (
                    <SelectItem key={p.id} value={p.name}>{p.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddUserOpen(false)}>Cancel</Button>
            <Button onClick={handleAddUser}><HiPlus className="h-4 w-4 mr-1" /> Add User</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
