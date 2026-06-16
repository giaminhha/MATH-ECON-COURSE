"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { AnimatedPath } from "./AnimatedPath";

export interface FlowArrowData {
  id: string;
  from: { x: number; y: number };  // điểm cuối từ node nguồn
  to: { x: number; y: number };    // điểm đầu vào node đích
  label?: string;                   // ký hiệu trên mũi tên: "+d", "×q", "×(1+r)"
  color?: string;
  delay?: number;
  dashed?: boolean;
  animatedDot?: boolean;            // dot chạy dọc path
}

interface FlowArrowProps extends FlowArrowData {}

/** Sinh path thẳng hoặc cong nhẹ nối 2 điểm */
function buildPath(from: { x: number; y: number }, to: { x: number; y: number }): string {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  // Đường cubic bezier cong nhẹ
  const cx1 = from.x + dx * 0.4;
  const cy1 = from.y;
  const cx2 = from.x + dx * 0.6;
  const cy2 = to.y;
  return `M ${from.x},${from.y} C ${cx1},${cy1} ${cx2},${cy2} ${to.x},${to.y}`;
}

/** Arrowhead marker id */
function markerId(color: string) {
  return `arrow-${color.replace("#", "")}`;
}

export function FlowArrow({
  from,
  to,
  label,
  color = "#34495E",
  delay = 0,
  dashed = false,
  animatedDot = false,
}: FlowArrowProps) {
  const ref = useRef<SVGGElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const d = buildPath(from, to);
  const mid = {
    x: (from.x + to.x) / 2,
    y: (from.y + to.y) / 2 - 14,
  };

  return (
    <g ref={ref}>
      {/* Arrowhead marker định nghĩa */}
      <defs>
        <marker
          id={markerId(color)}
          markerWidth={10}
          markerHeight={7}
          refX={9}
          refY={3.5}
          orient="auto"
        >
          <polygon
            points="0 0, 10 3.5, 0 7"
            fill={color}
            opacity={0.85}
          />
        </marker>
      </defs>

      {/* Path arrow */}
      <svg overflow="visible">
        <AnimatedPath
          d={d}
          color={color}
          strokeWidth={dashed ? 1.5 : 2}
          duration={0.8}
          delay={delay}
          dashed={dashed}
        />
        {/* Arrowhead tĩnh — chỉ render sau khi path đã vẽ */}
        {isInView && (
          <motion.path
            d={d}
            fill="none"
            stroke={color}
            strokeWidth={2}
            markerEnd={`url(#${markerId(color)})`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: delay + 0.7, duration: 0.2 }}
          />
        )}
      </svg>

      {/* Label giữa path */}
      {label && isInView && (
        <motion.g
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: delay + 0.5, duration: 0.4 }}
        >
          {/* Pill background */}
          <rect
            x={mid.x - 20} y={mid.y - 10}
            width={40} height={20}
            rx={10}
            fill="white"
            stroke={color}
            strokeWidth={1.5}
            opacity={0.95}
          />
          <text
            x={mid.x} y={mid.y}
            textAnchor="middle"
            dominantBaseline="middle"
            fill={color}
            fontSize={11}
            fontWeight={700}
            fontFamily="'JetBrains Mono', monospace"
          >
            {label}
          </text>
        </motion.g>
      )}

      {/* Animated dot chạy dọc path */}
      {animatedDot && isInView && (
        <motion.circle
          r={4}
          fill={color}
          opacity={0.8}
          initial={{ offsetDistance: "0%", opacity: 0 }}
          animate={{ offsetDistance: "100%", opacity: [0, 0.8, 0.8, 0] }}
          transition={{
            duration: 2,
            delay: delay + 1,
            repeat: Infinity,
            repeatDelay: 1,
            ease: "easeInOut",
          }}
          style={{ offsetPath: `path("${d}")` } as React.CSSProperties}
        />
      )}
    </g>
  );
}
