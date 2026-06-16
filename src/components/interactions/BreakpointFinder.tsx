"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NumberOdometer } from '../diagrams/SharedDiagramComponents';

export const BreakpointFinder = ({ onComplete }: { onComplete?: (c: boolean, s: number) => void }) => {
  const [anSave, setAnSave] = useState(500); // 200k to 1000k
  const [binhDeposit, setBinhDeposit] = useState(5000); // 1000k to 20000k
  const [r, setR] = useState(0.6); // 0.3% to 1.5%
  
  const [isSuccess, setIsSuccess] = useState(false);

  // Check if they found the answer for the question: 500k, 5000k, 0.6% -> month 11/12
  // We just let them explore, but if they hit exactly 500, 5000, 0.6, we give success after a bit
  useEffect(() => {
    if (anSave === 500 && binhDeposit === 5000 && r === 0.6 && !isSuccess) {
      setIsSuccess(true);
      if (onComplete) onComplete(true, 100);
    }
  }, [anSave, binhDeposit, r, isSuccess, onComplete]);

  // Find intersection
  // anSave * x = binhDeposit * (1 + r/100)^x
  // We just scan from x=1 to 120
  const q = 1 + (r / 100);
  let breakpointMonth = -1;
  for (let x = 1; x <= 120; x++) {
    const anVal = anSave * x;
    const binhVal = binhDeposit * Math.pow(q, x);
    if (binhVal > anVal && breakpointMonth === -1) {
      breakpointMonth = x;
      break;
    }
  }

  const curvePoints = useMemo(() => {
    const width = 200;
    const height = 150;
    const maxMonths = 60;
    
    // We scale Y based on whatever is max at x=60
    const maxAn = anSave * maxMonths;
    const maxBinh = binhDeposit * Math.pow(q, maxMonths);
    const maxY = Math.max(maxAn, maxBinh) * 1.1; // 10% padding

    const anPts = [];
    const binhPts = [];

    for (let x = 0; x <= maxMonths; x++) {
      const px = (x / maxMonths) * width;
      
      const anY = anSave * x;
      const pyAn = height - (anY / maxY) * height;
      anPts.push(`${px},${pyAn}`);
      
      const binhY = binhDeposit * Math.pow(q, x);
      const pyBinh = height - (binhY / maxY) * height;
      binhPts.push(`${px},${pyBinh}`);
    }

    return { anPts: anPts.join(' '), binhPts: binhPts.join(' '), maxY, maxMonths, width, height };
  }, [anSave, binhDeposit, q]);

  return (
    <div className="w-full flex flex-col items-center gap-6 p-4 sm:p-6 min-h-[450px]">
      <div className="text-center font-bold text-gray-700 text-lg max-w-lg mb-2">
        "Kéo thanh trượt để tìm điểm bùng phát — tháng mà đường cong Lãi kép vượt lên đường thẳng Tiết kiệm đều."
      </div>

      <div className="flex flex-col md:flex-row w-full gap-6">
        {/* Left: Controls */}
        <div className="flex-1 flex flex-col gap-6 p-6 rounded-xl bg-gray-50 border border-gray-200">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between font-bold text-sm">
              <span className="text-gray-500">An (Tiết kiệm đều/tháng)</span>
              <span className="text-green-600">{anSave}k</span>
            </div>
            <input type="range" min="200" max="1000" step="50" value={anSave} onChange={e => setAnSave(Number(e.target.value))} className="accent-green-500" />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between font-bold text-sm">
              <span className="text-gray-500">Bình (Gửi vốn 1 lần)</span>
              <span className="text-blue-600">{binhDeposit}k</span>
            </div>
            <input type="range" min="1000" max="20000" step="500" value={binhDeposit} onChange={e => setBinhDeposit(Number(e.target.value))} className="accent-blue-500" />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between font-bold text-sm">
              <span className="text-gray-500">Lãi suất (Bình)</span>
              <span className="text-blue-600">{r}%/tháng</span>
            </div>
            <input type="range" min="0.3" max="1.5" step="0.1" value={r} onChange={e => setR(Number(e.target.value))} className="accent-blue-500" />
          </div>

          <div className="mt-4 flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Điểm bùng phát</div>
            {breakpointMonth > 0 && breakpointMonth <= 120 ? (
              <div className="flex items-end gap-2 text-red-500">
                <div className="text-3xl font-black">Tháng {breakpointMonth}</div>
              </div>
            ) : (
              <div className="text-xl font-bold text-gray-400">Ngoài 10 năm (&gt;120T)</div>
            )}
          </div>
        </div>

        {/* Right: Chart */}
        <div className="flex-1 p-6 rounded-xl bg-white border border-gray-200 relative overflow-hidden flex flex-col items-center">
          <div className="text-xs font-bold text-gray-400 mb-4 uppercase">Góc nhìn 5 năm (60 tháng)</div>
          
          <div className="relative" style={{ width: curvePoints.width, height: curvePoints.height, borderLeft: '2px solid var(--grid-line)', borderBottom: '2px solid var(--grid-line)' }}>
            <svg width={curvePoints.width} height={curvePoints.height} className="absolute inset-0 overflow-visible">
              {/* An (Linear) */}
              <polyline points={curvePoints.anPts} fill="none" stroke="var(--money)" strokeWidth="3" />
              {/* Bình (Exponential) */}
              <polyline points={curvePoints.binhPts} fill="none" stroke="var(--time-var)" strokeWidth="3" />

              {/* Intersection dot */}
              {breakpointMonth > 0 && breakpointMonth <= 60 && (
                <motion.circle
                  cx={(breakpointMonth / curvePoints.maxMonths) * curvePoints.width}
                  cy={curvePoints.height - ((binhDeposit * Math.pow(q, breakpointMonth)) / curvePoints.maxY) * curvePoints.height}
                  r="6" fill="white" stroke="red" strokeWidth="2"
                  animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 1 }}
                />
              )}
            </svg>
          </div>
          
          <div className="flex gap-4 mt-6 text-xs font-bold">
            <div className="flex items-center gap-1"><div className="w-3 h-3 bg-[var(--money)] rounded-sm" /> An</div>
            <div className="flex items-center gap-1"><div className="w-3 h-3 bg-[var(--time-var)] rounded-sm" /> Bình</div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isSuccess && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="px-6 py-3 bg-red-50 text-red-700 border-2 border-red-300 rounded-xl font-bold shadow-sm"
          >
            🎯 Đã tìm thấy! Với 500k vs 5000k lãi 0.6%, Bình sẽ chính thức vượt An vào Tháng thứ 12!
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
