"use client";

import React, { useState, useEffect, useRef } from 'react';
import { InteractionRegistry } from '@/components/interactions/InteractionRegistry';
import { DiagramRegistry } from '@/components/diagrams/DiagramRegistry';
import { FormattedText } from '@/components/FormattedText';
import type { LessonData, SlideData, DecisionChoice, StatImpact } from '@/types/lesson';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ChevronRight, CheckCircle2, BookOpen, Sigma } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface LessonEngineProps {
  lessonData: LessonData;
}

/* ─── Slide transition preset ─── */
const slideVariants = {
  enter: { opacity: 0, x: 40 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -40 },
};

export const LessonEngine: React.FC<LessonEngineProps> = ({ lessonData }) => {
  const router = useRouter();

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [accumulatedImpact, setAccumulatedImpact] = useState<StatImpact>({
    moneyDelta: 0, debtDelta: 0, healthDelta: 0, moodDelta: 0, energyDelta: 0,
  });
  const [interactionResult, setInteractionResult] = useState<{
    isCorrect: boolean; score: number; feedback?: string;
  } | null>(null);
  const [visibleMessageCount, setVisibleMessageCount] = useState(1);
  
  const completedRef = useRef(false);
  const [expGained, setExpGained] = useState(0);

  const slides = lessonData.slides || [];
  const currentSlide = slides[currentSlideIndex];
  const progress = currentSlideIndex / slides.length;

  /* ── Audio cue ── */
  const playTick = () => {
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1400, ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
      osc.start(ctx.currentTime); osc.stop(ctx.currentTime + 0.08);
    } catch (_) {}
  };

  /* ── Lesson Completion API Call ── */
  useEffect(() => {
    if (!currentSlide && !completedRef.current) {
      completedRef.current = true;
      fetch('/api/lesson/complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lessonId: lessonData.id, expReward: 100 })
      })
      .then(res => res.json())
      .then(data => {
        if (data.expGained) {
          setExpGained(data.expGained);
        }
      })
      .catch(err => console.error("Error saving completion:", err));
    }
  }, [currentSlide, lessonData.id]);

  if (!currentSlide) {
    return (
      <div
        className="flex flex-col h-screen items-center justify-center gap-6"
        style={{ background: 'var(--canvas)' }}
      >
        {/* Completion illustration */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 18 }}
          className="w-20 h-20 rounded-full flex items-center justify-center text-3xl"
          style={{ background: 'var(--money-light)', border: '2px solid var(--money)' }}
        >
          ✓
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-2xl font-bold text-center"
          style={{ color: 'var(--ink-primary)' }}
        >
          Hoàn thành bài học!
          
          <AnimatePresence>
            {expGained > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.5 }}
                className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-full"
                style={{ background: 'var(--interest)', color: 'var(--canvas-dark)', boxShadow: '0 4px 16px rgba(243,156,18,0.3)' }}
              >
                <span className="text-lg font-black tracking-widest uppercase">+{expGained} EXP</span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.h1>

        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => router.push('/dashboard')}
          className="px-8 py-3 rounded-xl font-bold text-white mt-4"
          style={{ background: 'var(--canvas-dark)' }}
        >
          Trở về Dashboard
        </motion.button>
      </div>
    );
  }

  /* ── Navigation ── */
  const nextSlide = () => {
    setInteractionResult(null);
    setVisibleMessageCount(1);
    setCurrentSlideIndex(p => p + 1);
  };
  const prevSlide = () => {
    if (currentSlideIndex > 0) {
      setInteractionResult(null);
      setCurrentSlideIndex(p => p - 1);
    }
  };

  const applyImpact = (impact: StatImpact) => {
    setAccumulatedImpact(prev => ({
      moneyDelta:  (prev.moneyDelta  || 0) + (impact.moneyDelta  || 0),
      debtDelta:   (prev.debtDelta   || 0) + (impact.debtDelta   || 0),
      healthDelta: (prev.healthDelta || 0) + (impact.healthDelta || 0),
      moodDelta:   (prev.moodDelta   || 0) + (impact.moodDelta   || 0),
      energyDelta: (prev.energyDelta || 0) + (impact.energyDelta || 0),
    }));
  };

  const handleInteractionComplete = (isCorrect: boolean, score: number, impact?: StatImpact) => {
    setInteractionResult({ isCorrect, score });
    if (impact) applyImpact(impact);
  };

  const handleDecision = (choice: DecisionChoice) => {
    applyImpact(choice.impact);
    setInteractionResult({ isCorrect: true, score: 0, feedback: choice.feedback });
  };

  const InteractiveComponent = currentSlide.type === 'MINIGAME' && currentSlide.interactionKey
    ? (InteractionRegistry[currentSlide.interactionKey as keyof typeof InteractionRegistry] || InteractionRegistry['DEFAULT_QUIZ'])
    : null;

  const DiagramComponent = currentSlide.diagramKey
    ? (DiagramRegistry[currentSlide.diagramKey as keyof typeof DiagramRegistry])
    : null;

  const moneyDelta = accumulatedImpact.moneyDelta ?? 0;
  const canProceed = !['MINIGAME', 'DECISION'].includes(currentSlide.type) || !!interactionResult;

  /* ─────────────────────────── RENDER ─────────────────────────── */
  return (
    <div
      className="relative min-h-screen flex items-center justify-center py-6 px-4"
      style={{ background: 'var(--canvas)' }}
    >
      {/* Grid paper overlay — very subtle */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(var(--grid-line) 1px, transparent 1px),
            linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)
          `,
          backgroundSize: '24px 24px',
          opacity: 0.4,
        }}
      />

      {/* Back button */}
      <motion.button
        whileHover={{ x: -2 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => router.push('/dashboard')}
        className="fixed top-5 left-5 z-50 flex items-center gap-2 px-3 py-2 rounded-xl font-semibold text-sm transition-colors"
        style={{
          background: 'var(--canvas-card)',
          border: 'var(--border)',
          color: 'var(--ink-secondary)',
          boxShadow: 'var(--shadow-card)',
        }}
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Dashboard</span>
      </motion.button>

      {/* Main card */}
      <div
        className="relative flex flex-col w-full max-w-5xl mx-auto rounded-2xl overflow-hidden"
        style={{
          background: 'var(--canvas-card)',
          border: 'var(--border)',
          boxShadow: 'var(--shadow-float)',
          minHeight: '85vh',
        }}
      >
        {/* ── HEADER ── */}
        <header
          className="flex justify-between items-center px-8 py-4 border-b"
          style={{ borderColor: 'var(--grid-line)' }}
        >
          {/* Left: lesson id + title */}
          <div className="pl-2">
            <span
              className="text-xs font-bold uppercase tracking-widest block mb-0.5"
              style={{ color: 'var(--time-var)' }}
            >
              {lessonData.id} — Bước {currentSlideIndex + 1}/{slides.length}
            </span>
            <h1
              className="text-xl font-bold leading-tight"
              style={{ color: 'var(--ink-primary)', fontFamily: 'var(--font-sans)' }}
            >
              {currentSlide.title || lessonData.title}
            </h1>
          </div>

          {/* Right: money delta badge */}
          <div
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold"
            style={{
              background: moneyDelta >= 0 ? 'var(--money-light)' : 'var(--debt-light)',
              color: moneyDelta >= 0 ? 'var(--money)' : 'var(--debt)',
              border: `1px solid ${moneyDelta >= 0 ? 'var(--money)' : 'var(--debt)'}`,
              opacity: 0.9,
            }}
          >
            <span style={{ fontFamily: 'var(--font-mono)' }}>
              {moneyDelta > 0 ? '+' : ''}{moneyDelta.toLocaleString('vi-VN')}đ
            </span>
          </div>
        </header>

        {/* ── TIMELINE BAR ── */}
        <div className="relative h-1" style={{ background: 'var(--grid-line)' }}>
          <motion.div
            className="h-full"
            style={{ background: 'var(--ink-primary)' }}
            initial={false}
            animate={{ width: `${progress * 100}%` }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          />
          {/* Tick marks */}
          {slides.map((_, i) => (
            <div
              key={i}
              className="absolute top-0 h-full w-px"
              style={{
                left: `${(i / slides.length) * 100}%`,
                background: 'var(--canvas-card)',
                opacity: 0.7,
              }}
            />
          ))}
        </div>

        {/* ── CONTENT AREA ── */}
        <div className="flex-1 relative overflow-hidden">

          {/* Prev button */}
          {currentSlideIndex > 0 && (
            <motion.button
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ x: -2 }}
              whileTap={{ scale: 0.92 }}
              onClick={prevSlide}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full"
              style={{
                background: 'var(--canvas-card)',
                border: 'var(--border)',
                color: 'var(--ink-secondary)',
                boxShadow: 'var(--shadow-card)',
              }}
            >
              <ArrowLeft className="w-5 h-5" />
            </motion.button>
          )}

          <AnimatePresence mode="wait">
            <motion.div
              key={`slide-${currentSlideIndex}`}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="h-full flex flex-col"
            >
              {/* ═══ STORY / INFO ═══ */}
              {(currentSlide.type === 'STORY' || currentSlide.type === 'INFO') && (
                <SlideStory slide={currentSlide} />
              )}

              {/* ═══ THEOREM ═══ */}
              {currentSlide.type === 'THEOREM' && (
                <SlideTheorem slide={currentSlide} />
              )}

              {/* ═══ DECISION ═══ */}
              {currentSlide.type === 'DECISION' && !interactionResult && (
                <SlideDecision slide={currentSlide} onChoice={handleDecision} />
              )}

              {/* ═══ MINIGAME ═══ */}
              {currentSlide.type === 'MINIGAME' && InteractiveComponent && !interactionResult && (
                <div className="flex-1 flex flex-col p-4 min-h-0">
                  <div
                    className="flex-1 rounded-xl overflow-hidden relative"
                    style={{ border: 'var(--border)', background: 'var(--canvas)' }}
                  >
                    <InteractiveComponent
                      variables={currentSlide.variables}
                      onComplete={handleInteractionComplete}
                    />
                  </div>
                </div>
              )}

              {/* ═══ DIAGRAM ═══ */}
              {currentSlide.type === 'DIAGRAM' && (
                <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-10">
                  <div className="diagram-card w-full max-w-4xl p-8 sm:p-10 flex flex-col items-center">
                    {/* Diagram Section */}
                    {DiagramComponent && (
                      <div className="w-full mb-8 flex justify-center">
                        <DiagramComponent />
                      </div>
                    )}
                    
                    {/* Text content under diagram */}
                    <div className="w-full text-lg leading-relaxed font-medium pl-5" style={{ color: 'var(--ink-secondary)' }}>
                      <FormattedText text={currentSlide.content || ''} />
                    </div>
                  </div>
                </div>
              )}


              {/* ═══ FEEDBACK (sau decision/minigame) ═══ */}
              {interactionResult && (
                <SlideFeedback
                  isCorrect={interactionResult.isCorrect}
                  isDecision={currentSlide.type === 'DECISION'}
                  feedback={interactionResult.feedback}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── FOOTER NAV ── */}
        {canProceed && (
          <footer
            className="flex justify-end items-center px-8 py-4 border-t"
            style={{ borderColor: 'var(--grid-line)' }}
          >
            <motion.button
              whileHover={{ scale: 1.02, x: 2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                if (
                  currentSlide.type === 'CHAT' &&
                  currentSlide.chatMessages &&
                  visibleMessageCount < currentSlide.chatMessages.length
                ) {
                  setVisibleMessageCount(p => p + 1);
                  playTick();
                } else {
                  nextSlide();
                }
              }}
              className="flex items-center gap-2 px-7 py-3 rounded-xl font-bold text-white text-base"
              style={{ background: 'var(--canvas-dark)', boxShadow: 'var(--shadow-card)' }}
            >
              {currentSlideIndex === slides.length - 1 ? 'Hoàn Thành' : 'Tiếp Tục'}
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </footer>
        )}
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════
   Sub-components (slide renderers)
   ═══════════════════════════════════════════ */

function SlideStory({ slide }: { slide: SlideData }) {
  const DiagramComponent = slide.diagramKey
    ? (DiagramRegistry[slide.diagramKey as keyof typeof DiagramRegistry])
    : null;

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-10">
      <div
        className="diagram-card w-full max-w-3xl p-8 sm:p-10"
      >
        {/* Accent bar already via .diagram-card::before */}
        <div className="pl-5">
          {slide.title && (
            <div className="flex items-center gap-3 mb-5">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: 'var(--time-light)', color: 'var(--time-var)' }}
              >
                <BookOpen className="w-5 h-5" />
              </div>
              <h2
                className="text-xl font-bold"
                style={{ color: 'var(--ink-primary)' }}
              >
                <FormattedText text={slide.title} />
              </h2>
            </div>
          )}

          <div
            className="text-lg leading-relaxed font-medium"
            style={{ color: 'var(--ink-secondary)' }}
          >
            <FormattedText text={slide.content || ''} />
          </div>
          
          {/* Embedded Diagram (if any) */}
          {DiagramComponent && (
            <div className="w-full mt-8 flex justify-center">
              <DiagramComponent />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function SlideTheorem({ slide }: { slide: SlideData }) {
  const DiagramComponent = slide.diagramKey
    ? (DiagramRegistry[slide.diagramKey as keyof typeof DiagramRegistry])
    : null;

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6">
      <div
        className="theorem-plate w-full max-w-5xl p-8 sm:p-10"
        style={{ minHeight: 280 }}
      >
        <div className="grid-overlay" />

        {/* Glowing orbs */}
        <div
          className="absolute -top-24 -left-24 w-64 h-64 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(155,89,182,0.15) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />
        <div
          className="absolute -bottom-24 -right-24 w-64 h-64 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(39,174,96,0.12) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />

        {/* Title */}
        {slide.title && (
          <h2
            className="relative z-10 text-white text-2xl font-extrabold mb-6 pb-4 flex items-center gap-3 shrink-0"
            style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: 'rgba(155,89,182,0.2)', color: 'var(--formula)' }}
            >
              <Sigma className="w-5 h-5" />
            </div>
            <FormattedText text={slide.title} />
          </h2>
        )}

        {/* Two-column: explanation + formula */}
        <div className="relative z-10 flex flex-col lg:flex-row gap-8 items-center flex-1">
          {/* Explanation */}
          {slide.content && (
            <div className="lg:w-1/2">
              <p
                className="text-lg leading-relaxed font-medium"
                style={{ color: 'rgba(255,255,255,0.82)' }}
              >
                <FormattedText text={slide.content} />
              </p>
            </div>
          )}

          {/* Formula plate */}
          {slide.mathFormula && (
            <div className="lg:w-1/2 w-full min-w-0">
              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.25, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="relative rounded-xl p-6"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.12)',
                }}
              >
                {/* Badge */}
                <span
                  className="absolute -top-3 left-5 px-3 py-0.5 rounded-full text-xs font-bold uppercase tracking-widest"
                  style={{
                    background: 'var(--canvas-dark)',
                    border: '1px solid rgba(155,89,182,0.5)',
                    color: 'var(--formula)',
                  }}
                >
                  Phương Trình Cốt Lõi
                </span>
                <div className="flex items-center justify-center pt-2">
                  <FormattedText text={slide.mathFormula} />
                </div>
              </motion.div>
              
              {/* Embedded Diagram (if any, typically a chain of nodes explaining the formula) */}
              {DiagramComponent && (
                <div className="mt-6 w-full flex justify-center">
                  <DiagramComponent />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function SlideDecision({
  slide,
  onChoice,
}: {
  slide: SlideData;
  onChoice: (c: DecisionChoice) => void;
}) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-10">
      <div className="diagram-card w-full max-w-3xl p-8 sm:p-10">
        <div className="pl-5">
          {/* Label */}
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-5"
            style={{ background: 'var(--formula-light)', color: 'var(--formula)' }}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            Tư duy giải quyết
          </div>

          {/* Question */}
          <p
            className="text-xl font-bold mb-6 leading-relaxed"
            style={{ color: 'var(--ink-primary)' }}
          >
            <FormattedText text={slide.content || ''} />
          </p>

          {/* Choices */}
          <div className="flex flex-col gap-3">
            {slide.choices?.map((choice, i) => (
              <motion.button
                key={choice.id}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onChoice(choice)}
                className="text-left p-5 rounded-xl flex items-center justify-between gap-4 font-semibold text-base transition-colors"
                style={{
                  border: '2px solid var(--grid-line)',
                  color: 'var(--ink-primary)',
                  background: 'var(--canvas-card)',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--time-var)';
                  (e.currentTarget as HTMLElement).style.background = 'var(--time-light)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--grid-line)';
                  (e.currentTarget as HTMLElement).style.background = 'var(--canvas-card)';
                }}
              >
                <span><FormattedText text={choice.text} /></span>
                <span
                  className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                  style={{
                    border: '1.5px solid var(--grid-line)',
                    color: 'var(--ink-secondary)',
                  }}
                >
                  {i + 1}
                </span>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function SlideFeedback({
  isCorrect,
  isDecision,
  feedback,
}: {
  isCorrect: boolean;
  isDecision: boolean;
  feedback?: string;
}) {
  const color = isCorrect ? 'var(--money)' : 'var(--debt)';
  const lightColor = isCorrect ? 'var(--money-light)' : 'var(--debt-light)';
  const emoji = isDecision ? '🔥' : isCorrect ? '✓' : '✖';
  const title = isDecision
    ? 'Phân Tích Thành Công!'
    : isCorrect
    ? 'Chính xác!'
    : 'Có gì đó sai sai...';

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        className="w-full max-w-2xl rounded-2xl p-10 text-center"
        style={{
          background: lightColor,
          border: `2px solid ${color}`,
        }}
      >
        {/* Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -120 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 18, delay: 0.1 }}
          className="inline-flex items-center justify-center w-20 h-20 rounded-full text-4xl text-white font-bold mb-5"
          style={{ background: color }}
        >
          {emoji}
        </motion.div>

        {/* Title */}
        <h3
          className="text-2xl font-black mb-4"
          style={{ color }}
        >
          {title}
        </h3>

        {/* Feedback text */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="text-base font-medium leading-relaxed px-4 py-4 rounded-xl"
          style={{
            color: 'var(--ink-primary)',
            background: 'rgba(255,255,255,0.65)',
          }}
        >
          <FormattedText
            text={
              feedback ||
              (isCorrect
                ? 'Tuyệt vời, tư duy của bạn cực kỳ sắc bén!'
                : 'Đừng buồn, kiến thức vẫn còn đó — hãy thử lại nào.')
            }
          />
        </motion.div>
      </motion.div>
    </div>
  );
}