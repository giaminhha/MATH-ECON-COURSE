"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useCallback } from "react";
import { AnimatedPath } from "./AnimatedPath";

interface Tick {
  value: number;
  label: string;
}

interface CoordinateSystemProps {
  xLabel?: string;
  yLabel?: string;
  xRange: [number, number];
  yRange: [number, number];
  /** Ticks cụ thể. Nếu không truyền, tự tính */
  xTicks?: Tick[];
  yTicks?: Tick[];
  width?: number;
  height?: number;
  padding?: { top: number; right: number; bottom: number; left: number };
  showGrid?: boolean;
  className?: string;
  children?: (ctx: CoordCtx) => React.ReactNode;
}

export interface CoordCtx {
  /** Chuyển toạ độ thế giới sang pixel */
  toPixel: (worldX: number, worldY: number) => { x: number; y: number };
  /** Inner area bounds */
  inner: { x: number; y: number; w: number; h: number };
  /** Ranges */
  xRange: [number, number];
  yRange: [number, number];
}

/**
 * CoordinateSystem — hệ trục Oxy animated với ticks, grid tuỳ chọn.
 * Con (DataCurve, TrackingLens…) nhận CoordCtx qua render-prop children.
 */
export function CoordinateSystem({
  xLabel = "n (tháng)",
  yLabel = "Giá trị",
  xRange,
  yRange,
  xTicks,
  yTicks,
  width = 600,
  height = 340,
  padding = { top: 24, right: 24, bottom: 48, left: 60 },
  showGrid = true,
  className,
  children,
}: CoordinateSystemProps) {
  const ref = useRef<SVGSVGElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  const inner = {
    x: padding.left,
    y: padding.top,
    w: width - padding.left - padding.right,
    h: height - padding.top - padding.bottom,
  };

  const toPixel = useCallback(
    (wx: number, wy: number) => ({
      x: inner.x + ((wx - xRange[0]) / (xRange[1] - xRange[0])) * inner.w,
      y: inner.y + inner.h - ((wy - yRange[0]) / (yRange[1] - yRange[0])) * inner.h,
    }),
    [inner.x, inner.y, inner.w, inner.h, xRange, yRange]
  );

  const ctx: CoordCtx = { toPixel, inner, xRange, yRange };

  /* Auto ticks nếu không truyền */
  const autoXTicks: Tick[] = xTicks ?? autoTicks(xRange, 6).map((v) => ({
    value: v,
    label: String(v),
  }));
  const autoYTicks: Tick[] = yTicks ?? autoTicks(yRange, 5).map((v) => ({
    value: v,
    label: formatTick(v),
  }));

  /* Trục X path */
  const originY = toPixel(0, Math.max(yRange[0], 0)).y;
  const xAxisPath = `M ${inner.x},${originY} H ${inner.x + inner.w + 8}`;
  const yAxisPath = `M ${inner.x},${inner.y - 8} V ${inner.y + inner.h}`;

  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${width} ${height}`}
      width="100%"
      height="auto"
      overflow="visible"
      className={className}
    >
      {/* Grid */}
      {showGrid && isInView && (
        <g opacity={0.35}>
          {autoYTicks.map((t) => {
            const py = toPixel(0, t.value).y;
            return (
              <motion.line
                key={`gy-${t.value}`}
                x1={inner.x} y1={py} x2={inner.x + inner.w} y2={py}
                stroke="var(--grid-line)"
                strokeWidth={1}
                strokeDasharray="4 3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              />
            );
          })}
        </g>
      )}

      {/* Trục Y */}
      <AnimatedPath
        d={yAxisPath}
        color="var(--ink-line)"
        strokeWidth={2}
        duration={0.6}
        delay={0}
        triggerOnView={true}
      />
      {/* Arrowhead Y */}
      {isInView && (
        <motion.polygon
          points={`${inner.x - 5},${inner.y - 4} ${inner.x},${inner.y - 12} ${inner.x + 5},${inner.y - 4}`}
          fill="var(--ink-line)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        />
      )}

      {/* Trục X */}
      <AnimatedPath
        d={xAxisPath}
        color="var(--ink-line)"
        strokeWidth={2}
        duration={0.6}
        delay={0.1}
        triggerOnView={true}
      />
      {/* Arrowhead X */}
      {isInView && (
        <motion.polygon
          points={`${inner.x + inner.w + 4},${originY - 5} ${inner.x + inner.w + 12},${originY} ${inner.x + inner.w + 4},${originY + 5}`}
          fill="var(--ink-line)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        />
      )}

      {/* X Ticks + labels */}
      {isInView && autoXTicks.map((t, i) => {
        const px = toPixel(t.value, 0).x;
        return (
          <motion.g key={`xt-${t.value}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 + i * 0.05 }}
          >
            <line x1={px} y1={originY - 4} x2={px} y2={originY + 4}
              stroke="var(--ink-secondary)" strokeWidth={1.5} />
            <text
              x={px} y={originY + 18}
              textAnchor="middle"
              fill="var(--ink-secondary)"
              fontSize={11}
              fontFamily="'JetBrains Mono', monospace"
            >
              {t.label}
            </text>
          </motion.g>
        );
      })}

      {/* Y Ticks + labels */}
      {isInView && autoYTicks.map((t, i) => {
        const py = toPixel(0, t.value).y;
        return (
          <motion.g key={`yt-${t.value}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 + i * 0.05 }}
          >
            <line x1={inner.x - 4} y1={py} x2={inner.x + 4} y2={py}
              stroke="var(--ink-secondary)" strokeWidth={1.5} />
            <text
              x={inner.x - 10} y={py}
              textAnchor="end"
              dominantBaseline="middle"
              fill="var(--ink-secondary)"
              fontSize={11}
              fontFamily="'JetBrains Mono', monospace"
            >
              {t.label}
            </text>
          </motion.g>
        );
      })}

      {/* Axis labels */}
      {isInView && (
        <>
          <text
            x={inner.x + inner.w + 14} y={originY + 4}
            fill="var(--ink-secondary)"
            fontSize={12}
            fontFamily="'DM Sans', sans-serif"
            fontWeight={600}
          >
            {xLabel}
          </text>
          <text
            x={inner.x - 4} y={inner.y - 16}
            textAnchor="middle"
            fill="var(--ink-secondary)"
            fontSize={12}
            fontFamily="'DM Sans', sans-serif"
            fontWeight={600}
          >
            {yLabel}
          </text>
        </>
      )}

      {/* Children (DataCurve, TrackingLens…) */}
      {isInView && children?.(ctx)}
    </svg>
  );
}

/* ─── Utilities ─── */
function autoTicks([min, max]: [number, number], count: number): number[] {
  const step = niceStep((max - min) / count);
  const start = Math.ceil(min / step) * step;
  const ticks: number[] = [];
  for (let v = start; v <= max + step * 0.01; v += step) {
    ticks.push(Math.round(v * 1000) / 1000);
  }
  return ticks;
}

function niceStep(rough: number): number {
  const pow = Math.pow(10, Math.floor(Math.log10(rough)));
  const frac = rough / pow;
  if (frac < 1.5) return pow;
  if (frac < 3) return 2 * pow;
  if (frac < 7) return 5 * pow;
  return 10 * pow;
}

function formatTick(v: number): string {
  if (Math.abs(v) >= 1_000_000) return `${(v / 1_000_000).toFixed(1)}M`;
  if (Math.abs(v) >= 1_000) return `${(v / 1_000).toFixed(0)}k`;
  return String(v);
}
