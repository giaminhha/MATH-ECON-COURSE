"use client";

import React, { useState } from 'react';
import { InteractionRegistry } from '@/components/interactions/InteractionRegistry';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Coins, Battery, BrainCircuit, Frown } from 'lucide-react';

interface JobConfig {
  id: string;
  title: string;
  rewardPerCorrect: number;
  energyCostPerCorrect: number;
  moodCostPerCorrect: number; // Đi làm thì có thể tuột mood
  questions: any[]; // Mảng mock các câu hỏi
}

interface PracticeEngineProps {
  job: JobConfig;
  userEnergy: number;
}

export const PracticeEngine: React.FC<PracticeEngineProps> = ({ job, userEnergy }) => {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [earnedMoney, setEarnedMoney] = useState(0);
  const [energySpent, setEnergySpent] = useState(0);
  const [moodSpent, setMoodSpent] = useState(0);
  
  const [resultState, setResultState] = useState<'IDLE' | 'CORRECT' | 'WRONG' | 'SAVING'>('IDLE');

  const MAX_QUESTIONS = job.questions.length;
  const currentQuestion = job.questions[currentIndex % MAX_QUESTIONS]; // Lặp vòng nếu hết câu

  const minigameKey = "DEFAULT_QUIZ"; // Có thể mở rộng sau
  const InteractiveComponent = InteractionRegistry[minigameKey];

  const handleInteractionComplete = (isCorrect: boolean) => {
    if (isCorrect) {
      setEarnedMoney(prev => prev + job.rewardPerCorrect);
      setEnergySpent(prev => prev + job.energyCostPerCorrect);
      setMoodSpent(prev => prev + job.moodCostPerCorrect);
      setResultState('CORRECT');
    } else {
      // Giải sai bị sếp trừ mood, không được tiền, vẫn bị trừ nửa năng lượng (vì tốn công nghĩ)
      setEnergySpent(prev => prev + Math.floor(job.energyCostPerCorrect / 2));
      setMoodSpent(prev => prev + job.moodCostPerCorrect * 2);
      setResultState('WRONG');
    }
  };

  const nextQuestion = () => {
    // Nếu Năng lượng thực tế (Năng lượng ban đầu - đã tiêu) <= 0 thì không cho giải toán nữa
    if ((userEnergy - energySpent) <= 0) {
      alert("Bạn đã kiệt sức! Hãy Rút tiền & Nghỉ ngơi.");
      return;
    }
    setResultState('IDLE');
    setCurrentIndex(prev => prev + 1);
  };

  // Nút Rút Tiền (Kết thúc vòng lặp chơi và gửi API)
  const finishAndSave = async () => {
    setResultState('SAVING');
    try {
      await fetch('/api/user/stats', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          moneyDelta: earnedMoney,
          energyDelta: -energySpent,
          moodDelta: -moodSpent
        })
      });
      // Về trang dashboard
      router.push('/dashboard');
    } catch (e) {
      console.error(e);
      alert("Lỗi khi lưu dữ liệu");
      setResultState('IDLE');
    }
  };

  return (
    <div className="relative bg-slate-900 min-h-screen font-sans flex flex-col">
      {/* HEADER BẢNG LƯƠNG */}
      <div className="bg-slate-950 p-6 shadow-xl flex flex-wrap justify-between items-center text-white border-b border-slate-800 gap-4">
        <div className="flex items-center gap-4">
          <button 
            onClick={finishAndSave}
            title="Nghỉ việc & ra về"
            className="p-3 bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white rounded-xl transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-black text-emerald-400">{job.title}</h1>
            <p className="text-sm text-slate-400">Làm việc liên tục kiến tiền mặt (Ca làm)</p>
          </div>
        </div>

        {/* THỐNG KÊ REALTIME */}
        <div className="flex gap-4">
          <div className="bg-slate-900 border border-emerald-900 rounded-2xl p-3 flex items-center gap-3">
            <Coins className="text-emerald-400 w-6 h-6" />
            <div>
              <div className="text-xs font-bold text-slate-500 uppercase">Thù lao tạm tính</div>
              <div className="text-xl font-black text-emerald-400">+{earnedMoney.toLocaleString('vi-VN')}đ</div>
            </div>
          </div>
          <div className="bg-slate-900 border border-blue-900 rounded-2xl p-3 flex items-center gap-3">
            <Battery className="text-blue-400 w-6 h-6" />
            <div>
              <div className="text-xs font-bold text-slate-500 uppercase">Năng lượng còn lại</div>
              <div className={`text-xl font-black ${userEnergy - energySpent <= 0 ? 'text-red-500' : 'text-blue-400'}`}>
                {Math.max(0, userEnergy - energySpent)}/100
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* GAME AREA */}
      <div className="flex-1 flex flex-col p-6 items-center justify-center max-w-4xl mx-auto w-full relative">
        
        {resultState === 'IDLE' && InteractiveComponent && (
          <div className="w-full bg-slate-800 mt-4 rounded-3xl p-6 shadow-2xl border-4 border-slate-700 relative animate-in zoom-in-95 duration-300">
            <div className="absolute -top-5 left-8 bg-indigo-600 text-white font-bold px-4 py-1 rounded-full text-sm">
              Nhiệm vụ #{currentIndex + 1}
            </div>
            {/* Minigame render ở đây */}
            <div className="text-white">
              <InteractiveComponent 
                variables={currentQuestion} 
                onComplete={(res: boolean) => handleInteractionComplete(res)} 
              />
            </div>
          </div>
        )}

        {resultState === 'CORRECT' && (
          <div className="text-center animate-in slide-in-from-bottom flex flex-col items-center">
            <div className="w-32 h-32 bg-emerald-500 rounded-full flex items-center justify-center text-white mb-6 shadow-emerald-500/50 shadow-2xl">
              <Coins className="w-16 h-16" />
            </div>
            <h2 className="text-4xl font-black text-white mb-2">Hoàn thành xuất sắc!</h2>
            <p className="text-xl text-emerald-400 font-bold mb-8">+{job.rewardPerCorrect.toLocaleString()}đ vào quỹ thù lao</p>
            
            <button 
              onClick={nextQuestion}
              disabled={userEnergy - energySpent <= 0}
              className="bg-emerald-500 text-slate-900 px-8 py-4 rounded-2xl text-xl font-black hover:bg-emerald-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed mb-4"
            >
              Làm tiếp nhiệm vụ khác
            </button>
            
            <button 
              onClick={finishAndSave}
              className="text-slate-400 font-bold hover:text-white transition-all underline underline-offset-4"
            >
              Rút tiền & Về nhà (Kết thúc ca làm)
            </button>
          </div>
        )}

        {resultState === 'WRONG' && (
          <div className="text-center animate-in slide-in-from-bottom flex flex-col items-center">
            <div className="w-32 h-32 bg-red-500 rounded-full flex items-center justify-center text-white mb-6 shadow-red-500/50 shadow-2xl">
              <Frown className="w-16 h-16" />
            </div>
            <h2 className="text-4xl font-black text-white mb-2">Làm hỏng việc!</h2>
            <p className="text-xl text-red-400 font-bold mb-8">Không nhận được tiền, lại còn bị sếp mắng trừ hao tâm lý.</p>
            
            <button 
              onClick={nextQuestion}
              disabled={userEnergy - energySpent <= 0}
              className="bg-slate-700 text-white px-8 py-4 rounded-2xl text-xl font-black hover:bg-slate-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed mb-4"
            >
              Thử lại nhiệm vụ khác để gỡ danh dự
            </button>
            
            <button 
              onClick={finishAndSave}
              className="text-slate-400 font-bold hover:text-white transition-all underline underline-offset-4"
            >
              Bỏ cuộc về nhà (Chốt sổ tạm tính)
            </button>
          </div>
        )}

        {resultState === 'SAVING' && (
          <div className="text-white text-center">
            <BrainCircuit className="w-16 h-16 animate-pulse mx-auto mb-4 text-indigo-500" />
            <h2 className="text-2xl font-bold">Đang chốt sổ lương báo cáo lên Hệ thống...</h2>
          </div>
        )}

      </div>
    </div>
  );
};