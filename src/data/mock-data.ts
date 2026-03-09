// ─── Types ───────────────────────────────────────────────────────────────────

export interface Plant {
  id: string;
  name: string;
  location: string;
  capacity: number; // kWp
  healthScore: number;
  image: string;
  commissionedDate: string;
  panelCount: number;
  stringCount: number;
  inverterCount: number;
  area: string; // acres
}

export interface KPIData {
  healthScore: number;
  revenueLostMTD: number;
  revenueRecoveredMTD: number;
  revenueDeviationPct: number;
  expectedKWh: number;
  actualKWh: number;
  deviationPct: number;
  availabilityPct: number;
  downtimeHours: number;
}

export interface HourlyData {
  time: string;
  expected: number;
  actual: number;
  irradiance: number;
}

export interface Inverter {
  id: string;
  name: string;
  status: "online" | "warning" | "offline";
  output: number; // kW
  temperature?: number;
  statusDetail?: string;
}

export interface Alert {
  id: string;
  severity: "high" | "medium" | "low";
  message: string;
  detectedAt: string;
  slaMinutes: number;
  slaRemaining: number;
}

export interface PerformanceMetrics {
  pr: number;
  cuf: number;
  degradation: number;
  efficiency: number;
}

export interface StringData {
  name: string;
  output: number;
  expected: number;
  imbalance: number;
}

export interface FinancialData {
  monthlyRevenue: number;
  expectedRevenue: number;
  revenueGap: number;
  annualProjection: number;
  losses: { category: string; amount: number; percentage: number }[];
  cumulativeRevenue: { month: string; expected: number; actual: number }[];
}

export interface EnergyData {
  contractDemand: number;
  currentMaxDemand: number;
  riskLevel: "low" | "medium" | "high";
  powerFactor: number;
  pfTrend: { time: string; pf: number }[];
  loadProfile: { time: string; demand: number; peak: boolean }[];
  recommendations: string[];
}

export interface Fault {
  id: string;
  severity: "critical" | "major" | "minor";
  detectedAt: string;
  assignee: string;
  slaCountdown: string;
  status: "open" | "in-progress" | "resolved";
  description: string;
}

export interface MaintenanceVisit {
  id: string;
  date: string;
  technician: string;
  type: "preventive" | "corrective";
  status: "completed" | "scheduled" | "overdue";
  checklist: number; // % complete
  notes: string;
}

// ─── Mock Data ───────────────────────────────────────────────────────────────

