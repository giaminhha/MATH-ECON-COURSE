"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FluidSlider, ActionInput } from "./Controls";
import { CoordinateSystem, DataCurve } from "../diagrams";
import { DecodeFormulaDiagram } from '../diagrams/Lesson2Diagrams';

// --- StackingBlocks (Thay thế BentoStacker)
export const BentoStacker: React.FC<{ variables?: any, onComplete?: (isCorrect: boolean, score: number, impact?: any) => void }> = ({ variables, onComplete }) => {
  const initialBlocks = variables?.blocks || 5;
  const showQuestion = variables?.showQuestion || false;
  const [n, setN] = useState(initialBlocks);
  const [d, setD] = useState(variables?.d || 500);
  const [u1, setU1] = useState(variables?.u1 || 500);
  const [answered, setAnswered] = useState(false);
  const [isError, setIsError] = useState(false);

  return (
    <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto">
      <div className="mb-2">
        <h2 className="text-2xl font-bold text-[var(--ink-primary)] mb-1">Tháp Tích Lũy (Cấp Số Cộng)</h2>
        <p className="text-[var(--ink-secondary)] text-sm">Trực quan hóa khối lượng tài sản tăng lên mỗi tháng.</p>
      </div>

      <div className="p-8 diagram-card flex items-end justify-center min-h-[300px] relative">
        <div className="absolute top-4 left-6 text-xs font-mono text-[var(--ink-secondary)] uppercase tracking-widest">
           STACKING_BLOCKS // u1={u1}, d={d}, n={n}
        </div>
        <div className="absolute top-4 right-6 text-lg font-bold text-[var(--money)] font-mono">
           u<sub className="text-xs">{n}</sub> = {u1 + (n-1)*d}k
        </div>
        <div className="flex items-end gap-2 w-full max-w-2xl px-4 overflow-x-auto no-scrollbar justify-center">
          {Array.from({ length: n }).map((_, i) => {
            const val = u1 + i * d;
            // Tỷ lệ chia để vừa khung hình: max 5000 -> 300px => / 15
            const blockHeight = Math.max(20, val / 15); 
            const isTarget = showQuestion && i === 9 && answered;

            return (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: -40, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  delay: i * 0.05, 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 20 
                }}
                className="w-10 sm:w-12 flex flex-col justify-end items-center relative"
                style={{ height: `${blockHeight}px` }}
              >
                <div 
                  className={`w-full h-full border rounded-t-sm transition-colors duration-500`}
                  style={{ 
                    background: isTarget ? 'var(--money)' : 'var(--money-light)', 
                    borderColor: isTarget ? 'var(--money)' : 'var(--ink-line)',
                    borderBottom: 'none' 
                  }}
                />
                <div className="absolute -top-6 text-[10px] sm:text-xs font-mono font-bold text-[var(--ink-secondary)]">
                  {val}k
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <FluidSlider
          label="Ban đầu (u₁)"
          value={u1}
          min={100}
          max={2000}
          step={100}
          onChange={setU1}
          color="emerald"
          unit="k"
        />
        <FluidSlider
          label="Tích lũy gốc (d)"
          value={d}
          min={100}
          max={1000}
          step={100}
          onChange={setD}
          color="teal"
          unit="k"
        />
        <FluidSlider
          label="Số tháng (n)"
          value={n}
          min={1}
          max={12}
          step={1}
          onChange={setN}
          color="indigo"
          unit="m"
        />
      </div>

      {showQuestion && !answered ? (
        <div className="mt-4 p-6 rounded-xl border-2 border-[var(--formula)] bg-[var(--canvas)] flex flex-col gap-4">
          <p className="text-[var(--ink-primary)] font-medium">
            Nếu <span className="font-bold font-mono">u₁ = 200k</span> và <span className="font-bold font-mono">d = 300k</span>, hãy tìm <span className="font-bold font-mono">u₁₀</span>?
          </p>
          <div className="max-w-xs">
            <ActionInput 
              placeholder="Nhập đáp án (k)" 
              isErrorRemote={isError}
              onComplete={(val) => {
                if (val === 2900) {
                  setAnswered(true);
                  if (onComplete) onComplete(true, 100);
                  // set sliders to match
                  setU1(200); setD(300); setN(10);
                } else {
                  setIsError(true);
                  setTimeout(() => setIsError(false), 500);
                }
              }} 
            />
          </div>
        </div>
      ) : showQuestion && answered ? (
        <div className="mt-4 p-4 text-center text-lg font-bold text-[var(--money)]">
          Chính xác! u₁₀ = 200 + 9 × 300 = 2900k
        </div>
      ) : null}

      {!showQuestion && onComplete && (
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="mt-2 w-full py-3 bg-[var(--canvas-dark)] text-white font-bold rounded-xl text-sm tracking-wide"
          onClick={() => onComplete(true, 100)}
        >
          Tiếp Tục
        </motion.button>
      )}
    </div>
  );
};

// --- InflationBalloon (Thay thế BalloonAsset)
export const BalloonAsset: React.FC<{ variables?: any, onComplete?: (isCorrect: boolean, score: number, impact?: any) => void }> = ({ variables, onComplete }) => {
  const initialInflationRate = variables?.inflationRate || 5;
  const [inflationRate, setInflationRate] = useState(initialInflationRate);
  
  // Transform inflation (0-50) to scale (1.0 down to 0.4)
  const scale = Math.max(0.4, 1 - (inflationRate / 70));

  return (
    <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto">
      <div className="mb-2">
        <h2 className="text-2xl font-bold text-[var(--ink-primary)] mb-1">Sức Mua Thực Tế (Lạm Phát)</h2>
        <p className="text-[var(--ink-secondary)] text-sm">Bóng lạm phát: Rút cạn giá trị của đồng tiền tĩnh.</p>
      </div>

      <div className="p-4 diagram-card flex flex-col sm:flex-row items-center justify-around min-h-[300px]">
         <div className="absolute top-4 left-6 text-xs font-mono text-[var(--ink-secondary)] uppercase tracking-widest">
           INFLATION_BALLOON // r={inflationRate}%
        </div>
        
        <div className="w-[200px] h-[200px] flex items-center justify-center relative mt-8 sm:mt-0">
          {/* Base border (kích thước ban đầu) */}
          <div className="absolute w-40 h-40 rounded-full border border-dashed border-[var(--grid-line)]" />
          
          <motion.div
            className="w-40 h-40 rounded-full flex items-center justify-center relative"
            animate={{ scale }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            {/* SVG Circle with wavy filter when scale is low */}
            <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
              {scale < 0.7 && (
                 <filter id="wavy">
                   <feTurbulence x="0" y="0" baseFrequency="0.05" numOctaves="3" seed="2"></feTurbulence>
                   <feDisplacementMap in="SourceGraphic" scale="3" />
                 </filter>
              )}
              <circle cx="50" cy="50" r="48" fill="var(--debt-light)" stroke="var(--debt)" strokeWidth="2" filter={scale < 0.7 ? "url(#wavy)" : ""} />
            </svg>
            <div className="relative text-[var(--debt)] font-mono font-bold text-xl">
              100M
            </div>
          </motion.div>
        </div>
        
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left z-10">
          <div className="text-sm font-bold text-[var(--ink-secondary)] mb-1 uppercase tracking-wide">Sức mua tương đương</div>
          <motion.div 
            className="text-[var(--debt)] font-mono font-bold text-4xl"
            key={inflationRate}
            initial={{ opacity: 0.5, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {Math.round(100 / (1 + inflationRate/100))}M
          </motion.div>
        </div>
      </div>
      
      <FluidSlider
        label="Tỷ lệ lạm phát (r)"
        value={inflationRate}
        min={0}
        max={40}
        step={1}
        onChange={setInflationRate}
        color="coral"
        unit=" %"
      />

      {onComplete && (
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="mt-2 w-full py-3 bg-[var(--canvas-dark)] text-white font-bold rounded-xl text-sm tracking-wide"
          onClick={() => onComplete(true, 100)}
        >
          Hoàn Thành Mô Phỏng
        </motion.button>
      )}
    </div>
  );
};

// --- CompoundGrowthOrb (Thay thế FractalBlob)
export const FractalBlob: React.FC<{ variables?: any, onComplete?: (isCorrect: boolean, score: number, impact?: any) => void }> = ({ variables, onComplete }) => {
  const initialBranches = variables?.branches || 6;
  const [branches, setBranches] = useState(initialBranches);

  return (
    <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto">
      <div className="p-6 diagram-card flex items-center justify-center min-h-[300px] relative overflow-hidden">
        <div className="absolute top-4 left-6 text-xs font-mono text-[var(--ink-secondary)] uppercase tracking-widest">
          COMPOUND_ORB // n={branches}
        </div>
        
        <div className="relative flex items-center justify-center w-[250px] h-[250px]">
          {/* Core */}
          <div className="absolute w-8 h-8 bg-[var(--money)] rounded-full z-10 flex items-center justify-center text-white text-xs font-bold">P</div>
          
          {/* Rings */}
          {Array.from({ length: branches }).map((_, i) => {
            const size = 40 + (i * 24);
            return (
              <motion.div
                key={i}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 100, delay: i * 0.1 }}
                className="absolute rounded-full border border-[var(--money)]"
                style={{ 
                  width: size, 
                  height: size, 
                  background: 'var(--money-light)',
                  zIndex: branches - i
                }}
              />
            );
          })}
        </div>
      </div>
      <FluidSlider
        label="Số năm (n)"
        value={branches}
        min={1}
        max={12}
        step={1}
        onChange={setBranches}
        color="emerald"
        unit=" năm"
      />
      {onComplete && (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onComplete(true, 100)}
          className="mt-2 w-full py-3 bg-[var(--canvas-dark)] text-white font-bold rounded-xl text-sm tracking-wide"
        >
          Hoàn Thành Mô Phỏng
        </motion.button>
      )}
    </div>
  );
};

// --- FillableTank (Thay thế LiquidTank)
export const LiquidTank: React.FC<{ variables?: any, onComplete?: (isCorrect: boolean, score: number, impact?: any) => void }> = ({ variables, onComplete }) => {
  const initialLevel = variables?.level || 50;
  const [level, setLevel] = useState(initialLevel);
  const [rate, setRate] = useState(5);

  const percent = Math.min(100, level * (1 + rate/100));

  return (
    <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto">
      <div className="p-8 diagram-card flex items-end justify-center min-h-[350px] relative">
        <div className="absolute top-4 left-6 text-xs font-mono text-[var(--ink-secondary)] uppercase tracking-widest">
           FILLABLE_TANK // A={level} Tr, r={rate}%
        </div>
        
        {/* Tank container */}
        <div className="w-32 h-64 border-2 border-[var(--ink-line)] rounded-b-xl overflow-hidden relative bg-[var(--canvas)] z-10">
           {/* Target Line */}
           <div className="absolute top-[20%] w-full border-t border-dashed border-[var(--debt)] z-20" />
           <div className="absolute top-[20%] left-0 w-full text-center -translate-y-full text-[10px] font-mono text-[var(--debt)] mt-1">
             Mục tiêu
           </div>

          {/* Water level */}
          <motion.div 
            animate={{ height: `${percent}%` }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.2 }}
            className="absolute bottom-0 left-0 right-0 z-10"
            style={{ background: 'var(--time-var)' }}
          >
            {/* Simple wave CSS */}
            <div className="absolute top-0 left-0 w-full h-1 bg-white opacity-30" />
          </motion.div>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <FluidSlider
          label="Tiền đổ vào (A)"
          value={level}
          min={5}
          max={100}
          step={5}
          onChange={setLevel}
          color="indigo"
          unit=" Tr"
        />
        <FluidSlider
          label="Lãi suất (r)"
          value={rate}
          min={1}
          max={20}
          step={1}
          onChange={setRate}
          color="teal"
          unit=" %"
        />
      </div>
      {onComplete && (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onComplete(true, 100)}
          className="mt-2 w-full py-3 bg-[var(--canvas-dark)] text-white font-bold rounded-xl text-sm tracking-wide"
        >
          Hoàn Thành Mô Phỏng
        </motion.button>
      )}
    </div>
  );
};

