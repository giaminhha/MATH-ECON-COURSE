import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const CellDivisionDiagram = () => {
  // We'll show 4 generations: 1 -> 2 -> 4 -> 8
  const generations = [1, 2, 4, 8];

  return (
    <div className="w-full py-8 flex flex-col items-center gap-6">
      <div className="text-sm font-bold text-gray-500 uppercase">Sự sinh sôi của Lãi Kép</div>
      
      <div className="flex flex-col items-center gap-4 w-full overflow-hidden">
        {generations.map((count, genIdx) => (
          <div key={genIdx} className="flex items-center justify-center gap-2 relative h-12 w-full">
            {/* Connection lines from previous generation to this generation */}
            {genIdx > 0 && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 + (genIdx - 1) * 1.5, duration: 0.5 }}
              >
                <div className="text-xs text-green-300 font-bold -mt-8">×2</div>
              </motion.div>
            )}

            {Array.from({ length: count }).map((_, i) => (
              <motion.div
                key={i}
                className="w-8 h-8 rounded-full bg-green-100 border-2 border-green-500 flex items-center justify-center text-[10px] font-bold text-green-700 shadow-sm"
                initial={{ scale: 0, opacity: 0, y: -20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ delay: 1.0 + genIdx * 1.5, type: 'spring' }}
              >
                $
              </motion.div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export const SimpleVsCompoundDiagram = () => {
  // Thay đổi số năm và lãi suất để sự khác biệt rõ rệt hơn (ví dụ: 10% mỗi năm, chu kỳ dài hơn)
  const years = [2, 4, 6, 8, 10];
  const principal = 10000;
  const r = 0.15; // 15%

  const simpleInterest = years.map(y => principal * r * y);
  const compoundInterest = years.map(y => principal * Math.pow(1 + r, y) - principal);

  const maxVal = principal * Math.pow(1 + r, years[years.length - 1]) - principal;

  return (
    <div className="w-full flex flex-col md:flex-row justify-center gap-8 py-6">
      
      {/* Lãi Đơn */}
      <div className="flex flex-col items-center gap-2">
        <div className="text-sm font-bold text-gray-500 uppercase">Lãi Đơn</div>
        <div className="flex items-end gap-1 h-32 border-b-2 border-gray-300 px-2 pb-1">
          {simpleInterest.map((val, i) => (
            <motion.div
              key={i}
              className="w-8 bg-yellow-400 rounded-t-sm"
              initial={{ height: 0 }}
              animate={{ height: `${(val / maxVal) * 100}%` }}
              transition={{ delay: 0.5 + i * 0.2 }}
            />
          ))}
        </div>
        <div className="text-xs text-gray-400 font-bold italic mt-2">Chỉ tính trên vốn gốc</div>
      </div>

      <div className="flex items-center justify-center text-gray-300 font-black text-2xl">VS</div>

      {/* Lãi Kép */}
      <div className="flex flex-col items-center gap-2">
        <div className="text-sm font-bold text-green-600 uppercase">Lãi Kép</div>
        <div className="flex items-end gap-1 h-32 border-b-2 border-green-300 px-2 pb-1">
          {compoundInterest.map((val, i) => (
            <motion.div
              key={i}
              className="w-8 bg-green-500 rounded-t-sm"
              initial={{ height: 0 }}
              animate={{ height: `${(val / maxVal) * 100}%` }}
              transition={{ delay: 2.0 + i * 0.2 }}
            />
          ))}
        </div>
        <div className="text-xs text-green-600 font-bold italic mt-2">Lãi mẹ đẻ lãi con</div>
      </div>

    </div>
  );
};

export const BuffetBarsDiagram = () => {
  return (
    <div className="w-full py-8 flex justify-center">
      <div className="flex items-end gap-6 h-48 border-b-2 border-gray-300 px-4 pb-1">
        {[
          { label: '10 năm', val: 2.59, delay: 0.5 },
          { label: '20 năm', val: 6.73, delay: 1.5 },
          { label: '30 năm', val: 17.45, delay: 2.5 }
        ].map((item, i) => (
          <div key={i} className="flex flex-col items-center gap-2">
            <motion.div
              className="w-16 bg-gradient-to-t from-green-600 to-green-400 rounded-t-lg flex flex-col items-center justify-start relative overflow-hidden"
              initial={{ height: 0 }}
              animate={{ height: Math.max(28, (item.val / 17.45) * 140) }} // max height 140px, min 28px for text
              transition={{ delay: item.delay, duration: 1, type: 'spring', bounce: 0.2 }}
            >
              <motion.span 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ delay: item.delay + 0.5 }}
                className="text-white font-bold text-xs mt-2"
              >
                ×{item.val}
              </motion.span>
            </motion.div>
            <div className="text-xs font-bold text-gray-500">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const BeatInflationDiagram = () => {
  const width = 300;
  const height = 150;
  
  const inflationPts = [];
  const interestPts = [];
  
  for (let x = 0; x <= 20; x++) {
    const px = (x / 20) * width;
    
    // Inflation 4% -> 0.96^x
    const yInf = Math.pow(0.96, x);
    inflationPts.push(`${px},${height * 0.5 + (1 - yInf) * 75}`); // Starts at height * 0.5, goes down
    
    // Interest 7% -> 1.07^x
    const yInt = Math.pow(1.07, x);
    interestPts.push(`${px},${height * 0.5 - (yInt - 1) * 25}`); // Starts at height * 0.5, goes up
  }

  return (
    <div className="w-full py-8 flex flex-col items-center relative">
      <div className="relative" style={{ width, height }}>
        {/* Origin line (1.0) */}
        <div className="absolute left-0 right-0 border-t-2 border-dashed border-gray-300" style={{ top: height * 0.5 }} />
        <div className="absolute -left-10 text-[10px] font-bold text-gray-400" style={{ top: height * 0.5 - 6 }}>Vốn Gốc</div>
        
        <svg width={width} height={height} className="absolute inset-0 overflow-visible">
          {/* Gap highlight (Between the two curves) */}
          <motion.path
            d={`M ${interestPts[0]} L ${interestPts.slice(1).join(' L ')} L ${[...inflationPts].reverse().join(' L ')} Z`}
            fill="var(--money-light)" opacity="0.3"
            initial={{ opacity: 0 }} animate={{ opacity: 0.3 }} transition={{ delay: 2.5 }}
          />
          
          {/* Inflation Curve */}
          <motion.polyline
            points={inflationPts.join(' ')}
            fill="none" stroke="var(--debt)" strokeWidth="3"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5 }}
          />
          {/* Interest Curve */}
          <motion.polyline
            points={interestPts.join(' ')}
            fill="none" stroke="var(--money)" strokeWidth="3"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, delay: 1 }}
          />
        </svg>

        <motion.div
          className="absolute right-0 top-0 translate-x-full ml-4 text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded border border-green-200"
          initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 3 }}
        >
          Lãi 7%
        </motion.div>
        
        <motion.div
          className="absolute right-0 bottom-0 translate-x-full ml-4 text-xs font-bold text-red-600 bg-red-50 px-2 py-1 rounded border border-red-200"
          initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.5 }}
        >
          Lạm phát 4%
        </motion.div>
      </div>
    </div>
  );
};
