"use client";

import React, { createContext, useContext, useMemo } from "react";
import { motion } from "framer-motion";

// --- Types & Context ---
interface CoordinateContextType {
  width: number;
  height: number;
  xDomain: [number, number]; // [min, max] logic math
  yDomain: [number, number]; // [min, max] logic math
  padding: { top: number; right: number; bottom: number; left: number };
  xScale: (x: number) => number;
  yScale: (y: number) => number;
}

const CoordinateContext = createContext<CoordinateContextType | null>(null);

export const useCoordinateSystem = () => {
  const context = useContext(CoordinateContext);
  if (!context) {
    throw new Error("Component must be used within NeonCoordinateSystem");
  }
  return context;
};

interface NeonCoordinateSystemProps {
  width?: number;
  height?: number;
  xDomain?: [number, number];
  yDomain?: [number, number];
  padding?: { top: number; right: number; bottom: number; left: number };
  xAxisLabel?: string;
  yAxisLabel?: string;
  showGrid?: boolean;
  children: React.ReactNode;
}

// --- NeonCoordinateSystem ---
export const SemanticCoordinateSystem: React.FC<NeonCoordinateSystemProps> = ({
  width = 600,
  height = 400,
  xDomain = [0, 10],
  yDomain = [0, 100],
  padding = { top: 40, right: 40, bottom: 40, left: 60 },
  xAxisLabel = "Thời gian (x)",
  yAxisLabel = "Giá trị (y)",
  showGrid = true,
  children,
}) => {
  const innerWidth = width - padding.left - padding.right;
  const innerHeight = height - padding.top - padding.bottom;

  // Linear scaling functions
  const xScale = useMemo(
    () => (x: number) =>
      padding.left +
      ((x - xDomain[0]) / (xDomain[1] - xDomain[0])) * innerWidth,
    [xDomain, innerWidth, padding.left]
  );

  const yScale = useMemo(
    () => (y: number) =>
      padding.top +
      innerHeight -
      ((y - yDomain[0]) / (yDomain[1] - yDomain[0])) * innerHeight,
    [yDomain, innerHeight, padding.top]
  );

  const contextValue: CoordinateContextType = useMemo(
    () => ({ width, height, xDomain, yDomain, padding, xScale, yScale }),
    [width, height, xDomain, yDomain, padding, xScale, yScale]
  );

  // Generate grid ticks
  const xTicks = useMemo(() => {
    const ticks = [];
    const step = (xDomain[1] - xDomain[0]) / 5;
    for (let i = 0; i <= 5; i++) ticks.push(xDomain[0] + i * step);
    return ticks;
  }, [xDomain]);

  const yTicks = useMemo(() => {
    const ticks = [];
    const step = (yDomain[1] - yDomain[0]) / 5;
    for (let i = 0; i <= 5; i++) ticks.push(yDomain[0] + i * step);
    return ticks;
  }, [yDomain]);

  return (
    <CoordinateContext.Provider value={contextValue}>
      <div
        className="relative bg-white rounded-[32px] overflow-hidden shadow-2xl shadow-slate-200/50 border border-slate-100 w-full h-full min-h-[300px]"
      >
        <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMidYMid meet" className="absolute inset-0 w-full h-full">
          <defs>
            <linearGradient id="grid-fade" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor="rgba(148, 163, 184, 0.2)" />
              <stop offset="100%" stopColor="rgba(148, 163, 184, 0)" />
            </linearGradient>
            <filter id="soft-shadow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="rgba(0,0,0,0.1)" />
            </filter>
          </defs>

          {/* Grid */}
          {showGrid && (
            <g className="grid-lines">
              {xTicks.map((tick, i) => (
                <line
                  key={`gx-${i}`}
                  x1={xScale(tick)}
                  y1={padding.top}
                  x2={xScale(tick)}
                  y2={height - padding.bottom}
                  stroke="url(#grid-fade)"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
              ))}
              {yTicks.map((tick, i) => (
                <line
                  key={`gy-${i}`}
                  x1={padding.left}
                  y1={yScale(tick)}
                  x2={width - padding.right}
                  y2={yScale(tick)}
                  stroke="rgba(148, 163, 184, 0.15)"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                />
              ))}
            </g>
          )}

          {/* Axes */}
          <line
            x1={padding.left}
            y1={yScale(yDomain[0])}
            x2={width - padding.right}
            y2={yScale(yDomain[0])}
            stroke="#94a3b8"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <line
            x1={xScale(xDomain[0])}
            y1={padding.top}
            x2={xScale(xDomain[0])}
            y2={height - padding.bottom}
            stroke="#94a3b8"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* User plotted elements */}
          {children}

          {/* Tick Labels */}
          {xTicks.map((tick, i) => (
            <text
              key={`tx-${i}`}
              x={xScale(tick)}
              y={height - padding.bottom + 22}
              fill="#64748b"
              fontSize="12"
              fontWeight="600"
              textAnchor="middle"
              className="font-sans"
            >
              {tick.toFixed(0)}
            </text>
          ))}
          {yTicks.map((tick, i) => (
            <text
              key={`ty-${i}`}
              x={padding.left - 12}
              y={yScale(tick)}
              fill="#64748b"
              fontSize="12"
              fontWeight="600"
              textAnchor="end"
              alignmentBaseline="middle"
              className="font-sans"
            >
              {tick.toFixed(0)}
            </text>
          ))}

          {/* Axis Labels */}
          <text
            x={width - padding.right + 10}
            y={yScale(yDomain[0]) + 5}
            fill="#334155"
            fontSize="14"
            fontWeight="bold"
            className="font-sans"
          >
            {xAxisLabel}
          </text>
          <text
            x={xScale(xDomain[0])}
            y={padding.top - 20}
            fill="#334155"
            fontSize="14"
            fontWeight="bold"
            textAnchor="middle"
            className="font-sans"
          >
            {yAxisLabel}
          </text>
        </svg>
      </div>
    </CoordinateContext.Provider>
  );
};

