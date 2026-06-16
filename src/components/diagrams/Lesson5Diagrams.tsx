import React from 'react';
import { motion } from 'framer-motion';

export const HalflifeStoryDiagram = () => {
  return (
    <div className="w-full py-8 flex flex-col items-center gap-6">
      <div className="text-sm font-bold text-gray-500 uppercase">Sức mua còn lại</div>
      
      <div className="relative w-64 h-48 border-l-2 border-b-2 border-gray-300 flex items-end">
        {/* Y Axis markings */}
        <div className="absolute -left-12 top-0 text-xs font-mono text-gray-400">100%</div>
        <div className="absolute -left-10 top-1/2 text-xs font-mono text-red-500 font-bold">50%</div>
        <div className="absolute -left-8 bottom-0 text-xs font-mono text-gray-400">0%</div>
        
        {/* 50% dotted line */}
        <div className="absolute left-0 right-0 top-1/2 border-b-2 border-dashed border-red-300 z-0" />
        
        {/* Animated Bar going down to 50% */}
        <motion.div
          className="w-full bg-gradient-to-t from-red-500 to-red-400 opacity-80"
          initial={{ height: '100%' }}
          animate={{ height: '50%' }}
          transition={{ duration: 2, delay: 0.5, ease: 'easeInOut' }}
        />
        
        {/* Question Mark on 50% line */}
        <motion.div
          className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-1 border-2 border-red-500 text-red-500 font-bold"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 2.5 }}
        >
          ? năm
        </motion.div>
      </div>
    </div>
  );
};

export const HalflifeIntersectionDiagram = () => {
  // Points for 0.95^x curve
  const points = [];
  const width = 300;
  const height = 150;
  for (let x = 0; x <= 30; x++) {
    const yVal = Math.pow(0.95, x); // 0 to 1
    const px = (x / 30) * width;
    const py = (1 - yVal) * height; // Invert Y
    points.push(`${px},${py}`);
  }
  
  // Intersection point: 0.95^x = 0.5 => x = ln(0.5)/ln(0.95) ~ 13.51
  const ix = (13.51 / 30) * width;
  const iy = 0.5 * height;

  return (
    <div className="w-full py-8 flex flex-col items-center overflow-visible">
      <div className="relative" style={{ width, height }}>
        {/* Axes */}
        <div className="absolute left-0 bottom-0 w-full h-px bg-gray-300" />
        <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-300" />
        
        {/* Curve */}
        <svg width={width} height={height} className="absolute inset-0 overflow-visible">
          <motion.polyline
            points={points.join(' ')}
            fill="none"
            stroke="var(--debt)"
            strokeWidth="3"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "linear" }}
          />
          
          {/* 50% Line */}
          <motion.line
            x1="0" y1={iy} x2={width} y2={iy}
            stroke="var(--debt)"
            strokeWidth="2"
            strokeDasharray="4 4"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, delay: 2 }}
          />
          
          {/* Intersection Point */}
          <motion.circle
            cx={ix} cy={iy} r="6" fill="white" stroke="var(--debt)" strokeWidth="3"
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.5, 1] }}
            transition={{ delay: 3, duration: 0.5 }}
          />
          
          {/* Vertical Drop Line */}
          <motion.line
            x1={ix} y1={iy} x2={ix} y2={height}
            stroke="gray" strokeWidth="2" strokeDasharray="2 2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 3.5 }}
          />
        </svg>
        
        <motion.div
          className="absolute font-bold text-xs bg-red-100 text-red-700 px-2 py-1 rounded"
          style={{ left: ix - 20, top: height + 10 }}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 4 }}
        >
          ~13.5 năm
        </motion.div>
      </div>
    </div>
  );
};

export const LogarithmCompareDiagram = () => {
  return (
    <div className="w-full flex justify-center py-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-gray-50 p-6 rounded-xl border border-gray-200">
        
        {/* Lũy thừa */}
        <div className="flex flex-col gap-4">
          <div className="font-bold text-sm text-gray-500 uppercase">1. Lũy Thừa</div>
          <div className="text-xs text-gray-400 italic">"Biết số mũ, tìm kết quả"</div>
          <div className="flex items-center gap-3 font-mono text-2xl font-black">
            <span className="text-gray-700">2</span>
            <span className="text-blue-500 -mt-4 text-xl">3</span>
            <span className="text-gray-400">=</span>
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="text-blue-600 bg-blue-100 px-3 py-1 rounded-lg border border-blue-200"
            >
              8
            </motion.span>
          </div>
        </div>

        {/* Logarit */}
        <div className="flex flex-col gap-4">
          <div className="font-bold text-sm text-gray-500 uppercase">2. Logarit</div>
          <div className="text-xs text-gray-400 italic">"Biết kết quả, tìm số mũ"</div>
          <div className="flex items-center gap-3 font-mono text-2xl font-black">
            <span className="text-gray-700">log</span>
            <span className="text-gray-500 mt-4 text-sm">2</span>
            <span className="text-gray-700">(8)</span>
            <span className="text-gray-400">=</span>
            <motion.span
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.5, type: 'spring' }}
              className="text-red-600 bg-red-100 px-3 py-1 rounded-lg border border-red-200"
            >
              3
            </motion.span>
          </div>
        </div>

      </div>
    </div>
  );
};
