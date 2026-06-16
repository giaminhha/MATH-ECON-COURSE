"use client";

import React, { useState } from 'react';
import type { InteractionProps } from '@/types/lesson';
import { MessageCircle, Calculator, TrendingUp, AlertTriangle, CheckCircle2 } from 'lucide-react';

type Phase = 'CHAT' | 'MODELING' | 'SIMULATION' | 'DECISION';

export const IdentifyCosts: React.FC<InteractionProps> = ({ variables, onComplete }) => {
  const [phase, setPhase] = useState<Phase>('CHAT');
  
  // Phase 2 State
  const [a, setA] = useState<string>('');
  const [b, setB] = useState<string>('');
  const [feedback, setFeedback] = useState<string>('');

  // Phase 3 State
  const [distance, setDistance] = useState<number>(1);
  const currentCost = variables.correctB + variables.correctA * distance;

  // Phase 4 State
  const [decisionFeedback, setDecisionFeedback] = useState<string | null>(null);

  const handleModelingSubmit = () => {
    if (Number(a) === variables.correctA && Number(b) === variables.correctB) {
      setFeedback("Chính xác! Bạn đã tìm ra hàm số y = 15000x + 20000");
      setTimeout(() => setPhase('SIMULATION'), 1500);
    } else {
      setFeedback("Chưa chính xác. Hãy đọc kỹ tin nhắn: phí CỐ ĐỊNH ban đầu và phí BIẾN ĐỔI theo từng km.");
    }
  };

  const handleDecision = (choice: 'YES' | 'NO') => {
    const isCorrect = choice === 'NO';
    if (isCorrect) {
      setDecisionFeedback("Quyết định xuất sắc! 15km sẽ tốn 245.000đ, vượt quá 200.000đ bạn có. Bạn đã không dính bẫy chi phí chìm!");
      setTimeout(() => onComplete(true, 100), 3000);
    } else {
      setDecisionFeedback("Sai lầm! Hành trình 15km sẽ tốn 20.000đ + 15 * 15.000đ = 245.000đ. Bạn bị kẹt tiền và mất sạch!");
      setTimeout(() => onComplete(false, 0), 4000);
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 text-slate-800 absolute inset-0">
      
      {/* Phase Tracker */}
      <div className="flex justify-between items-center p-4 bg-white border-b border-slate-200">
        <button 
          onClick={() => setPhase('CHAT')}
          className={`flex items-center gap-2 hover:text-indigo-500 transition-colors ${phase === 'CHAT' ? 'text-indigo-600 font-bold' : 'text-slate-400'}`}
        >
          <MessageCircle className="w-5 h-5" /> <span className="hidden sm:inline">Tin Nhắn</span>
        </button>
        <div className={`w-8 border-t-2 ${phase !== 'CHAT' ? 'border-indigo-400' : 'border-slate-200'}`}></div>
        <button 
          onClick={() => setPhase('MODELING')}
          className={`flex items-center gap-2 hover:text-indigo-500 transition-colors ${phase === 'MODELING' ? 'text-indigo-600 font-bold' : 'text-slate-400'}`}
        >
          <Calculator className="w-5 h-5" /> <span className="hidden sm:inline">Lập Mô Hình</span>
        </button>
        <div className={`w-8 border-t-2 ${phase === 'SIMULATION' || phase === 'DECISION' ? 'border-indigo-400' : 'border-slate-200'}`}></div>
        <button 
          onClick={() => setPhase('SIMULATION')}
          className={`flex items-center gap-2 hover:text-indigo-500 transition-colors ${phase === 'SIMULATION' ? 'text-indigo-600 font-bold' : 'text-slate-400'}`}
        >
          <TrendingUp className="w-5 h-5" /> <span className="hidden sm:inline">Mô Phỏng</span>
        </button>
        <div className={`w-8 border-t-2 ${phase === 'DECISION' ? 'border-indigo-400' : 'border-slate-200'}`}></div>
        <button 
          onClick={() => setPhase('DECISION')}
          className={`flex items-center gap-2 hover:text-indigo-500 transition-colors ${phase === 'DECISION' ? 'text-indigo-600 font-bold' : 'text-slate-400'}`}
        >
          <AlertTriangle className="w-5 h-5" /> <span className="hidden sm:inline">Quyết Định</span>
        </button>
      </div>

      <div className="flex-1 p-6 overflow-y-auto w-full max-w-none">
        {/* PHASE 1: CHAT */}
        {phase === 'CHAT' && (
          <div className="max-w-2xl mx-auto space-y-4">
            <div className="bg-slate-200 p-4 rounded-2xl rounded-tl-none w-[80%] max-w-sm">
              <p className="text-sm text-slate-500 font-bold mb-1">Tài xế xe ôm</p>
              Chào em, anh tới cổng trường rồi nhé. Chỗ em xe ô tô không vào được nên chịu khó đi ra hẻm tí xíu nha.
            </div>
            <div className="bg-indigo-500 text-white p-4 rounded-2xl rounded-tr-none w-[80%] max-w-sm ml-auto">
              Dạ vâng anh đợi em tí, em chạy mưa ra liền ạ. Tính cước sao vậy anh?
            </div>
            <div className="bg-slate-200 p-4 rounded-2xl rounded-tl-none w-[90%] max-w-md">
              <p className="text-sm text-slate-500 font-bold mb-1">Tài xế xe ôm</p>
              Giá mở cửa bốc máy của hãng là 20.000đ nha em. Rồi cứ mỗi km chạy bao nhiêu thì nhân lên 15.000đ cộng vào.
            </div>
            <div className="bg-slate-200 p-4 rounded-2xl rounded-tl-none w-[90%] max-w-sm animate-pulse shadow-sm">
              Trời đang mưa nên giá có nhỉnh xíu, em mang theo đủ tiền nhé!
            </div>
            
            <button 
              onClick={() => setPhase('MODELING')}
              className="mt-8 mx-auto block max-w-md w-full bg-indigo-600 text-white py-4 rounded-xl font-bold hover:bg-indigo-700 transition shadow-lg hover:-translate-y-1"
            >
              Đã hiểu cách tính cước &rarr;
            </button>
          </div>
        )}

        {/* PHASE 2: MODELING */}
        {phase === 'MODELING' && (
          <div className="max-w-2xl mx-auto flex flex-col items-center justify-center py-8">
            <h3 className="text-2xl font-black mb-4 text-slate-800 text-center">
              Khó khăn 1: Chuyển dữ kiện thành phương trình
            </h3>
            <p className="text-slate-600 mb-8 text-center bg-yellow-50 p-6 rounded-2xl border-2 border-yellow-200 font-medium">
              Bạn có 200.000đ. Đừng vội lên xe nếu chưa biết giá. Gọi <strong className="text-indigo-600 font-mono bg-indigo-100 px-1 rounded">x</strong> là số km. Hãy điền <strong className="text-blue-600 font-mono">Biến phí (a)</strong> và <strong className="text-amber-600 font-mono">Định phí (b)</strong> để tìm Tổng tiền <strong className="text-green-600 font-mono">y = ax + b</strong>.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 w-full max-w-xl justify-center">
              <div className="flex-1 bg-white p-6 rounded-2xl border-2 border-blue-200 shadow-sm flex flex-col items-center">
                <label className="font-bold text-blue-800 mb-4 whitespace-nowrap">Biến phí (a)</label>
                <div className="flex w-full">
                  <input 
                    type="number" value={a} onChange={e => setA(e.target.value)} 
                    className="border-y-2 border-l-2 border-blue-200 p-3 rounded-l-lg w-full text-center text-lg focus:border-blue-500 outline-none font-mono" 
                    placeholder="VD: 10000" 
                  />
                  <span className="bg-blue-100 px-3 py-3 rounded-r-lg font-bold text-blue-800 whitespace-nowrap border-y-2 border-r-2 border-blue-200">/ km</span>
                </div>
              </div>

              <div className="flex flex-col justify-center items-center font-black text-slate-300 text-4xl mt-6 sm:mt-0">+</div>

              <div className="flex-1 bg-white p-6 rounded-2xl border-2 border-amber-200 shadow-sm flex flex-col items-center">
                <label className="font-bold text-amber-800 mb-4 whitespace-nowrap">Định phí (b)</label>
                <div className="flex w-full">
                  <input 
                    type="number" value={b} onChange={e => setB(e.target.value)} 
                    className="border-y-2 border-l-2 border-amber-200 p-3 rounded-l-lg w-full text-center text-lg focus:border-amber-500 outline-none font-mono" 
                    placeholder="VD: 5000" 
                  />
                  <span className="bg-amber-100 px-3 py-3 rounded-r-lg font-bold text-amber-800 border-y-2 border-r-2 border-amber-200">VNĐ</span>
                </div>
              </div>
            </div>

            {feedback && (
              <div className={`mt-8 p-4 rounded-xl font-bold w-full max-w-xl text-center shadow-sm ${feedback.includes('Chính xác') ? 'bg-green-100 text-green-800 border border-green-300' : 'bg-red-100 text-red-800 border border-red-300'}`}>
                {feedback}
              </div>
            )}

            <button 
              onClick={handleModelingSubmit}
              className="mt-8 bg-slate-900 text-white px-10 py-4 w-full max-w-xl rounded-xl font-bold shadow-lg hover:bg-slate-800 transition text-lg"
            >
              Chốt Hàm Số Toán Học
            </button>
          </div>
        )}

        {/* PHASE 3: SIMULATION */}
        {phase === 'SIMULATION' && (
          <div className="max-w-2xl mx-auto flex flex-col items-center justify-center py-8">
            <h3 className="text-2xl font-black mb-4 text-slate-800 text-center">
              Khó khăn 2: Đồng Hồ Nhảy Số
            </h3>
            <p className="text-slate-500 mb-8 text-center bg-white p-4 rounded-xl border border-slate-200 shadow-sm max-w-lg">
              Kéo thanh trượt để mô phỏng chuyến đi và xem hệ thống tính giá theo hàm số <strong>y = 15.000x + 20.000</strong>. Tiền tối đa: <strong className="text-red-500">200.000đ</strong>.
            </p>

            <div className="w-full max-w-xl bg-slate-900 p-8 rounded-3xl shadow-xl border-4 border-slate-800 mb-10 text-white relative overflow-hidden">
              {currentCost > 200000 && <div className="absolute inset-0 bg-red-600/20 animate-pulse pointer-events-none"></div>}
              
              <div className="flex justify-between items-end mb-8 relative z-10">
                <div>
                  <div className="text-slate-400 font-medium mb-1">Quãng đường</div>
                  <div className="text-indigo-400 font-mono text-3xl font-bold">{distance} km</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-1">Tổng Bill</div>
                  <div className={`text-4xl font-black font-mono ${currentCost > 200000 ? 'text-red-400 drop-shadow-[0_0_10px_rgba(248,113,113,0.8)]' : 'text-green-400'}`}>
                    {currentCost.toLocaleString('vi-VN')} đ
                  </div>
                </div>
              </div>

              <input 
                type="range" min="1" max="20" step="1" 
                value={distance} onChange={e => setDistance(Number(e.target.value))}
                className="w-full h-3 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500 relative z-10"
              />
              
              <div className="flex justify-between text-xs text-slate-500 mt-4 font-bold relative z-10 uppercase tracking-wider">
                <span>Khởi hành (0km)</span>
                <span className="text-red-400">Vượt 12km (Hết tiền)</span>
              </div>
            </div>

            <button 
              onClick={() => setPhase('DECISION')}
              className="bg-indigo-600 text-white px-10 py-4 w-full max-w-xl rounded-xl font-bold shadow-lg hover:bg-indigo-700 transition text-lg"
            >
              Lên xe & Bắt đầu hành trình &rarr;
            </button>
          </div>
        )}

        {/* PHASE 4: FINAL DECISION */}
        {phase === 'DECISION' && (
          <div className="max-w-3xl mx-auto flex flex-col items-center justify-center py-4">
            <div className="bg-red-50 p-8 rounded-3xl border-4 border-red-200 mb-8 w-full relative overflow-hidden shadow-lg">
              <div className="absolute top-0 left-0 w-full h-2 bg-red-500 animate-pulse"></div>
              <h3 className="text-2xl font-black text-red-700 mb-4 flex items-center justify-center gap-3 text-center">
                <AlertTriangle className="w-8 h-8" /> Biến Cố Khẩn Cấp!
              </h3>
              <p className="text-slate-700 mb-6 text-xl text-center font-medium leading-relaxed">
                Bạn vừa lên xe thì tài xế báo: Đoạn đường lộ bị ngập lụt. Phải đi vòng qua quốc lộ xa thêm <strong>5 km</strong> so với dự định (10km).
              </p>
              <div className="bg-white p-6 rounded-2xl shadow-sm border-2 border-red-100 flex items-center justify-center gap-6">
                <div className="text-center">
                  <div className="text-sm font-bold text-slate-500 uppercase tracking-widest">Khoảng cách mới</div>
                  <div className="text-4xl font-black text-red-600 mt-2">15 km</div>
                </div>
                <div className="w-px h-16 bg-slate-200"></div>
                <div className="text-center">
                  <div className="text-sm font-bold text-slate-500 uppercase tracking-widest">Tiền trong ví</div>
                  <div className="text-4xl font-black text-green-600 mt-2">200k</div>
                </div>
              </div>
            </div>

            <h4 className="text-2xl font-black mb-8 text-slate-800 text-center px-4">
              Dựa vào Hàm số chi phí, bạn sẽ chọn thế nào?
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mb-8">
              <button 
                onClick={() => handleDecision('YES')}
                className="bg-white border-4 border-slate-200 hover:border-red-500 hover:bg-red-50 p-8 rounded-3xl flex flex-col items-center text-center transition-all group shadow-sm"
              >
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-red-200 transition-colors">
                  <span className="text-3xl">🏃‍♂️</span>
                </div>
                <span className="font-black text-slate-800 text-2xl mb-3 group-hover:text-red-700">Tiếp Tục Đi!</span>
                <span className="text-md text-slate-500 font-medium px-4">Đã lỡ ngồi thì đi luôn. Chắc sẽ không sao đâu.</span>
              </button>

              <button 
                onClick={() => handleDecision('NO')}
                className="bg-white border-4 border-slate-200 hover:border-green-500 hover:bg-green-50 p-8 rounded-3xl flex flex-col items-center text-center transition-all group shadow-sm"
              >
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors">
                  <span className="text-3xl">🛑</span>
                </div>
                <span className="font-black text-slate-800 text-2xl mb-3 group-hover:text-green-700">Hủy chuyến!</span>
                <span className="text-md text-slate-500 font-medium px-4">Tính nhẩm <code className="bg-slate-200 px-1 rounded text-red-600">y = 15k * 15 + 20k</code> là biết cháy túi!</span>
              </button>
            </div>

            {decisionFeedback && (
              <div className={`w-full p-6 text-xl rounded-2xl font-black text-center animate-bounce shadow-lg ${decisionFeedback.includes('Quyết định xuất sắc') ? 'bg-gradient-to-r from-green-400 to-green-500 text-white' : 'bg-gradient-to-r from-red-500 to-red-600 text-white'}`}>
                {decisionFeedback.includes('xuất sắc') ? '💸 BẢO TOÀN VỐN!!! ' : '💀 RỖNG TÚI!!! '}{decisionFeedback}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
