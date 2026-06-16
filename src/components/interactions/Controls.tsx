"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { NumberOdometer } from "../diagrams/NumberOdometer";

// --- OdometerNumber ---
// Re-exported for backward compatibility with existing code
interface OdometerNumberProps {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
}

export const OdometerNumber: React.FC<OdometerNumberProps> = ({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  className = "",
}) => {
  return (
    <NumberOdometer
      value={value}
      prefix={prefix}
      suffix={suffix}
      decimals={decimals}
      className={className}
      semantic={false}
    />
  );
};

// --- FluidSlider ---
interface FluidSliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (val: number) => void;
  unit?: string;
  color?: "indigo" | "emerald" | "coral" | "blue" | "teal";
}

const semanticColorMap: Record<string, string> = {
  indigo: "var(--time-var)",
  emerald: "var(--money)",
  coral: "var(--debt)",
  blue: "var(--time-var)",
  teal: "var(--money)",
};

export const FluidSlider: React.FC<FluidSliderProps> = ({
  label,
  value,
  min,
  max,
  step = 1,
  onChange,
  unit = "",
  color = "indigo",
}) => {
  const percentage = Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100));
  const activeColor = semanticColorMap[color] || "var(--ink-primary)";

  return (
    <div className="flex flex-col w-full gap-2 p-5 diagram-card">
      <div className="flex justify-between items-end mb-2">
        <label className="text-sm font-bold uppercase tracking-widest text-[var(--ink-secondary)]">
          {label}
        </label>
        <div className="text-right">
          <OdometerNumber
            value={value}
            suffix={unit}
            className="text-lg font-bold text-[var(--ink-primary)]"
          />
        </div>
      </div>

      <div className="relative h-8 flex items-center group">
        {/* Track background */}
        <div className="absolute w-full h-[4px] bg-[var(--grid-line)] rounded-full overflow-hidden" />
        
        {/* Active track */}
        <div 
          className="absolute h-[4px] rounded-full"
          style={{ width: `${percentage}%`, background: activeColor }}
        />

        {/* Native Range Input */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
        />

        {/* Custom Thumb */}
        <motion.div
          className="absolute w-[18px] h-[18px] bg-[var(--ink-primary)] border-[3px] border-white rounded-full z-10 pointer-events-none group-active:scale-125 transition-transform duration-150"
          style={{ 
            left: `${percentage}%`, 
            x: "-50%",
            boxShadow: "0 1px 4px rgba(44,52,65,0.25)"
          }}
        />
      </div>
    </div>
  );
};

// --- ActionInput (LivingInput) ---
export const ActionInput: React.FC<{ 
  label?: string, 
  placeholder?: string, 
  onComplete?: (val: number) => void,
  expectedPattern?: RegExp | string,
  isErrorRemote?: boolean
}> = ({ label, placeholder = "Nhập số...", onComplete, isErrorRemote = false }) => {
  const [val, setVal] = useState("");
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (isErrorRemote) {
      setIsError(true);
      setTimeout(() => setIsError(false), 500);
    }
  }, [isErrorRemote]);

  const handleSubmit = () => {
    const num = parseFloat(val);
    if (isNaN(num)) {
      setIsError(true);
      setTimeout(() => setIsError(false), 500);
    } else {
      setIsSuccess(true);
      if (onComplete) onComplete(num);
      setTimeout(() => setIsSuccess(false), 300);
      setVal("");
    }
  };

  return (
    <motion.div 
      className="flex flex-col w-full gap-2"
      animate={{ 
        x: isError ? [-8, 8, -6, 6, -3, 3, 0] : 0, 
        scale: isSuccess ? [1, 1.05, 1] : 1 
      }}
      transition={{ duration: 0.4 }}
    >
      {label && <label className="text-xs font-bold uppercase tracking-widest text-[var(--ink-secondary)]">{label}</label>}
      <div className="flex items-center gap-2">
        <input 
          type="text"
          value={val}
          onChange={(e) => setVal(e.target.value)}
          onKeyDown={(e) => { if(e.key === 'Enter') handleSubmit() }}
          className={`underline-input ${isError ? 'is-error' : ''} ${isSuccess ? 'is-success' : ''}`}
          placeholder={placeholder}
        />
        <motion.button 
          whileTap={{ scale: 0.9 }}
          onClick={handleSubmit}
          className="shrink-0 px-4 py-2 bg-[var(--ink-primary)] text-white rounded font-bold text-sm"
        >
          OK
        </motion.button>
      </div>
    </motion.div>
  );
};

// --- CyberLock ---
export const CyberLock: React.FC<{ variables?: any, onComplete?: (isCorrect: boolean, score: number, impact?: any) => void }> = ({ variables, onComplete }) => {
  const [code, setCode] = React.useState("0000");
  const targetCode = variables?.targetCode || "1234";

  return (
    <div className="diagram-card flex flex-col items-center justify-center p-8 w-full max-w-sm mx-auto">
      <div className="text-[var(--ink-secondary)] text-sm font-bold uppercase tracking-widest mb-6">Nhập Mã Bảo Mật</div>
      <input 
        type="text" 
        value={code} 
        onChange={(e) => setCode(e.target.value)}
        className="w-full text-center text-4xl font-mono text-[var(--ink-primary)] tracking-[0.5em] py-4 bg-transparent border-b-2 border-[var(--grid-line)] outline-none focus:border-[var(--time-var)] transition-colors"
        maxLength={4}
      />
      {onComplete && (
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => { 
            if(code === targetCode) {
              onComplete(true, 100);
            } else {
              onComplete(false, 0);
            }
          }}
          className="mt-8 px-8 py-3 bg-[var(--canvas-dark)] text-white font-bold rounded-xl uppercase tracking-widest text-sm w-full"
        >
          Mở Khóa
        </motion.button>
      )}
    </div>
  );
};
