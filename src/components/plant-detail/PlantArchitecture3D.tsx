import { Plant, inverters, alerts } from "@/data/mock-data";
import { Card } from "@/components/ui/card";
import { useMemo } from "react";

interface PlantArchitectureProps {
  plant: Plant;
}

const STATUS_COLOR: Record<string, string> = {
  online: "#10b981",
  warning: "#f59e0b",
  offline: "#ef4444",
};

export function PlantArchitecture3D({ plant }: PlantArchitectureProps) {
  const faultIds = useMemo(() => new Set(alerts.map(a => {
    const match = a.message.match(/INV-\d+/);
    return match ? match[0] : null;
  }).filter(Boolean)), []);

  const panelRows = 3;
  const panelsPerRow = 4;
  const panelW = 48;
  const panelH = 30;
  const panelGapX = 12;
  const panelGapY = 14;
  const panelStartX = 30;
  const panelStartY = 50;

  const combinerX = 280;
  const combinerYs = [90, 180, 270];

  const invStartX = 420;
  const invYs = inverters.slice(0, 4).map((_, i) => 70 + i * 72);

  // Power distribution - spread out horizontally
  const junctionX = 560;
  const junctionY = 180;
  
  const loadX = 660;
  const loadY = 60;
  
  const gridX = 660;
  const gridY = 280;

  // Calculate power distribution
  const totalGeneration = inverters.slice(0, 4).reduce((sum, inv) => sum + inv.output, 0);
  const loadConsumption = 680; // kW consumed by facility
  const gridExport = Math.max(0, totalGeneration - loadConsumption);

  return (
    <Card className="w-full bg-card border-border overflow-hidden">
      <div className="p-4 border-b border-border flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Plant Architecture — Live View</h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Electricity flow • Faults highlighted in red
          </p>
        </div>
        <div className="flex gap-4 text-xs">
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full inline-block" style={{background:"#10b981"}}></span> Online</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full inline-block" style={{background:"#f59e0b"}}></span> Warning</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full inline-block" style={{background:"#ef4444"}}></span> Offline/Fault</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <svg
          viewBox="0 0 850 440"
          className="w-full"
          style={{ minWidth: 700, maxHeight: 500, background: "transparent" }}
        >
          <defs>
            {/* Animated electricity flow */}
            <marker id="arrowBlue" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
              <path d="M0,0 L0,6 L6,3 z" fill="#00D4FF" />
            </marker>
            <marker id="arrowGray" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
              <path d="M0,0 L0,6 L6,3 z" fill="#374151" />
            </marker>
            <marker id="arrowGreen" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
              <path d="M0,0 L0,6 L6,3 z" fill="#10b981" />
            </marker>
            <marker id="arrowPurple" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
              <path d="M0,0 L0,6 L6,3 z" fill="#9333ea" />
            </marker>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {/* ── SECTION LABELS ── */}
          {[
            { x: panelStartX + (panelsPerRow * (panelW + panelGapX)) / 2 - 20, y: 28, label: "SOLAR PANELS" },
            { x: combinerX + 22, y: 28, label: "COMBINER" },
            { x: invStartX + 30, y: 28, label: "INVERTERS" },
            { x: loadX + 44, y: 48, label: "FACILITY LOAD" },
            { x: gridX + 44, y: 270, label: "UTILITY GRID" },
          ].map(({ x, y, label }) => (
            <text key={label} x={x} y={y} textAnchor="middle" fill="#6b7280" fontSize="9" fontWeight="600" letterSpacing="1">
              {label}
            </text>
          ))}

          {/* ── SOLAR PANEL GRID ── */}
          {Array.from({ length: panelRows }).map((_, row) =>
            Array.from({ length: panelsPerRow }).map((_, col) => {
              const x = panelStartX + col * (panelW + panelGapX);
              const y = panelStartY + row * (panelH + panelGapY);
              const fault = row === 1 && col === 1; // simulate one fault panel
              const color = fault ? "#ef4444" : "#3b82f6";
              return (
                <g key={`panel-${row}-${col}`}>
                  <rect x={x} y={y} width={panelW} height={panelH} rx="3"
                    fill={color} fillOpacity="0.25" stroke={color} strokeWidth="1.5" />
                  {/* Panel cell lines */}
                  <line x1={x + panelW / 3} y1={y} x2={x + panelW / 3} y2={y + panelH} stroke={color} strokeWidth="0.5" opacity="0.5" />
                  <line x1={x + (2 * panelW) / 3} y1={y} x2={x + (2 * panelW) / 3} y2={y + panelH} stroke={color} strokeWidth="0.5" opacity="0.5" />
                  <line x1={x} y1={y + panelH / 2} x2={x + panelW} y2={y + panelH / 2} stroke={color} strokeWidth="0.5" opacity="0.5" />
                  {fault && (
                    <text x={x + panelW / 2} y={y + panelH / 2 + 4} textAnchor="middle" fill="#ef4444" fontSize="10" fontWeight="bold">!</text>
                  )}
                </g>
              );
            })
          )}

          {/* Wires from panel rows to combiners */}
          {combinerYs.map((cy, i) => {
            const rowY = panelStartY + i * (panelH + panelGapY) + panelH / 2;
            const wireX = panelStartX + panelsPerRow * (panelW + panelGapX) - panelGapX;
            return (
              <g key={`wire-panel-comb-${i}`}>
                <line x1={wireX} y1={rowY} x2={combinerX - 5} y2={cy + 18}
                  stroke="#00D4FF" strokeWidth="1.5" strokeDasharray="6,4" opacity="0.7">
                  <animate attributeName="stroke-dashoffset" values="0;-20" dur="1.5s" repeatCount="indefinite" />
                </line>
              </g>
            );
          })}

          {/* ── COMBINER BOXES ── */}
          {combinerYs.map((cy, i) => (
            <g key={`combiner-${i}`}>
              <rect x={combinerX} y={cy} width={44} height={36} rx="5"
                fill="#1d2535" stroke="#00D4FF" strokeWidth="1.5" />
              <text x={combinerX + 22} y={cy + 14} textAnchor="middle" fill="#00D4FF" fontSize="7" fontWeight="bold">CB</text>
              <text x={combinerX + 22} y={cy + 26} textAnchor="middle" fill="#9ca3af" fontSize="7">{`S${(i * 2) + 1}-${(i * 2) + 2}`}</text>
            </g>
          ))}

          {/* Wires from combiners to inverters */}
          {combinerYs.map((cy, ci) => {
            const invPairs = [[0, 1], [2, 3], [3]];
            return (invPairs[ci] || []).map((ii) => {
              const iy = invYs[ii];
              if (iy === undefined) return null;
              return (
                <line key={`wire-comb-inv-${ci}-${ii}`}
                  x1={combinerX + 44} y1={cy + 18} x2={invStartX - 5} y2={iy + 26}
                  stroke="#00D4FF" strokeWidth="1.5" strokeDasharray="6,4" opacity="0.7"
                  markerEnd="url(#arrowBlue)">
                  <animate attributeName="stroke-dashoffset" values="0;-20" dur="1.2s" repeatCount="indefinite" />
                </line>
              );
            });
          })}

          {/* ── INVERTERS ── */}
          {inverters.slice(0, 4).map((inv, i) => {
            const iy = invYs[i];
            const color = STATUS_COLOR[inv.status];
            const hasFault = faultIds.has(inv.name);
            return (
              <g key={inv.id}>
                <rect x={invStartX} y={iy} width={80} height={52} rx="6"
                  fill="#1d2535" stroke={color} strokeWidth={hasFault ? 2.5 : 1.5}
                  filter={hasFault ? "url(#glow)" : undefined} />
                <rect x={invStartX} y={iy} width={80} height={12} rx="3"
                  fill={color} fillOpacity="0.3" />
                <text x={invStartX + 40} y={iy + 9} textAnchor="middle" fill={color} fontSize="8" fontWeight="bold">
                  {inv.name}
                </text>
                <text x={invStartX + 40} y={iy + 25} textAnchor="middle" fill="white" fontSize="10" fontWeight="semibold">
                  {inv.output > 0 ? `${inv.output} kW` : "OFFLINE"}
                </text>
                <text x={invStartX + 40} y={iy + 38} textAnchor="middle" fill="#9ca3af" fontSize="8">
                  {inv.temperature}°C
                </text>
                {inv.statusDetail && (
                  <text x={invStartX + 40} y={iy + 48} textAnchor="middle" fill={color} fontSize="7">
                    {inv.statusDetail}
                  </text>
                )}
                {hasFault && (
                  <circle cx={invStartX + 70} cy={iy + 8} r="5" fill="#ef4444">
                    <animate attributeName="opacity" values="1;0.3;1" dur="1s" repeatCount="indefinite" />
                  </circle>
                )}
              </g>
            );
          })}

          {/* Wires from inverters to junction */}
          {invYs.map((iy, i) => {
            const inv = inverters[i];
            const color = inv?.status === "online" ? "#00D4FF" : "#374151";
            const active = inv?.status === "online";
            return (
              <line key={`wire-inv-junction-${i}`}
                x1={invStartX + 80} y1={iy + 26} x2={junctionX - 8} y2={junctionY}
                stroke={color} strokeWidth="1.5" strokeDasharray="6,4" opacity="0.7"
                markerEnd={active ? "url(#arrowBlue)" : "url(#arrowGray)"}>
                {active && (
                  <animate attributeName="stroke-dashoffset" values="0;-20" dur="1s" repeatCount="indefinite" />
                )}
              </line>
            );
          })}

          {/* ── POWER JUNCTION ── */}
          <g>
            <circle cx={junctionX} cy={junctionY} r="8" fill="#1d2535" stroke="#00D4FF" strokeWidth="2" filter="url(#glow)" />
            <text x={junctionX} y={junctionY - 18} textAnchor="middle" fill="#00D4FF" fontSize="9" fontWeight="bold">
              {totalGeneration} kW
            </text>
            <text x={junctionX} y={junctionY - 28} textAnchor="middle" fill="#9ca3af" fontSize="7">
              TOTAL GEN
            </text>
          </g>

          {/* Wire from junction to facility load */}
          <line 
            x1={junctionX} y1={junctionY} x2={loadX + 44} y2={loadY + 70}
            stroke="#10b981" strokeWidth="2" strokeDasharray="6,4" opacity="0.8"
            markerEnd="url(#arrowGreen)">
            <animate attributeName="stroke-dashoffset" values="0;-20" dur="1s" repeatCount="indefinite" />
          </line>
          {/* Load power label */}
          <rect x={junctionX + 30} y={junctionY - 60} width={70} height={18} rx="4" fill="#10b981" fillOpacity="0.2" stroke="#10b981" strokeWidth="1" />
          <text x={junctionX + 65} y={junctionY - 47} textAnchor="middle" fill="#10b981" fontSize="9" fontWeight="bold">
            {loadConsumption} kW
          </text>

          {/* Wire from junction to grid */}
          <line 
            x1={junctionX} y1={junctionY} x2={gridX + 44} y2={gridY + 30}
            stroke="#9333ea" strokeWidth="2" strokeDasharray="6,4" opacity="0.8"
            markerEnd="url(#arrowPurple)">
            <animate attributeName="stroke-dashoffset" values="0;-20" dur="1.2s" repeatCount="indefinite" />
          </line>
          {/* Grid export label */}
          <rect x={junctionX + 30} y={junctionY + 40} width={70} height={18} rx="4" fill="#9333ea" fillOpacity="0.2" stroke="#9333ea" strokeWidth="1" />
          <text x={junctionX + 65} y={junctionY + 53} textAnchor="middle" fill="#a855f7" fontSize="9" fontWeight="bold">
            {gridExport} kW
          </text>

          {/* ── FACILITY LOAD ── */}
          <g>
            <rect x={loadX} y={loadY} width={88} height={70} rx="8"
              fill="#1d2535" stroke="#10b981" strokeWidth="2" filter="url(#glow)" />
            {/* Building icon */}
            <rect x={loadX + 20} y={loadY + 15} width={48} height={40} rx="3" fill="none" stroke="#10b981" strokeWidth="1.5" />
            <line x1={loadX + 20} y1={loadY + 30} x2={loadX + 68} y2={loadY + 30} stroke="#10b981" strokeWidth="1" />
            <line x1={loadX + 20} y1={loadY + 42} x2={loadX + 68} y2={loadY + 42} stroke="#10b981" strokeWidth="1" />
            <line x1={loadX + 35} y1={loadY + 15} x2={loadX + 35} y2={loadY + 55} stroke="#10b981" strokeWidth="1" />
            <line x1={loadX + 53} y1={loadY + 15} x2={loadX + 53} y2={loadY + 55} stroke="#10b981" strokeWidth="1" />
            <text x={loadX + 44} y={loadY + 84} textAnchor="middle" fill="#10b981" fontSize="10" fontWeight="bold">
              FACILITY
            </text>
            <text x={loadX + 44} y={loadY + 96} textAnchor="middle" fill="#9ca3af" fontSize="9">
              {loadConsumption} kW Load
            </text>
          </g>

          {/* ── UTILITY GRID ── */}
          <g>
            <rect x={gridX} y={gridY} width={88} height={60} rx="8"
              fill="#1d2535" stroke="#9333ea" strokeWidth="2" filter="url(#glow)" />
            {/* Power tower icon */}
            <line x1={gridX + 44} y1={gridY + 8} x2={gridX + 44} y2={gridY + 52} stroke="#9333ea" strokeWidth="2" />
            <line x1={gridX + 20} y1={gridY + 22} x2={gridX + 68} y2={gridY + 22} stroke="#9333ea" strokeWidth="2" />
            <line x1={gridX + 26} y1={gridY + 36} x2={gridX + 62} y2={gridY + 36} stroke="#9333ea" strokeWidth="2" />
            <line x1={gridX + 20} y1={gridY + 22} x2={gridX + 26} y2={gridY + 52} stroke="#9333ea" strokeWidth="1.5" />
            <line x1={gridX + 68} y1={gridY + 22} x2={gridX + 62} y2={gridY + 52} stroke="#9333ea" strokeWidth="1.5" />
            <text x={gridX + 44} y={gridY + 74} textAnchor="middle" fill="#a855f7" fontSize="10" fontWeight="bold">
              UTILITY GRID
            </text>
            <text x={gridX + 44} y={gridY + 86} textAnchor="middle" fill="#9ca3af" fontSize="9">
              {gridExport} kW Export
            </text>
          </g>

          {/* ── POWER DISTRIBUTION SUMMARY ── */}
          <g>
            <rect x={30} y={380} width={790} height={38} rx="6" fill="#1d2535" fillOpacity="0.5" stroke="#374151" strokeWidth="1" />
            <text x={50} y={398} fill="#9ca3af" fontSize="10" fontWeight="600">
              POWER DISTRIBUTION:
            </text>
            <text x={200} y={398} fill="#00D4FF" fontSize="10" fontWeight="bold">
              Total Gen: {totalGeneration} kW
            </text>
            <text x={380} y={398} fill="#10b981" fontSize="10" fontWeight="bold">
              To Load: {loadConsumption} kW ({((loadConsumption/totalGeneration)*100).toFixed(0)}%)
            </text>
            <text x={580} y={398} fill="#a855f7" fontSize="10" fontWeight="bold">
              To Grid: {gridExport} kW ({((gridExport/totalGeneration)*100).toFixed(0)}%)
            </text>
            <text x={50} y={410} fill="#6b7280" fontSize="8">
              Green = Facility consumption • Purple = Grid export
            </text>
          </g>
        </svg>
      </div>
    </Card>
  );
}
