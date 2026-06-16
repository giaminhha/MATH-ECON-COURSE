import React from 'react';
import { motion } from 'framer-motion';

const drawLine = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: { 
    pathLength: 1, opacity: 1,
    transition: { pathLength: { duration: 1.5, ease: "easeInOut" }, opacity: { duration: 0.3 } }
  }
};

export const GrowthComparisonChart = () => {
  return (
    <div className="w-full h-full relative flex items-center justify-center min-h-[250px]">
      <svg viewBox="-20 -20 300 240" className="w-full h-full max-w-sm">
        {/* Axes */}
        <motion.line x1="0" y1="200" x2="250" y2="200" stroke="var(--ink-faint)" strokeWidth="2" 
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1 }} />
        <motion.line x1="0" y1="200" x2="0" y2="0" stroke="var(--ink-faint)" strokeWidth="2" 
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1 }} />
        
        {/* Labels */}
        <text x="250" y="215" fontSize="12" fill="var(--ink-secondary)" textAnchor="end">Tháng</text>
        <text x="-10" y="10" fontSize="12" fill="var(--ink-secondary)" textAnchor="end">VNĐ</text>

        {/* Linear growth (y = 500 + 500x) */}
        {/* Scale: x: 1 unit = 40px, y: 1000 = 40px */}
        <motion.path 
          d="M 0 180 L 40 160 L 80 140 L 120 120 L 160 100 L 200 80 L 240 60"
          fill="none" stroke="var(--money)" strokeWidth="3"
          initial="hidden" animate="visible" variants={drawLine} transition={{ delay: 0.5 }}
        />
        <motion.text x="240" y="50" fontSize="12" fill="var(--money)" textAnchor="end"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.0 }}
        >
          Tăng đều
        </motion.text>

        {/* Exponential growth (y = 500 * 1.5^x) */}
        {/* x=0, y=500 -> 180 */}
        {/* x=1, y=750 -> 170 */}
        {/* x=2, y=1125 -> 155 */}
        {/* x=3, y=1687 -> 132 */}
        {/* x=4, y=2531 -> 98 */}
        {/* x=5, y=3796 -> 48 */}
        {/* x=5.5, y=4647 -> 14 */}
        <motion.path 
          d="M 0 180 Q 80 170 120 132 T 200 48"
          fill="none" stroke="var(--debt)" strokeWidth="3"
          initial="hidden" animate="visible" variants={drawLine} transition={{ delay: 1.0 }}
        />
        <motion.text x="180" y="40" fontSize="12" fill="var(--debt)" textAnchor="end"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }}
        >
          Gấp đôi
        </motion.text>
      </svg>
    </div>
  );
};
