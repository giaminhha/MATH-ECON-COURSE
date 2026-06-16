"use client";

import React, { useState } from 'react';
import type { InteractionProps } from '@/types/lesson';
import { FormattedText } from '../FormattedText';

export const DefaultQuiz: React.FC<InteractionProps> = ({ variables, onComplete }) => {
  const [answer, setAnswer] = useState('');

  const handleSubmitText = () => {
    const isCorrect = answer.trim().toLowerCase() === variables?.correctAnswer?.toString().toLowerCase();
    onComplete(isCorrect, isCorrect ? 100 : 0);
  };

  const handleChoice = (index: number) => {
    const isCorrect = index === variables?.correctIndex;
    onComplete(isCorrect, isCorrect ? 100 : 0);
  };

  return (
    <div className="p-4 sm:p-8 flex flex-col items-center justify-center w-full bg-slate-50 rounded-xl shadow-inner">
      <h3 className="text-xl font-bold mb-6 text-gray-800 text-center max-w-xl">
        <FormattedText text={variables?.question || "Hãy chọn / nhập đáp án của bạn"} />
      </h3>
      
      {variables?.answers && Array.isArray(variables.answers) ? (
        <div className="flex flex-col gap-3 w-full max-w-md mx-auto">
          {variables.answers.map((ans: string, idx: number) => (
            <button 
              key={idx}
              onClick={() => handleChoice(idx)}
              className="p-4 rounded-xl border-2 border-indigo-200 text-slate-700 font-bold hover:bg-indigo-50 hover:border-indigo-500 transition-all text-left w-full shadow-sm"
            >
              <FormattedText text={ans} />
            </button>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <input 
            type="text" 
            className="border-2 border-gray-300 p-4 rounded-xl mb-6 w-full max-w-xs text-center text-xl font-bold focus:outline-none focus:border-indigo-500 shadow-sm"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Nhập phần số..."
          />
          <button 
            onClick={handleSubmitText}
            className="bg-indigo-600 text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-indigo-700 transition shadow-md w-full max-w-xs"
          >
            Chốt Đáp Án
          </button>
        </div>
      )}
    </div>
  );
};


