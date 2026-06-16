"use client";

import { useState } from "react";
import { FlowNode, FlowNodeData } from "./FlowNode";
import { FlowArrow, FlowArrowData } from "./FlowArrow";

interface FlowDiagramProps {
  nodes: FlowNodeData[];
  arrows: FlowArrowData[];
  width?: number;
  height?: number;
  className?: string;
  /** Caption bên dưới diagram */
  caption?: string;
}

/**
 * FlowDiagram — compose nhiều FlowNode + FlowArrow thành 1 sơ đồ SVG.
 * Nodes và arrows stagger reveal lần lượt.
 */
export function FlowDiagram({
  nodes,
  arrows,
  width = 600,
  height = 200,
  className,
  caption,
}: FlowDiagramProps) {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  return (
    <div className={`w-full ${className ?? ""}`}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width="100%"
        height="auto"
        overflow="visible"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        {/* Arrows trước (nằm dưới nodes) */}
        {arrows.map((arrow) => (
          <FlowArrow key={arrow.id} {...arrow} />
        ))}

        {/* Nodes */}
        {nodes.map((node) => (
          <FlowNode
            key={node.id}
            {...node}
            active={node.active || hoveredNode === node.id}
            onHover={setHoveredNode}
          />
        ))}
      </svg>

      {/* Caption hand-written style */}
      {caption && (
        <p
          className="text-center mt-3 hand-label"
          style={{ color: "var(--ink-label)" }}
        >
          {caption}
        </p>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Helper: tạo nhanh chain flow ngang (CSC/CSN)
   ────────────────────────────────────────────── */
interface ChainConfig {
  labels: string[];          // labels của từng node
  arrowLabels?: string[];    // labels của mũi tên giữa nodes
  color?: string;
  nodeShape?: "circle" | "rect";
  startX?: number;
  y?: number;
  gap?: number;
  animatedDots?: boolean;
}

export function buildChain({
  labels,
  arrowLabels,
  color = "#2C3E50",
  nodeShape = "circle",
  startX = 60,
  y = 80,
  gap = 120,
  animatedDots = false,
}: ChainConfig): { nodes: FlowNodeData[]; arrows: FlowArrowData[] } {
  const nodeR = 28;
  const nodes: FlowNodeData[] = labels.map((label, i) => ({
    id: `n${i}`,
    label,
    x: startX + i * gap,
    y,
    shape: nodeShape,
    color,
    delay: i * 0.15,
  }));

  const arrows: FlowArrowData[] = labels.slice(0, -1).map((_, i) => ({
    id: `a${i}`,
    from: { x: startX + i * gap + nodeR, y },
    to: { x: startX + (i + 1) * gap - nodeR, y },
    label: arrowLabels?.[i],
    color,
    delay: i * 0.15 + 0.1,
    animatedDot: animatedDots,
  }));

  return { nodes, arrows };
}
