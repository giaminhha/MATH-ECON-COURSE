import React, { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { NumberOdometer, DiagramLabel, drawLine, fadeUpLabel } from './SharedDiagramComponents';

/* ────────────────────────────────────────────────────────────
   Slide 1 — STORY: "Vé Concert 2 Triệu"
   Ticket SVG + progress bar at 0%
   ──────────────────────────────────────────────────────────── */
export const ConcertStoryDiagram = () => {
  return (
    <div className="w-full flex flex-col items-center gap-5 py-2">
      {/* Ticket */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative flex items-center justify-center rounded-2xl px-10 py-6 shadow-lg"
        style={{
          background: 'linear-gradient(135deg, var(--formula-light, #e8d5ff) 0%, var(--formula, #8860d0) 100%)',
          border: '2px solid var(--formula, #8860d0)',
          minWidth: 260,
        }}
      >
        {/* Notch left */}
        <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full"
          style={{ background: 'var(--canvas-card, #FFFBF5)' }} />
        {/* Notch right */}
        <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full"
          style={{ background: 'var(--canvas-card, #FFFBF5)' }} />
        {/* Dashed line */}
        <div className="absolute top-0 bottom-0 left-1/2 border-l-2 border-dashed" style={{ borderColor: 'rgba(255,255,255,0.4)' }} />

        <div className="text-center">
          <div className="text-xs uppercase tracking-widest font-bold text-white opacity-80 mb-1">🎵 Concert</div>
          <div className="text-3xl font-black text-white" style={{ fontFamily: 'var(--font-mono, monospace)' }}>
            2.000.000đ
          </div>
          <div className="text-xs text-white opacity-70 mt-1">Sơn Tùng MTP World Tour</div>
        </div>
      </motion.div>

      {/* Savings plan */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="w-full max-w-sm text-sm font-medium text-center"
        style={{ color: 'var(--ink-secondary)' }}
      >
        <div className="flex justify-center gap-4 flex-wrap mb-3">
          {[200, 300, 400, 500, 600].map((v, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 + i * 0.12 }}
              className="px-3 py-1 rounded-full text-xs font-bold"
              style={{ background: 'var(--money-light)', color: 'var(--money)', border: '1px solid var(--money)' }}
            >
              T{i + 1}: {v}k
            </motion.span>
          ))}
        </div>

        {/* Progress bar */}
        <div className="relative h-3 rounded-full overflow-hidden" style={{ background: 'var(--grid-line)' }}>
          <motion.div
            className="h-full rounded-full"
            style={{ background: 'var(--money)' }}
            initial={{ width: 0 }}
            animate={{ width: '0%' }}
          />
        </div>
        <div className="flex justify-between text-xs mt-1" style={{ color: 'var(--ink-faint)' }}>
          <span>0k</span>
          <span>2.000k</span>
        </div>
      </motion.div>
    </div>
  );
};

/* ────────────────────────────────────────────────────────────
   Slide 2 — DIAGRAM: "Diện Tích Bậc Thang = Tổng"
   5 staircase blocks filled bottom-up, odometer
   ──────────────────────────────────────────────────────────── */
export const StaircaseAreaDiagram = () => {
  const values = [200, 300, 400, 500, 600];
  const total = values.reduce((a, b) => a + b, 0); // 2000
  const maxH = 220;
  const blockW = 60;
  const baseY = 240;

  return (
    <div className="w-full relative flex flex-col items-center min-h-[300px]">
      <svg viewBox="0 0 500 280" className="w-full max-w-xl">
        <defs>
          <clipPath id="fill-clip-0"><rect x="50" y="0" width={blockW} height="300" /></clipPath>
          <clipPath id="fill-clip-1"><rect x="125" y="0" width={blockW} height="300" /></clipPath>
          <clipPath id="fill-clip-2"><rect x="200" y="0" width={blockW} height="300" /></clipPath>
          <clipPath id="fill-clip-3"><rect x="275" y="0" width={blockW} height="300" /></clipPath>
          <clipPath id="fill-clip-4"><rect x="350" y="0" width={blockW} height="300" /></clipPath>
        </defs>

        {/* Axes */}
        <motion.line x1="35" y1={baseY} x2="450" y2={baseY}
          stroke="var(--grid-line)" strokeWidth="2"
          initial="hidden" animate="visible" variants={drawLine} />
        <motion.line x1="35" y1={baseY} x2="35" y2="20"
          stroke="var(--grid-line)" strokeWidth="2"
          initial="hidden" animate="visible" variants={drawLine} transition={{ delay: 0.2 }} />

        {values.map((val, i) => {
          const h = (val / 600) * maxH;
          const x = 50 + i * 75;
          const y = baseY - h;
          return (
            <g key={i}>
              {/* Block outline */}
              <rect x={x} y={y} width={blockW} height={h} rx={3}
                fill="none" stroke="var(--money)" strokeWidth="1.5" />

              {/* Fill animation (bottom-up) */}
              <motion.rect
                x={x} y={baseY} width={blockW} rx={3}
                fill="var(--money-light)"
                initial={{ height: 0, y: baseY }}
                animate={{ height: h, y: baseY - h }}
                transition={{ delay: 0.6 + i * 0.3, duration: 0.5, ease: 'easeOut' }}
              />

              {/* Label */}
              <motion.text x={x + blockW / 2} y={y - 8}
                textAnchor="middle" fill="var(--money)" fontSize="13" fontWeight="bold"
                initial="hidden" animate="visible" variants={fadeUpLabel}
                transition={{ delay: 1.2 + i * 0.3 }}
              >
                {val}k
              </motion.text>

              {/* Month label */}
              <text x={x + blockW / 2} y={baseY + 18}
                textAnchor="middle" fill="var(--ink-secondary)" fontSize="11">
                T{i + 1}
              </text>
            </g>
          );
        })}

        {/* Brace */}
        <motion.path
          d={`M 45 ${baseY + 28} Q 45 ${baseY + 38} 55 ${baseY + 38} L 405 ${baseY + 38} Q 415 ${baseY + 38} 415 ${baseY + 28}`}
          fill="none" stroke="var(--formula)" strokeWidth="2"
          initial="hidden" animate="visible" variants={drawLine}
          transition={{ delay: 2.5, duration: 0.8 }}
        />

        {/* Area label */}
        <DiagramLabel x={230} y={baseY + 55} text="Diện tích = Tổng S₅" delay={3.0}
          color="var(--formula)" font="var(--font-hand)" fontSize={15} />
      </svg>

      {/* Odometer */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2.0 }}
        className="text-2xl font-black"
        style={{ color: 'var(--money)', fontFamily: 'var(--font-mono)' }}
      >
        <NumberOdometer value={total} delay={2.0} duration={1.5} suffix="k" />
      </motion.div>
    </div>
  );
};

