# 🎨 Solar Dashboard UI/UX Export Package

Complete design system export from the Solar Dashboard project - ready to use in any new React + Tailwind project.

## 📦 What's Included

```
EXPORT_PACKAGE/
├── index.css                 # Complete CSS variables (light/dark themes)
├── use-theme.tsx            # Theme provider & hook
├── use-chart-colors.ts      # Chart theming hook for Recharts
├── tailwind.config.ts       # Tailwind configuration with semantic tokens
├── theme-script.html        # FOUC prevention script for index.html
├── example-usage.tsx        # Real-world usage examples
└── README.md               # This file
```

## 🚀 Quick Start (3 Steps)

### 1. Install Dependencies

```bash
npm install next-themes
npm install tailwindcss-animate
npm install class-variance-authority clsx tailwind-merge
```

### 2. Copy Files

Copy these files from `EXPORT_PACKAGE/` to your project:

- `index.css` → `src/index.css`
- `use-theme.tsx` → `src/hooks/use-theme.tsx`
- `use-chart-colors.ts` → `src/hooks/use-chart-colors.ts`
- `tailwind.config.ts` → `./tailwind.config.ts`

### 3. Setup Theme

**A) Add theme script to your `index.html` (before `</head>`):**

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

**B) Wrap your app with ThemeProvider:**

```tsx
import { ThemeProvider } from "@/hooks/use-theme";

function App() {
  return (
    <ThemeProvider>
      {/* Your app content */}
    </ThemeProvider>
  );
}
```

## ✅ Done!

Your project now has:
- ✨ Full light/dark theme support
- 🎨 Off-white light mode (no eye strain)
- 📊 Theme-aware chart colors
- 🎯 Semantic design tokens
- 📱 Responsive by default

## 📚 Usage Examples

See `example-usage.tsx` for complete working examples of:

1. Theme toggle components
2. Card components with semantic tokens
3. Chart components with theme-aware colors
4. Badge components for status indicators
5. SVG components with dynamic theming
6. Dashboard layout patterns
7. Responsive grid layouts

## 🎨 Design System Overview

### Color Tokens

Use these Tailwind classes in your components:

```tsx
// Backgrounds
className="bg-background"     // Page background
className="bg-card"           // Card background
className="bg-muted"          // Muted background

// Text
className="text-foreground"         // Primary text
className="text-muted-foreground"   // Secondary text
className="text-primary"            // Accent text

// Borders
className="border-border"     // Standard border
```

### For Charts (Recharts)

```tsx
import { useChartColors } from "@/hooks/use-chart-colors";

const colors = useChartColors();
// colors.primary, colors.success, colors.warning, etc.
```

### Theme Switching

```tsx
import { useTheme } from "@/hooks/use-theme";

const { theme, setTheme, resolvedTheme } = useTheme();
setTheme("light");  // or "dark" or "system"
```

## 🎯 Key Features

- **No Pure White**: Light theme uses soft blue-gray (`220 16% 93%`)
- **HSL Colors**: All colors in HSL format for consistency
- **Semantic Tokens**: Never hardcode colors, always use CSS variables
- **FOUC Prevention**: Theme loads before React to prevent flash
- **System Sync**: Automatically follows OS theme preference
- **LocalStorage Persistence**: Theme choice saved across sessions

## 📖 Full Documentation

See `DESIGN_SYSTEM_EXPORT.md` for:
- Complete color system reference
- Typography scale
- Component patterns
- Layout guidelines
- Responsive patterns
- Advanced features

## 🔗 shadcn/ui Components

This design system works perfectly with shadcn/ui. Install components as needed:

```bash
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add badge
# etc.
```

All shadcn components will automatically use your theme tokens.

## 🐛 Troubleshooting

**Theme not applying?**
- Check that theme script is in `index.html` before `</head>`
- Verify ThemeProvider wraps your app
- Check browser console for errors

**Colors not changing?**
- Make sure you're using semantic tokens (e.g., `bg-card` not `bg-gray-100`)
- For charts, ensure you're using `useChartColors()` hook

**Flash of wrong theme on load?**
- Theme script must be inline in `index.html` (not imported)
- Script must run before React mounts

## 📦 Package.json Dependencies

Add these to your `package.json`:

```json
{
  "dependencies": {
    "next-themes": "^0.3.0",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "tailwind-merge": "^2.6.0"
  },
  "devDependencies": {
    "tailwindcss-animate": "^1.0.7"
  }
}
```

## 🎓 Learn More

- Original project: Solar Dashboard
- shadcn/ui: https://ui.shadcn.com/
- Tailwind CSS: https://tailwindcss.com/

---

**Version**: 1.0.0  
**Last Updated**: 2026-03-09  
**License**: Copy freely to your projects