export const plants: Plant[] = [
  { id: "p1", name: "Rajasthan Solar Park", location: "Jodhpur, RJ", capacity: 5000, healthScore: 92, image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80", commissionedDate: "2020-03-15", panelCount: 12500, stringCount: 24, inverterCount: 8, area: "25" },
  { id: "p2", name: "Gujarat Sun Farm", location: "Kutch, GJ", capacity: 3200, healthScore: 78, image: "https://images.unsplash.com/photo-1548337138-e87d889cc369?w=800&q=80", commissionedDate: "2019-11-20", panelCount: 8000, stringCount: 16, inverterCount: 6, area: "16" },
  { id: "p3", name: "Karnataka PV Station", location: "Tumkur, KA", capacity: 2100, healthScore: 65, image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&q=80", commissionedDate: "2021-07-08", panelCount: 5250, stringCount: 12, inverterCount: 4, area: "11" },
  { id: "p4", name: "Tamil Nadu Array", location: "Ramanathapuram, TN", capacity: 4500, healthScore: 88, image: "https://images.unsplash.com/photo-1559302504-64aae6ca6b6d?w=800&q=80", commissionedDate: "2020-09-12", panelCount: 11250, stringCount: 20, inverterCount: 7, area: "22" },
];

export const kpiData: KPIData = {
  healthScore: 87,
  revenueLostMTD: 245000,
  revenueRecoveredMTD: 180000,
  revenueDeviationPct: -3.2,
  expectedKWh: 18500,
  actualKWh: 17200,
  deviationPct: -7.0,
  availabilityPct: 96.8,
  downtimeHours: 2.4,
};

export const hourlyData: HourlyData[] = Array.from({ length: 13 }, (_, i) => {
  const hour = 6 + i;
  const peak = Math.sin(((hour - 6) / 12) * Math.PI);
  const expected = Math.round(peak * 4200 + 200);
  const actual = Math.round(expected * (0.85 + Math.random() * 0.15));
  return {
    time: `${hour.toString().padStart(2, "0")}:00`,
    expected,
    actual,
    irradiance: Math.round(peak * 950 + 50),
  };
});

export const inverters: Inverter[] = [
  { id: "inv1", name: "INV-01", status: "online", output: 245, temperature: 42 },
  { id: "inv2", name: "INV-02", status: "online", output: 238, temperature: 44 },
  { id: "inv3", name: "INV-03", status: "warning", output: 180, temperature: 58, statusDetail: "Temp High" },
  { id: "inv4", name: "INV-04", status: "online", output: 242, temperature: 41 },
  { id: "inv5", name: "INV-05", status: "online", output: 240, temperature: 43 },
  { id: "inv6", name: "INV-06", status: "offline", output: 0, temperature: 25, statusDetail: "Comm Fault" },
  { id: "inv7", name: "INV-07", status: "online", output: 235, temperature: 45 },
  { id: "inv8", name: "INV-08", status: "online", output: 241, temperature: 42 },
];

export const alerts: Alert[] = [
  { id: "a1", severity: "high", message: "INV-06 Communication Failure", detectedAt: "09:15", slaMinutes: 60, slaRemaining: 23 },
  { id: "a2", severity: "high", message: "String 4B Output Drop >20%", detectedAt: "10:30", slaMinutes: 120, slaRemaining: 87 },
  { id: "a3", severity: "medium", message: "INV-03 Temperature Warning (58°C)", detectedAt: "11:45", slaMinutes: 240, slaRemaining: 198 },
  { id: "a4", severity: "low", message: "Meter Data Delay (>15 min)", detectedAt: "12:00", slaMinutes: 480, slaRemaining: 460 },
  { id: "a5", severity: "medium", message: "Grid Voltage Fluctuation", detectedAt: "08:22", slaMinutes: 180, slaRemaining: 45 },
];

export const performanceMetrics: PerformanceMetrics = {
  pr: 78.4,
  cuf: 22.1,
  degradation: 0.7,
  efficiency: 96.2,
};

export const stringData: StringData[] = [
  { name: "String 1A", output: 12.4, expected: 13.0, imbalance: 4.6 },
  { name: "String 1B", output: 12.8, expected: 13.0, imbalance: 1.5 },
  { name: "String 2A", output: 11.9, expected: 13.0, imbalance: 8.5 },
  { name: "String 2B", output: 12.6, expected: 13.0, imbalance: 3.1 },
  { name: "String 3A", output: 12.1, expected: 13.0, imbalance: 6.9 },
  { name: "String 3B", output: 12.9, expected: 13.0, imbalance: 0.8 },
  { name: "String 4A", output: 12.3, expected: 13.0, imbalance: 5.4 },
  { name: "String 4B", output: 9.8, expected: 13.0, imbalance: 24.6 },
];

export const financialData: FinancialData = {
  monthlyRevenue: 3250000,
  expectedRevenue: 3580000,
  revenueGap: 330000,
  annualProjection: 39800000,
  losses: [
    { category: "Downtime", amount: 145000, percentage: 44 },
    { category: "Deviation", amount: 98000, percentage: 30 },
    { category: "Grid Outage", amount: 52000, percentage: 16 },
    { category: "Maint. Delay", amount: 35000, percentage: 10 },
  ],
  cumulativeRevenue: [
    { month: "Apr", expected: 3500, actual: 3200 },
    { month: "May", expected: 7200, actual: 6800 },
    { month: "Jun", expected: 10500, actual: 9900 },
    { month: "Jul", expected: 14000, actual: 13100 },
    { month: "Aug", expected: 17200, actual: 16000 },
    { month: "Sep", expected: 20800, actual: 19200 },
    { month: "Oct", expected: 24000, actual: 22500 },
    { month: "Nov", expected: 27500, actual: 25800 },
    { month: "Dec", expected: 30800, actual: 28900 },
    { month: "Jan", expected: 34200, actual: 32100 },
    { month: "Feb", expected: 37000, actual: 34800 },
    { month: "Mar", expected: 39800, actual: 37200 },
  ],
};

export const energyData: EnergyData = {
  contractDemand: 2500,
  currentMaxDemand: 2340,
  riskLevel: "medium",
  powerFactor: 0.92,
  pfTrend: Array.from({ length: 24 }, (_, i) => ({
    time: `${i.toString().padStart(2, "0")}:00`,
    pf: 0.88 + Math.random() * 0.1,
  })),
  loadProfile: Array.from({ length: 96 }, (_, i) => {
    const hour = i / 4;
    const base = 1200 + Math.sin((hour / 24) * Math.PI * 2 - Math.PI / 2) * 600;
    const demand = Math.round(base + Math.random() * 200);
    return {
      time: `${Math.floor(hour).toString().padStart(2, "0")}:${((i % 4) * 15).toString().padStart(2, "0")}`,
      demand,
      peak: demand > 2200,
    };
  }),
  recommendations: [
    "Install 15 kVAR capacitor bank to improve power factor to 0.97",
    "Shift compressor load (180 kW) to after 18:00 to reduce peak demand",
    "Enable battery discharge during 14:00–16:00 peak window",
    "Schedule EV charging to off-peak hours (22:00–06:00)",
  ],
};

export const faults: Fault[] = [
  { id: "F-2024-001", severity: "critical", detectedAt: "2024-03-02 09:15", assignee: "Ravi Kumar", slaCountdown: "0h 23m", status: "open", description: "INV-06 Communication Failure" },
  { id: "F-2024-002", severity: "major", detectedAt: "2024-03-02 10:30", assignee: "Priya Shah", slaCountdown: "1h 27m", status: "in-progress", description: "String 4B Output Drop" },
  { id: "F-2024-003", severity: "minor", detectedAt: "2024-03-02 11:45", assignee: "Amit Patel", slaCountdown: "3h 18m", status: "open", description: "INV-03 Temperature Warning" },
  { id: "F-2024-004", severity: "major", detectedAt: "2024-03-01 16:20", assignee: "Ravi Kumar", slaCountdown: "—", status: "resolved", description: "Grid Voltage Fluctuation" },
  { id: "F-2024-005", severity: "minor", detectedAt: "2024-03-01 14:00", assignee: "Priya Shah", slaCountdown: "—", status: "resolved", description: "Meter Data Delay" },
];

export const maintenanceVisits: MaintenanceVisit[] = [
  { id: "MV-001", date: "2024-02-28", technician: "Suresh M.", type: "preventive", status: "completed", checklist: 100, notes: "All panels cleaned. Inverter filters replaced." },
  { id: "MV-002", date: "2024-03-05", technician: "Rajesh K.", type: "preventive", status: "scheduled", checklist: 0, notes: "Quarterly inspection due." },
  { id: "MV-003", date: "2024-02-15", technician: "Suresh M.", type: "corrective", status: "completed", checklist: 100, notes: "Replaced fuse on String 2A combiner box." },
  { id: "MV-004", date: "2024-02-20", technician: "Amit P.", type: "preventive", status: "overdue", checklist: 60, notes: "Thermal imaging incomplete — camera malfunction." },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

export const formatINR = (val: number): string => {
  if (val >= 10000000) return `₹${(val / 10000000).toFixed(1)}Cr`;
  if (val >= 100000) return `₹${(val / 100000).toFixed(1)}L`;
  if (val >= 1000) return `₹${(val / 1000).toFixed(1)}K`;
  return `₹${val}`;
};

export const formatNumber = (val: number): string => {
  return val.toLocaleString("en-IN");
};
