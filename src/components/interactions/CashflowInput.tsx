import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { InteractionProps } from '@/types/lesson';
import { CheckCircle2 } from 'lucide-react';

export const CashflowInput: React.FC<InteractionProps> = ({ variables, onComplete }) => {
  const [values, setValues] = useState<string[]>(['', '', '']);
  const [activeInput, setActiveInput] = useState<number>(0);
  const [showFormula, setShowFormula] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const months = variables?.months || 3;
  const currency = variables?.currency || 'k';

  const allFilled = values.every(v => v !== '');

  const handleInputChange = (idx: number, val: string) => {
    const num = val.replace(/[^0-9]/g, ''); // only allow digits
    const newValues = [...values];
    newValues[idx] = num;
    setValues(newValues);
    if (num && idx < months - 1) {
      setActiveInput(idx + 1);
    }
  };

  const handleComplete = () => {
    setShowFormula(true);
    setTimeout(() => {
      setIsCompleted(true);
      onComplete(true, 100);
    }, 1500);
  };

  // Coordinates for the chart
  const getCoordinates = (idx: number, val: string) => {
    if (!val) return { x: 0, y: 200 };
    const num = parseInt(val, 10);
    // arbitrary scaling for visual: max expected ~5000k. y=200 is 0. y=40 is 5000
    // so y = 200 - (num/5000)*160
    const boundedNum = Math.min(Math.max(num, 0), 5000);
    const y = 200 - (boundedNum / 5000) * 160;
    const x = 50 + idx * 80;
    return { x, y };
  };

  const points = values.map((v, i) => getCoordinates(i, v));
  const pathData = points.filter((p, i) => values[i]).map((p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`)).join(' ');

  return (
    <div className="w-full h-full flex flex-col p-6 text-slate-800">
      <div className="flex-1 flex flex-col items-center justify-center relative">
        {/* Chart Area */}
        <div className="w-full max-w-sm h-64 mb-8 relative border-b-2 border-l-2 border-slate-200">
          <svg viewBox="0 0 300 240" className="w-full h-full overflow-visible">
            {/* Grid lines */}
            {[0, 1, 2, 3, 4].map(i => (
              <line key={i} x1="0" y1={40 + i*40} x2="300" y2={40 + i*40} stroke="var(--grid-line)" strokeWidth="1" strokeDasharray="4 4" />
            ))}
            
            {/* Path */}
            {allFilled && (
              <motion.path
                d={pathData}
                fill="none"
                stroke="var(--money)"
                strokeWidth="3"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, ease: "easeInOut" }}
              />
            )}

            {/* Points */}
            <AnimatePresence>
              {values.map((v, i) => v && (
                <motion.g 
                  key={i}
                  initial={{ opacity: 0, y: 0 }}
                  animate={{ opacity: 1, y: points[i].y }}
                  transition={{ type: "spring", bounce: 0.5 }}
                >
                  <circle cx={points[i].x} cy={0} r="6" fill="var(--money)" stroke="white" strokeWidth="2" />
                  <text x={points[i].x} y={-15} fontSize="12" fill="var(--money)" textAnchor="middle" fontWeight="bold">
                    {v}{currency}
                  </text>
                </motion.g>
              ))}
            </AnimatePresence>
            
            {/* X Axis Labels */}
            <text x="50" y="220" fontSize="12" fill="var(--ink-secondary)" textAnchor="middle">T1</text>
            <text x="130" y="220" fontSize="12" fill="var(--ink-secondary)" textAnchor="middle">T2</text>
            <text x="210" y="220" fontSize="12" fill="var(--ink-secondary)" textAnchor="middle">T3</text>
          </svg>

          {/* Formula Reveal */}
          <AnimatePresence>
            {showFormula && (
              <motion.div 
                className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <motion.div 
                  className="text-2xl font-bold px-6 py-3 rounded-2xl flex items-center gap-2"
                  style={{ color: 'var(--formula)', border: '2px solid var(--formula)' }}
                  initial={{ scale: 0.8, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  transition={{ type: "spring", delay: 0.2 }}
                >
                  (u₁, u₂, u₃) = ({values.join(', ')})
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Inputs */}
        <div className="flex justify-center gap-6 mb-8 w-full">
          {values.map((v, i) => (
            <div key={i} className="flex flex-col items-center">
              <label className="text-sm text-slate-500 font-medium mb-2 uppercase tracking-wider">Tháng {i + 1}</label>
              <div className="flex items-center gap-1">
                <input
                  type="text"
                  value={v}
                  onChange={(e) => handleInputChange(i, e.target.value)}
                  onFocus={() => setActiveInput(i)}
                  className={`w-20 text-center font-mono text-xl py-2 bg-transparent border-b-2 outline-none transition-colors
                    ${activeInput === i ? 'border-[var(--time-var)] text-[var(--time-var)]' : 'border-slate-300 text-slate-700'}`}
                  placeholder="0"
                  disabled={isCompleted}
                />
                <span className="text-slate-400 font-medium">{currency}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Action Button */}
        <AnimatePresence>
          {allFilled && !showFormula && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={handleComplete}
              className="px-8 py-3 rounded-full font-bold text-white shadow-lg flex items-center gap-2"
              style={{ background: 'var(--formula)' }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Tạo Dãy Số <CheckCircle2 className="w-5 h-5" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
