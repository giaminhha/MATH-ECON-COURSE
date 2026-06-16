"use client";

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PurchasingPowerCalcProps {
  onComplete: (isCorrect: boolean, score: number) => void;
}

export const PurchasingPowerCalc: React.FC<PurchasingPowerCalcProps> = ({
  onComplete
}) => {
  const [inputValue, setInputValue] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [result, setResult] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [shakeKey, setShakeKey] = useState(0);

  const initialPrice = 40; // 40k
  const exactAnswer = 40 * Math.pow(1.05, 10); // ~65.15
  const acceptedAnswers = [65, 65.1, 65.15, 65.2]; // Common roundings

  const handleCheck = () => {
    const val = parseFloat(inputValue.replace(/,/g, '.'));
    
    // Accept anything between 64.5 and 65.5 to be safe
    if (val >= 64.5 && val <= 65.5) {
      setResult('correct');
      onComplete(true, 100);
    } else {
      setResult('wrong');
      setShakeKey(k => k + 1);
      setShowHint(true);
      setTimeout(() => setResult('idle'), 2000);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleCheck();
  };

  return (
    <div className="w-full flex flex-col items-center gap-6 p-4 sm:p-8 max-w-xl mx-auto">
      
      {/* The Visual Representation */}
      <div className="relative flex items-center justify-center h-32 w-full">
        {/* Origin Coin */}
        <motion.div
          className="absolute z-10 flex items-center justify-center rounded-full border-4 border-yellow-400 bg-yellow-100 shadow-md font-black text-xl text-yellow-600"
          initial={{ scale: 1, x: 0 }}
          animate={
            result === 'correct' ? { scale: 1.6, x: 0, opacity: 0 } : { scale: 1, x: -80, opacity: 1 }
          }
          transition={{ duration: 0.6 }}
          style={{ width: 60, height: 60 }}
        >
          40k
        </motion.div>

        {/* Future Coin (Hidden initially) */}
        <motion.div
          className="absolute z-20 flex items-center justify-center rounded-full border-4 border-yellow-500 bg-yellow-200 shadow-lg font-black text-2xl text-yellow-700"
          initial={{ scale: 1, x: 0, opacity: 0 }}
          animate={
            result === 'correct' ? { scale: 1.6, x: 0, opacity: 1 } : { scale: 1, x: 80, opacity: 0 }
          }
          transition={{ duration: 0.6, delay: result === 'correct' ? 0.3 : 0 }}
          style={{ width: 60, height: 60 }}
        >
          65k
        </motion.div>

        {/* Arrow (Hidden when correct) */}
        <motion.div 
          className="absolute flex flex-col items-center justify-center"
          animate={{ opacity: result === 'correct' ? 0 : 1 }}
        >
          <div className="text-xs font-bold text-gray-400 mb-1">10 Năm - 5%/năm</div>
          <svg width="60" height="24" viewBox="0 0 60 24" fill="none" stroke="var(--grid-line)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="55" y2="12" />
            <polyline points="45 5 55 12 45 19" />
          </svg>
        </motion.div>
        
        {/* Placeholder for future coin when not correct */}
        <motion.div
          className="absolute z-0 flex items-center justify-center rounded-full border-4 border-dashed border-gray-300 bg-gray-50 text-xl font-bold text-gray-400"
          animate={{ x: 80, opacity: result === 'correct' ? 0 : 1 }}
          style={{ width: 60, height: 60 }}
        >
          ?
        </motion.div>
      </div>

      <div className="text-center font-bold text-gray-700 text-lg">
        Bát phở hôm nay giá 40k. Với lạm phát 5%/năm, 10 năm sau giá bao nhiêu?
      </div>

      {/* Input Area */}
      {result !== 'correct' && (
        <div className="flex flex-col items-center gap-3 w-full">
          <motion.div 
            key={shakeKey}
            animate={result === 'wrong' ? { x: [-8, 8, -6, 6, -3, 3, 0] } : {}}
            transition={{ duration: 0.45 }}
            className="flex items-end gap-2"
          >
            <input
              type="number"
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Nhập giá..."
              className="w-32 text-center text-2xl font-black outline-none bg-transparent"
              style={{
                borderBottom: `3px solid ${result === 'wrong' ? 'var(--debt)' : 'var(--grid-line)'}`,
                color: 'var(--ink-primary)',
                fontFamily: 'var(--font-mono)',
                paddingBottom: 4,
                transition: 'border-color 0.3s',
              }}
            />
            <span className="text-xl font-bold text-gray-500 mb-1">k</span>
          </motion.div>

          <AnimatePresence>
            {result === 'wrong' && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-xs font-semibold text-red-500"
              >
                Chưa đúng. Thử xem gợi ý nhé!
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleCheck}
            className="px-8 py-3 rounded-xl font-bold text-white text-base mt-2"
            style={{ background: 'var(--canvas-dark)' }}
          >
            Kiểm Tra
          </motion.button>
        </div>
      )}

      {/* Success Result */}
      <AnimatePresence>
        {result === 'correct' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 18 }}
            className="w-full rounded-2xl p-6 flex flex-col items-center gap-2 mt-4"
            style={{ background: 'var(--money-light)', border: '2px solid var(--money)' }}
          >
            <div className="text-lg font-bold" style={{ color: 'var(--money)' }}>
              🎉 Chính xác!
            </div>
            <div className="text-sm font-medium text-center" style={{ color: 'var(--money)' }}>
              10 năm sau, bạn phải trả ~65k cho cùng 1 bát phở. Tiền mất giá chính là đây!
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hint */}
      {result !== 'correct' && (
        <div className="w-full flex flex-col items-center mt-4">
          <button
            onClick={() => setShowHint(!showHint)}
            className="text-sm font-semibold text-gray-500 hover:text-gray-800 transition-colors"
          >
            💡 {showHint ? 'Ẩn gợi ý' : 'Xem gợi ý'}
          </button>
          
          <AnimatePresence>
            {showHint && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden w-full max-w-sm mt-3"
              >
                <div className="rounded-xl p-4 text-sm bg-purple-50 border border-purple-200 text-purple-800">
                  <div className="font-bold mb-1">Dùng công thức:</div>
                  <div className="font-mono">Giá mới = Giá cũ × (1 + r)ⁿ</div>
                  <div className="mt-2 text-xs">Thay số: 40 × (1.05)¹⁰ = ?</div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};
