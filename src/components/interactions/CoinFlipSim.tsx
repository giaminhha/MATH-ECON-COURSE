"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CoinFlipSimProps {
  variables?: { minFlips?: number };
  onComplete: (
    isCorrect: boolean, 
    score: number, 
    impact?: any, 
    options?: { silent?: boolean, keepAlive?: boolean }
  ) => void;
}

export const CoinFlipSim: React.FC<CoinFlipSimProps> = ({
  variables = { minFlips: 30 },
  onComplete,
}) => {
  const minFlips = variables.minFlips ?? 30;
  
  const [heads, setHeads] = useState(0);
  const [tails, setTails] = useState(0);
  const [isAuto, setIsAuto] = useState(false);
  const [completed, setCompleted] = useState(false);

  const total = heads + tails;
  const headsPercent = total === 0 ? 0 : (heads / total) * 100;
  const tailsPercent = total === 0 ? 0 : (tails / total) * 100;

  const flip = (times: number) => {
    let newHeads = 0;
    let newTails = 0;
    for (let i = 0; i < times; i++) {
      if (Math.random() < 0.5) newHeads++;
      else newTails++;
    }
    setHeads(h => h + newHeads);
    setTails(t => t + newTails);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAuto) {
      interval = setInterval(() => {
        flip(1);
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isAuto]);

  useEffect(() => {
    if (total >= minFlips && !completed) {
      setCompleted(true);
      onComplete(true, 100, undefined, { silent: true, keepAlive: true });
    }
  }, [total, minFlips, completed, onComplete]);

  const reset = () => {
    setHeads(0);
    setTails(0);
    setIsAuto(false);
  };

  return (
    <div className="w-full h-full flex flex-col md:flex-row gap-6 p-4 sm:p-6 min-h-[400px]">
      {/* Left: Controls */}
      <div className="md:w-5/12 flex flex-col gap-4 rounded-xl p-5" style={{ background: 'var(--canvas-card)', border: 'var(--border)' }}>
        <div className="text-xs uppercase tracking-widest font-bold text-gray-500 mb-2">Điều khiển</div>
        
        <div className="flex flex-col gap-2">
          <button 
            onClick={() => flip(1)}
            className="w-full py-2.5 rounded-lg font-bold transition-all text-sm bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200"
          >
            Tung 1 lần
          </button>
          <div className="flex gap-2">
            <button 
              onClick={() => flip(10)}
              className="flex-1 py-2.5 rounded-lg font-bold transition-all text-sm bg-indigo-100 text-indigo-800 hover:bg-indigo-200 border border-indigo-300"
            >
              +10 lần
            </button>
            <button 
              onClick={() => flip(100)}
              className="flex-1 py-2.5 rounded-lg font-bold transition-all text-sm bg-indigo-600 text-white hover:bg-indigo-700"
            >
              +100 lần
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between mt-2 p-3 rounded-lg bg-gray-50 border border-gray-200">
          <span className="text-sm font-semibold text-gray-700">Auto-flip (nhanh)</span>
          <button 
            onClick={() => setIsAuto(!isAuto)}
            className={`w-12 h-6 rounded-full p-1 transition-colors ${isAuto ? 'bg-indigo-500' : 'bg-gray-300'}`}
          >
            <motion.div 
              className="w-4 h-4 bg-white rounded-full shadow-sm"
              animate={{ x: isAuto ? 24 : 0 }}
            />
          </button>
        </div>

        <div className="mt-auto pt-4 flex justify-between items-center border-t border-gray-100">
          <div className="text-sm font-mono text-gray-500">
            Tổng: <span className="font-bold text-indigo-600">{total}</span>
          </div>
          <button 
            onClick={reset}
            className="text-xs font-bold text-red-500 hover:text-red-700 px-3 py-1.5 rounded bg-red-50"
          >
            Làm lại
          </button>
        </div>
      </div>

      {/* Right: Histogram */}
      <div className="md:w-7/12 flex flex-col rounded-xl p-5 relative" style={{ background: 'var(--canvas-card)', border: 'var(--border)' }}>
        <div className="text-xs uppercase tracking-widest font-bold text-gray-500 mb-4 text-center">Kết quả</div>
        
        <div className="flex-1 flex items-end justify-center gap-12 relative min-h-[200px] mt-8">
          {/* 50% Line */}
          <div className="absolute left-0 right-0 top-1/2 border-t-2 border-dashed border-gray-300 z-0 flex justify-end">
            <span className="text-xs text-gray-400 -mt-5 font-mono">50% kỳ vọng</span>
          </div>

          {/* Heads Bar */}
          <div className="relative flex flex-col justify-end w-24 z-10 h-full">
            <AnimatePresence>
              {total > 0 && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${headsPercent}%` }}
                  transition={{ type: 'spring', bounce: 0, duration: 0.3 }}
                  className="w-full bg-yellow-400 rounded-t-md opacity-90 border-x-2 border-t-2 border-yellow-500"
                />
              )}
            </AnimatePresence>
            <div className="absolute -top-7 left-1/2 -translate-x-1/2 font-mono font-bold text-yellow-600 text-sm">
              {total > 0 ? headsPercent.toFixed(1) : 0}%
            </div>
            <div className="text-center mt-3 font-bold text-yellow-700">Sấp ({heads})</div>
          </div>

          {/* Tails Bar */}
          <div className="relative flex flex-col justify-end w-24 z-10 h-full">
            <AnimatePresence>
              {total > 0 && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${tailsPercent}%` }}
                  transition={{ type: 'spring', bounce: 0, duration: 0.3 }}
                  className="w-full bg-gray-400 rounded-t-md opacity-90 border-x-2 border-t-2 border-gray-500"
                />
              )}
            </AnimatePresence>
            <div className="absolute -top-7 left-1/2 -translate-x-1/2 font-mono font-bold text-gray-600 text-sm">
              {total > 0 ? tailsPercent.toFixed(1) : 0}%
            </div>
            <div className="text-center mt-3 font-bold text-gray-600">Ngửa ({tails})</div>
          </div>
        </div>

        {/* Key insight */}
        <AnimatePresence>
          {total >= 50 && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-3 rounded-lg text-sm text-center font-medium"
              style={{ background: 'var(--formula-light)', color: 'var(--formula)', border: '1px solid var(--formula)' }}
            >
              Tung ít = ngẫu nhiên. Tung nhiều = tiệm cận 50/50.<br/>
              <b>Đây là Luật số lớn (Bài 22).</b>
            </motion.div>
          )}
        </AnimatePresence>

        {completed && total < 50 && (
          <div className="mt-6 text-center text-sm font-bold" style={{ color: 'var(--money)' }}>
            🎉 Bạn đã tung đủ số lần. Thử tung thêm 100 lần xem sao?
          </div>
        )}
      </div>
    </div>
  );
};
