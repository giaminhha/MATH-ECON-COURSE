"use client";

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NumberOdometer } from '../diagrams/SharedDiagramComponents';

interface GaussChallengeProps {
  variables?: { n?: number; answer?: number };
  onComplete: (isCorrect: boolean, score: number) => void;
}

const PAIRS = [
  { a: 1, b: 100 },
  { a: 2, b: 99 },
  { a: 3, b: 98 },
];

export const GaussChallenge: React.FC<GaussChallengeProps> = ({
  variables = { n: 100, answer: 5050 },
  onComplete,
}) => {
  const n = variables.n ?? 100;
  const correctAnswer = variables.answer ?? 5050;

  const [inputValue, setInputValue] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [result, setResult] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [shakeKey, setShakeKey] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleCheck = () => {
    const val = parseInt(inputValue.replace(/[^0-9]/g, ''), 10);
    if (val === correctAnswer) {
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
    <div className="w-full flex flex-col items-center gap-6 p-6 sm:p-8 max-w-xl mx-auto">

      {/* Header */}
      <div className="text-center">
        <h3 className="text-xl font-black mb-1" style={{ color: 'var(--ink-primary)' }}>
          Tính nhanh:
        </h3>
        <div
          className="text-3xl font-black"
          style={{ color: 'var(--formula)', fontFamily: 'var(--font-mono)' }}
        >
          1 + 2 + 3 + … + {n} = ?
        </div>
      </div>

      {/* Chain of nodes */}
      <div className="flex items-center gap-1 flex-wrap justify-center">
        {[1, 2, 3].map((v, i) => (
          <React.Fragment key={v}>
            <div className="px-3 py-1 rounded-lg text-sm font-bold"
              style={{ background: 'var(--money-light)', color: 'var(--money)', border: '1px solid var(--money)' }}>
              {v}
            </div>
            <div className="text-xs" style={{ color: 'var(--ink-faint)' }}>→</div>
          </React.Fragment>
        ))}
        <div className="px-3 py-1 rounded-lg text-sm font-bold"
          style={{ background: 'var(--grid-line)', color: 'var(--ink-faint)', border: '1px dashed var(--ink-faint)' }}>
          …
        </div>
        <div className="text-xs" style={{ color: 'var(--ink-faint)' }}>→</div>
        {[n - 1, n].map((v) => (
          <React.Fragment key={v}>
            <div className="px-3 py-1 rounded-lg text-sm font-bold"
              style={{ background: 'var(--money-light)', color: 'var(--money)', border: '1px solid var(--money)' }}>
              {v}
            </div>
            {v !== n && <div className="text-xs" style={{ color: 'var(--ink-faint)' }}>→</div>}
          </React.Fragment>
        ))}
      </div>

      {/* Hint toggle */}
      <button
        onClick={() => setShowHint(h => !h)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all"
        style={{
          border: '1.5px solid var(--grid-line)',
          color: 'var(--ink-secondary)',
          background: showHint ? 'var(--formula-light, #ede5ff)' : 'var(--canvas-card)',
        }}
      >
        💡 {showHint ? 'Ẩn gợi ý' : 'Xem gợi ý'}
      </button>

      {/* Hint panel */}
      <AnimatePresence>
        {showHint && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="overflow-hidden w-full"
          >
            <div className="rounded-xl p-4 flex flex-col gap-3"
              style={{ background: 'var(--formula-light, #ede5ff)', border: '1px solid var(--formula)' }}>
              <div className="text-sm font-bold" style={{ color: 'var(--formula)' }}>
                Mẹo Gauss: ghép cặp đầu + cuối
              </div>

              {/* Pair diagrams */}
              {PAIRS.map(({ a, b }, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center justify-between rounded-lg px-4 py-2"
                  style={{ background: 'rgba(255,255,255,0.6)' }}
                >
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-xs font-bold"
                      style={{ background: 'var(--money-light)', color: 'var(--money)', border: '1px solid var(--money)' }}>
                      {a}
                    </span>
                    <span className="text-sm" style={{ color: 'var(--ink-faint)' }}>+</span>
                    <span className="px-2 py-0.5 rounded text-xs font-bold"
                      style={{ background: 'var(--debt-light, #fde8e8)', color: 'var(--debt)', border: '1px solid var(--debt)' }}>
                      {b}
                    </span>
                  </div>
                  <div className="text-sm font-black" style={{ color: 'var(--formula)' }}>
                    = {a + b}
                  </div>
                </motion.div>
              ))}

              <div className="text-sm font-medium text-center" style={{ color: 'var(--ink-secondary)', fontFamily: 'var(--font-hand)' }}>
                50 cặp × 101 = ?  →  Rồi chia đôi? Hay không cần?
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input area */}
      <div className="flex flex-col items-center gap-3 w-full">
        <motion.input
          key={shakeKey}
          ref={inputRef}
          type="text"
          inputMode="numeric"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Nhập đáp án…"
          className="w-48 text-center text-2xl font-black outline-none bg-transparent"
          style={{
            borderBottom: `3px solid ${
              result === 'correct' ? 'var(--money)' :
              result === 'wrong' ? 'var(--debt)' :
              'var(--grid-line)'
            }`,
            color: 'var(--ink-primary)',
            fontFamily: 'var(--font-mono)',
            paddingBottom: 6,
            transition: 'border-color 0.3s',
          }}
          animate={result === 'wrong' ? {
            x: [-8, 8, -6, 6, -3, 3, 0],
            transition: { duration: 0.45 }
          } : {}}
        />

        {/* Error hint */}
        <AnimatePresence>
          {result === 'wrong' && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-xs font-semibold"
              style={{ color: 'var(--debt)' }}
            >
              Thử lại — xem gợi ý nhé!
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleCheck}
          disabled={result === 'correct'}
          className="px-8 py-3 rounded-xl font-bold text-white text-base"
          style={{ background: 'var(--canvas-dark)', opacity: result === 'correct' ? 0.5 : 1 }}
        >
          Kiểm Tra
        </motion.button>
      </div>

      {/* Success result */}
      <AnimatePresence>
        {result === 'correct' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 18 }}
            className="w-full rounded-2xl p-6 flex flex-col items-center gap-3"
            style={{ background: 'var(--money-light)', border: '2px solid var(--money)' }}
          >
            {/* Mini rectangle diagram */}
            <svg viewBox="0 0 200 100" width={200} height={100}>
              <rect x="5" y="5" width="190" height="90" rx="4"
                fill="none" stroke="var(--money)" strokeWidth="2" />
              <polygon points="5,95 195,5 195,95" fill="var(--money-light)" />
              <polygon points="5,5 195,5 5,95" fill="var(--debt-light, #fde8e8)" style={{ opacity: 0.3 }} />
              <line x1="5" y1="95" x2="195" y2="5"
                stroke="var(--formula)" strokeWidth="2" strokeDasharray="4 3" />
              <text x="145" y="80" fill="var(--money)" fontSize="13" fontWeight="bold" textAnchor="middle">Sₙ</text>
            </svg>

            <div className="text-2xl font-black" style={{ color: 'var(--money)', fontFamily: 'var(--font-mono)' }}>
              <NumberOdometer value={correctAnswer} delay={0} duration={1.2} />
            </div>
            <div className="text-base font-bold" style={{ color: 'var(--money)' }}>
              🎉 Chính xác! S₁₀₀ = 50 × 101 = 5050
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