/* ────────────────────────────────────────────────────────────
   Slide 3 — DIAGRAM: "Mẹo Gauss — Lật Ngược" (GaussFlipDiagram)
   Blue tower + red tower flip 180° + merge → rectangle
   ──────────────────────────────────────────────────────────── */
export const GaussFlipDiagram = () => {
  const controls = useAnimation();
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const run = async () => {
      // Step 1: blue tower appears (handled by initial animate)
      await new Promise(r => setTimeout(r, 1200));
      // Step 2: red tower fade in
      await controls.start('redAppear');
      await new Promise(r => setTimeout(r, 400));
      // Step 3: red tower flips
      await controls.start('redFlip');
      await new Promise(r => setTimeout(r, 600));
      // Step 4: red tower slides left to merge
      await controls.start('redMerge');
      await new Promise(r => setTimeout(r, 400));
      // Step 5: labels appear
      await controls.start('labelsAppear');
    };
    run();
  }, [controls]);

  const n = 5;
  const blockW = 55;
  const unitH = 30;
  const baseY = 240;
  const blueX = 60;
  const redStartX = 380;
  // redMergeX = 60, offset = 60 - redStartX = -320

  return (
    <div className="w-full flex flex-col items-center min-h-[320px]">
      <svg viewBox="0 0 620 300" className="w-full max-w-2xl" style={{ overflow: 'visible' }}>
        {/* Blue tower (left) — static stagger */}
        {Array.from({ length: n }).map((_, i) => {
          const h = (i + 1) * unitH;
          return (
            <motion.rect
              key={`blue-${i}`}
              x={blueX + i * (blockW + 5)}
              y={baseY - h}
              width={blockW}
              height={h}
              rx={3}
              fill="var(--money-light)"
              stroke="var(--money)"
              strokeWidth="2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.15, type: 'spring', bounce: 0.3 }}
            />
          );
        })}

        {/* Blue labels */}
        {Array.from({ length: n }).map((_, i) => (
          <motion.text
            key={`blabel-${i}`}
            x={blueX + i * (blockW + 5) + blockW / 2}
            y={baseY - (i + 1) * unitH - 8}
            textAnchor="middle" fill="var(--money)" fontSize="11" fontWeight="bold"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 0.5 + i * 0.15 }}
          >
            u{i + 1}
          </motion.text>
        ))}

        {/* Label: "Tháp xanh" */}
        <motion.text x={blueX + (n * (blockW + 5)) / 2 - 5} y={baseY + 22}
          textAnchor="middle" fill="var(--money)" fontSize="12" fontWeight="bold"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.0 }}
        >
          Tháp gốc
        </motion.text>

        {/* Red tower (right) — animated */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={controls}
          variants={{
            redAppear: { opacity: 1, transition: { duration: 0.5 } },
            redFlip: {
              rotateX: 180,
              transition: { duration: 1.0, ease: 'easeInOut' },
            },
            redMerge: {
              x: -320,
              transition: { duration: 0.7, ease: 'easeOut' },
            },
            labelsAppear: { opacity: 1 },
          }}
          style={{ originX: `${redStartX + n * (blockW + 5) / 2}px`, originY: `${baseY - (n * unitH) / 2}px` }}
        >
          {Array.from({ length: n }).map((_, i) => {
            const h = (i + 1) * unitH;
            return (
              <rect
                key={`red-${i}`}
                x={redStartX + i * (blockW + 5)}
                y={baseY - h}
                width={blockW}
                height={h}
                rx={3}
                fill="var(--debt-light, #fde8e8)"
                stroke="var(--debt)"
                strokeWidth="2"
              />
            );
          })}
        </motion.g>

        {/* Label: "Tháp đỏ" */}
        <motion.text x={redStartX + (n * (blockW + 5)) / 2 - 5} y={baseY + 22}
          textAnchor="middle" fill="var(--debt)" fontSize="12" fontWeight="bold"
          initial={{ opacity: 0 }} animate={controls}
          variants={{ redAppear: { opacity: 1, transition: { duration: 0.4 } }, redFlip: { opacity: 1 }, redMerge: { opacity: 0 }, labelsAppear: { opacity: 0 } }}
        >
          Tháp lật
        </motion.text>

        {/* Merged result labels (shown after merge) */}
        <motion.text
          x={blueX + (n * (blockW + 5)) / 2 - 5} y={40}
          textAnchor="middle" fill="var(--formula)" fontSize="13" fontWeight="bold"
          initial={{ opacity: 0 }}
          animate={controls}
          variants={{
            labelsAppear: { opacity: 1, transition: { duration: 0.5 } },
          }}
          style={{ fontFamily: 'var(--font-hand)' }}
        >
          n × (u₁ + uₙ) = Hình chữ nhật!
        </motion.text>
        <motion.text
          x={blueX + (n * (blockW + 5)) / 2 - 5} y={58}
          textAnchor="middle" fill="var(--ink-secondary)" fontSize="11"
          initial={{ opacity: 0 }}
          animate={controls}
          variants={{
            labelsAppear: { opacity: 1, transition: { duration: 0.5, delay: 0.3 } },
          }}
        >
          Chỉ cần NỬA → chia 2 → S_n = n(u₁ + uₙ)/2
        </motion.text>

        {/* Dimension label: n cols */}
        <motion.text x={blueX + (n * (blockW + 5)) / 2 - 5} y={baseY + 40}
          textAnchor="middle" fill="var(--ink-secondary)" fontSize="11"
          initial={{ opacity: 0 }}
          animate={controls}
          variants={{ labelsAppear: { opacity: 1, transition: { duration: 0.5, delay: 0.2 } } }}
        >
          {n} cột
        </motion.text>
      </svg>
    </div>
  );
};

