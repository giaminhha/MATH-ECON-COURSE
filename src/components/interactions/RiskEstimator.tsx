"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface RiskEstimatorProps {
  onComplete: (isCorrect: boolean, score: number) => void;
}

const RISKS = [
  { id: '1', icon: '🔧', label: 'Xe máy hỏng vặt', maxP: 50, cost: 1.5, stats: 'Thống kê: 8–18% cho xe 5 tuổi' },
  { id: '2', icon: '🤒', label: 'Ốm phải nghỉ làm', maxP: 30, cost: 2, stats: 'Thống kê: 5–15% tuỳ sức khoẻ' },
  { id: '3', icon: '📱', label: 'Mất/vỡ điện thoại', maxP: 20, cost: 3, stats: 'Thống kê: 5–10% tuỳ thói quen' },
  { id: '4', icon: '💸', label: 'Thu nhập giảm', maxP: 20, cost: 5, stats: 'Thống kê: 5–15% tuỳ ngành nghề' },
  { id: '5', icon: '🦷', label: 'Đau răng/nha khoa', maxP: 40, cost: 0.8, stats: 'Thống kê: 10–25%' },
];

export const RiskEstimator: React.FC<RiskEstimatorProps> = ({ onComplete }) => {
  const [probs, setProbs] = useState<number[]>(RISKS.map(() => 0));
  const [showResult, setShowResult] = useState(false);
  const [showStats, setShowStats] = useState(false);

  const handleSliderChange = (index: number, value: number) => {
    const newProbs = [...probs];
    newProbs[index] = value;
    setProbs(newProbs);
    setShowResult(false);
    setShowStats(false);
  };

  const expectedValue = RISKS.reduce((acc, risk, i) => acc + (probs[i] / 100) * risk.cost, 0);
  const emergencyFund = expectedValue * 1.5;

  const handleCalculate = () => {
    setShowResult(true);
    onComplete(true, 100);
  };

  return (
    <div className="w-full flex flex-col items-center gap-6 p-4 sm:p-6 min-h-[500px]">
      <div className="w-full max-w-2xl bg-[var(--canvas-card)] rounded-2xl p-6 border border-[var(--grid-line)] shadow-sm">
        <h3 className="text-xl font-bold mb-6 text-[var(--ink-primary)]">Bản Đồ Rủi Ro Của Bạn</h3>
        
        <div className="flex flex-col gap-6 mb-8">
          {RISKS.map((risk, i) => (
            <div key={risk.id} className="flex flex-col gap-2">
              <div className="flex justify-between items-end">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{risk.icon}</span>
                  <div>
                    <div className="font-bold text-[var(--ink-primary)]">{risk.label}</div>
                    <div className="text-xs text-[var(--ink-secondary)]">Chi phí ước tính: {risk.cost}tr/lần</div>
                  </div>
                </div>
                <div className="font-mono font-bold text-[var(--interest)]">{probs[i]}% / năm</div>
              </div>
              
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="0"
                  max={risk.maxP}
                  value={probs[i]}
                  onChange={(e) => handleSliderChange(i, parseInt(e.target.value))}
                  className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
              </div>

              <AnimatePresence>
                {showStats && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="text-xs font-medium text-gray-500 bg-gray-50 p-2 rounded"
                  >
                    {risk.stats}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {!showResult ? (
          <button
            onClick={handleCalculate}
            className="w-full py-4 rounded-xl font-bold text-white transition-all hover:scale-[1.02]"
            style={{ background: 'var(--interest)' }}
          >
            Tính Quỹ Khẩn Cấp
          </button>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-4 p-5 rounded-xl bg-gray-50 border border-gray-200"
          >
            <div className="text-center">
              <div className="text-sm text-gray-600 mb-1">Tổng E(chi phí/năm) dự kiến</div>
              <div className="text-3xl font-black text-indigo-600 mb-4">{expectedValue.toFixed(2)} triệu</div>
              
              <div className="text-sm text-gray-600 mb-1">Gợi ý quỹ khẩn cấp tối thiểu (x1.5 buffer)</div>
              <div className="text-2xl font-bold text-[var(--money)]">{emergencyFund.toFixed(2)} triệu</div>
            </div>

            <div className="flex justify-center mt-2">
              <button
                onClick={() => setShowStats(!showStats)}
                className="px-4 py-2 rounded-lg text-sm font-bold border border-gray-300 hover:bg-gray-100 transition-colors"
              >
                {showStats ? 'Ẩn thống kê' : 'So sánh với thống kê chung'}
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
