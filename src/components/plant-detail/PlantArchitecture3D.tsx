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

interface PlantArchitectureProps {
  plant: Plant;
}

// ─── Visual Styling Per Equipment Type ───────────────────────────────────────

const STATUS_COLORS: Record<string, string> = {
  online: "hsl(142, 50%, 45%)",   // --success
  warning: "hsl(38, 92%, 50%)",   // --warning
  offline: "hsl(0, 62%, 50%)",    // --destructive
};

// Each equipment type has distinct size, color, and visual style
const EQUIPMENT_STYLES: Record<EquipmentType, {
  width: number;
  height: number; 
  primaryColor: string;
  secondaryColor: string;
  icon: string;
  shape: "rect" | "circle" | "diamond" | "hexagon";
}> = {
  "solar-array": { 
    width: 140, height: 90, 
    primaryColor: "hsl(210, 100%, 56%)", secondaryColor: "hsl(210, 100%, 75%)",
    icon: "panels", shape: "rect" 
  },
  "combiner": { 
    width: 80, height: 60, 
    primaryColor: "hsl(270, 60%, 55%)", secondaryColor: "hsl(270, 60%, 70%)",
    icon: "box", shape: "rect" 
  },
  "inverter": { 
    width: 120, height: 70, 
    primaryColor: "hsl(38, 92%, 50%)", secondaryColor: "hsl(38, 92%, 65%)",
    icon: "converter", shape: "rect" 
  },
  "junction": { 
    width: 80, height: 80, 
    primaryColor: "hsl(210, 100%, 56%)", secondaryColor: "hsl(210, 100%, 75%)",
    icon: "hub", shape: "circle" 
  },
  "battery": { 
    width: 110, height: 80, 
    primaryColor: "hsl(142, 50%, 45%)", secondaryColor: "hsl(142, 50%, 60%)",
    icon: "battery", shape: "rect" 
  },
  "transformer": { 
    width: 100, height: 70, 
    primaryColor: "hsl(270, 60%, 55%)", secondaryColor: "hsl(270, 60%, 70%)",
    icon: "transformer", shape: "rect" 
  },
  "grid": { 
    width: 100, height: 80, 
    primaryColor: "hsl(270, 60%, 55%)", secondaryColor: "hsl(270, 60%, 70%)",
    icon: "grid", shape: "rect" 
  },
  "load": { 
    width: 100, height: 70, 
    primaryColor: "hsl(142, 50%, 45%)", secondaryColor: "hsl(142, 50%, 60%)",
    icon: "building", shape: "rect" 
  },
};

const GRID_LABEL: Record<GridConnection, { text: string; color: string }> = {
  "on-grid": { text: "ON-GRID", color: "hsl(142, 50%, 45%)" },
  "off-grid": { text: "OFF-GRID", color: "hsl(38, 92%, 50%)" },
  hybrid: { text: "HYBRID", color: "hsl(270, 60%, 55%)" },
};

// ─── Node dimensions ────────────────────────────────────────────────────────

const NODE_W = 100;
const NODE_H = 56;

// ─── SVG Icon renderers (tiny inline icons per type) ─────────────────────────

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

function EdgeLine({ edge, idx }: { edge: LayoutEdge; idx: number }) {
  const fromX = edge.from.x + NODE_W / 2;
  const fromY = edge.from.y + NODE_H / 2;
  const toX = edge.to.x + NODE_W / 2;
  const toY = edge.to.y + NODE_H / 2;

  // Clip to node edges
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
  const color = isActive ? TYPE_COLORS[edge.to.type] : "hsl(220, 15%, 25%)";

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
            fill="hsl(220, 25%, 10%)" fillOpacity="0.9" stroke={color} strokeWidth="0.5" />
          <text x={midX} y={midY + 2} textAnchor="middle" fill={color} fontSize="8" fontWeight="600">
            {edge.powerKW} kW
          </text>
        </g>
      )}
      {edge.label && (
        <text x={midX} y={midY + 16} textAnchor="middle" fill="hsl(215, 15%, 55%)" fontSize="7">
          {edge.label}
        </text>
      )}
    </g>
  );
}

// ─── Node renderer ───────────────────────────────────────────────────────────

