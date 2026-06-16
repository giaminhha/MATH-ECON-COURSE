"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export type StickPose = "standing" | "happy" | "sad" | "pointing" | "receiving" | "running";

interface StickFigureProps {
  x?: number;
  y?: number;
  scale?: number;
  color?: string;
  pose?: StickPose;
  label?: string;         // tên nhân vật (hiện bên dưới)
  delay?: number;
  flip?: boolean;         // lật ngang (hướng ngược)
}

/** Toạ độ các bộ phận cho từng pose (relative, origin = center hips) */
const POSES: Record<StickPose, {
  head: { cy: number };
  body: { y1: number; y2: number };
  leftArm: [number, number, number, number];
  rightArm: [number, number, number, number];
  leftLeg: [number, number, number, number];
  rightLeg: [number, number, number, number];
}> = {
  standing: {
    head: { cy: -52 },
    body: { y1: -40, y2: -10 },
    leftArm:  [-10, -30, -28, -18],
    rightArm: [ 10, -30,  28, -18],
    leftLeg:  [-5, -10, -16,  20],
    rightLeg: [ 5, -10,  16,  20],
  },
  happy: {
    head: { cy: -52 },
    body: { y1: -40, y2: -10 },
    leftArm:  [-10, -30, -30, -45],  // tay giơ lên
    rightArm: [ 10, -30,  30, -45],
    leftLeg:  [-5, -10, -16,  20],
    rightLeg: [ 5, -10,  16,  20],
  },
  sad: {
    head: { cy: -52 },
    body: { y1: -40, y2: -10 },
    leftArm:  [-10, -30, -26, -10],  // tay thõng xuống
    rightArm: [ 10, -30,  26, -10],
    leftLeg:  [-5, -10, -16,  20],
    rightLeg: [ 5, -10,  16,  20],
  },
  pointing: {
    head: { cy: -52 },
    body: { y1: -40, y2: -10 },
    leftArm:  [-10, -30, -28, -18],
    rightArm: [ 10, -30,  38, -38], // tay phải chỉ thẳng
    leftLeg:  [-5, -10, -16,  20],
    rightLeg: [ 5, -10,  16,  20],
  },
  receiving: {
    head: { cy: -52 },
    body: { y1: -40, y2: -10 },
    leftArm:  [-10, -28, -24, -14],  // 2 tay đưa ra đón
    rightArm: [ 10, -28,  24, -14],
    leftLeg:  [-5, -10, -16,  20],
    rightLeg: [ 5, -10,  16,  20],
  },
  running: {
    head: { cy: -52 },
    body: { y1: -40, y2: -10 },
    leftArm:  [-10, -30, -30, -14],
    rightArm: [ 10, -30,  28, -42],
    leftLeg:  [-5, -10, -22,  18],  // chân khom chạy
    rightLeg: [ 5, -10,  18,   8],
  },
};

