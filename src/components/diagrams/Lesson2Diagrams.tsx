import React from 'react';
import { motion } from 'framer-motion';
import { PiggyBank, CircleDollarSign } from 'lucide-react';
import { NumberOdometer, FlowNode, FlowArrow, DiagramLabel, drawLine, fadeUpLabel } from './SharedDiagramComponents';

// Preset cho vật rớt xuống
const blockDrop: any = {
  hidden: { opacity: 0, y: -50 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', bounce: 0.4 } }
};

// --- PiggyBankDiagram: Cho Slide 1 ---
export const PiggyBankDiagram = () => {
  return (
    <div className="w-full flex items-center justify-center p-4">
      <div className="relative w-64 h-48 flex items-center justify-center">
        {/* Piggy Bank Icon */}
        <motion.div 
          className="absolute z-10 bottom-4"
          initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }}
        >
          <PiggyBank className="w-24 h-24" style={{ color: 'var(--ink-primary)', strokeWidth: 1.5, fill: 'var(--money-light)' }} />
        </motion.div>

        {/* Coins dropping */}
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute top-0 z-0"
            initial="hidden" animate="visible" variants={blockDrop} transition={{ delay: 0.5 + i * 0.4 }}
            style={{ x: -10 + i * 10 }}
          >
            <CircleDollarSign className="w-8 h-8" style={{ color: 'var(--interest)', fill: 'var(--canvas)' }} />
          </motion.div>
        ))}

        {/* Odometer */}
        <div className="absolute right-0 bottom-8 text-2xl font-bold" style={{ color: 'var(--money)' }}>
          <NumberOdometer value={1500} delay={0.5} duration={1.5} suffix="k" prefix="+" />
        </div>
      </div>
    </div>
  );
};

