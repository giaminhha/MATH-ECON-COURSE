"use client";

import React, { useState } from 'react';
import { FormattedText } from '@/components/FormattedText';
import { TerminalSquare, ShieldAlert, Cpu } from 'lucide-react';

export default function CyberDemo() {
  const [val, setVal] = useState("");

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 sm:p-8 font-mono text-white selection:bg-cyan-900 overflow-hidden relative">
      {/* Background Grid (Phong cách Toán Học / Matrix) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40 pointer-events-none"></div>

      <div className="w-full max-w-3xl bg-slate-950/90 text-slate-100 backdrop-blur-md border border-cyan-500/30 rounded-xl shadow-[0_0_40px_rgba(6,182,212,0.15)] relative z-10 overflow-hidden">
        
        {/* Header / Thanh tiêu đề Terminal */}
        <div className="bg-slate-950 border-b border-cyan-900/50 px-4 py-3 flex items-center gap-3">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/50 shadow-[0_0_5px_rgba(239,68,68,0.8)]"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/50 shadow-[0_0_5px_rgba(234,179,8,0.8)]"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/50 shadow-[0_0_5px_rgba(34,197,94,0.8)]"></div>
          </div>
          <div className="flex-1 text-center text-xs text-slate-500 tracking-widest uppercase flex items-center justify-center gap-2">
            <TerminalSquare size={14} className="text-cyan-600" /> 
            <span>ROOT_OVERRIDE // FINANCIAL_PROTOCOL</span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-10 flex flex-col gap-8">
          
          {/* Mật thư nhiệm vụ */}
          <div className="flex items-start gap-4">
            <Cpu className="text-white mt-1 shrink-0 animate-pulse drop-shadow-[0_0_5px_rgba(34,211,238,0.8)]" />
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-cyan-300 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)] uppercase tracking-wide">
                Cảnh Báo: Quỹ Thời Gian Thiếu Hụt
              </h2>
              <p className="text-slate-300 mt-3 text-sm sm:text-base leading-relaxed">
                Hệ thống ghi nhận bạn đang nỗ lực đạt mục tiêu <strong className="text-amber-400">500,000,000 VNĐ</strong>. 
                Bạn hiện có vốn gốc <FormattedText text="$P = 150,000,000$" />. 
                Lãi suất cổng đầu tư hiện tại đang khóa ở mức <FormattedText text="$r = 0.08$" /> (8%/năm).
              </p>
            </div>
          </div>

          {/* Sổ tay Blueprint (Toán học) */}
          <div className="bg-slate-950/60 border border-cyan-900/60 p-6 rounded-lg relative group hover:border-cyan-500/60 transition-all shadow-inner">
            <div className="absolute -top-3 left-4 bg-slate-900 px-3 py-0.5 text-[10px] text-white font-bold border border-cyan-800 rounded uppercase tracking-widest shadow-[0_0_10px_rgba(6,182,212,0.2)]">
              [ BẢN VẼ GIẢI PHẪU: LÃI KÉP ]
            </div>
            
            <div className="text-center text-2xl sm:text-3xl text-fuchsia-400 drop-shadow-[0_0_8px_rgba(232,121,249,0.5)] my-6 tracking-widest font-sans">
              <FormattedText text="$$ A = P \cdot (1 + r)^n $$" />
            </div>
            
            <div className="text-xs text-slate-300 grid grid-cols-3 gap-2 text-center mt-2 font-bold tracking-wider">
              <div>A: MỤC TIÊU ($500M)</div>
              <div>P: VỐN GỐC ($150M)</div>
              <div>r: TỐC ĐỘ BƠM (8%)</div>
            </div>
          </div>

          {/* Khung tương tác - The Override */}
          <div className="mt-2">
            <p className="text-sm text-cyan-500 mb-3 flex items-center gap-2 uppercase tracking-wider font-bold">
              <ShieldAlert size={16} className="text-amber-500 animate-bounce" />
              YÊU CẦU: Nhập biến số (n) để bẻ khóa kỳ hạn vay
            </p>
            
            <div className="flex items-center gap-3 bg-slate-950 border-2 border-cyan-900 p-3 sm:p-4 rounded-lg focus-within:border-cyan-400 focus-within:shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all">
              <span className="text-cyan-600 select-none font-bold text-lg">{">"} root/calc -n </span>
              <input 
                type="text" 
                className="bg-transparent border-none outline-none text-amber-400 font-bold text-xl w-full placeholder-cyan-900/50"
                placeholder="15.5..."
                value={val}
                onChange={(e) => setVal(e.target.value)}
                autoFocus
              />
              <button className="bg-cyan-950 text-white px-6 py-2 rounded text-sm hover:bg-cyan-400 hover:text-slate-950 transition-all uppercase font-bold tracking-widest border border-cyan-500/50 hover:shadow-[0_0_15px_rgba(34,211,238,0.6)]">
                EXECUTE
              </button>
            </div>
          </div>

          {/* Footer Timeline */}
          <div className="border-t border-cyan-900/50 pt-4 mt-2 flex justify-between text-[10px] text-slate-400 uppercase font-bold tracking-widest">
            <span>Trạng thái: CHỜ LẬP TRÌNH</span>
            <span className="animate-pulse text-amber-500/70">| GIAO THỨC TÌM THỜI GIAN ĐANG CHỜ |</span>
          </div>

        </div>
      </div>
    </div>
  );
}




