import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { FlowNode, FlowArrow, NumberOdometer, StickFigure, DiagramLabel, drawLine } from './SharedDiagramComponents';

// --- CashflowFlow: For Slide 1 ---
export const CashflowFlow = () => {
  return (
    <div className="w-full h-full relative" style={{ minHeight: '420px' }}>
      <svg viewBox="0 0 800 400" className="w-full h-full drop-shadow-sm">
        <defs>
          <marker id="arrowhead-var(--money)" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="var(--money)" />
          </marker>
          <marker id="arrowhead-var(--debt)" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="var(--debt)" />
          </marker>
        </defs>

        {/* Center: Stick Figure */}
        <StickFigure x={400} y={200} scale={1.2} delay={0} />

        {/* Left: Income */}
        <FlowNode x={80} y={200} label="LƯƠNG" width={100} color="var(--money)" delay={1.2} />
        <FlowArrow x1={130} y1={200} x2={340} y2={200} label="8tr" color="var(--money)" delay={1.2} />

        {/* Right: Expenses */}
        {/* Ăn uống */}
        <FlowArrow x1={460} y1={200} x2={650} y2={80} label="2.5tr" color="var(--debt)" delay={2.0} />
        <FlowNode x={700} y={80} label="Ăn uống" width={100} color="var(--debt)" delay={2.0} />
        
        {/* Đi lại */}
        <FlowArrow x1={460} y1={200} x2={650} y2={160} label="1tr" color="var(--debt)" delay={2.2} />
        <FlowNode x={700} y={160} label="Đi lại" width={100} color="var(--debt)" delay={2.2} />
        
        {/* Giải trí */}
        <FlowArrow x1={460} y1={200} x2={650} y2={240} label="1.5tr" color="var(--debt)" delay={2.4} />
        <FlowNode x={700} y={240} label="Giải trí" width={100} color="var(--debt)" delay={2.4} />
        
        {/* Khác */}
        <FlowArrow x1={460} y1={200} x2={650} y2={320} label="1tr" color="var(--debt)" delay={2.6} />
        <FlowNode x={700} y={320} label="Khác" width={100} color="var(--debt)" delay={2.6} />

        {/* Bottom: Remaining */}
        <motion.g 
          initial={{ scale: 0, opacity: 0 }} 
          animate={{ scale: 1, opacity: 1 }} 
          transition={{ delay: 3.5, type: 'spring', stiffness: 200, damping: 20 }}
        >
          <rect x={320} y={320} width={160} height={50} rx={8} fill="var(--money-light)" stroke="var(--money)" strokeWidth={2} />
          <text x={395} y={350} textAnchor="end" fontSize={16} fontWeight="bold" fill="var(--money)">
            Còn lại:
          </text>
        </motion.g>

        {/* HTML overlay for NumberOdometer because it uses HTML elements not SVG text directly */}
        <foreignObject x={400} y={332} width={80} height={24}>
           <div className="flex w-full h-full items-center font-bold text-base" style={{ color: 'var(--money)' }}>
             <NumberOdometer value={2000} delay={3.5} suffix="k" prefix="" />
           </div>
        </foreignObject>

        <DiagramLabel x={400} y={390} text="Tháng 1 — bạn còn 2 triệu" delay={4.5} font="var(--font-hand)" color="var(--ink-secondary)" />
      </svg>
    </div>
  );
};

// --- SequenceChain: For Slide 2 ---
export const SequenceChain = () => {
  const nodes = [
    { id: 't1', label: '2tr',   x: 80,  y: 120, labelBottom: 'T1' },
    { id: 't2', label: '1.8tr', x: 200, y: 120, labelBottom: 'T2' },
    { id: 't3', label: '2.5tr', x: 320, y: 120, labelBottom: 'T3' },
    { id: 't4', label: '1.2tr', x: 440, y: 120, labelBottom: 'T4' },
    { id: 't5', label: '3tr',   x: 560, y: 120, labelBottom: 'T5' },
    { id: 't6', label: '2tr',   x: 680, y: 120, labelBottom: 'T6' },
  ];

  return (
    <div className="w-full h-full relative" style={{ minHeight: '350px' }}>
      <svg viewBox="0 0 760 350" className="w-full h-full">
        {/* Nodes and arrows */}
        {nodes.map((n, i) => (
          <g key={n.id}>
            <FlowNode x={n.x} y={n.y} label={n.label} labelBottom={n.labelBottom} width={80} color="var(--money)" delay={i * 0.15} />
            {i < nodes.length - 1 && (
              <FlowArrow x1={n.x + 40} y1={n.y} x2={nodes[i+1].x - 40} y2={n.y} color="var(--ink-faint)" delay={i * 0.15 + 0.1} />
            )}
          </g>
        ))}

        {/* Curved bracket around all nodes */}
        <motion.path
          d="M 60 160 Q 380 200 700 160"
          fill="none"
          stroke="var(--formula)"
          strokeWidth={3}
          initial="hidden" animate="visible" variants={drawLine} transition={{ delay: 1.5 }}
        />
        <DiagramLabel x={380} y={220} text="(uₙ) — Dãy Số" delay={2.0} color="var(--formula)" font="var(--font-heading)" />
        
        {/* Pointer to T3 */}
        <FlowArrow x1={320} y1={250} x2={320} y2={180} color="var(--ink-secondary)" delay={2.5} />
        <DiagramLabel x={320} y={270} text="u₃ = 2.5 triệu = Số hạng thứ 3" delay={2.5} color="var(--ink-secondary)" font="var(--font-mono)" />
      </svg>
    </div>
  );
};
