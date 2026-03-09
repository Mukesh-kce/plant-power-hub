import { Plant } from "@/data/mock-data";
import { Card } from "@/components/ui/card";
import { useMemo } from "react";
import {
  plantTopologies,
  computeLayout,
  LayoutNode,
  LayoutEdge,
  EquipmentType,
  GridConnection,
} from "@/data/topology";
import { useChartColors } from "@/hooks/use-chart-colors";

interface PlantArchitectureProps {
  plant: Plant;
}

// ─── Node dimensions ────────────────────────────────────────────────────────
const NODE_W = 100;
const NODE_H = 56;

// ─── SVG Icon renderers ───────────────────────────────────────────────────────
function renderNodeIcon(type: EquipmentType, cx: number, cy: number, color: string) {
  switch (type) {
    case "solar-array":
      return (
        <g>
          <rect x={cx - 10} y={cy - 6} width={20} height={12} rx="1" fill="none" stroke={color} strokeWidth="1.2" />
          <line x1={cx - 3} y1={cy - 6} x2={cx - 3} y2={cy + 6} stroke={color} strokeWidth="0.6" opacity="0.6" />
          <line x1={cx + 3} y1={cy - 6} x2={cx + 3} y2={cy + 6} stroke={color} strokeWidth="0.6" opacity="0.6" />
          <line x1={cx - 10} y1={cy} x2={cx + 10} y2={cy} stroke={color} strokeWidth="0.6" opacity="0.6" />
        </g>
      );
    case "combiner":
      return <rect x={cx - 6} y={cy - 6} width={12} height={12} rx="2" fill="none" stroke={color} strokeWidth="1.2" />;
    case "inverter":
      return (
        <g>
          <rect x={cx - 8} y={cy - 7} width={16} height={14} rx="2" fill="none" stroke={color} strokeWidth="1.2" />
          <text x={cx} y={cy + 3} textAnchor="middle" fill={color} fontSize="7" fontWeight="bold">~</text>
        </g>
      );
    case "junction":
      return <circle cx={cx} cy={cy} r="6" fill="none" stroke={color} strokeWidth="1.5" />;
    case "battery":
      return (
        <g>
          <rect x={cx - 8} y={cy - 5} width={16} height={10} rx="2" fill="none" stroke={color} strokeWidth="1.2" />
          <rect x={cx + 8} y={cy - 2} width={3} height={4} rx="1" fill={color} opacity="0.6" />
          <line x1={cx - 4} y1={cy} x2={cx + 4} y2={cy} stroke={color} strokeWidth="1" />
        </g>
      );
    case "transformer":
      return (
        <g>
          <circle cx={cx - 4} cy={cy} r="5" fill="none" stroke={color} strokeWidth="1" />
          <circle cx={cx + 4} cy={cy} r="5" fill="none" stroke={color} strokeWidth="1" />
        </g>
      );
    case "grid":
      return (
        <g>
          <line x1={cx} y1={cy - 8} x2={cx} y2={cy + 8} stroke={color} strokeWidth="1.5" />
          <line x1={cx - 8} y1={cy - 3} x2={cx + 8} y2={cy - 3} stroke={color} strokeWidth="1.2" />
          <line x1={cx - 6} y1={cy + 3} x2={cx + 6} y2={cy + 3} stroke={color} strokeWidth="1.2" />
        </g>
      );
    case "load":
      return (
        <g>
          <rect x={cx - 8} y={cy - 6} width={16} height={12} rx="2" fill="none" stroke={color} strokeWidth="1.2" />
          <line x1={cx - 8} y1={cy - 1} x2={cx + 8} y2={cy - 1} stroke={color} strokeWidth="0.6" />
          <line x1={cx - 8} y1={cy + 3} x2={cx + 8} y2={cy + 3} stroke={color} strokeWidth="0.6" />
        </g>
      );
  }
}