/* ────────────────────────────────────────────────────────────
   Slide 4 — THEOREM: mini SVG rect chia đôi chéo
   ──────────────────────────────────────────────────────────── */
export const GaussFormulaMinDiagram = () => {
  return (
    <div className="flex justify-center mt-2">
      <svg viewBox="0 0 120 80" width={120} height={80}>
        {/* Rectangle */}
        <motion.rect x={5} y={5} width={110} height={70} rx={4}
          fill="none" stroke="var(--money)" strokeWidth="2"
          initial="hidden" animate="visible" variants={drawLine} />

        {/* Fill bottom-left triangle (Sn) */}
        <motion.polygon
          points="5,75 115,75 115,5"
          fill="var(--money-light)"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
        />

        {/* Fill top-right triangle (other half) */}
        <motion.polygon
          points="5,5 115,5 5,75"
          fill="var(--debt-light, #fde8e8)"
          style={{ opacity: 0.3 }}
          initial={{ opacity: 0 }} animate={{ opacity: 0.3 }} transition={{ delay: 0.6 }}
        />

        {/* Diagonal */}
        <motion.line x1="5" y1="75" x2="115" y2="5"
          stroke="var(--formula)" strokeWidth="2" strokeDasharray="4 3"
          initial="hidden" animate="visible" variants={drawLine} transition={{ delay: 0.8 }} />

        {/* Sn label */}
        <motion.text x={90} y={65} fill="var(--money)" fontSize="13" fontWeight="bold"
          textAnchor="middle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>
          Sₙ
        </motion.text>
      </svg>
    </div>
  );
};

