"use client";

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

export const HalflifeLens = ({ onComplete }: { onComplete?: (c: boolean, s: number) => void }) => {
  const [lensX, setLensX] = useState(0); // 0 to 100 percentage
  const [isFound, setIsFound] = useState(false);
  
  const width = 300;
  const height = 200;
  const maxYears = 30;
  
  // y = 0.95^x
  const q = 0.95;
  
  const curvePoints = useMemo(() => {
    const pts = [];
    for (let x = 0; x <= maxYears; x++) {
      const px = (x / maxYears) * width;
      const yVal = Math.pow(q, x);
      const py = (1 - yVal) * height;
      pts.push(`${px},${py}`);
    }
    return pts.join(' ');
  }, []);

  const currentYear = (lensX / 100) * maxYears;
  const currentYVal = Math.pow(q, currentYear);
  const currentPx = (lensX / 100) * width;
  const currentPy = (1 - currentYVal) * height;

  useEffect(() => {
    if (Math.abs(currentYVal - 0.5) < 0.02) {
      if (!isFound) {
        setIsFound(true);
        if (onComplete) onComplete(true, 100);
      }
    } else {
      setIsFound(false);
    }
  }, [currentYVal, isFound, onComplete]);

  return (
    <div className="w-full flex flex-col items-center gap-6 py-4">
      <div className="text-center text-sm font-bold text-gray-500 mb-2">
        Kéo lăng kính để tìm năm mà sức mua còn 50%
      </div>
      
      <div className="relative mb-8" style={{ width, height, userSelect: 'none' }}>
        {/* Grid lines */}
        <div className="absolute left-0 bottom-0 w-full h-px bg-gray-300" />
        <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-300" />
        
        {/* The 50% Line */}
        <div className="absolute left-0 w-full h-px border-t-2 border-dashed border-red-300" style={{ top: height * 0.5 }} />
        <div className="absolute -left-8 text-[10px] font-bold text-red-400" style={{ top: height * 0.5 - 6 }}>50%</div>

        <svg width={width} height={height} className="absolute inset-0 overflow-visible">
          <polyline
            points={curvePoints}
            fill="none"
            stroke="var(--grid-line)"
            strokeWidth="4"
          />
        </svg>

        {/* The Lens / Crosshair */}
        <div 
          className="absolute top-0 bottom-0 w-0 border-l-2 border-blue-500 z-10"
          style={{ left: currentPx }}
        >
          {/* Intersection Dot */}
          <motion.div
            className={`absolute rounded-full -translate-x-1/2 -translate-y-1/2 flex items-center justify-center transition-colors ${isFound ? 'bg-green-500 border-4 border-green-200 w-6 h-6 shadow-[0_0_15px_rgba(34,197,94,0.6)]' : 'bg-blue-500 w-4 h-4'}`}
            style={{ top: currentPy }}
            animate={isFound ? { scale: [1, 1.2, 1] } : {}}
            transition={{ repeat: isFound ? Infinity : 0, duration: 1 }}
          />

          {/* Label Tooltip */}
          <div 
            className={`absolute top-full mt-2 -translate-x-1/2 whitespace-nowrap px-3 py-1 rounded-lg text-white font-bold text-xs transition-colors ${isFound ? 'bg-green-500' : 'bg-blue-500'}`}
          >
            {isFound ? (
              <span>🎉 n ≈ {currentYear.toFixed(1)} năm</span>
            ) : (
              <span>{currentYear.toFixed(1)} năm ({(currentYVal * 100).toFixed(1)}%)</span>
            )}
          </div>
        </div>

        {/* Interactive Overlay */}
        <div 
          className="absolute inset-0 w-full h-full cursor-crosshair z-20 touch-none"
          onPointerDown={(e) => {
            e.currentTarget.setPointerCapture(e.pointerId);
            const rect = e.currentTarget.getBoundingClientRect();
            let newX = ((e.clientX - rect.left) / rect.width) * 100;
            setLensX(Math.max(0, Math.min(100, newX)));
          }}
          onPointerMove={(e) => {
            if (e.buttons > 0) {
              const rect = e.currentTarget.getBoundingClientRect();
              let newX = ((e.clientX - rect.left) / rect.width) * 100;
              setLensX(Math.max(0, Math.min(100, newX)));
            }
          }}
        />
      </div>
    </div>
  );
};
