

# SolarWatch — Solar Plant Monitoring Dashboard

## Overview
A comprehensive, enterprise-grade solar power plant monitoring dashboard with executive views, technical analytics, financial tracking, and O&M management. All data will be mock/demo data for now, with a clean dark industrial theme.

---

## Pages & Features

### 1. Global Layout
- **Dark theme** (background #0E1117, cards #161B22, accent Electric Blue)
- **Left sidebar** with navigation: Dashboard, Plants, Performance, Financial, Energy Optimization, Alerts, O&M/SLA, Reports, Settings, Admin
- **Top bar** with plant selector dropdown, date filter (Today/7D/30D/Custom), notification bell, user role badge, and profile avatar
- Collapsible sidebar with icon-only mini mode

### 2. Main Dashboard (Executive View)
- **KPI Cards Row**: Health Score (color-coded 0–100), Revenue Impact MTD (₹ lost/recovered/deviation%), Expected vs Actual kWh today, Availability % with downtime hours
- **Performance Graph**: Dual-line chart (expected vs actual) with deviation highlighting and hover tooltips
- **Inverter Status Grid**: Color-coded mini cards showing inverter name, status, and output
- **Active Alerts Panel**: Right column with severity badges, timestamps, SLA countdown timers, and quick-action buttons

### 3. Performance View
- Tabbed layout: Overview, String Level, MPPT Analysis
- **Overview**: PR%, CUF, degradation trend line, irradiance vs output correlation chart
- **String Level**: Bar chart comparison, imbalance %, worst-performing string ranking table
- **MPPT Analysis**: MPPT efficiency metrics, DC vs AC conversion efficiency chart

### 4. Financial View
- **Revenue Panel**: Monthly/expected revenue cards, revenue gap, annual projection
- **Cumulative Revenue Graph**: Expected vs actual revenue over time
- **Loss Breakdown**: Pie chart (downtime, deviation, grid outage, maintenance delay)
- **Tariff Impact**: Net metering summary, export vs self-consumption ratio, demand charge risk

### 5. Energy Optimization View
- **KPI Row**: Contract demand, current max demand, risk level indicator
- **Load Profile Graph**: 15-min interval with peak demand highlighting
- **Power Factor Monitor**: Current PF value and trend graph with penalty risk
- **Recommendation Panel**: Actionable suggestions cards (e.g., "Shift compressor load after 6 PM")

### 6. O&M / SLA View
- **Fault Lifecycle Table**: Fault ID, severity, detected time, assignee, SLA countdown, status
- **Preventive Maintenance Tracker**: Calendar view with last/next visit, checklist completion
- **Visit Logs**: Technician name, notes, photo placeholders, signature status

### 7. Reports Section
- Simple list of report types (Monthly Performance, SLA Compliance, Financial Summary, Annual PR Trend)
- Date filter and download buttons

### 8. Admin Panel
- **Portfolio Health Ranking**: Plants sorted by health score
- **High Risk Plants**: Plants losing most revenue
- **SLA Breach Alerts**: Active breach list

### Design System
- Inter font, 8px grid spacing, rounded corners (8–12px), subtle shadows
- Max 4 KPI cards per row, max 3 colors per chart
- Charts via Recharts: smooth curves, clean axes, subtle gridlines, no 3D
- All data is mock/demo data using realistic solar plant values in ₹

