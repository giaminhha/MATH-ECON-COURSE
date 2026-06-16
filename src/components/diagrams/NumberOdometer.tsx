"use client";

import { useSpring, useTransform, motion, animate } from "framer-motion";
import { useEffect, useRef } from "react";

interface NumberOdometerProps {
  value: number;
  /** Format: 'vnd' | 'percent' | 'year' | 'plain' */
  format?: "vnd" | "percent" | "year" | "plain";
  /** Suffix: 'tr', '%', ' năm', '' */
  suffix?: string;
  /** Prefix: 'đ', '' */
  prefix?: string;
  decimals?: number;
  className?: string;
  /** Semantic color tự động khi tăng/giảm */
  semantic?: boolean;
  stiffness?: number;
  damping?: number;
}

/**
 * NumberOdometer — số đếm cuộn mượt mà.
 * Dùng Framer Motion useSpring để animate giá trị.
 */
export function NumberOdometer({
  value,
  format = "plain",
  suffix = "",
  prefix = "",
  decimals = 0,
  className,
  semantic = false,
  stiffness = 80,
  damping = 25,
}: NumberOdometerProps) {
  const spring = useSpring(value, { stiffness, damping });

  useEffect(() => {
    spring.set(value);
  }, [spring, value]);

  const display = useTransform(spring, (v) => formatValue(v, format, decimals));

  return (
    <motion.span
      className={`font-mono font-semibold tabular-nums ${className ?? ""}`}
      style={{
        color: semantic
          ? value >= 0
            ? "var(--money)"
            : "var(--debt)"
          : undefined,
      }}
    >
      {prefix}
      <motion.span>{display}</motion.span>
      {suffix}
    </motion.span>
  );
}

function formatValue(v: number, format: string, decimals: number): string {
  const rounded = decimals > 0 ? v.toFixed(decimals) : Math.round(v);
  if (format === "vnd") {
    // Format VND: 1234567 → "1.234.567"
    return Math.round(v).toLocaleString("vi-VN");
  }
  if (format === "percent") {
    return `${v.toFixed(decimals || 1)}`;
  }
  return String(rounded);
}

/* ─────────────────────────────────────────────
   CountUp — đơn giản hơn, không spring, chỉ ease
   ────────────────────────────────────────────── */
interface CountUpProps {
  from?: number;
  to: number;
  duration?: number;
  delay?: number;
  format?: "vnd" | "plain";
  className?: string;
}

export function CountUp({
  from = 0,
  to,
  duration = 1.2,
  delay = 0,
  format = "plain",
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const controls = animate(from, to, {
      duration,
      delay,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        el.textContent =
          format === "vnd"
            ? Math.round(v).toLocaleString("vi-VN")
            : String(Math.round(v));
      },
    });
    return () => controls.stop();
  }, [from, to, duration, delay, format]);

  return (
    <span
      ref={ref}
      className={`font-mono font-semibold tabular-nums ${className ?? ""}`}
    />
  );
}