function NodeBox({ node }: { node: LayoutNode }) {
  const statusColor = STATUS_COLORS[node.status];
  const typeColor = TYPE_COLORS[node.type];
  const isFault = node.status === "offline";

  return (
    <g>
      {/* Card background */}
      <rect
        x={node.x} y={node.y} width={NODE_W} height={NODE_H} rx="6"
        fill="hsl(220, 25%, 10%)" stroke={statusColor} strokeWidth={isFault ? 2 : 1.2}
      />
      {/* Status bar */}
      <rect
        x={node.x} y={node.y} width={NODE_W} height={14} rx="3"
        fill={statusColor} fillOpacity="0.2"
      />
      {/* Label */}
      <text x={node.x + NODE_W / 2} y={node.y + 10} textAnchor="middle" fill={statusColor} fontSize="8" fontWeight="600">
        {node.label}
      </text>
      {/* Icon */}
      {renderNodeIcon(node.type, node.x + 20, node.y + 34, typeColor)}
      {/* Output value */}
      {node.output !== undefined && (
        <text x={node.x + 58} y={node.y + 32} textAnchor="middle" fill="hsl(210, 40%, 93%)" fontSize="9" fontWeight="bold">
          {node.output === 0 ? "OFF" : `${Math.abs(node.output)} kW`}
        </text>
      )}
      {/* Detail */}
      {node.detail && (
        <text x={node.x + NODE_W / 2} y={node.y + 48} textAnchor="middle" fill="hsl(215, 15%, 55%)" fontSize="7">
          {node.detail}
        </text>
      )}
      {/* Fault indicator */}
      {isFault && (
        <circle cx={node.x + NODE_W - 8} cy={node.y + 8} r="4" fill="hsl(0, 62%, 50%)">
          <animate attributeName="opacity" values="1;0.3;1" dur="1s" repeatCount="indefinite" />
        </circle>
      )}
    </g>
  );
}

// ─── Main component ──────────────────────────────────────────────────────────

export function PlantArchitecture3D({ plant }: PlantArchitectureProps) {
  const topology = plantTopologies[plant.id];

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

  const gridInfo = GRID_LABEL[topology.gridConnection];

  // Compute viewBox from layout
  const maxX = Math.max(...layout.nodes.map(n => n.x)) + NODE_W + 40;
  const maxY = Math.max(...layout.nodes.map(n => n.y)) + NODE_H + 60;
  const viewW = Math.max(780, maxX);
  const viewH = Math.max(360, maxY);

  // Summary stats
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
            style={{ color: gridInfo.color, background: `${gridInfo.color}20`, border: `1px solid ${gridInfo.color}40` }}
          >
            {gridInfo.text}
          </span>
          <div className="flex gap-3 text-xs">
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full inline-block" style={{ background: STATUS_COLORS.online }} /> Online</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full inline-block" style={{ background: STATUS_COLORS.warning }} /> Warning</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full inline-block" style={{ background: STATUS_COLORS.offline }} /> Offline</span>
          </div>
        </div>
      </div>

      {/* Schematic SVG */}
      <div className="overflow-x-auto">
        <svg
          viewBox={`0 0 ${viewW} ${viewH}`}
          className="w-full"
          style={{ minWidth: 600, maxHeight: 500 }}
        >
          {/* Edges first (behind nodes) */}
          {layout.edges.map((edge, i) => (
            <EdgeLine key={`edge-${i}`} edge={edge} idx={i} />
          ))}
          {/* Nodes */}
          {layout.nodes.map(node => (
            <NodeBox key={node.id} node={node} />
          ))}
        </svg>
      </div>

      {/* Summary bar */}
      <div className="p-3 border-t border-border flex flex-wrap gap-4 text-xs">
        <span className="text-muted-foreground font-semibold">POWER SUMMARY:</span>
        <span style={{ color: "hsl(210, 100%, 56%)" }} className="font-bold">Generation: {totalGen} kW</span>
        {totalLoad > 0 && (
          <span style={{ color: "hsl(142, 50%, 45%)" }} className="font-bold">
            Load: {totalLoad} kW ({totalGen > 0 ? ((totalLoad / totalGen) * 100).toFixed(0) : 0}%)
          </span>
        )}
        {topology.gridConnection !== "off-grid" && totalGen - totalLoad > 0 && (
          <span style={{ color: "hsl(270, 60%, 55%)" }} className="font-bold">
            Grid Export: {totalGen - totalLoad} kW
          </span>
        )}
        {batteryNode && (
          <span style={{ color: "hsl(38, 92%, 50%)" }} className="font-bold">
            Battery: {batteryNode.detail ?? `${batteryNode.output} kW`}
          </span>
        )}
      </div>
    </Card>
  );
}
