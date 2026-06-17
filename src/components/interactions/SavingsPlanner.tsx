"use client";

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NumberOdometer } from '../diagrams/SharedDiagramComponents';

interface SavingsPlannerProps {
  variables?: { defaultTarget?: number; defaultU1?: number; defaultD?: number };
  onComplete: (isCorrect: boolean, score: number) => void;
}

function computePlan(target: number, u1: number, d: number) {
  let cumulative = 0;
  for (let n = 1; n <= 60; n++) {
    const un = u1 + (n - 1) * d;
    const sn = (n * (u1 + un)) / 2;
    if (sn >= target) return { n, sn, blocks: Array.from({ length: n }, (_, i) => u1 + i * d) };
    cumulative = sn;
  }
  // Not reached in 60 months
  const blocks: number[] = [];
  for (let i = 0; i < 36; i++) blocks.push(u1 + i * d);
  const sn36 = (36 * (u1 + blocks[35])) / 2;
  return { n: -1, sn: sn36, blocks: blocks.slice(0, 12) }; // show 12 for preview
}

export const SavingsPlanner: React.FC<SavingsPlannerProps> = ({
  variables = { defaultTarget: 5000, defaultU1: 200, defaultD: 100 },
  onComplete,
}) => {
  const [target, setTarget] = useState(variables.defaultTarget ?? 5000);
  const [u1, setU1] = useState(variables.defaultU1 ?? 200);
  const [d, setD] = useState(variables.defaultD ?? 100);
  const [confirmed, setConfirmed] = useState(false);

  const plan = useMemo(() => computePlan(target, u1, d), [target, u1, d]);
  const { n: monthsNeeded, sn, blocks } = plan;

  const maxBlock = blocks.length > 0 ? Math.max(...blocks) : 1;
  const reached = monthsNeeded !== -1;

  const handleConfirm = () => {
    setConfirmed(true);
    onComplete(true, 100);
  };

  // Calculate progress bar widths so that if sn > target, the bar extends beyond the target line
  const maxValForBar = Math.max(target, sn);
  const fillWidth = `${(sn / maxValForBar) * 100}%`;
  const targetLineWidth = `${(target / maxValForBar) * 100}%`;

  return (
    <div className="w-full h-full flex flex-col lg:flex-row gap-4 p-4 sm:p-6 min-h-0">

      {/* Left: Input Panel */}
      <div className="lg:w-[45%] flex flex-col gap-5 rounded-xl p-5"
        style={{ background: 'var(--canvas-card)', border: 'var(--border)' }}>

        <div className="text-xs uppercase tracking-widest font-bold"
          style={{ color: 'var(--ink-secondary)' }}>
          Thiết lập mục tiêu
        </div>

        {/* Slider: Target */}
        <SliderField
          label="🎯 Mục tiêu (k)"
          value={target}
          min={500}
          max={20000}
          step={500}
          color="#FF6B6B" /* Coral */
          onChange={setTarget}
        />

        {/* Slider: u1 */}
        <SliderField
          label="🟢 Tháng đầu bỏ — u₁ (k)"
          value={u1}
          min={100}
          max={3000}
          step={100}
          color="#10B981" /* Emerald */
          onChange={setU1}
        />

        {/* Slider: d */}
        <SliderField
          label="📈 Tăng thêm/tháng — d (k)"
          value={d}
          min={0}
          max={1000}
          step={50}
          color="#6366F1" /* Indigo */
          onChange={setD}
        />

        {/* Result pill */}
        <motion.div
          layout
          className="rounded-full px-4 py-2 text-center text-sm font-bold"
          style={{
            background: reached ? 'var(--money-light)' : 'var(--debt-light, #fde8e8)',
            color: reached ? 'var(--money)' : 'var(--debt)',
            border: `1.5px solid ${reached ? 'var(--money)' : 'var(--debt)'}`,
          }}
        >
          {reached
            ? <>Đạt mục tiêu tại tháng <span style={{ fontSize: '1.2em' }}>#{monthsNeeded}</span></>
            : 'Chưa đạt trong 60 tháng — tăng u₁ hoặc d thêm'}
        </motion.div>

        {/* Confirm button */}
        <AnimatePresence>
          {reached && !confirmed && (
            <motion.button
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleConfirm}
              className="w-full py-3 rounded-xl font-bold text-white text-sm"
              style={{ background: 'var(--canvas-dark)' }}
            >
              ✅ Xác Nhận Kế Hoạch
            </motion.button>
          )}
        </AnimatePresence>
        {confirmed && (
          <div className="text-center text-sm font-bold" style={{ color: 'var(--money)' }}>
            🎉 Kế hoạch đã được xác nhận!
          </div>
        )}
      </div>

      {/* Right: Visual Panel */}
      <div className="lg:w-[55%] flex flex-col gap-4 rounded-xl p-4 relative min-h-[260px]"
        style={{ background: 'var(--canvas-card)', border: 'var(--border)' }}>

        {/* Gauss mini badge */}
        <div className="absolute top-3 right-3 cursor-default group z-10">
          <svg viewBox="0 0 48 32" width={48} height={32}>
            <polygon points="0,32 48,0 48,32"
              fill="var(--money-light)" stroke="var(--money)" strokeWidth="1" />
            <polygon points="0,0 48,0 0,32"
              fill="var(--debt-light, #fde8e8)" strokeWidth="1" opacity={0.3} />
            <line x1="0" y1="32" x2="48" y2="0"
              stroke="var(--formula)" strokeWidth="1.5" strokeDasharray="3 2" />
          </svg>
          <div className="absolute bottom-full right-0 mb-2 hidden group-hover:block z-10 bg-white rounded-lg shadow-lg p-2 text-xs whitespace-nowrap"
            style={{ border: 'var(--border)', color: 'var(--ink-primary)' }}>
            Công thức Gauss: S = n(u₁+uₙ)/2
          </div>
        </div>

        {/* Stacking blocks */}
        <div className="flex-1 flex flex-col justify-end min-h-[180px] mt-6">
          <div className="flex items-end justify-center gap-1 sm:gap-1.5 w-full" style={{ maxHeight: 200 }}>
            <AnimatePresence>
              {blocks.slice(0, 24).map((val, i) => {
                const h = Math.max(8, (val / maxBlock) * 150); // max height 150px to leave room for label
                const isTarget = i === monthsNeeded - 1;
                return (
                  <motion.div
                    key={i} // Use simple index so framer-motion animates height instead of recreating blocks
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: h, opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
                    className="relative flex flex-col justify-end"
                    style={{
                      width: 'clamp(12px, 4vw, 32px)',
                      borderRadius: '3px 3px 0 0',
                      background: isTarget ? '#ede5ff' : `rgba(39,174,96,${0.3 + (i / blocks.length) * 0.7})`,
                      border: isTarget ? '2px solid var(--formula)' : '1px solid var(--money)',
                      flexShrink: 1,
                    }}
                    title={`T${i + 1}: ${val}k`}
                  >
                    {isTarget && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute -top-6 left-1/2 -translate-x-1/2 text-[11px] font-mono font-bold whitespace-nowrap"
                        style={{ color: 'var(--formula)' }}
                      >
                        {val}k
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-4 px-2">
          <div className="relative h-4 rounded-full" style={{ background: 'var(--grid-line)' }}>
            {/* Fill */}
            <motion.div
              className="absolute left-0 top-0 h-full rounded-full"
              style={{ background: 'var(--money)' }}
              animate={{ width: fillWidth }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            />
            {/* Target Line Mark */}
            <motion.div
              className="absolute top-0 bottom-0 border-l-2 border-dashed z-10"
              style={{ borderColor: 'var(--formula)', height: '150%' }}
              animate={{ left: targetLineWidth }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            />
          </div>
          
          <div className="flex justify-between text-[11px] mt-2 font-mono" style={{ color: 'var(--ink-secondary)' }}>
            <span style={{ fontWeight: 700, color: 'var(--money)' }}>
              {sn.toLocaleString('vi-VN')}k tích lũy
            </span>
            <span style={{ fontWeight: 600, color: 'var(--formula)' }}>
              Mục tiêu: {target.toLocaleString('vi-VN')}k
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ── Slider field sub-component ── */
function SliderField({
  label, value, min, max, step, color, onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  color: string;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between items-center">
        <span className="text-sm font-semibold" style={{ color: 'var(--ink-secondary)' }}>{label}</span>
        <span className="text-sm font-black px-2 py-0.5 rounded-lg"
          style={{ background: `${color}20`, color, fontFamily: 'var(--font-mono)' }}>
          {value.toLocaleString('vi-VN')}k
        </span>
      </div>
      <div className="relative flex items-center h-5">
        {/* Track */}
        <div className="absolute w-full h-1 rounded-full" style={{ background: 'var(--grid-line)' }} />
        {/* Active track */}
        <div
          className="absolute h-1 rounded-full"
          style={{
            background: color,
            width: `${((value - min) / (max - min)) * 100}%`,
          }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={e => onChange(Number(e.target.value))}
          className="absolute w-full opacity-0 cursor-pointer h-5"
          style={{ zIndex: 2 }}
        />
        {/* Thumb */}
        <div
          className="absolute w-4 h-4 rounded-full border-2 border-white shadow-sm pointer-events-none transition-transform"
          style={{
            left: `calc(${((value - min) / (max - min)) * 100}% - 8px)`,
            background: color,
            zIndex: 1,
          }}
        />
      </div>
    </div>
  );
}

