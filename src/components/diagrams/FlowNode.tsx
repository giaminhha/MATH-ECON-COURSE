"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export type NodeShape = "circle" | "rect" | "diamond";

export interface FlowNodeData {
  id: string;
  label: string;
  sublabel?: string;    // dòng nhỏ dưới label
  x: number;
  y: number;
  shape?: NodeShape;
  color?: string;       // border/fill accent
  active?: boolean;     // pulse animation
  delay?: number;
}

interface FlowNodeProps extends FlowNodeData {
  onHover?: (id: string | null) => void;
}

const SIZES = {
  circle: { r: 28 },
  rect: { w: 80, h: 40 },
  diamond: { size: 36 },
};

export function FlowNode({
  id,
  label,
  sublabel,
  x,
  y,
  shape = "circle",
  color = "#2C3E50",
  active = false,
  delay = 0,
  onHover,
}: FlowNodeProps) {
  const ref = useRef<SVGGElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  function renderShape() {
    if (shape === "circle") {
      return (
        <>
          <circle
            cx={0} cy={0}
            r={SIZES.circle.r}
            fill={`${color}15`}
            stroke={color}
            strokeWidth={2}
          />
          {active && (
            <circle
              cx={0} cy={0}
              r={SIZES.circle.r + 6}
              fill="none"
              stroke={color}
              strokeWidth={1}
              opacity={0.3}
            />
          )}
        </>
      );
    }
    if (shape === "rect") {
      const { w, h } = SIZES.rect;
      return (
        <rect
          x={-w / 2} y={-h / 2}
          width={w} height={h}
          rx={8}
          fill={`${color}15`}
          stroke={color}
          strokeWidth={2}
        />
      );
    }
    if (shape === "diamond") {
      const s = SIZES.diamond.size;
      return (
        <polygon
          points={`0,${-s} ${s},0 0,${s} ${-s},0`}
          fill={`${color}15`}
          stroke={color}
          strokeWidth={2}
        />
      );
    }
  }

  const variants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { opacity: 1, scale: 1 },
    pulse: {
      opacity: 1,
      scale: [1, 1.15, 1] as number[],
      transition: { duration: 1.2, repeat: Infinity, ease: "easeInOut" as const },
    },
  };

  const currentVariant = !isInView ? "hidden" : active ? "pulse" : "visible";

  return (
    <motion.g
      ref={ref}
      transform={`translate(${x}, ${y})`}
      variants={variants}
      initial="hidden"
      animate={currentVariant}
      transition={{
        opacity: { duration: 0.4, delay, ease: "easeOut" },
        scale: { type: "spring", stiffness: 300, damping: 20, delay },
      }}
      whileHover={{ scale: 1.1 }}
      style={{ cursor: onHover ? "pointer" : "default" }}
      onMouseEnter={() => onHover?.(id)}
      onMouseLeave={() => onHover?.(null)}
    >
      {renderShape()}

      {/* Label chính */}
      <text
        textAnchor="middle"
        dominantBaseline="middle"
        dy={sublabel ? -8 : 0}
        fill={color}
        fontSize={13}
        fontWeight={700}
        fontFamily="'DM Sans', sans-serif"
      >
        {label}
      </text>

      {/* Sublabel */}
      {sublabel && (
        <text
          textAnchor="middle"
          dominantBaseline="middle"
          dy={10}
          fill={color}
          fontSize={10}
          fontWeight={400}
          fontFamily="'JetBrains Mono', monospace"
          opacity={0.75}
        >
          {sublabel}
        </text>
      )}
    </motion.g>
  );
}
