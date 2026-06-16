"use client";

import React, { useState } from 'react';
import { InteractionRegistry } from '@/components/interactions/InteractionRegistry';
import { FormattedText } from '@/components/FormattedText';
import type { LessonData, DecisionChoice, StatImpact } from '@/types/lesson';
import { useRouter } from 'next/navigation';
import { TerminalSquare, Cpu, ShieldAlert, ChevronRight } from 'lucide-react';

interface LessonEngineProps {
  lessonData: LessonData;
}

export const CyberLessonEngine: React.FC<LessonEngineProps> = ({ lessonData }) => {
  const router = useRouter();
  
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [accumulatedImpact, setAccumulatedImpact] = useState<StatImpact>({
    moneyDelta: 0, debtDelta: 0, healthDelta: 0, moodDelta: 0, energyDelta: 0
  });
  
  const [interactionResult, setInteractionResult] = useState<{ isCorrect: boolean; score: number, feedback?: string } | null>(null);

  const slides = lessonData.slides || [];
  const currentSlide = slides[currentSlideIndex];
  const [visibleMessageCount, setVisibleMessageCount] = useState(1);

  const playNotificationSound = () => {
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = "sine";
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 0.05);
      gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.1);
      osc.start();
      osc.stop(ctx.currentTime + 0.1);
    } catch { }
  };

  const nextSlide = () => {
    playNotificationSound();
    setInteractionResult(null);
    if (currentSlideIndex < slides.length - 1) {
      setCurrentSlideIndex(prev => prev + 1);
      setVisibleMessageCount(1);
    } else {
      router.push('/work');
    }
  };

  const revealNextMessage = () => {
    if (currentSlide.type === 'CHAT' && currentSlide.chatMessages && visibleMessageCount < currentSlide.chatMessages.length) {
      setVisibleMessageCount(prev => prev + 1);
    }
  };

  const handleDecision = (choice: DecisionChoice) => {
    const newImpact = { ...accumulatedImpact };
    if (choice.impact.moneyDelta) newImpact.moneyDelta = (newImpact.moneyDelta || 0) + choice.impact.moneyDelta;
    if (choice.impact.debtDelta) newImpact.debtDelta = (newImpact.debtDelta || 0) + choice.impact.debtDelta;
    if (choice.impact.moodDelta) newImpact.moodDelta = (newImpact.moodDelta || 0) + choice.impact.moodDelta;
    setAccumulatedImpact(newImpact);

    setInteractionResult({
      isCorrect: true,
      score: 0,
      feedback: choice.feedback || "Mã khóa quyết định thành công. Dữ liệu đã được lưu.",
    });
  };

  const handleInteractionComplete = (isCorrect: boolean, score: number, impact?: StatImpact) => {
    if (impact && isCorrect) {
      const newImpact = { ...accumulatedImpact };
      // sum up stats if needed
      setAccumulatedImpact(newImpact);
    }
    
    // We override feedback locally to match cyber theme
    const feedbackMsg = isCorrect ? "Thẩm định: TRÙNG KHỚP! Phá khóa dữ liệu." : "Thẩm định: TỪ CHỐI! Tham số không hợp lệ.";
    setInteractionResult({ isCorrect, score, feedback: feedbackMsg });
  };

  const InteractiveComponent = currentSlide.type === 'MINIGAME' && currentSlide.interactionKey 
    ? InteractionRegistry[currentSlide.interactionKey as keyof typeof InteractionRegistry] 
    : null;

  return (
    <div className="min-h-[100dvh] w-full flex flex-col items-center justify-center bg-slate-950 text-slate-100 font-mono p-2 sm:p-6 overflow-hidden relative selection:bg-cyan-900 leading-relaxed">
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40 pointer-events-none"></div>

      <div className="w-full max-w-4xl max-h-[90vh] min-h-[500px] h-full bg-slate-950/90 backdrop-blur-md border border-cyan-700/60 rounded-xl shadow-[0_0_40px_rgba(6,182,212,0.15)] relative z-10 flex flex-col overflow-hidden">
        
        {/* Terminal Header */}
        <div className="bg-slate-900 border-b-2 border-cyan-900 px-4 py-3 flex items-center justify-between shadow-sm shrink-0">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80 shadow-[0_0_5px_rgba(239,68,68,0.8)]"></div>
            <div className="w-3 h-3 rounded-full bg-amber-500/80 shadow-[0_0_5px_rgba(234,179,8,0.8)]"></div>
            <div className="w-3 h-3 rounded-full bg-emerald-500/80 shadow-[0_0_5px_rgba(34,197,94,0.8)]"></div>
          </div>
          <div className="text-[10px] sm:text-xs text-cyan-500 tracking-widest uppercase flex items-center gap-2 font-bold select-none">
            <TerminalSquare size={14} className="text-cyan-600" /> 
            <span>ROOT_OVERRIDE_{lessonData.id.toUpperCase()}</span>
          </div>
        </div>

        {/* Progress Bar (Blocks) */}
        <div className="flex bg-slate-900 border-b border-cyan-950 p-1.5 gap-1 shrink-0">
          {slides.map((_, i) => (
            <div key={i} className={`h-1 flex-1 rounded-sm transition-all duration-500 ${i === currentSlideIndex ? 'bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]' : i < currentSlideIndex ? 'bg-cyan-900' : 'bg-slate-800'}`} />
          ))}
        </div>

        <div className="flex-1 overflow-y-auto p-4 sm:p-8 custom-scrollbar relative flex flex-col">
          <div className="h-full flex flex-col max-w-3xl mx-auto w-full">
            
            {/* NO CHAT SCENE - It's just lines printing out */}
            {['STORY', 'INFO', 'CHAT'].includes(currentSlide.type) && (
              <div className="flex flex-col gap-6 animate-in fade-in fill-mode-both duration-700">
                <div className="flex items-start gap-4">
                  <Cpu className="text-cyan-500 shrink-0 mt-1 animate-pulse drop-shadow-[0_0_5px_rgba(6,182,212,0.8)]" />
                  <div className="flex-1">
                    {currentSlide.title && (
                      <h2 className="text-xl sm:text-2xl font-bold text-cyan-300 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)] uppercase tracking-wide mb-4 border-b border-cyan-900/50 pb-2">
                        [ {currentSlide.title} ]
                      </h2>
                    )}
                    
                    {/* Render Chat Messages as Server Logs */}
                    {currentSlide.type === 'CHAT' && currentSlide.chatMessages && (
                      <div className="flex flex-col gap-4 font-mono text-sm" onClick={revealNextMessage}>
                        {currentSlide.chatMessages.map((msg, idx) => {
                          const isHidden = idx >= visibleMessageCount;
                          const isSys = msg.speaker !== 'user';
                          
                          if (isHidden) return null;
                          return (
                            <div key={idx} className={`animate-in slide-in-from-bottom-2 flex gap-3 text-slate-300`}>
                              <span className={`shrink-0 font-bold ${isSys ? 'text-amber-500' : 'text-cyan-500'}`}>
                                {isSys ? "SYS>" : "USR>"}
                              </span>
                              <div className="tracking-wide">
                                <FormattedText text={msg.text} />
                              </div>
                            </div>
                          );
                        })}
                        {visibleMessageCount < currentSlide.chatMessages.length && (
                           <div className="text-cyan-800 font-bold text-xs mt-2 animate-pulse uppercase tracking-widest cursor-pointer">
                             _ CLICK_TO_CONTINUE
                           </div>
                        )}
                      </div>
                    )}

                    {/* Standard Content string */}
                    {currentSlide.content && currentSlide.type !== 'CHAT' && (
                      <div className="text-slate-300 text-base leading-relaxed tracking-wide space-y-4">
                        <FormattedText text={currentSlide.content} />
                      </div>
                    )}
                  </div>
                </div>

                {currentSlide.theme === 'NOTEBOOK' && (
                  <div className="bg-slate-950/60 border border-cyan-800/80 p-6 rounded-lg relative mt-4 shadow-[inset_0_0_20px_rgba(6,182,212,0.05)] text-center text-cyan-200">
                    <div className="absolute -top-3 left-4 bg-slate-900 px-3 py-0.5 text-[10px] text-cyan-400 font-bold border border-cyan-800 rounded uppercase tracking-widest">
                      [ DỮ LIỆU ĐỊNH NGHĨA ]
                    </div>
                    {/* Assuming content holds the math formula */}
                    <div className="text-xl sm:text-2xl mt-2 tracking-widest">
                       <FormattedText text={currentSlide.content || "$$ ERROR_NULL $$"} />
                    </div>
                  </div>
                )}
              </div>
            )}

            {currentSlide.type === 'DECISION' && !interactionResult && (
              <div className="flex flex-col gap-6 mt-8 animate-in slide-in-from-left-4">
                <p className="text-lg font-bold text-cyan-400 border-l-2 border-cyan-500 pl-4 py-1 bg-cyan-900/10">{currentSlide.content}</p>
                <div className="grid gap-4">
                  {currentSlide.choices?.map(choice => (
                    <button 
                      key={choice.id}
                      onClick={() => handleDecision(choice)}
                      className="p-5 text-left bg-slate-950 border border-slate-700 hover:border-cyan-500 hover:bg-cyan-950/30 transition-all group relative overflow-hidden flex gap-4 items-center"
                    >
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-slate-700 group-hover:bg-cyan-400 transition-colors"></div>
                      <div className="text-cyan-700 group-hover:text-cyan-400">[{choice.id.toUpperCase()}]</div>
                      <div className="font-bold text-slate-300 group-hover:text-cyan-200 flex-1">{choice.text}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {currentSlide.type === 'MINIGAME' && InteractiveComponent && !interactionResult && (
              <div className="w-full flex-shrink-0 border border-cyan-800 bg-slate-950 relative p-4 flex flex-col shadow-[inset_0_0_20px_rgba(6,182,212,0.05)] mt-8 animate-in zoom-in-95 duration-500">
                <div className="absolute -top-2 left-4 bg-slate-900 px-2 py-0.5 text-[9px] text-cyan-400 tracking-widest uppercase border border-cyan-800">
                  [ OVERRIDE MODULE INITIATED ]
                </div>
                {/* Minigames might have hardcoded background, we should trust tailwind to isolate or rewrite slightly in future */}
                <div className="text-slate-800 mt-2">
                  <InteractiveComponent 
                    variables={currentSlide.variables} 
                    onComplete={handleInteractionComplete} 
                  />
                </div>
              </div>
            )}

            {interactionResult && (
              <div className={`p-6 mt-8 border border-${interactionResult.isCorrect ? 'cyan-500' : 'rose-600'} bg-${interactionResult.isCorrect ? 'cyan-950/30' : 'rose-950/20'} animate-in fade-in relative shadow-[0_0_15px_rgba(${interactionResult.isCorrect ? '6,182,212' : '225,29,72'},0.15)]`}>
                <div className={`text-xl font-bold uppercase tracking-widest text-${interactionResult.isCorrect ? 'cyan-300' : 'rose-400'} flex items-center gap-3`}>
                  <ShieldAlert /> SYS_RESP: {interactionResult.isCorrect ? 'ACCEPTED' : 'DENIED'}
                </div>
                <div className="mt-3 text-slate-300">
                  <FormattedText text={interactionResult.feedback || ""} />
                </div>
              </div>
            )}

            <div className="mt-auto pt-8 flex justify-end relative z-30 shrink-0">
              {(!['MINIGAME', 'DECISION'].includes(currentSlide.type) || interactionResult) && 
               !(currentSlide.type === 'CHAT' && currentSlide.chatMessages && visibleMessageCount < currentSlide.chatMessages.length) && (
                <button 
                  onClick={nextSlide}
                  className="bg-cyan-950 border border-cyan-700 text-cyan-400 px-6 py-3 text-sm font-bold animate-pulse hover:animate-none hover:bg-cyan-900 hover:border-cyan-400 transition-all flex items-center gap-2 uppercase tracking-widest shadow-[0_0_15px_rgba(6,182,212,0.2)] hover:shadow-[0_0_20px_rgba(34,211,238,0.5)]"
                >
                  PROCEED_AUTH
                  <ChevronRight className="w-5 h-5" />
                </button>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};