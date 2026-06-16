"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NumberOdometer } from '../diagrams/SharedDiagramComponents';

export const HalflifeCalc = ({ onComplete }: { onComplete?: (c: boolean, s: number) => void }) => {
  const [r, setR] = useState(5); // 1 to 20
  const [isSuccess, setIsSuccess] = useState(false);
  const [answerInput, setAnswerInput] = useState('');

  // n = ln(0.5) / ln(1-r)
  const q = 1 - (r / 100);
  const n = Math.log(0.5) / Math.log(q);

  const checkAnswer = () => {
    const val = parseFloat(answerInput.replace(',', '.'));
    if (!isNaN(val) && val >= 6 && val <= 7) {
      setIsSuccess(true);
      if (onComplete) onComplete(true, 100);
    } else {
      alert("Chưa chính xác! Hãy dùng thanh trượt kéo đến 10% để xem kết quả nhé.");
    }
  };

  const curvePoints = useMemo(() => {
    const pts = [];
    const width = 200;
    const height = 100;
    for (let x = 0; x <= 30; x++) {
      const px = (x / 30) * width;
      const py = (1 - Math.pow(q, x)) * height;
      pts.push(`${px},${py}`);
    }
    return pts.join(' ');
  }, [q]);

  return (
    <div className="w-full flex flex-col items-center gap-6 p-4 sm:p-6 min-h-[350px]">
      
      <div className="text-center font-bold text-gray-700 text-lg max-w-lg mb-2">
        "Lạm phát 10%. Hỏi mất bao nhiêu năm để sức mua giảm một nửa?"
      </div>

      <div className="flex flex-col md:flex-row w-full max-w-3xl gap-6">
        
        {/* Left: Input & Result */}
        <div className="flex-1 flex flex-col gap-6 p-6 rounded-xl" style={{ background: 'var(--canvas-card)', border: 'var(--border)' }}>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between font-bold">
              <span className="text-sm text-gray-500">Kéo thanh trượt để thử:</span>
              <span className="text-red-500">{r}% lạm phát</span>
            </div>
            <input 
              type="range" min="1" max="20" step="1" 
              value={r} onChange={e => setR(Number(e.target.value))}
              className="w-full accent-red-500"
            />
          </div>

          <div className="flex flex-col items-center justify-center flex-1 bg-red-50 rounded-lg border border-red-100 p-4">
            <div className="text-xs font-bold text-red-400 uppercase tracking-widest mb-2">Half-life (Thời gian bán rã)</div>
            <div className="flex items-end gap-2 text-red-600">
              <div className="text-5xl font-black font-mono">
                {n > 100 ? '>100' : <NumberOdometer value={n} />}
              </div>
              <div className="text-xl font-bold mb-1">năm</div>
            </div>
          </div>
          
          <AnimatePresence>
            {n < 30 && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="text-center text-xs font-bold text-red-500 bg-red-100 py-1 rounded"
              >
                ⚠️ Nhanh hơn 1 thế hệ (30 năm)!
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right: Chart View */}
        <div className="flex-1 flex flex-col items-center justify-center p-6 rounded-xl" style={{ background: 'var(--canvas-card)', border: 'var(--border)' }}>
          <div className="text-xs font-bold text-gray-400 mb-4">ĐỘ DỐC SUY GIẢM (30 năm)</div>
          <svg width="200" height="100" className="overflow-visible">
            {/* Grid */}
            <line x1="0" y1="100" x2="200" y2="100" stroke="var(--grid-line)" strokeWidth="2" />
            <line x1="0" y1="0" x2="0" y2="100" stroke="var(--grid-line)" strokeWidth="2" />
            
            <polyline
              points={curvePoints}
              fill="none"
              stroke="var(--debt)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ transition: 'all 0.2s ease' }}
            />
            
            {/* Half life point */}
            {n <= 30 && (
              <motion.circle
                cx={(n / 30) * 200} cy="50" r="5" fill="white" stroke="var(--debt)" strokeWidth="3"
                layout
              />
            )}
          </svg>
        </div>
      </div>

      {/* Answer Input Section */}
      <div className="w-full max-w-3xl flex flex-col items-center gap-4 mt-2">
        <div className="text-sm font-bold text-gray-500 uppercase">Trả lời câu hỏi</div>
        <div className="flex gap-4 items-center">
          <input
            type="number"
            value={answerInput}
            onChange={(e) => setAnswerInput(e.target.value)}
            disabled={isSuccess}
            placeholder="Nhập số năm..."
            className="px-4 py-2 border-2 border-gray-300 rounded-lg outline-none focus:border-red-500 font-bold text-lg w-40 text-center"
          />
          <button
            onClick={checkAnswer}
            disabled={isSuccess || !answerInput}
            className="px-6 py-2 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Trả Lời
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isSuccess && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="px-6 py-3 bg-green-100 text-green-700 border-2 border-green-400 rounded-xl font-bold shadow-sm"
          >
            🎉 Đúng rồi! 10% lạm phát tương đương với Half-life ~6.6 năm.
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
