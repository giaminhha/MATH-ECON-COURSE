"use client";

import React, { useState } from 'react';
import type { InteractionProps } from '@/types/lesson';
import { FormattedText } from '../FormattedText';

export const CostCompare: React.FC<InteractionProps> = ({ variables, onComplete }) => {
  const [xVal, setXVal] = useState<number>(0);

  // Lấy các tham số từ biến, hoặc giữ giá trị mặc định cho bài toàn cũ
  const titleLine1 = variables?.titleLine1 || "Đi Xe Buýt";
  const a1 = variables?.a1 || 0;
  const b1 = variables?.b1 || (variables?.busCost || 200000); // 200k fixed

  const titleLine2 = variables?.titleLine2 || "Đi Xe Máy";
  const a2 = variables?.a2 || (variables?.motoCostPerKm || 10000); // 10k per km
  const b2 = variables?.b2 || 0;

  const unitX = variables?.unitX || "km";
  const unitY = variables?.unitY || "VNĐ";
  const targetX = variables?.targetX || (variables?.targetKm || 20);
  const maxX = variables?.maxX || 50;

  const currentY1 = a1 * xVal + b1;
  const currentY2 = a2 * xVal + b2;

  const handleSubmit = () => {
    const isCorrect = xVal === targetX;
    onComplete(isCorrect, isCorrect ? 150 : 0);
  };

  // Tính % độ rộng của thanh biểu đồ
  const maxYY = Math.max(a1 * maxX + b1, a2 * maxX + b2, 1);
  const width1 = (currentY1 / maxYY) * 100;
  const width2 = (currentY2 / maxYY) * 100;

  return (
    <div className="p-8 flex flex-col h-full bg-white rounded-lg">
      <h3 className="text-xl font-bold mb-2 text-slate-800 text-center">
        <FormattedText text={variables?.question || "Tìm Giao Điểm Đồ Thị (Điểm Hòa Vốn)"} />
      </h3>
      <p className="text-center text-slate-500 mb-8">Kéo thanh trượt để xem giá trị thay đổi theo {unitX}. Bấm chốt khi đường màu Tím cắt đường màu Vàng!</p>
      
      {/* Simulation Đồ thị dạng Bar Chart */}
      <div className="flex-1 flex flex-col justify-center gap-6 mb-8 w-full max-w-2xl mx-auto">
        
        {/* Đường 1 (Vàng) */}
        <div>
          <div className="flex justify-between mb-1">
            <span className="font-semibold flex items-center gap-2">🟡 {titleLine1} (y = {a1 !== 0 ? `${a1}x ` : ""}{b1 !== 0 ? (a1 !== 0 ? `+ ${b1}` : b1) : "0"})</span>
            <span className="font-mono font-bold text-slate-700">{currentY1.toLocaleString()} {unitY}</span>
          </div>
          <div className="w-full bg-slate-100 h-8 rounded-full overflow-hidden">
            <div 
              className="bg-amber-400 h-full transition-all duration-300"
              style={{ width: `${Math.min(width1, 100)}%` }}
            ></div>
          </div>
        </div>

        {/* Đường 2 (Tím) */}
        <div>
          <div className="flex justify-between mb-1">
            <span className="font-semibold flex items-center gap-2">🟣 {titleLine2} (y = {a2 !== 0 ? `${a2}x ` : ""}{b2 !== 0 ? (a2 !== 0 ? `+ ${b2}` : b2) : "0"})</span>
            <span className="font-mono font-bold text-indigo-700">{currentY2.toLocaleString()} {unitY}</span>
          </div>
          <div className="w-full bg-slate-100 h-8 rounded-full overflow-hidden">
            <div 
              className="bg-indigo-500 h-full transition-all duration-300 relative"
              style={{ width: `${Math.min(width2, 100)}%` }}
            >
              {width2 > width1 && (
                <div className="absolute right-2 top-1 text-xs text-white font-bold leading-none">Vượt ranh giới!</div>
              )}
            </div>
          </div>
        </div>

      </div>

      {/* Đồ Thị Hiển Thị 2 Đường Thẳng Giao Nhau */}
      <div className="w-full max-w-2xl mx-auto bg-slate-50 border-2 border-slate-200 rounded-2xl p-4 flex items-end justify-center relative overflow-hidden h-48 mb-6">
        
        {/* Nền đồ thị (Grid) */}
        <svg className="w-full h-full overflow-visible" preserveAspectRatio="none">
          {/* Lưới ngang dọc mờ */}
          <line x1="0" y1="20%" x2="100%" y2="20%" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="4 4" />
          <line x1="0" y1="40%" x2="100%" y2="40%" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="4 4" />
          <line x1="0" y1="60%" x2="100%" y2="60%" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="4 4" />
          <line x1="0" y1="80%" x2="100%" y2="80%" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="4 4" />
          
          <line x1="20%" y1="0" x2="20%" y2="100%" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="4 4" />
          <line x1="40%" y1="0" x2="40%" y2="100%" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="4 4" />
          <line x1="60%" y1="0" x2="60%" y2="100%" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="4 4" />
          <line x1="80%" y1="0" x2="80%" y2="100%" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="4 4" />

          {/* Đường 1 (Vàng) */}
          <line 
            x1="0" 
            y1={`${100 - (b1 / maxYY) * 100}%`} 
            x2="100%" 
            y2={`${100 - ((a1 * maxX + b1) / maxYY) * 100}%`} 
            stroke="#fbbf24" // amber-400
            strokeWidth="3" 
          />
          
          {/* Đường 2 (Tím) */}
          <line 
            x1="0" 
            y1={`${100 - (b2 / maxYY) * 100}%`}  
            x2="100%" 
            y2={`${100 - ((a2 * maxX + b2) / maxYY) * 100}%`} 
            stroke="#6366f1" // indigo-500
            strokeWidth="3" 
          />

          {/* Đường gióng dọc phản hồi giá trị slider (x) */}
          <line 
            x1={`${(xVal / maxX) * 100}%`} 
            y1="0" 
            x2={`${(xVal / maxX) * 100}%`} 
            y2="100%" 
            stroke="#94a3b8" 
            strokeWidth="2" 
            strokeDasharray="4 4"
            className="transition-all duration-100 ease-out" 
          />

          {/* Điểm hiện tại trên đường 1 */}
          <circle 
            cx={`${(xVal / maxX) * 100}%`} 
            cy={`${100 - (currentY1 / maxYY) * 100}%`} 
            r="6" 
            fill="#fbbf24" 
            stroke="#ffffff"
            strokeWidth="2"
            className="transition-all duration-100 ease-out" 
          />

          {/* Điểm hiện tại trên đường 2 */}
          <circle 
            cx={`${(xVal / maxX) * 100}%`} 
            cy={`${100 - (currentY2 / maxYY) * 100}%`} 
            r="6" 
            fill="#6366f1" 
             stroke="#ffffff"
            strokeWidth="2"
            className="transition-all duration-100 ease-out" 
          />
        </svg>

        <div className="absolute left-1 top-1 text-[10px] font-bold text-slate-400">{unitY}</div>
        <div className="absolute right-1 bottom-1 text-[10px] font-bold text-slate-400">{unitX}</div>
      </div>

      {/* Thanh Slider tương tác */}
      <div className="bg-slate-50 p-6 rounded-xl mb-6 w-full max-w-2xl mx-auto border border-slate-200">
        <div className="flex justify-between text-sm font-bold text-slate-600 mb-4 tracking-wider">
          <span>0 {unitX}</span>
          <span className="text-indigo-600 bg-indigo-100 px-3 py-1 rounded-full">Hiện tại: {xVal} {unitX}</span>
          <span>{maxX} {unitX}</span>
        </div>
        <input 
          type="range" 
          min="0" 
          max={maxX} 
          step="1"
          value={xVal}
          onChange={(e) => setXVal(Number(e.target.value))}
          className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
        />
      </div>

      <div className="flex justify-center">
        <button 
          onClick={handleSubmit}
          className="bg-slate-900 text-white px-10 py-3 rounded-xl font-bold shadow-lg hover:bg-green-600 hover:-translate-y-1 transition-all"
        >
          Chốt Điểm Giao Cắt tại {xVal} {unitX}
        </button>
      </div>
    </div>
  );
};

