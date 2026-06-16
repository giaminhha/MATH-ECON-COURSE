"use client";

import React, { useState } from 'react';
import type { InteractionProps } from '@/types/lesson';
import { Send } from 'lucide-react';
import { FormattedText } from '../FormattedText';

export const FillBlanks: React.FC<InteractionProps> = ({ variables, onComplete }) => {
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const handleSubmit = () => {
    let isCorrect = true;
    
    for (const part of variables.template) {
      if (typeof part !== 'string') {
        // Làm sạch đáp án (bỏ khoảng trắng dư, dấu phẩy phân cách ngàn, v.v)
        const expected = part.expected.toString().trim();
        const rawActual = (answers[part.id] || "").toString().trim();
        // Loại bỏ mọi ký tự không nhận diện được như dấu phẩy, dấu chấm nếu cần cho số lớn (10,000 -> 10000)
        const actual = rawActual.replace(/[,\.]/g, '');
        
        if (actual !== expected) {
          isCorrect = false;
          break;
        }
      }
    }
    onComplete(isCorrect, isCorrect ? 100 : 0);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  // Nếu người dùng nhập sai format ban đầu (VD nhập 10000x + 200000), 
  // việc điền chỗ trống sẽ ép họ nhập đúng vị trí định dạng Toán Học.
  return (
    <div className="flex flex-col h-full bg-white rounded-2xl p-6 relative gap-4">
      <h3 className="text-xl font-bold text-slate-800 mb-2"><FormattedText text={variables.question} /></h3>
      
      <div className="flex-1 flex flex-col justify-center items-center gap-6">
        <div className="flex items-center flex-wrap justify-center min-h-[100px] text-4xl font-mono text-slate-700 bg-slate-100 p-8 rounded-3xl shadow-inner border-2 border-slate-200 w-full">
          {variables.template.map((part: any, index: number) => {
            if (typeof part === 'string') {
              return <span key={index} className="mx-2"><FormattedText text={part} /></span>;
            } else {
              return (
                <div key={index} className="flex flex-col items-center mx-2 group">
                  <span className="text-xs text-indigo-500 font-sans font-bold absolute -mt-6 opacity-0 group-hover:opacity-100 transition-opacity">{part.label}</span>
                  <input 
                    type="text"
                    value={answers[part.id] || ''}
                    onChange={(e) => setAnswers({...answers, [part.id]: e.target.value})}
                    onKeyDown={handleKeyDown}
                    placeholder={part.placeholder || "?"}
                    className="w-32 bg-white border-b-4 border-indigo-400 text-center font-bold text-indigo-700 outline-none focus:border-indigo-600 focus:bg-indigo-50 rounded-t-lg transition flex mt-2 shadow-sm"
                  />
                </div>
              );
            }
          })}
        </div>
        <p className="text-sm text-slate-400 italic">Mẹo: Chỉ điền hệ số số học (VD: 10000), bạn có thể dùng dấu phẩy phân cách hàng nghìn (VD: 10,000).</p>
      </div>

      <button 
        onClick={handleSubmit}
        className="w-full bg-indigo-600 text-white font-bold text-xl py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-indigo-700 hover:shadow-lg transition-all"
      >
        <Send className="w-6 h-6" />
        Chốt Công Thức
      </button>
    </div>
  );
};


