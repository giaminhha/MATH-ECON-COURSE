"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface AnimatedPathProps {
  d: string;
  color?: string;
  strokeWidth?: number;
  duration?: number;
  delay?: number;
  dashed?: boolean;         // đường đứt nét (axes, guidelines)
  dashArray?: string;       // custom dash pattern
  fill?: string;
  triggerOnView?: boolean;  // chỉ animate khi vào viewport
  className?: string;
}

export function AnimatedPath({
  d,
  color = "#34495E",
  strokeWidth = 2,
  duration = 1.4,
  delay = 0,
  dashed = false,
  dashArray,
  fill = "none",
  triggerOnView = true,
  className,
}: AnimatedPathProps) {
  const ref = useRef<SVGPathElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  const shouldAnimate = !triggerOnView || isInView;

  return (
    <motion.path
      ref={ref}
      d={d}
      stroke={color}
      strokeWidth={strokeWidth}
      fill={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeDasharray={dashed ? (dashArray ?? "6 4") : undefined}
      initial={{ pathLength: 0, opacity: 0 }}
      animate={shouldAnimate ? { pathLength: 1, opacity: 1 } : {}}
      transition={{
        pathLength: { duration, delay, ease: [0.16, 1, 0.3, 1] },
        opacity: { duration: 0.3, delay },
      }}
      className={className}
    />
  );
}

/** Shorthand: chỉ render path tĩnh, không animation */
export function StaticPath({
  d,
  color = "#34495E",
  strokeWidth = 2,
  dashed = false,
  fill = "none",
}: Omit<AnimatedPathProps, "duration" | "delay" | "triggerOnView">) {
  return (
    <path
      d={d}
      stroke={color}
      strokeWidth={strokeWidth}
      fill={fill}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeDasharray={dashed ? "6 4" : undefined}
    />
  );
}
