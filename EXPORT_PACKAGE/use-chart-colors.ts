import { useTheme } from "./use-theme";

/** Returns resolved HSL color strings for Recharts inline styles */
export function useChartColors() {
  const { resolvedTheme } = useTheme();
  const dark = resolvedTheme === "dark";

  return {
    bg: dark ? "hsl(220, 25%, 10%)" : "hsl(220, 16%, 96%)",
    border: dark ? "hsl(220, 15%, 18%)" : "hsl(220, 13%, 82%)",
    text: dark ? "hsl(215, 15%, 55%)" : "hsl(220, 10%, 40%)",
    fg: dark ? "hsl(210, 40%, 93%)" : "hsl(220, 20%, 14%)",
    primary: dark ? "hsl(210, 100%, 56%)" : "hsl(210, 100%, 45%)",
    success: dark ? "hsl(142, 50%, 45%)" : "hsl(142, 50%, 38%)",
    warning: dark ? "hsl(38, 92%, 50%)" : "hsl(38, 92%, 45%)",
    destructive: dark ? "hsl(0, 62%, 50%)" : "hsl(0, 62%, 50%)",
  };
}

export function useTooltipStyle() {
  const cc = useChartColors();
  return {
    contentStyle: {
      backgroundColor: cc.bg,
      border: `1px solid ${cc.border}`,
      borderRadius: "8px",
      fontSize: "12px",
      color: cc.fg,
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
    },
    itemStyle: { color: cc.fg },
    labelStyle: { color: cc.fg },
  };
}