// --- DecodeFormulaQuiz (For Slide 4)

export const DecodeFormulaQuiz: React.FC<{ onComplete?: (isCorrect: boolean, score: number, impact?: any) => void }> = ({ onComplete }) => {
  const [answered, setAnswered] = useState(false);
  const [isError, setIsError] = useState(false);

  return (
    <div className="flex flex-col gap-6 w-full max-w-2xl mx-auto">
      <div className="bg-[var(--canvas-card)] p-6 rounded-2xl shadow-sm border border-[var(--grid-line)]">
        <h3 className="text-lg font-bold text-[var(--ink-primary)] mb-4">Thử thách tính toán</h3>
        <p className="mb-4 text-[var(--ink-primary)]">
          Bạn có <strong>500.000đ</strong> tháng đầu tiên ($u_1 = 500k$). Mỗi tháng bạn để dành thêm đúng <strong>500.000đ</strong> ($d = 500k$).
        </p>
        <p className="mb-4 font-bold text-[var(--ink-primary)]">
          Hỏi đến tháng thứ 12, bạn sẽ có tổng cộng bao nhiêu tiền (đơn vị: nghìn đồng)?
        </p>
        
        {!answered ? (
          <div className="mt-4">
            <ActionInput 
              placeholder="Nhập số tiền..."
              onComplete={(val: number) => {
                if (val === 6000) {
                  setAnswered(true);
                  setIsError(false);
                  onComplete?.(true, 10, { moneyDelta: 6 });
                } else {
                  setIsError(true);
                }
              }}
              isErrorRemote={isError}
            />
            {isError && (
              <p className="text-sm text-[var(--debt)] mt-2">Chưa chính xác! Thử dùng công thức: $u_{12} = u_1 + 11 \times d$</p>
            )}
          </div>
        ) : (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-[var(--money)] font-bold text-xl mt-4">
            Tuyệt vời! Chính xác là 6000k (6 triệu đồng).
          </motion.div>
        )}
      </div>

      {answered && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="flex flex-col gap-4">
          <div className="p-4 bg-[var(--formula-light)] rounded-xl border border-[var(--formula)]/30">
             <div className="text-center font-mono text-lg text-[var(--formula)] font-bold">
               u₁₂ = 500 + (12-1) × 500 = 6000
             </div>
          </div>
          <div className="p-4 bg-[var(--canvas-card)] rounded-2xl border border-[var(--grid-line)]">
             <DecodeFormulaDiagram />
          </div>
        </motion.div>
      )}
    </div>
  );
};