// --- StaircaseDiagram: Cho Slide 2 ---
export const StaircaseDiagram = () => {
  const values = [500, 1000, 1500, 2000, 2500];
  const maxVal = 3000;
  
  const getX = (i: number) => 80 + i * 90;
  const getY = (val: number) => 240 - (val / maxVal) * 200;

  return (
    <div className="w-full relative flex justify-center min-h-[350px]">
      <svg viewBox="0 0 600 300" className="w-full h-full max-w-2xl" style={{ fontFamily: 'var(--font-sans)' }}>
        <defs>
          <marker id="arrow-debt" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <polygon points="0 0, 6 3, 0 6" fill="var(--debt)" />
          </marker>
        </defs>

        {/* Axes */}
        <motion.line x1="40" y1="240" x2="560" y2="240" stroke="var(--grid-line)" strokeWidth="2" initial="hidden" animate="visible" variants={drawLine} />
        <motion.line x1="40" y1="240" x2="40" y2="20" stroke="var(--grid-line)" strokeWidth="2" initial="hidden" animate="visible" variants={drawLine} transition={{ delay: 0.3 }} />
        <text x="560" y="260" fontSize="12" fill="var(--ink-secondary)" textAnchor="end" className="font-sans">Tháng</text>
        <text x="35" y="15" fontSize="12" fill="var(--ink-secondary)" textAnchor="end" className="font-sans">VNĐ (k)</text>

        {/* Conclusion Label - Moved to top left to avoid overlapping */}
        <DiagramLabel x={200} y={40} text="Mỗi bậc cao hơn bậc trước đúng d = 500k" delay={2.5} font="var(--font-hand)" color="var(--ink-secondary)" fontSize="16" />

        {/* Blocks and Hops */}
        {values.map((val, i) => {
          const x = getX(i);
          const y = getY(val);
          const height = 240 - y;
          const nextY = i < values.length - 1 ? getY(values[i+1]) : 0;
          
          return (
            <g key={i}>
              {/* Ticks & Labels */}
              <text x={x + 30} y="260" fontSize="14" fill="var(--ink-primary)" textAnchor="middle" className="font-sans font-bold">T{i+1}</text>
              
              {/* Block */}
              <motion.rect
                x={x} y={240} width="60" rx="4"
                fill="var(--money-light)" stroke="var(--money)" strokeWidth="2"
                initial={{ height: 0, y: 0 }}
                animate={{ height: height, y: -height }}
                transition={{ delay: 0.8 + i * 0.2, type: 'tween', ease: 'easeOut', duration: 0.5 }}
              />
              <motion.text
                x={x + 30} y={y - 12} fontSize="14" fill="var(--ink-primary)" textAnchor="middle" fontWeight="bold" className="font-sans"
                initial="hidden" animate="visible" variants={fadeUpLabel} transition={{ delay: 1.0 + i * 0.2 }}
              >
                {val}
              </motion.text>
              
              {/* Diff arrow (Curved Hop) */}
              {i < values.length - 1 && (
                <g>
                  <motion.path
                    d={`M ${x + 30} ${y - 30} Q ${x + 75} ${nextY - 40} ${getX(i+1) + 30} ${nextY - 30}`}
                    fill="none" stroke="var(--debt)" strokeWidth="2" strokeDasharray="4 4"
                    initial="hidden" animate="visible" variants={drawLine} transition={{ delay: 1.5 + i * 0.2 }}
                    markerEnd="url(#arrow-debt)"
                  />
                  <motion.text
                    x={x + 75} y={nextY - 45} fontSize="13" fill="var(--debt)" textAnchor="middle" fontWeight="bold" className="font-sans"
                    initial="hidden" animate="visible" variants={fadeUpLabel} transition={{ delay: 1.8 + i * 0.2 }}
                  >
                    +500
                  </motion.text>
                </g>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
};

// --- FormulaChainDiagram: Cho Slide 3 (Theorem) ---
export const FormulaChainDiagram = () => {
  const nodes = ['u₁', 'u₂', 'u₃', '...', 'uₙ'];
  return (
    <div className="w-full relative flex justify-center" style={{ height: '100px' }}>
      <svg viewBox="0 0 500 100" className="w-full h-full max-w-lg">
        {nodes.map((n, i) => (
          <g key={i}>
            <FlowNode x={50 + i * 100} y={50} label={n} width={50} color="var(--money)" delay={i * 0.15} />
            {i < nodes.length - 1 && (
              <FlowArrow x1={75 + i * 100} y1={50} x2={125 + i * 100} y2={50} color="var(--ink-secondary)" label="+d" delay={i * 0.15 + 0.1} />
            )}
          </g>
        ))}
      </svg>
    </div>
  );
};

// --- DecodeFormulaDiagram: Cho Slide 4 ---
export const DecodeFormulaDiagram = () => {
  const numBlocks = 12;
  const getX = (i: number) => 10 + i * 32;
  const getY = (i: number) => 160 - i * 12; // Adjust so block 0 has height 20

  return (
    <div className="w-full relative flex justify-center min-h-[220px]">
      <svg viewBox="0 0 400 200" className="w-full h-full" style={{ fontFamily: 'var(--font-sans)' }}>
        {/* Background blocks 1 to 11 */}
        {Array.from({ length: 11 }).map((_, i) => {
          const h = 180 - getY(i);
          return (
            <motion.rect
              key={i}
              x={getX(i)} y={180} width="28" rx="2"
              fill="var(--money-light)" stroke="var(--money)" strokeWidth="1" opacity={0.6}
              initial={{ height: 0, y: 0 }} animate={{ height: h, y: -h }} transition={{ delay: i * 0.05 }}
            />
          );
        })}
        
        {/* Block 12 (Target) */}
        <motion.rect
          x={getX(11)} y={180} width="28" rx="2"
          fill="var(--interest)" stroke="var(--interest)" strokeWidth="2"
          initial={{ height: 0, y: 0 }} animate={{ height: 180 - getY(11), y: -(180 - getY(11)) }} transition={{ delay: 0.8 }}
        />
        
        <motion.text
          x={getX(11) + 14} y={getY(11) - 10} fontSize="16" fill="var(--interest)" textAnchor="middle" fontWeight="bold" className="font-sans"
          initial="hidden" animate="visible" variants={fadeUpLabel} transition={{ delay: 1.2 }}
        >
          6tr
        </motion.text>
        
        <DiagramLabel x={getX(11) + 14} y={195} text="T12" delay={1.2} fontSize="14" font="inherit" fontWeight="bold" color="var(--interest)" />
        <DiagramLabel x={getX(0) + 14} y={195} text="T1" delay={0.2} fontSize="14" font="inherit" fontWeight="bold" color="var(--ink-secondary)" />
      </svg>
    </div>
  );
};

// --- WhyPlusDiagram: Cho Slide 6 ---
export const WhyPlusDiagram = () => {
  const randomHeights = [60, 140, 40, 180, 20];
  const arithHeights = [40, 80, 120, 160, 200];
  
  return (
    <div className="w-full relative flex justify-center min-h-[300px]">
      <svg viewBox="0 0 600 280" className="w-full h-full">
        {/* Trái: Dãy Bất Kỳ */}
        <DiagramLabel x={150} y={30} text="Dãy số BẤT KỲ" font="var(--font-heading)" fontWeight="bold" />
        {randomHeights.map((h, i) => (
          <motion.rect
            key={`r-${i}`}
            x={50 + i * 40} y={240} width="30" rx="2"
            fill="var(--grid-line)" stroke="var(--ink-faint)" strokeWidth="1" opacity={0.8}
            initial={{ height: 0, y: 0 }} animate={{ height: h, y: -h }} transition={{ delay: i * 0.1 }}
          />
        ))}

        {/* Phải: Cấp số CỘNG */}
        <DiagramLabel x={450} y={30} text="Cấp số CỘNG" font="var(--font-heading)" fontWeight="bold" color="var(--money)" />
        {arithHeights.map((h, i) => (
          <g key={`a-${i}`}>
            <motion.rect
              x={350 + i * 40} y={240} width="30" rx="2"
              fill="var(--money-light)" stroke="var(--money)" strokeWidth="1"
              initial={{ height: 0, y: 0 }} animate={{ height: h, y: -h }} transition={{ delay: 0.5 + i * 0.1 }}
            />
            {i < arithHeights.length - 1 && (
              <FlowArrow 
                x1={365 + i * 40} y1={240 - h - 10} 
                x2={365 + (i+1) * 40} y2={240 - arithHeights[i+1] - 10} 
                color="var(--debt)" delay={1.2 + i * 0.1} label="+d"
              />
            )}
          </g>
        ))}

        <motion.text
          x={300} y={275} textAnchor="middle" fill="var(--ink-primary)" style={{ fontFamily: 'var(--font-hand)' }} className="font-bold text-sm"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.0 }}
        >
          CỘNG vì mỗi bước ta CỘNG thêm đúng d
        </motion.text>
      </svg>
    </div>
  );
};
