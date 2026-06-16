"use client";

import React, { useState } from 'react';
import type { InteractionProps } from '@/types/lesson';
import { Send } from 'lucide-react';
import { FormattedText } from '../FormattedText';

export const SliderGraph: React.FC<InteractionProps> = ({ variables, onComplete }) => {
  // variables = { question, min, max, step, correctValue, a, b, c, unitX, unitY, functionType: 'linear' | 'parabola' }
  const [val, setVal] = useState<number>((variables.min + variables.max) / 2);

  const calculateY = (x: number) => {
    if (variables.functionType === 'parabola') {
      return variables.a * x * x + variables.b * x + variables.c;
    }
    return variables.a * x + variables.b;
  };

  const currentY = calculateY(val);
  
  // Tính MaxY để vẽ Chart (Tương đối)
  const yValues = [calculateY(variables.min), calculateY(variables.max), calculateY((variables.min + variables.max)/2)];
  if(variables.functionType === 'parabola' && variables.a < 0) {
    yValues.push(calculateY(-variables.b / (2 * variables.a))); // Cực đại
  }
  const maxY = Math.max(...yValues, 0) * 1.2 || 1; // Tạo khoảng đệm 20%
  const chartHeight = 120;

  const handleSubmit = () => {
    const isCorrect = Math.abs(val - variables.correctValue) < (variables.step || 1) * 2; // Cho phép sai số nhẹ (2 nấc)
    onComplete(isCorrect, isCorrect ? 100 : 0);
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-2xl p-4 sm:p-6 relative gap-3 overflow-y-auto">
      <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-1"><FormattedText text={variables.question} /></h3>
      
      <div className="flex-1 flex flex-col justify-center gap-4">
        
        {/* CHART AREA - Vẽ giản đồ tương tác với điểm động */}
        <div className="bg-slate-50 border-2 border-slate-200 rounded-2xl p-4 flex items-end justify-center relative overflow-hidden" style={{height: `${chartHeight}px`}}>
          
          {/* Trục Tung (Y) */}
          <div className="absolute left-4 top-4 bottom-4 w-1 bg-slate-300 rounded-full flex flex-col justify-between">
            <span className="text-[10px] absolute left-2 -top-2 font-bold text-slate-400 whitespace-nowrap">{variables.unitY}</span>
          </div>
          
          {/* Trục Hoành (X) */}
          <div className="absolute left-4 right-4 bottom-5 h-1 bg-slate-300 rounded-full">
            <span className="text-[10px] absolute right-0 -bottom-4 font-bold text-slate-400 whitespace-nowrap">{variables.unitX}</span>
          </div>

          {/* Vẽ Nền Parabol bằng tập hợp các đường Line nhỏ liền nhau */}
          <div className="absolute left-4 right-4 top-4 bottom-5">
            <svg className="w-full h-full overflow-visible" preserveAspectRatio="none">
              {/* Vẽ đường cong từ 40 đoạn thẳng nhỏ liên tiếp */}
              {Array.from({length: 40}).map((_, i) => {
                const px1 = variables.min + (i/40) * (variables.max - variables.min);
                const px2 = variables.min + ((i+1)/40) * (variables.max - variables.min);
                const py1 = calculateY(px1);
                const py2 = calculateY(px2);
                
                const x1 = `${((px1 - variables.min) / (variables.max - variables.min)) * 100}%`;
                const y1 = `${100 - (Math.max(py1, 0) / Math.max(maxY, 1)) * 100}%`;
                const x2 = `${((px2 - variables.min) / (variables.max - variables.min)) * 100}%`;
                const y2 = `${100 - (Math.max(py2, 0) / Math.max(maxY, 1)) * 100}%`;

                return (
                  <line 
                    key={i} 
                    x1={x1} y1={y1} x2={x2} y2={y2} 
                    stroke="#cbd5e1" 
                    strokeWidth="3" 
                    strokeDasharray="6 6" 
                  />
                );
              })}
              {/* Vẽ Đường Trượt / Điểm Trượt Của Người Dùng */}
              <circle 
                cx={`${((val - variables.min) / (variables.max - variables.min)) * 100}%`} 
                cy={`${100 - (Math.max(currentY, 0) / Math.max(maxY, 1)) * 100}%`} 
                r="7" 
                fill="#4f46e5" 
                className="transition-all duration-100 ease-out" 
              />
            </svg>
          </div>

        </div>

        {/* THÔNG SỐ REALTIME */}
        <div className="grid grid-cols-2 gap-3 text-center">
          <div className="bg-indigo-50 text-indigo-800 py-2 rounded-xl border border-indigo-100">
            <div className="text-[10px] font-bold uppercase">{variables.unitX}</div>
            <div className="text-xl sm:text-2xl font-black">{val.toLocaleString()}</div>
          </div>
          <div className="bg-emerald-50 text-emerald-800 py-2 rounded-xl border border-emerald-100">
            <div className="text-[10px] font-bold uppercase">{variables.unitY}</div>
            <div className="text-xl sm:text-2xl font-black">{currentY.toLocaleString()}</div>
          </div>
        </div>

        {/* BỘ THANH TRƯỢT CONTROL */}
        <div className="px-4">
          <input 
            type="range" 
            className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            min={variables.min} 
            max={variables.max} 
            step={variables.step}
            value={val}
            onChange={(e) => setVal(Number(e.target.value))}
          />
          <div className="flex justify-between text-[10px] font-bold text-slate-400 mt-1">
            <span>{variables.min}</span>
            <span>{variables.max}</span>
          </div>
        </div>

      </div>

      <button 
        onClick={handleSubmit}
        className="w-full bg-indigo-600 text-white font-bold text-lg py-3 sm:py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-indigo-700 transition shrink-0"
      >
        <Send className="w-5 h-5 sm:w-6 sm:h-6" />
        Chốt Mức {variables.unitX}
      </button>
    </div>
  );
};

