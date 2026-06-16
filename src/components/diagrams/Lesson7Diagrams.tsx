import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const TwoFriendsDiagram = () => {
  return (
    <div className="w-full flex justify-center py-10">
      <div className="flex gap-12 sm:gap-24 items-end">
        
        {/* An - Piggy bank */}
        <div className="flex flex-col items-center gap-4">
          <motion.div 
            className="w-24 h-24 bg-pink-100 border-4 border-pink-400 rounded-full flex items-center justify-center text-3xl shadow-sm relative"
            animate={{ scale: [1, 1.05, 1], rotate: [0, -5, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🐷
            <div className="absolute -top-3 -right-3 bg-white border-2 border-pink-400 text-pink-500 text-xs font-bold px-2 py-1 rounded-full shadow-sm">
              +500k/tháng
            </div>
          </motion.div>
          <div className="text-center">
            <div className="font-black text-xl text-gray-800">An</div>
            <div className="text-sm font-bold text-gray-500">Tiết kiệm đều (CSC)</div>
          </div>
        </div>

        <div className="text-2xl font-black text-gray-300 pb-8">VS</div>

        {/* Bình - Bank */}
        <div className="flex flex-col items-center gap-4">
          <motion.div 
            className="w-24 h-24 bg-blue-100 border-4 border-blue-400 rounded-lg flex items-center justify-center text-3xl shadow-sm relative"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            🏦
            <div className="absolute -top-3 -right-3 bg-white border-2 border-blue-400 text-blue-500 text-xs font-bold px-2 py-1 rounded-full shadow-sm">
              5tr (Lãi 0.6%/tháng)
            </div>
          </motion.div>
          <div className="text-center">
            <div className="font-black text-xl text-gray-800">Bình</div>
            <div className="text-sm font-bold text-gray-500">Lãi kép một lần (CSN)</div>
          </div>
        </div>

      </div>
    </div>
  );
};

export const RaceOfTwoLinesDiagram = () => {
  const [stage, setStage] = useState(0); // 0: draw lines, 1: wait, 2: zoom out

  useEffect(() => {
    const t1 = setTimeout(() => setStage(1), 3000);
    const t2 = setTimeout(() => setStage(2), 6000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  // An: y = 500x
  // Bình: y = 5000 * 1.006^x

  // Stage 0/1: viewport x: 0-20, y: 0-15000
  // Stage 2: viewport x: 0-60, y: 0-40000

  const width = 300;
  const height = 200;

  const maxX = stage === 2 ? 60 : 20;
  const maxY = stage === 2 ? 40000 : 15000;

  const generatePoints = (func: (x: number) => number) => {
    const pts = [];
    for (let x = 0; x <= maxX; x++) {
      const px = (x / maxX) * width;
      const yVal = func(x);
      const py = height - (yVal / maxY) * height;
      pts.push(`${px},${py}`);
    }
    return pts.join(' ');
  };

  const anPoints = generatePoints(x => 500 * x);
  const binhPoints = generatePoints(x => 5000 * Math.pow(1.006, x));

  // Intersection around x=11 (approx 5500)
  const ix = (11.5 / maxX) * width;
  const iy = height - (5750 / maxY) * height;

  return (
    <div className="w-full py-6 flex flex-col items-center">
      <div className="text-xs font-bold text-gray-400 mb-4 uppercase">
        {stage === 2 ? 'Góc nhìn 5 năm (60 tháng)' : 'Góc nhìn gần (20 tháng đầu)'}
      </div>
      
      <div className="relative overflow-hidden" style={{ width, height, borderLeft: '2px solid var(--grid-line)', borderBottom: '2px solid var(--grid-line)' }}>
        
        <svg width={width} height={height} className="absolute inset-0 overflow-visible transition-all duration-1000">
          {/* An (Linear) */}
          <motion.polyline
            points={anPoints}
            fill="none" stroke="var(--money)" strokeWidth="3"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2 }}
          />
          {/* Bình (Exponential) */}
          <motion.polyline
            points={binhPoints}
            fill="none" stroke="var(--time-var)" strokeWidth="3"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, delay: 0.5 }}
          />

          {/* Intersection Ping */}
          <AnimatePresence>
            {stage > 0 && (
              <motion.circle
                cx={ix} cy={iy} r="6" fill="white" stroke="red" strokeWidth="2"
                initial={{ scale: 0, opacity: 0 }} animate={{ scale: [1, 2, 1], opacity: 1 }}
                transition={{ duration: 1, repeat: stage === 1 ? Infinity : 0 }}
              />
            )}
          </AnimatePresence>
        </svg>

        {stage === 2 && (
          <motion.div
            className="absolute left-1/2 top-4 -translate-x-1/2 bg-red-100 text-red-600 font-bold text-xs px-2 py-1 rounded shadow-sm border border-red-200"
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
          >
            Đường cong (Lãi kép) bỏ xa!
          </motion.div>
        )}
      </div>

      <div className="flex gap-4 mt-4 text-xs font-bold">
        <div className="flex items-center gap-1"><div className="w-3 h-3 bg-[var(--money)] rounded-sm" /> An (Tiết kiệm đều)</div>
        <div className="flex items-center gap-1"><div className="w-3 h-3 bg-[var(--time-var)] rounded-sm" /> Bình (Lãi kép)</div>
      </div>
    </div>
  );
};