// ─── Edge renderer ───────────────────────────────────────────────────────────
function EdgeLine({ edge, idx, colors }: { edge: LayoutEdge; idx: number; colors: ReturnType<typeof useChartColors> & { nodeBg: string; inactiveLine: string; typeColor: (type: EquipmentType) => string } }) {
  const fromX = edge.from.x + NODE_W / 2;
  const fromY = edge.from.y + NODE_H / 2;
  const toX = edge.to.x + NODE_W / 2;
  const toY = edge.to.y + NODE_H / 2;

  const dx = toX - fromX;
  const dy = toY - fromY;
  const dist = Math.sqrt(dx * dx + dy * dy);
  if (dist === 0) return null;

  const ux = dx / dist;
  const uy = dy / dist;
  const sx = fromX + ux * (NODE_W / 2 + 4);
  const sy = fromY + uy * (NODE_H / 2 + 4);
  const ex = toX - ux * (NODE_W / 2 + 4);
  const ey = toY - uy * (NODE_H / 2 + 4);

  const isActive = edge.from.status !== "offline" && edge.to.status !== "offline" && (edge.powerKW ?? 0) > 0;
  const color = isActive ? colors.typeColor(edge.to.type) : colors.inactiveLine;

  const midX = (sx + ex) / 2;
  const midY = (sy + ey) / 2;
  const markerId = `arrow-${idx}`;

  return (
    <g>
      <defs>
        <marker id={markerId} markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M0,0 L0,6 L6,3 z" fill={color} />
        </marker>
      </defs>
      <line
        x1={sx} y1={sy} x2={ex} y2={ey}
        stroke={color} strokeWidth="1.5" strokeDasharray="6,4"
        opacity={isActive ? 0.8 : 0.3}
        markerEnd={`url(#${markerId})`}
      >
        {isActive && (
          <animate attributeName="stroke-dashoffset" values="0;-20" dur="1.2s" repeatCount="indefinite" />
        )}
      </line>
      {edge.bidirectional && (
        <line
          x1={ex} y1={ey} x2={sx} y2={sy}
          stroke={color} strokeWidth="1" strokeDasharray="4,6"
          opacity={0.3}
        />
      )}
      {edge.powerKW !== undefined && edge.powerKW > 0 && (
        <g>
          <rect x={midX - 22} y={midY - 8} width={44} height={14} rx="3"
            fill={colors.nodeBg} fillOpacity="0.95" stroke={color} strokeWidth="0.5" />
          <text x={midX} y={midY + 2} textAnchor="middle" fill={color} fontSize="8" fontWeight="600">
            {edge.powerKW} kW
          </text>
        </g>
      )}
      {edge.label && (
        <text x={midX} y={midY + 16} textAnchor="middle" fill={colors.text} fontSize="7">
          {edge.label}
        </text>
      )}
    </g>
  );
}

// ─── Node renderer ───────────────────────────────────────────────────────────
function NodeBox({ node, colors }: { node: LayoutNode; colors: ReturnType<typeof useChartColors> & { nodeBg: string; statusColor: (s: string) => string; typeColor: (t: EquipmentType) => string } }) {
  const statusColor = colors.statusColor(node.status);
  const typeColor = colors.typeColor(node.type);
  const isFault = node.status === "offline";

  return (
    <g>
      <rect
        x={node.x} y={node.y} width={NODE_W} height={NODE_H} rx="6"
        fill={colors.nodeBg} stroke={statusColor} strokeWidth={isFault ? 2 : 1.2}
      />
      <rect
        x={node.x} y={node.y} width={NODE_W} height={14} rx="3"
        fill={statusColor} fillOpacity="0.15"
      />
      <text x={node.x + NODE_W / 2} y={node.y + 10} textAnchor="middle" fill={statusColor} fontSize="8" fontWeight="600">
        {node.label}
      </text>
      {renderNodeIcon(node.type, node.x + 20, node.y + 34, typeColor)}
      {node.output !== undefined && (
        <text x={node.x + 58} y={node.y + 32} textAnchor="middle" fill={colors.fg} fontSize="9" fontWeight="bold">
          {node.output === 0 ? "OFF" : `${Math.abs(node.output)} kW`}
        </text>
      )}
      {node.detail && (
        <text x={node.x + NODE_W / 2} y={node.y + 48} textAnchor="middle" fill={colors.text} fontSize="7">
          {node.detail}
        </text>
      )}
      {isFault && (
        <circle cx={node.x + NODE_W - 8} cy={node.y + 8} r="4" fill={colors.destructive}>
          <animate attributeName="opacity" values="1;0.3;1" dur="1s" repeatCount="indefinite" />
        </circle>
      )}
    </g>
  );
}