export function StickFigure({
  x = 0,
  y = 0,
  scale = 1,
  color = "#2C3441",
  pose = "standing",
  label,
  delay = 0,
  flip = false,
}: StickFigureProps) {
  const ref = useRef<SVGGElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const p = POSES[pose];
  const sw = 2.5;  // strokeWidth
  const flipScale = flip ? -1 : 1;

  return (
    <motion.g
      ref={ref}
      transform={`translate(${x}, ${y}) scale(${scale * flipScale}, ${scale})`}
      initial={{ opacity: 0, y: 12 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{ transformOrigin: "0 0" }}
    >
      {/* Head */}
      <circle cx={0} cy={p.head.cy} r={11} fill="none" stroke={color} strokeWidth={sw} />

      {/* Body */}
      <line
        x1={0} y1={p.body.y1}
        x2={0} y2={p.body.y2}
        stroke={color} strokeWidth={sw} strokeLinecap="round"
      />

      {/* Left arm */}
      <line
        x1={p.leftArm[0]} y1={p.leftArm[1]}
        x2={p.leftArm[2]} y2={p.leftArm[3]}
        stroke={color} strokeWidth={sw} strokeLinecap="round"
      />

      {/* Right arm */}
      <line
        x1={p.rightArm[0]} y1={p.rightArm[1]}
        x2={p.rightArm[2]} y2={p.rightArm[3]}
        stroke={color} strokeWidth={sw} strokeLinecap="round"
      />

      {/* Left leg */}
      <line
        x1={p.leftLeg[0]} y1={p.leftLeg[1]}
        x2={p.leftLeg[2]} y2={p.leftLeg[3]}
        stroke={color} strokeWidth={sw} strokeLinecap="round"
      />

      {/* Right leg */}
      <line
        x1={p.rightLeg[0]} y1={p.rightLeg[1]}
        x2={p.rightLeg[2]} y2={p.rightLeg[3]}
        stroke={color} strokeWidth={sw} strokeLinecap="round"
      />

      {/* Label bên dưới */}
      {label && (
        <text
          x={0} y={36}
          textAnchor="middle"
          fill={color}
          fontSize={12}
          fontWeight={600}
          fontFamily="'DM Sans', sans-serif"
          transform={`scale(${flipScale}, 1)`}  // unflip text
        >
          {label}
        </text>
      )}
    </motion.g>
  );
}

/* ─────────────────────────────────────────────
   CoinIcon — đồng xu animated
   ────────────────────────────────────────────── */
interface CoinIconProps {
  x?: number;
  y?: number;
  size?: number;
  value?: string;   // hiển thị trong xu: "$", "500k"
  color?: string;
  delay?: number;
  animate?: "drop" | "fade" | "none";
}

export function CoinIcon({
  x = 0, y = 0, size = 20,
  value = "$",
  color = "#F39C12",
  delay = 0,
  animate: anim = "drop",
}: CoinIconProps) {
  const ref = useRef<SVGGElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  const initial =
    anim === "drop" ? { opacity: 0, y: -40 } :
    anim === "fade" ? { opacity: 0, scale: 0.6 } :
    {};
  const animateTarget =
    anim === "drop" ? { opacity: 1, y: 0 } :
    anim === "fade" ? { opacity: 1, scale: 1 } :
    {};
  const transition =
    anim === "drop"
      ? { type: "spring" as const, stiffness: 350, damping: 22, delay }
      : { duration: 0.4, delay };

  return (
    <motion.g
      ref={ref}
      transform={`translate(${x}, ${y})`}
      initial={initial}
      animate={isInView ? animateTarget : {}}
      transition={transition}
    >
      {/* Outer circle */}
      <circle r={size} fill={color} />
      {/* Inner ring */}
      <circle r={size * 0.78} fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth={1.5} />
      {/* Value text */}
      <text
        textAnchor="middle"
        dominantBaseline="middle"
        fill="white"
        fontSize={size * 0.55}
        fontWeight={700}
        fontFamily="'JetBrains Mono', monospace"
      >
        {value}
      </text>
    </motion.g>
  );
}

/* ─────────────────────────────────────────────
   DiagramLabel — label + mũi tên chỉ vào element
   ────────────────────────────────────────────── */
interface DiagramLabelProps {
  text: string;
  targetX: number;
  targetY: number;
  /** Vị trí của label so với target */
  position?: "top" | "bottom" | "left" | "right";
  offset?: number;         // khoảng cách từ target
  color?: string;
  handwritten?: boolean;   // font Caveat
  delay?: number;
}

export function DiagramLabel({
  text,
  targetX,
  targetY,
  position = "top",
  offset = 36,
  color = "#8B7355",
  handwritten = true,
  delay = 0,
}: DiagramLabelProps) {
  const ref = useRef<SVGGElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  const lx =
    position === "left" ? targetX - offset :
    position === "right" ? targetX + offset :
    targetX;
  const ly =
    position === "top" ? targetY - offset :
    position === "bottom" ? targetY + offset :
    targetY;

  // Arrow từ label đến target
  const arrowD = `M ${lx},${ly} Q ${(lx + targetX) / 2},${(ly + targetY) / 2 + (position === "top" ? 8 : -8)} ${targetX},${targetY}`;

  return (
    <motion.g
      ref={ref}
      initial={{ opacity: 0, y: position === "top" ? 8 : -8 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
    >
      {/* Arrow */}
      <path
        d={arrowD}
        fill="none"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        markerEnd="url(#arrow-label)"
        opacity={0.7}
      />
      {/* Text */}
      <text
        x={lx}
        y={position === "top" ? ly - 4 : ly + 4}
        textAnchor="middle"
        dominantBaseline={position === "top" ? "auto" : "hanging"}
        fill={color}
        fontSize={12}
        fontFamily={handwritten ? "'Caveat', cursive" : "'DM Sans', sans-serif"}
        fontWeight={handwritten ? 500 : 600}
      >
        {text}
      </text>
    </motion.g>
  );
}