// --- MorphingCurve ---
interface MorphingCurveProps {
  fn: (x: number) => number;
  color?: string;
  strokeWidth?: number;
  samples?: number;
  showArea?: boolean;
}

export const MorphingCurve: React.FC<MorphingCurveProps> = ({
  fn,
  color = "#2dd4bf", // Teal/Cyan default
  strokeWidth = 3,
  samples = 100,
  showArea = false,
}) => {
  const { xScale, yScale, xDomain, yDomain } = useCoordinateSystem();

  // Generate SVG path 'd' string
  const pathData = useMemo(() => {
    const step = (xDomain[1] - xDomain[0]) / samples;
    let d = "";
    for (let i = 0; i <= samples; i++) {
      const mathX = xDomain[0] + i * step;
      const mathY = fn(mathX);

      // Clamp y conceptually if needed, though SVG clipping handles overflow
      const px = xScale(mathX);
      const py = yScale(mathY);

      if (i === 0) {
        d += `M ${px} ${py} `;
      } else {
        d += `L ${px} ${py} `;
      }
    }
    return d;
  }, [fn, xDomain, samples, xScale, yScale]);

  const areaData = useMemo(() => {
    if (!showArea) return "";
    const baseX = xScale(xDomain[0]);
    const baseY = yScale(yDomain[0]);
    const endX = xScale(xDomain[1]);
    return `${pathData} L ${endX} ${baseY} L ${baseX} ${baseY} Z`;
  }, [pathData, showArea, xScale, yDomain, xDomain, yScale]);

  return (
    <g>
      {showArea && (
        <motion.path
          d={areaData}
          fill={color}
          fillOpacity={0.1}
          animate={{ d: areaData }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
        />
      )}
      <motion.path
        d={pathData}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#soft-shadow)"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ d: pathData, pathLength: 1, opacity: 1 }}
        transition={{ 
          d: { type: "spring", stiffness: 120, damping: 20 },
          pathLength: { duration: 1.5, ease: "easeInOut" }
        }}
      />
    </g>
  );
};

// --- DraggableAxis ---
export const DraggableAxis: React.FC<{ axis?: 'x'|'y', onScaleChange?: (scale: number) => void }> = ({ axis = 'y', onScaleChange }) => {
  return (
    <g className="cursor-ns-resize group">
      <rect x="0" y="0" width="20" height="100%" fill="transparent" />
      {/* Visual cue for Draggable */}
      <circle cx="20" cy="50%" r="4" fill="#94a3b8" className="group-hover:fill-blue-500 transition-colors" />
    </g>
  );
};

// --- TrackingLens ---
export const TrackingLens: React.FC<{ fn: (x: number) => number }> = ({ fn }) => {
  const { xScale, yScale, width, height, padding } = useCoordinateSystem();
  const [mouseX, setMouseX] = React.useState<number | null>(null);

  return (
    <g 
      onMouseMove={(e) => {
        const svg = (e.currentTarget as any).farthestViewportElement || (e.currentTarget as any).ownerSVGElement;
        if(svg) {
          const pt = svg.createSVGPoint();
          pt.x = e.clientX;
          pt.y = e.clientY;
          const rootPoint = pt.matrixTransform(svg.getScreenCTM()?.inverse());
          setMouseX(rootPoint.x);
        }
      }}
      onMouseLeave={() => setMouseX(null)}
    >
      <rect x="0" y="0" width="100%" height="100%" fill="transparent" />
      {mouseX !== null && mouseX >= padding.left && mouseX <= width - padding.right && (
        <g>
          {/* Implement crosshairs based on mouse x mapping */}
          <line x1={mouseX} y1={padding.top} x2={mouseX} y2={height - padding.bottom} stroke="#ef4444" strokeDasharray="4 2" />
        </g>
      )}
    </g>
  );
};
