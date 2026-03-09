# Solar Dashboard Design System - Export Package

This document contains all the UI/UX patterns, theme configuration, and reusable components from the Solar Dashboard project.

## 🎨 Design Philosophy

- **Dual Theme Support**: Industrial dark theme + soft blue-gray light theme
- **Off-white Light Mode**: Uses `220 16% 93%` background to reduce eye strain (no pure white)
- **Semantic Tokens**: All colors use CSS variables for easy theming
- **HSL Color System**: All colors in HSL format for consistency
- **8px Grid System**: Spacing based on 8px increments
- **Typography**: Inter font family throughout

---

## 📦 Files to Export

### 1. Core Theme Files (Required)

Copy these files to your new project:

```
src/index.css                    # CSS variables for light/dark themes
src/hooks/use-theme.tsx          # Theme provider and hook
src/hooks/use-chart-colors.ts    # Chart color hooks for Recharts
tailwind.config.ts               # Tailwind configuration
index.html                       # Theme script to prevent FOUC
```

### 2. Layout Components (Optional)

```
src/components/layout/DashboardLayout.tsx
src/components/layout/AppSidebar.tsx
src/components/layout/TopBar.tsx
src/components/NavLink.tsx
```

### 3. UI Components (shadcn/ui)

All components in `src/components/ui/` are from shadcn/ui and can be reinstalled via:
```bash
npx shadcn@latest add [component-name]
```

---

## 🎯 Quick Start Guide

### Step 1: Install Dependencies

```bash
npm install next-themes
npm install class-variance-authority clsx tailwind-merge
npm install @radix-ui/react-slot
npm install tailwindcss-animate
```

### Step 2: Copy Theme Configuration

1. **Copy `src/index.css`** - Contains all CSS variables
2. **Copy `src/hooks/use-theme.tsx`** - Theme provider
3. **Copy `src/hooks/use-chart-colors.ts`** - For Recharts theming
4. **Copy `tailwind.config.ts`** - Tailwind config with semantic tokens

### Step 3: Update Root Files

**In `src/App.tsx` or your root component:**

```typescript
import { ThemeProvider } from "@/hooks/use-theme";

function App() {
  return (
    <ThemeProvider>
      {/* Your app content */}
    </ThemeProvider>
  );
}
```

**In `index.html` (before closing `</head>`):**

```html
<script>
  (function() {
    const theme = localStorage.getItem('app-theme') || 'dark';
    const resolvedTheme = theme === 'system' 
      ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
      : theme;
    document.documentElement.classList.add(resolvedTheme);
  })();
</script>
```

### Step 4: Use the Theme

```typescript
import { useTheme } from "@/hooks/use-theme";

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  
  return (
    <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      Toggle Theme
    </button>
  );
}
```

---

## 🎨 Color System

### CSS Variables (from `src/index.css`)

#### Light Theme Colors
```css
:root {
  --background: 220 16% 93%;      /* Soft blue-gray */
  --foreground: 220 20% 14%;      /* Dark text */
  --card: 220 16% 96%;            /* Card background */
  --primary: 210 100% 45%;        /* Blue accent */
  --success: 142 50% 38%;         /* Green */
  --warning: 38 92% 45%;          /* Orange */
  --destructive: 0 62% 50%;       /* Red */
  --muted: 220 14% 90%;           /* Muted background */
  --muted-foreground: 220 10% 40%; /* Muted text */
  --border: 220 13% 82%;          /* Border color */
}
```

#### Dark Theme Colors
```css
.dark {
  --background: 220 20% 7%;       /* Dark background */
  --foreground: 210 40% 93%;      /* Light text */
  --card: 220 25% 10%;            /* Card background */
  --primary: 210 100% 56%;        /* Bright blue */
  --success: 142 50% 45%;         /* Green */
  --warning: 38 92% 50%;          /* Orange */
  --destructive: 0 62% 50%;       /* Red */
  --muted: 220 15% 16%;           /* Muted background */
  --muted-foreground: 215 15% 55%; /* Muted text */
  --border: 220 15% 18%;          /* Border color */
}
```

### Usage in Components

**Tailwind Classes (Preferred):**
```tsx
<div className="bg-card text-foreground border-border">
  <h1 className="text-primary">Title</h1>
  <p className="text-muted-foreground">Description</p>
</div>
```

**Direct HSL (for charts, SVG):**
```tsx
import { useChartColors } from "@/hooks/use-chart-colors";

function MyChart() {
  const colors = useChartColors();
  return <line stroke={colors.primary} />;
}
```

---

## 📊 Chart Theming (Recharts)

For Recharts components, use the `useChartColors()` hook:

```typescript
import { useChartColors, useTooltipStyle } from "@/hooks/use-chart-colors";
import { LineChart, Line, Tooltip, XAxis, YAxis } from "recharts";

function MyChart() {
  const cc = useChartColors();
  const tooltipProps = useTooltipStyle();

  return (
    <LineChart data={data}>
      <XAxis stroke={cc.border} tick={{ fill: cc.text }} />
      <YAxis stroke={cc.border} tick={{ fill: cc.text }} />
      <Tooltip {...tooltipProps} />
      <Line stroke={cc.primary} />
      <Line stroke={cc.success} />
    </LineChart>
  );
}
```

---

## 🏗️ Layout Patterns

### Dashboard Layout Structure

