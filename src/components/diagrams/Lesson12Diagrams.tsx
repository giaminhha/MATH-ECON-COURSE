"use client";

import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { FlowNode, FlowArrow, DiagramLabel } from './SharedDiagramComponents';

export const PlanDisruptionDiagram = () => {
  const controls = useAnimation();
  
  useEffect(() => {
    const runAnimation = async () => {
      await controls.start("visible");
    };
    runAnimation();
  }, [controls]);

  // Points for the savings curve
  // Month 0 to 12
  // Drop at 3, 7, 10
  const points = [
    [0, 250],
    [3, 150], // Goes up
    [3.1, 200], // Drops
    [7, 100], // Goes up
    [7.1, 220], // Drops a lot
    [10, 150], // Goes up
    [10.1, 200], // Drops
    [12, 160] // Goes up a bit
  ];

  const pathD = `M ${points[0][0]*60 + 50} ${points[0][1]} ` + points.slice(1).map(p => `L ${p[0]*60 + 50} ${p[1]}`).join(' ');

  return (
    <div className="w-full flex justify-center py-4 overflow-hidden">
      <svg viewBox="0 0 800 300" width="100%" height={300} style={{ maxWidth: 800 }}>
        {/* Axes */}
        <line x1={40} y1={250} x2={780} y2={250} stroke="var(--grid-line)" strokeWidth={2} />
        <line x1={50} y1={20} x2={50} y2={260} stroke="var(--grid-line)" strokeWidth={2} />
        
        <text x={780} y={270} fill="var(--ink-secondary)" fontSize={12} textAnchor="end">Tháng</text>
        <text x={40} y={15} fill="var(--ink-secondary)" fontSize={12} textAnchor="end">Tiền</text>

        {/* Month ticks */}
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(m => (
          <g key={m}>
            <line x1={m*60 + 50} y1={250} x2={m*60 + 50} y2={255} stroke="var(--grid-line)" strokeWidth={2} />
            <text x={m*60 + 50} y={270} fill="var(--ink-faint)" fontSize={10} textAnchor="middle">{m}</text>
          </g>
        ))}

        {/* Target Line */}
        <line x1={50} y1={50} x2={770} y2={50} stroke="var(--formula)" strokeWidth={2} strokeDasharray="5,5" />
        <text x={770} y={40} fill="var(--formula)" fontSize={12} textAnchor="end" fontWeight="bold">Mục tiêu 30tr</text>

        {/* Perfect Plan Line */}
        <motion.line 
          x1={50} y1={250} x2={770} y2={50} 
          stroke="var(--grid-line)" strokeWidth={2} strokeDasharray="3,3"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.5 }}
          transition={{ duration: 1 }}
        />

        {/* Disrupted Plan Curve */}
        <motion.path 
          d={pathD}
          fill="none"
          stroke="var(--money)"
          strokeWidth={4}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3, ease: "linear" }}
        />

        {/* Lightning bolts */}
        {[
          { m: 3, label: "Xe hỏng", cost: "-2tr", delay: 0.8 },
          { m: 7, label: "Ốm nặng", cost: "-5tr", delay: 1.8 },
          { m: 10, label: "Mất ĐT", cost: "-3tr", delay: 2.6 }
        ].map(ev => (
          <g key={ev.m} transform={`translate(${ev.m*60 + 50}, 120)`}>
            <motion.g 
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: ev.delay, type: "spring" }}
            >
              <text textAnchor="middle" fontSize={24}>⚡</text>
              <text y={20} textAnchor="middle" fill="var(--debt)" fontSize={12} fontWeight="bold">{ev.label}</text>
              <text y={35} textAnchor="middle" fill="var(--debt)" fontSize={12} fontWeight="bold">{ev.cost}</text>
            </motion.g>
          </g>
        ))}
      </svg>
    </div>
  );
};

export const SampleSpaceDiagram = () => {
  return (
    <div className="w-full flex flex-col md:flex-row justify-center items-start gap-8 py-4 overflow-x-auto" style={{ minHeight: 350 }}>
      {/* Panel 1: Coin */}
      <motion.div 
        className="flex flex-col items-center gap-4 flex-shrink-0"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0 }}
      >
        <div className="text-sm font-bold text-gray-500 uppercase">Tung Đồng Xu</div>
        <div className="flex gap-4">
          <div className="w-16 h-16 rounded-full border-4 border-yellow-400 flex items-center justify-center font-bold text-xl bg-yellow-100 text-yellow-700">
            S
          </div>
          <div className="w-16 h-16 rounded-full border-4 border-gray-300 flex items-center justify-center font-bold text-xl bg-gray-50 text-gray-500">
            N
          </div>
        </div>
        <div className="text-lg font-mono font-bold" style={{ color: 'var(--formula)' }}>|Ω| = 2</div>
      </motion.div>

      <div className="hidden md:block w-px h-64 bg-gray-200" />

      {/* Panel 2: Dice */}
      <motion.div 
        className="flex flex-col items-center gap-4 flex-shrink-0"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <div className="text-sm font-bold text-gray-500 uppercase">Tung Xúc Xắc</div>
        <div className="grid grid-cols-3 gap-2">
          {[1,2,3,4,5,6].map(i => (
            <div key={i} className="w-12 h-12 rounded-lg border-2 border-indigo-400 flex items-center justify-center font-bold text-xl bg-indigo-50 text-indigo-700">
              {i}
            </div>
          ))}
        </div>
        <div className="text-lg font-mono font-bold" style={{ color: 'var(--formula)' }}>|Ω| = 6</div>
      </motion.div>

      <div className="hidden md:block w-px h-64 bg-gray-200" />

      {/* Panel 3: Risk */}
      <motion.div 
        className="flex flex-col items-center gap-2 flex-shrink-0"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6 }}
      >
        <div className="text-sm font-bold text-gray-500 uppercase mb-2">Rủi ro tháng này</div>
        <div className="flex flex-col gap-1 w-48">
          {[
            { id: '1', label: 'Bình thường', p: 71.7, bg: 'rgba(16, 185, 129, 0.8)' },
            { id: '2', label: 'Xe hỏng', p: 15, bg: 'rgba(239, 68, 68, 0.4)' },
            { id: '3', label: 'Mất đồ', p: 8, bg: 'rgba(239, 68, 68, 0.2)' },
            { id: '4', label: 'Ốm', p: 5, bg: 'rgba(239, 68, 68, 0.1)' },
            { id: '5', label: 'Tai nạn', p: 0.3, bg: 'rgba(239, 68, 68, 0.05)' }
          ].map(r => (
            <div key={r.id} className="flex justify-between items-center px-3 py-1.5 rounded text-sm font-bold" style={{ backgroundColor: r.bg }}>
              <span>{r.label}</span>
              <span>{r.p}%</span>
            </div>
          ))}
        </div>
        <div className="text-lg font-mono font-bold mt-2" style={{ color: 'var(--formula)' }}>|Ω| = 5 kết quả</div>
      </motion.div>

    </div>
  );
};