/* ────────────────────────────────────────────────────────────
   Slide 5 — INFO: "Giải Bài Vé Concert"
   Progress bar animate 0→100% + concert ticket glow
   ──────────────────────────────────────────────────────────── */
export const ConcertProgressDiagram = () => {
  return (
    <div className="w-full flex flex-col items-center gap-4 py-2">
      {/* Concert ticket */}
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.8, type: 'spring' }}
        className="relative flex items-center justify-center rounded-2xl px-10 py-5"
        style={{
          background: 'linear-gradient(135deg, var(--formula-light, #e8d5ff) 0%, var(--formula, #8860d0) 100%)',
          border: '2px solid var(--formula, #8860d0)',
          boxShadow: '0 0 24px rgba(136,96,208,0.35)',
          minWidth: 220,
        }}
      >
        <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full"
          style={{ background: 'var(--canvas-card, #FFFBF5)' }} />
        <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full"
          style={{ background: 'var(--canvas-card, #FFFBF5)' }} />
        <div className="text-center">
          <div className="text-xl font-black text-white">🎵 VÉ ĐÃ ĐỦ!</div>
          <div className="text-sm text-white opacity-80">Sau 5 tháng tiết kiệm</div>
        </div>
      </motion.div>

      {/* Calculation steps */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="w-full max-w-sm rounded-xl p-4 text-sm"
        style={{ background: 'var(--money-light)', border: '1px solid var(--money)' }}
      >
        <div className="font-bold mb-2" style={{ color: 'var(--money)' }}>Tính theo Gauss:</div>
        <div style={{ color: 'var(--ink-primary)', fontFamily: 'var(--font-mono)', lineHeight: 1.8 }}>
          <div>u₁ = 200k,  d = 100k</div>
          <div>u₅ = 200 + 4×100 = 600k</div>
          <div>S₅ = 5×(200+600)/2</div>
          <div>S₅ = 5×800/2 = <strong>2000k ✅</strong></div>
        </div>
      </motion.div>

      {/* Progress bar */}
      <div className="w-full max-w-sm">
        <div className="relative h-4 rounded-full overflow-hidden" style={{ background: 'var(--grid-line)' }}>
          <motion.div
            className="h-full rounded-full"
            style={{ background: 'var(--money)' }}
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ delay: 0.8, duration: 1.5, ease: 'easeOut' }}
          />
        </div>
        <div className="flex justify-between text-xs mt-1" style={{ color: 'var(--ink-secondary)' }}>
          <span>
            <NumberOdometer value={2000} delay={0.8} duration={1.5} suffix="k" />
          </span>
          <span style={{ color: 'var(--money)', fontWeight: 700 }}>2.000k ✅</span>
        </div>
      </div>
    </div>
  );
};
