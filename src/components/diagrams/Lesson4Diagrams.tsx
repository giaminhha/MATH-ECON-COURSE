import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { DiagramLabel, drawLine, fadeUpLabel } from './SharedDiagramComponents';

/* ────────────────────────────────────────────────────────────
   Slide 1 — STORY: "100 Triệu Của Bạn Đang Bị Ăn"
   100M VND note scaling down with red arrows
   ──────────────────────────────────────────────────────────── */
export const InflationStoryDiagram = () => {
  return (
    <div className="w-full flex flex-col items-center gap-8 py-6 relative">
      <div className="relative w-64 h-40 flex items-center justify-center">
        {/* Inward Arrows */}
        {[0, 90, 180, 270].map((angle, i) => (
          <motion.div
            key={`arrow-${i}`}
            className="absolute z-10"
            initial={{ opacity: 0, scale: 0.5, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 1.0 + i * 0.2, repeat: Infinity, repeatType: 'reverse', duration: 1.5 }}
            style={{
              transform: `rotate(${angle}deg) translateY(-85px)`,
              color: 'var(--debt)',
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <polyline points="19 12 12 19 5 12" />
            </svg>
          </motion.div>
        ))}

        {/* The 100M Note */}
        <motion.div
          className="relative flex items-center justify-center w-full h-full rounded-lg shadow-xl overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #2ECC71 0%, #27AE60 100%)',
            border: '4px solid #145A32',
          }}
          initial={{ scale: 1.0 }}
          animate={{ scale: 0.6 }}
          transition={{ delay: 2.0, duration: 3.0, ease: 'easeInOut' }}
        >
          {/* Note details */}
          <div className="absolute inset-1 border-2 border-dashed border-white/40 rounded-sm" />
          <div className="text-center z-10">
            <motion.div
              className="text-white font-black text-2xl tracking-wider"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              100.000.000
            </motion.div>
            <motion.div className="text-white/80 font-bold text-xs uppercase mt-1">
              VND
            </motion.div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 4.5 }}
        className="text-center font-bold px-4 py-2 rounded-lg"
        style={{ color: 'var(--debt)', background: 'var(--debt-light)', border: '1px solid var(--debt)' }}
      >
        Tiền vẫn là 100tr. Nhưng sức mua đã teo lại (chỉ còn 60%).
      </motion.div>
    </div>
  );
};

/* ────────────────────────────────────────────────────────────
   Slide 2 — DIAGRAM: "Từ CSC Sang CSN"
   Compare CSC (growing) vs CSN (shrinking)
   ──────────────────────────────────────────────────────────── */
export const CscToCsnDiagram = () => {
  const n = 5;
  const blockW = 40;
  
  // CSC: 100, 150, 200, 250, 300
  const cscValues = [100, 150, 200, 250, 300];
  // CSN: 100, 90, 81, 72.9, 65.6 (using q=0.9)
  const csnValues = [100, 90, 81, 73, 66];

  const renderBlocks = (values: number[], colorBase: string, colorLight: string, sign: string, label: string) => (
    <div className="flex flex-col items-center">
      <div className="flex items-end gap-1 h-[140px] mb-2">
        {values.map((v, i) => {
          const h = (v / 300) * 130;
          return (
            <div key={i} className="flex flex-col items-center gap-1">
              {i > 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.0 + i * 0.2 }}
                  className="text-[10px] font-bold z-10 -mb-2 bg-white/80 px-1 rounded"
                  style={{ color: colorBase }}
                >
                  {sign}
                </motion.div>
              )}
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: h }}
                transition={{ delay: 0.5 + i * 0.2, type: 'spring', bounce: 0.3 }}
                className="rounded-t-sm relative flex flex-col justify-start pt-1"
                style={{ width: blockW, background: colorLight, border: `1px solid ${colorBase}` }}
              >
                <div className="text-[10px] font-bold text-center" style={{ color: colorBase }}>
                  {v}
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>
      <div className="font-bold text-xs uppercase" style={{ color: colorBase }}>{label}</div>
    </div>
  );

  return (
    <div className="w-full flex flex-col md:flex-row items-center justify-center gap-4 md:gap-10 py-6">
      {renderBlocks(cscValues, 'var(--money)', 'var(--money-light)', '+d', 'Cộng Đều (CSC)')}
      
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2.0 }}
        className="flex flex-col items-center justify-center p-2"
      >
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--ink-secondary)" strokeWidth="2">
          <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <div className="text-[11px] font-bold italic" style={{ color: 'var(--ink-secondary)' }}>Nhân thay vì Cộng</div>
      </motion.div>

      {renderBlocks(csnValues, 'var(--debt)', 'var(--debt-light)', '×q', 'Nhân Đều (CSN)')}
    </div>
  );
};

/* ────────────────────────────────────────────────────────────
   Slide 3 — THEOREM: "Cấp Số Nhân" Flow Chain
   ──────────────────────────────────────────────────────────── */
export const CsnFormulaDiagram = () => {
  const values = [100, 95, 90.25, 85.74];

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 py-4">
      {values.map((v, i) => (
        <React.Fragment key={i}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + i * 0.4 }}
            className="px-4 py-2 rounded-xl font-bold font-mono text-sm"
            style={{
              background: 'var(--canvas-card)',
              border: `2px solid ${i === 0 ? 'var(--money)' : 'var(--debt)'}`,
              color: i === 0 ? 'var(--money)' : 'var(--debt)',
            }}
          >
            {v}
          </motion.div>

          {i < values.length - 1 && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + i * 0.4 }}
              className="flex items-center gap-1"
            >
              <div className="h-0.5 w-6 bg-gray-300" />
              <div className="px-2 py-1 rounded text-xs font-bold"
                style={{ background: 'var(--formula-light)', color: 'var(--formula)' }}>
                ×0.95
              </div>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-gray-300">
                <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.div>
          )}
        </React.Fragment>
      ))}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.0 }}
        className="font-bold text-gray-400 text-lg ml-2"
      >
        ...
      </motion.div>
    </div>
  );
};

/* ────────────────────────────────────────────────────────────
   Slide 5 — INFO: "Con Số Thật Của Việt Nam"
   Timeline 10 years, 10 coins shrinking
   ──────────────────────────────────────────────────────────── */
export const VietnamInflationDiagram = () => {
  const n = 10;
  const coins = Array.from({ length: n });
  
  return (
    <div className="w-full py-8 flex flex-col items-center">
      <div className="relative w-full max-w-2xl flex items-center justify-between px-4">
        {/* Timeline Line */}
        <div className="absolute left-4 right-4 h-1 top-1/2 -translate-y-1/2" style={{ background: 'var(--grid-line)' }} />
        
        {coins.map((_, i) => {
          const scale = Math.pow(0.96, i); // 4% inflation
          const size = 48 * scale;
          return (
            <div key={i} className="relative z-10 flex flex-col items-center gap-3">
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.2 + i * 0.15, type: 'spring' }}
                className="rounded-full flex items-center justify-center font-bold text-[10px]"
                style={{
                  width: size,
                  height: size,
                  background: 'var(--money-light)',
                  border: '2px solid var(--money)',
                  color: 'var(--money)'
                }}
              >
                {i === 0 && '100%'}
                {i === n - 1 && `${(scale * 100).toFixed(0)}%`}
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 + i * 0.15 }}
                className="text-[10px] font-bold"
                style={{ color: 'var(--ink-faint)' }}
              >
                N{i + 1}
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
