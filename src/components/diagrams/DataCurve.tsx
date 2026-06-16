"use client";

import { useState, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { AnimatedPath } from "./AnimatedPath";
import type { CoordCtx } from "./CoordinateSystem";

interface DataCurveProps {
  /** Hàm toán: (x) => y */
  fn: (x: number) => number;
  /** Context từ CoordinateSystem */
  ctx: CoordCtx;
  color?: string;
  strokeWidth?: number;
  /** Số điểm sample để tạo path (càng nhiều càng mượt) */
  resolution?: number;
  label?: string;
  labelPosition?: "end" | "mid" | "start";
  duration?: number;
  delay?: number;
  /** Hiển thị điểm data dots */
  showDots?: boolean;
  dotXValues?: number[];
}

/**
 * DataCurve — đường cong/thẳng tự vẽ trên CoordinateSystem.
 * Phải dùng bên trong CoordinateSystem children render-prop.
 */
export function DataCurve({
  fn,
  ctx,
  color = "#27AE60",
  strokeWidth = 2.5,
  resolution = 200,
  label,
  labelPosition = "end",
  duration = 1.8,
  delay = 0.3,
  showDots = false,
  dotXValues = [],
}: DataCurveProps) {
  const { toPixel, xRange, yRange } = ctx;

  /* Build SVG path */
  const step = (xRange[1] - xRange[0]) / resolution;
  let d = "";
  let first = true;

  for (let i = 0; i <= resolution; i++) {
    const wx = xRange[0] + i * step;
    const wy = fn(wx);
    // Clamp vào yRange để tránh vẽ ra ngoài
    if (wy < yRange[0] - (yRange[1] - yRange[0]) * 0.1 ||
        wy > yRange[1] + (yRange[1] - yRange[0]) * 0.1) {
      first = true;
      continue;
    }
    const { x, y } = toPixel(wx, wy);
    if (first) { d += `M ${x},${y}`; first = false; }
    else d += ` L ${x},${y}`;
  }

  /* Label position */
  const labelX =
    labelPosition === "end" ? xRange[1] :
    labelPosition === "start" ? xRange[0] :
    (xRange[0] + xRange[1]) / 2;
  const labelPixel = toPixel(labelX, fn(labelX));

  return (
    <g>
      <AnimatedPath
        d={d}
        color={color}
        strokeWidth={strokeWidth}
        duration={duration}
        delay={delay}
        triggerOnView={false} /* Đã trong isInView của CoordinateSystem */
      />

      {/* Label */}
      {label && (
        <motion.text
          x={labelPixel.x + 8}
          y={labelPixel.y - 8}
          fill={color}
          fontSize={12}
          fontWeight={700}
          fontFamily="'DM Sans', sans-serif"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay + duration - 0.3, duration: 0.4 }}
        >
          {label}
        </motion.text>
      )}

      {/* Dots tại vị trí cụ thể */}
      {showDots && dotXValues.map((wx) => {
        const wy = fn(wx);
        if (wy < yRange[0] || wy > yRange[1]) return null;
        const { x, y } = toPixel(wx, wy);
        return (
          <motion.circle
            key={wx}
            cx={x} cy={y} r={5}
            fill="white"
            stroke={color}
            strokeWidth={2.5}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: delay + duration * (wx - xRange[0]) / (xRange[1] - xRange[0]), type: "spring", stiffness: 300 }}
          />
        );
      })}
    </g>
  );
}

/* ─────────────────────────────────────────────
   TrackingLens — thanh dò toạ độ theo chuột
   ────────────────────────────────────────────── */
interface TrackingLensProps {
  fn: (x: number) => number;
  ctx: CoordCtx;
  color?: string;
  /** Controlled value từ bên ngoài (dùng cho minigame) */
  value?: number;
  onChange?: (x: number) => void;
}

export function TrackingLens({
  fn,
  ctx,
  color = "#E74C3C",
  value,
  onChange,
}: TrackingLensProps) {
  const [internalX, setInternalX] = useState<number | null>(null);
  const svgRef = useRef<SVGRectElement>(null);

  const activeX = value ?? internalX;

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<SVGRectElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const relX = e.clientX - rect.left;
      const ratio = relX / rect.width;
      const wx = ctx.xRange[0] + ratio * (ctx.xRange[1] - ctx.xRange[0]);
      const clamped = Math.max(ctx.xRange[0], Math.min(ctx.xRange[1], wx));
      setInternalX(clamped);
      onChange?.(clamped);
    },
    [ctx, onChange]
  );

  const { inner } = ctx;

  const wy = activeX !== null ? fn(activeX) : null;
  const px = activeX !== null ? ctx.toPixel(activeX, 0).x : null;
  const py = wy !== null && activeX !== null ? ctx.toPixel(activeX, wy).y : null;

  return (
    <g>
      {/* Invisible overlay để nhận mouse events */}
      <rect
        ref={svgRef}
        x={inner.x} y={inner.y}
        width={inner.w} height={inner.h}
        fill="transparent"
        style={{ cursor: "crosshair" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => !value && setInternalX(null)}
      />

      {activeX !== null && px !== null && py !== null && wy !== null && (
        <>
          {/* Đường đứt dọc */}
          <line
            x1={px} y1={inner.y}
            x2={px} y2={inner.y + inner.h}
            stroke={color} strokeWidth={1.5}
            strokeDasharray="5 4"
            opacity={0.7}
          />
          {/* Đường đứt ngang */}
          <line
            x1={inner.x} y1={py}
            x2={px} y2={py}
            stroke={color} strokeWidth={1.5}
            strokeDasharray="5 4"
            opacity={0.7}
          />
          {/* Dot tại điểm giao với curve */}
          <circle cx={px} cy={py} r={6} fill="white" stroke={color} strokeWidth={2.5} />

          {/* Label tooltip */}
          <g transform={`translate(${px + 10}, ${py - 24})`}>
            <rect x={0} y={0} width={90} height={22} rx={6}
              fill="white" stroke={color} strokeWidth={1.5} />
            <text
              x={8} y={14}
              fill={color} fontSize={11} fontWeight={700}
              fontFamily="'JetBrains Mono', monospace"
            >
              ({activeX.toFixed(1)}, {wy.toFixed(2)})
            </text>
          </g>
        </>
      )}
    </g>
  );
}