```
┌─────────────────────────────────────┐
│           TopBar (h-14)             │
├──────┬──────────────────────────────┤
│      │                              │
│ Side │    Main Content Area         │
│ bar  │    (scrollable)              │
│      │                              │
└──────┴──────────────────────────────┘
```

**Key Features:**
- Collapsible sidebar with icon mode
- Sticky top bar
- Responsive grid layouts
- Card-based components

### Example Layout Component

```tsx
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { TopBar } from "@/components/layout/TopBar";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <TopBar />
          <main className="flex-1 overflow-auto p-4">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
```

---

## 🎯 Component Patterns

### Card Pattern
```tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

<Card className="bg-card border-border">
  <CardHeader>
    <CardTitle className="text-sm font-medium text-muted-foreground">
      Title
    </CardTitle>
  </CardHeader>
  <CardContent>
    {/* Content */}
  </CardContent>
</Card>
```

### KPI Card Pattern
```tsx
<Card className="bg-card border-border">
  <CardContent className="pt-4">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-xs text-muted-foreground">Total Generation</p>
        <p className="text-2xl font-bold text-foreground">2,456 kWh</p>
        <p className="text-xs text-success mt-1">↑ 12.5% vs yesterday</p>
      </div>
      <Icon className="h-8 w-8 text-primary" />
    </div>
  </CardContent>
</Card>
```

### Badge Pattern
```tsx
import { Badge } from "@/components/ui/badge";

// Status badges
<Badge className="bg-success/10 text-success border-success/20">Online</Badge>
<Badge className="bg-warning/10 text-warning border-warning/20">Warning</Badge>
<Badge className="bg-destructive/10 text-destructive border-destructive/20">Offline</Badge>
```

---

## 📱 Responsive Patterns

### Grid Layouts
```tsx
{/* 1 col mobile, 2 col tablet, 4 col desktop */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
  {/* Cards */}
</div>

{/* Main content + sidebar */}
<div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
  <div className="lg:col-span-3">{/* Main */}</div>
  <div>{/* Sidebar */}</div>
</div>
```

### Mobile-First Approach
```tsx
<div className="text-sm md:text-base lg:text-lg">
  Responsive text
</div>

<div className="p-3 md:p-4 lg:p-6">
  Responsive padding
</div>
```

---

## 🎨 Typography Scale

```css
/* Headings */
text-xl font-semibold      /* Page titles */
text-lg font-semibold      /* Section titles */
text-base font-medium      /* Subsection titles */
text-sm font-medium        /* Card titles */

/* Body Text */
text-base                  /* Normal text */
text-sm                    /* Secondary text */
text-xs                    /* Captions, labels */

/* Colors */
text-foreground            /* Primary text */
text-muted-foreground      /* Secondary text */
text-primary               /* Accent text */
```

---

## 🔧 Tailwind Configuration

Key extensions in `tailwind.config.ts`:

```typescript
export default {
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
        },
        // ... more semantic tokens
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
};
```

---

## ✅ Checklist for New Project

- [ ] Install required dependencies
- [ ] Copy `src/index.css`
- [ ] Copy `src/hooks/use-theme.tsx`
- [ ] Copy `src/hooks/use-chart-colors.ts` (if using charts)
- [ ] Copy `tailwind.config.ts`
- [ ] Update `index.html` with theme script
- [ ] Wrap app in `ThemeProvider`
- [ ] Install shadcn/ui components as needed
- [ ] Copy layout components (optional)
- [ ] Test theme switching
- [ ] Test responsive layouts

---

## 🚀 Advanced Features

### Custom Theme Selector UI

```tsx
import { useTheme } from "@/hooks/use-theme";
import { Sun, Moon, Monitor } from "lucide-react";

function ThemeSelector() {
  const { theme, setTheme } = useTheme();
  
  return (
    <div className="flex gap-2">
      <button
        onClick={() => setTheme("light")}
        className={theme === "light" ? "text-primary" : "text-muted-foreground"}
      >
        <Sun className="h-5 w-5" />
      </button>
      <button
        onClick={() => setTheme("dark")}
        className={theme === "dark" ? "text-primary" : "text-muted-foreground"}
      >
        <Moon className="h-5 w-5" />
      </button>
      <button
        onClick={() => setTheme("system")}
        className={theme === "system" ? "text-primary" : "text-muted-foreground"}
      >
        <Monitor className="h-5 w-5" />
      </button>
    </div>
  );
}
```

### SVG Theme-Aware Components

```tsx
import { useChartColors } from "@/hooks/use-chart-colors";

function ThemedSVG() {
  const colors = useChartColors();
  
  return (
    <svg viewBox="0 0 100 100">
      <rect fill={colors.bg} />
      <circle fill={colors.primary} />
      <text fill={colors.fg}>Text</text>
    </svg>
  );
}
```

---

## 📝 Notes

1. **No Pure White**: Light theme uses `220 16% 93%` to reduce eye strain
2. **HSL Format**: All colors must be in HSL for CSS variable system
3. **Semantic Tokens**: Always use `--primary`, `--background`, etc. Never hardcode colors
4. **Theme Hook**: Use `useChartColors()` for any programmatic color access
5. **FOUC Prevention**: Theme script in `index.html` prevents flash of wrong theme

---

## 🔗 Related Resources

- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Recharts Documentation](https://recharts.org/)
- [Lucide Icons](https://lucide.dev/)

---

## 📧 Support

For questions about this design system, refer to the original project files or consult the implementation in the Solar Dashboard project.

---

**Last Updated**: 2026-03-09
**Version**: 1.0.0
