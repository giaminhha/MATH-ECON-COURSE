"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NumberOdometer } from '../diagrams/SharedDiagramComponents';

export const CompoundGrowth = ({ onComplete }: { onComplete?: (c: boolean, s: number) => void }) => {
  const [r, setR] = useState(8); // 1 to 15
  const [n, setN] = useState(1); // 1 to 30
  const [isSuccess, setIsSuccess] = useState(false);

  const principal = 10;
  const q = 1 + (r / 100);
  const un = principal * Math.pow(q, n);

  // Check if they found the answer: r=8, n=10 -> ~21.589
  useEffect(() => {
    if (r === 8 && n === 10 && !isSuccess) {
      setIsSuccess(true);
      if (onComplete) onComplete(true, 100);
    }
  }, [r, n, isSuccess, onComplete]);

  const curvePoints = useMemo(() => {
    const pts = [];
    const width = 200;
    const height = 120;
    const maxVal = principal * Math.pow(1.15, 30); // scale reference
    
    for (let x = 0; x <= 30; x++) {
      const px = (x / 30) * width;
      const yVal = principal * Math.pow(q, x);
      const py = height - (yVal / maxVal) * height;
      pts.push(`${px},${py}`);
    }
    return pts.join(' ');
  }, [q]);

  // Rings visualization
  const rings = Array.from({ length: n }).map((_, i) => {
    const scale = Math.pow(q, i + 1);
    return scale;
  });

  return (
    <div className="w-full flex flex-col items-center gap-6 p-4 sm:p-6 min-h-[400px]">
      
      <div className="text-center font-bold text-gray-700 text-lg max-w-lg mb-2">
        "Bạn có 10tr, gửi tiết kiệm lãi 8%/năm. Sau 10 năm bạn có bao nhiêu tiền?"
      </div>

      <div className="flex flex-col md:flex-row w-full gap-6">
        
        {/* Left: Controls */}
        <div className="flex-1 flex flex-col gap-6 p-6 rounded-xl" style={{ background: 'var(--canvas-card)', border: 'var(--border)' }}>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between font-bold">
              <span className="text-sm text-gray-500">Lãi suất (r)</span>
              <span className="text-green-600">{r}%/năm</span>
            </div>
            <input 
              type="range" min="1" max="15" step="1" 
              value={r} onChange={e => setR(Number(e.target.value))}
              className="w-full accent-green-600"
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between font-bold">
              <span className="text-sm text-gray-500">Thời gian (n)</span>
              <span className="text-blue-600">{n} năm</span>
            </div>
            <input 
              type="range" min="1" max="30" step="1" 
              value={n} onChange={e => setN(Number(e.target.value))}
              className="w-full accent-blue-600"
            />
          </div>

          <div className="mt-4 text-center">
            <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">TỔNG TÀI SẢN</div>
            <div className="flex items-end justify-center gap-2 text-green-600">
              <div className="text-5xl font-black font-mono">
                <NumberOdometer value={un} />
              </div>
              <div className="text-xl font-bold mb-1">tr</div>
            </div>
            <div className="text-sm font-bold mt-2" style={{ color: 'var(--ink-secondary)' }}>
              Tăng trưởng: +{((un / principal - 1) * 100).toFixed(0)}%
            </div>
          </div>
        </div>

        {/* Right: Visualizations */}
        <div className="flex-[1.5] flex flex-col items-center justify-between p-6 rounded-xl gap-4 overflow-hidden relative" style={{ background: 'var(--canvas-card)', border: 'var(--border)' }}>
          
          <div className="text-xs font-bold text-gray-400">PHÂN BÀO LÃI KÉP</div>
          
          {/* Fractal Bubble */}
          <div className="relative w-full flex-1 flex items-center justify-center min-h-[150px]">
            {rings.map((scale, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full border border-green-400/30"
                style={{
                  width: 50 * scale,
                  height: 50 * scale,
                  background: i === rings.length - 1 ? 'rgba(34, 197, 94, 0.1)' : 'transparent',
                  borderWidth: i === rings.length - 1 ? 2 : 1,
                  borderColor: i === rings.length - 1 ? 'rgba(34, 197, 94, 0.8)' : 'rgba(34, 197, 94, 0.3)'
                }}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring' }}
              />
            ))}
            {/* The Core */}
            <div className="absolute w-[50px] h-[50px] rounded-full bg-green-500 shadow-lg flex items-center justify-center text-[10px] font-bold text-white z-10">
              10tr
            </div>
          </div>

          {/* Chart */}
          <div className="w-full h-24 border-b-2 border-l-2 border-gray-200 relative mt-4">
            <svg width="100%" height="100%" viewBox="0 0 200 120" preserveAspectRatio="none" className="overflow-visible">
              <polyline
                points={curvePoints}
                fill="none"
                stroke="var(--money)"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

        </div>
      </div>

      <AnimatePresence>
        {isSuccess && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="px-6 py-3 bg-green-100 text-green-700 border-2 border-green-400 rounded-xl font-bold shadow-sm"
          >
            🎉 Chuẩn xác! Lãi đẻ lãi biến 10tr thành 21.6tr sau 10 năm.
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
