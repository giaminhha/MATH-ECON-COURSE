"use client";

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NumberOdometer } from '../diagrams/SharedDiagramComponents';

interface InflationBalloonProps {
  variables?: any;
  onComplete: (isCorrect: boolean, score: number) => void;
}

export const InflationBalloon: React.FC<InflationBalloonProps> = ({
  onComplete
}) => {
  const [r, setR] = useState(5); // 5%
  const [n, setN] = useState(1); // 1 to 30 years
  
  // Sức mua
  const q = 1 - (r / 100);
  const purchasingPower = 100 * Math.pow(q, n - 1);
  const scale = purchasingPower / 100; // 1.0 to close to 0

  // Points for the curve chart (30 years)
  const curvePoints = useMemo(() => {
    const pts = [];
    const width = 200;
    const height = 100;
    for (let x = 1; x <= 30; x++) {
      const yVal = Math.pow(q, x - 1);
      const px = ((x - 1) / 29) * width;
      const py = (1 - yVal) * height;
      pts.push(`${px},${py}`);
    }
    return pts.join(' ');
  }, [q]);

  const handleFinish = () => {
    onComplete(true, 100);
  };

  return (
    <div className="w-full flex flex-col gap-6 p-4 sm:p-6 min-h-[400px]">
      
      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-6 p-4 rounded-xl" style={{ background: 'var(--canvas-card)', border: 'var(--border)' }}>
        <div className="flex-1">
          <SliderField
            label="Tỷ lệ lạm phát (r)"
            value={r}
            min={1}
            max={15}
            step={0.5}
            color="#FF6B6B" // var(--debt) ish
            suffix="%"
            onChange={setR}
          />
        </div>
        <div className="flex-1">
          <SliderField
            label="Số năm (n)"
            value={n}
            min={1}
            max={30}
            step={1}
            color="#6366F1" // var(--time-var) ish
            suffix=" năm"
            onChange={setN}
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        
        {/* Balloon Visual */}
        <div className="flex-1 flex flex-col items-center justify-center p-6 rounded-xl relative overflow-hidden min-h-[250px]"
             style={{ background: 'var(--canvas-card)', border: 'var(--border)' }}>
             
          <div className="absolute top-2 left-2 text-xs font-bold uppercase tracking-widest text-gray-400">
            Sức mua thực tế
          </div>
          
          <motion.div
            className="rounded-full flex items-center justify-center shadow-lg relative"
            animate={{ scale }}
            transition={{ type: 'spring', bounce: 0, duration: 0.5 }}
            style={{ 
              width: 200, 
              height: 200, 
              background: 'radial-gradient(circle at 30% 30%, #FF8A8A, #E74C3C)',
              // Add a wavy border effect by injecting a pseudo element or SVG if r is high, 
              // but we can just use box-shadow to simulate wrinkle
              boxShadow: r > 10 ? 'inset 0 0 20px rgba(0,0,0,0.3)' : 'none'
            }}
          >
            {/* Glossy reflection */}
            <div className="absolute top-4 left-6 w-12 h-6 rounded-full bg-white/40 transform -rotate-45 blur-[1px]" />
            
            {/* The knot of the balloon */}
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-4 bg-[#C0392B] rounded-sm"
                 style={{ clipPath: 'polygon(20% 0, 80% 0, 100% 100%, 0% 100%)' }} />
          </motion.div>
          
          <div className="mt-8 z-10 text-center">
            <div className="text-3xl font-black" style={{ color: 'var(--debt)', fontFamily: 'var(--font-mono)' }}>
              <NumberOdometer value={purchasingPower} suffix="tr" />
            </div>
            <div className="text-sm font-bold" style={{ color: 'var(--ink-secondary)' }}>
              so với 100tr ban đầu
            </div>
          </div>
        </div>

        {/* Charts & Graphs */}
        <div className="flex-1 flex flex-col justify-between p-6 rounded-xl gap-4"
             style={{ background: 'var(--canvas-card)', border: 'var(--border)' }}>
             
          {/* Curve */}
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="text-xs font-bold mb-2 text-gray-400 self-start">ĐƯỜNG CONG SUY GIẢM</div>
            <svg width="100%" viewBox="0 0 220 120" className="overflow-visible">
              <line x1="0" y1="100" x2="200" y2="100" stroke="var(--grid-line)" strokeWidth="2" />
              <line x1="0" y1="100" x2="0" y2="0" stroke="var(--grid-line)" strokeWidth="2" />
              
              <polyline
                points={curvePoints}
                fill="none"
                stroke="var(--debt)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ transition: 'all 0.3s ease' }}
              />
              
              {/* Dot at current n */}
              <motion.circle
                cx={((n - 1) / 29) * 200}
                cy={(1 - Math.pow(q, n - 1)) * 100}
                r="5"
                fill="var(--debt)"
                animate={{ cx: ((n - 1) / 29) * 200, cy: (1 - Math.pow(q, n - 1)) * 100 }}
                transition={{ type: 'spring', bounce: 0, duration: 0.5 }}
              />
              
              <text x="210" y="105" fontSize="10" fill="gray">30</text>
              <text x="-15" y="5" fontSize="10" fill="gray">100</text>
            </svg>
          </div>
          
          {/* Bar Compare */}
          <div className="w-full flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <div className="text-xs font-bold w-24">Danh nghĩa:</div>
              <div className="flex-1 h-4 bg-gray-200 rounded-full">
                <div className="h-full bg-gray-400 rounded-full" style={{ width: '100%' }} />
              </div>
              <div className="text-xs font-mono font-bold w-12 text-right">100tr</div>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="text-xs font-bold w-24" style={{ color: 'var(--debt)' }}>Sức mua thực:</div>
              <div className="flex-1 h-4 bg-gray-200 rounded-full">
                <motion.div 
                  className="h-full rounded-full" 
                  style={{ background: 'var(--debt)' }}
                  animate={{ width: `${scale * 100}%` }}
                />
              </div>
              <div className="text-xs font-mono font-bold w-12 text-right text-red-500">
                {purchasingPower.toFixed(1)}tr
              </div>
            </div>
          </div>

        </div>
      </div>
      
      <button
        onClick={handleFinish}
        className="w-full md:w-auto self-center px-8 py-3 rounded-xl font-bold text-white mt-2"
        style={{ background: 'var(--canvas-dark)' }}
      >
        Đã hiểu Lạm phát
      </button>
    </div>
  );
};

function SliderField({
  label, value, min, max, step, color, suffix, onChange,
}: {
  label: string; value: number; min: number; max: number; step: number; color: string; suffix: string; onChange: (v: number) => void;
}) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between items-center">
        <span className="text-sm font-semibold" style={{ color: 'var(--ink-secondary)' }}>{label}</span>
        <span className="text-sm font-black px-2 py-0.5 rounded-lg"
          style={{ background: `${color}20`, color, fontFamily: 'var(--font-mono)' }}>
          {value}{suffix}
        </span>
      </div>
      <div className="relative flex items-center h-6">
        <div className="absolute w-full h-1 rounded-full" style={{ background: 'var(--grid-line)' }} />
        <div className="absolute h-1 rounded-full" style={{ background: color, width: `${((value - min) / (max - min)) * 100}%` }} />
        <input type="range" min={min} max={max} step={step} value={value} onChange={e => onChange(Number(e.target.value))}
          className="absolute w-full opacity-0 cursor-pointer h-full" style={{ zIndex: 2 }} />
        <div className="absolute w-4 h-4 rounded-full border-2 border-white shadow-sm pointer-events-none transition-transform"
          style={{ left: `calc(${((value - min) / (max - min)) * 100}% - 8px)`, background: color, zIndex: 1 }} />
      </div>
    </div>
  );
}