// ─── Main component ──────────────────────────────────────────────────────────
export function PlantArchitecture3D({ plant }: PlantArchitectureProps) {
  const topology = plantTopologies[plant.id];
  const cc = useChartColors();

  // Theme-aware derived colors
  const isDark = cc.bg.includes("10%") || cc.bg.includes("7%");

  const nodeBg = cc.bg;
  const inactiveLine = cc.border;

  const statusColor = (s: string) => {
    if (s === "online") return cc.success;
    if (s === "warning") return cc.warning;
    return cc.destructive;
  };

  const typeColor = (t: EquipmentType) => {
    if (t === "battery") return cc.warning;
    if (t === "transformer" || t === "grid") return "hsl(270, 60%, 55%)";
    if (t === "load") return cc.success;
    return cc.primary;
  };

  const gridLabelColor = (gc: GridConnection) => {
    if (gc === "on-grid") return cc.success;
    if (gc === "off-grid") return cc.warning;
    return "hsl(270, 60%, 55%)";
  };

  const colors = { ...cc, nodeBg, inactiveLine, statusColor, typeColor };

  const layout = useMemo(() => {
    if (!topology) return null;
    return computeLayout(topology);
  }, [topology]);

  if (!topology || !layout) {
    return (
      <Card className="w-full bg-card border-border p-8 text-center">
        <p className="text-muted-foreground">No topology data available for this plant.</p>
      </Card>
    );
  }

  const gridColor = gridLabelColor(topology.gridConnection);
  const gridText = topology.gridConnection === "on-grid" ? "ON-GRID" : topology.gridConnection === "off-grid" ? "OFF-GRID" : "HYBRID";

  const maxX = Math.max(...layout.nodes.map(n => n.x)) + NODE_W + 40;
  const maxY = Math.max(...layout.nodes.map(n => n.y)) + NODE_H + 60;
  const viewW = Math.max(780, maxX);
  const viewH = Math.max(360, maxY);

  const totalGen = layout.nodes
    .filter(n => n.type === "inverter" && n.status !== "offline")
    .reduce((s, n) => s + (n.output ?? 0), 0);
  const totalLoad = layout.nodes
    .filter(n => n.type === "load")
    .reduce((s, n) => s + (n.output ?? 0), 0);
  const batteryNode = layout.nodes.find(n => n.type === "battery");

  return (
    <Card className="w-full bg-card border-border overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-border flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Plant Architecture — Live View</h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            {plant.name} • {plant.capacity.toLocaleString()} kWp • Electricity flow schematic
          </p>
        </div>
        <div className="flex items-center gap-4">
          <span
            className="text-xs font-bold px-2 py-1 rounded"
            style={{ color: gridColor, background: `${gridColor}20`, border: `1px solid ${gridColor}40` }}
          >
            {gridText}
          </span>
          <div className="flex gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ background: cc.success }} /> Online
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ background: cc.warning }} /> Warning
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ background: cc.destructive }} /> Offline
            </span>
          </div>
        </div>
      </div>

      {/* Schematic SVG */}
      <div className="overflow-x-auto" style={{ background: cc.bg }}>
        <svg
          viewBox={`0 0 ${viewW} ${viewH}`}
          className="w-full"
          style={{ minWidth: 600, maxHeight: 500 }}
        >
          {layout.edges.map((edge, i) => (
            <EdgeLine key={`edge-${i}`} edge={edge} idx={i} colors={colors} />
          ))}
          {layout.nodes.map(node => (
            <NodeBox key={node.id} node={node} colors={colors} />
          ))}
        </svg>
      </div>

      {/* Summary bar */}
      <div className="p-3 border-t border-border flex flex-wrap gap-4 text-xs">
        <span className="text-muted-foreground font-semibold">POWER SUMMARY:</span>
        <span style={{ color: cc.primary }} className="font-bold">Generation: {totalGen} kW</span>
        {totalLoad > 0 && (
          <span style={{ color: cc.success }} className="font-bold">
            Load: {totalLoad} kW ({totalGen > 0 ? ((totalLoad / totalGen) * 100).toFixed(0) : 0}%)
          </span>
        )}
        {topology.gridConnection !== "off-grid" && totalGen - totalLoad > 0 && (
          <span style={{ color: "hsl(270, 60%, 55%)" }} className="font-bold">
            Grid Export: {totalGen - totalLoad} kW
          </span>
        )}
        {batteryNode && (
          <span style={{ color: cc.warning }} className="font-bold">
            Battery: {batteryNode.detail ?? `${batteryNode.output} kW`}
          </span>
        )}
      </div>
    </Card>
  );
}
