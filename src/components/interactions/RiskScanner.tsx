"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface RiskScannerProps {
  variables?: { passingScore?: number };
  onComplete: (isCorrect: boolean, score: number) => void;
}

type RiskLevel = 'HIGH' | 'MED' | 'LOW';

interface RiskCard {
  id: string;
  label: string;
  icon: string;
  correctLevel: RiskLevel;
  explanation: string;
}

const RISKS: RiskCard[] = [
  { id: '1', icon: '🔧', label: 'Xe máy hỏng vặt', correctLevel: 'HIGH', explanation: '~15%/năm. Chắc chắn sẽ xảy ra vài năm một lần.' },
  { id: '2', icon: '📱', label: 'Mất/hỏng điện thoại', correctLevel: 'MED', explanation: '~8%/năm. Cứ 12 năm mất 1 lần.' },
  { id: '3', icon: '🤒', label: 'Ốm nặng (>3 ngày)', correctLevel: 'MED', explanation: '~5%/năm. Trung bình 20 năm nằm viện 1 lần.' },
  { id: '4', icon: '🚗', label: 'Tai nạn giao thông', correctLevel: 'LOW', explanation: '~0.3%/năm. Rất thấp nhưng hậu quả nghiêm trọng.' },
  { id: '5', icon: '💸', label: 'Mất việc đột ngột', correctLevel: 'MED', explanation: '~4-6%/năm. Phụ thuộc vào ngành nghề.' },
  { id: '6', icon: '🏠', label: 'Hỏa hoạn nhà cửa', correctLevel: 'LOW', explanation: '~0.05%/năm. Cực hiếm nhưng nếu xảy ra là mất trắng.' },
  { id: '7', icon: '🦷', label: 'Đau răng cần nhổ', correctLevel: 'HIGH', explanation: '>10%/năm. Ai cũng sẽ bị, không sớm thì muộn.' },
  { id: '8', icon: '✈️', label: 'Chuyến bay bị huỷ', correctLevel: 'MED', explanation: '~2-3%. Đủ cao để cân nhắc mua bảo hiểm trễ chuyến.' },
];

export const RiskScanner: React.FC<RiskScannerProps> = ({
  variables = { passingScore: 6 },
  onComplete,
}) => {
  const passingScore = variables.passingScore ?? 6;
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [scanned, setScanned] = useState<{card: RiskCard, level: RiskLevel, isCorrect: boolean}[]>([]);
  const [showResult, setShowResult] = useState(false);

  const handleScan = (level: RiskLevel) => {
    if (currentIndex >= RISKS.length) return;
    
    const card = RISKS[currentIndex];
    const isCorrect = card.correctLevel === level;
    
    setScanned([...scanned, { card, level, isCorrect }]);
    if (isCorrect) setScore(s => s + 1);
    
    if (currentIndex === RISKS.length - 1) {
      setShowResult(true);
      const finalScore = score + (isCorrect ? 1 : 0);
      onComplete(finalScore >= passingScore, (finalScore / RISKS.length) * 100);
    } else {
      setCurrentIndex(i => i + 1);
    }
  };

  const getLevelLabel = (level: RiskLevel) => {
    if (level === 'HIGH') return 'Cao (>10%)';
    if (level === 'MED') return 'Trung bình (1-10%)';
    return 'Thấp (<1%)';
  };

  const currentCard = RISKS[currentIndex];

  if (showResult) {
    const passed = score >= passingScore;
    return (
      <div className="w-full flex flex-col items-center gap-6 p-6 min-h-[400px]">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-2">Quét Hoàn Tất!</h3>
          <p className="text-gray-600">Bạn phân loại đúng <span className="font-bold text-indigo-600">{score}/{RISKS.length}</span> rủi ro.</p>
          {passed ? (
            <p className="text-green-600 font-bold mt-2">Tuyệt vời! Bạn có cảm nhận tốt về xác suất.</p>
          ) : (
            <p className="text-red-600 font-bold mt-2">Cần trên {passingScore} điểm để qua bài. Chú ý lại các xác suất nhé.</p>
          )}
        </div>

        <div className="w-full max-w-2xl grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
          {scanned.map((s, i) => (
            <div key={i} className={`p-3 rounded-lg border flex gap-3 items-start ${s.isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
              <div className="text-2xl">{s.card.icon}</div>
              <div>
                <div className="font-bold text-sm">{s.card.label}</div>
                <div className="text-xs text-gray-500 mb-1">
                  Chọn: {getLevelLabel(s.level)} | Đúng: {getLevelLabel(s.card.correctLevel)}
                </div>
                <div className="text-xs">{s.card.explanation}</div>
              </div>
            </div>
          ))}
        </div>
        
        {!passed && (
          <button 
            onClick={() => {
              setCurrentIndex(0);
              setScore(0);
              setScanned([]);
              setShowResult(false);
            }}
            className="mt-4 px-6 py-2 rounded-full bg-indigo-600 text-white font-bold"
          >
            Thử Lại
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col items-center gap-8 p-6 min-h-[450px]">
      
      {/* Progress */}
      <div className="w-full max-w-md flex flex-col gap-2">
        <div className="flex justify-between text-xs font-bold text-gray-400 uppercase">
          <span>Card {currentIndex + 1} / {RISKS.length}</span>
          <span>Điểm: {score}</span>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-indigo-500"
            initial={{ width: 0 }}
            animate={{ width: `${(currentIndex / RISKS.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Scanner Box */}
      <div className="relative w-full max-w-md h-64 border-4 border-dashed border-gray-300 rounded-3xl flex items-center justify-center bg-gray-50 overflow-hidden">
        
        {/* Scanning Laser */}
        <motion.div 
          className="absolute top-0 left-0 w-full h-1 bg-red-400 opacity-50 shadow-[0_0_10px_red] z-20"
          animate={{ y: [0, 250, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={currentCard.id}
            initial={{ opacity: 0, x: 100, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -100, scale: 0.8 }}
            className="flex flex-col items-center gap-4 z-10"
          >
            <div className="text-6xl">{currentCard.icon}</div>
            <div className="text-xl font-bold text-gray-800 text-center px-4">{currentCard.label}</div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="flex gap-3 w-full max-w-md justify-center">
        <button 
          onClick={() => handleScan('HIGH')}
          className="flex-1 py-4 rounded-xl bg-red-100 text-red-700 font-bold hover:bg-red-200 border-2 border-red-200 transition-colors"
        >
          Cao<br/><span className="text-xs font-normal">&gt;10%</span>
        </button>
        <button 
          onClick={() => handleScan('MED')}
          className="flex-1 py-4 rounded-xl bg-yellow-100 text-yellow-700 font-bold hover:bg-yellow-200 border-2 border-yellow-200 transition-colors"
        >
          TB<br/><span className="text-xs font-normal">1-10%</span>
        </button>
        <button 
          onClick={() => handleScan('LOW')}
          className="flex-1 py-4 rounded-xl bg-green-100 text-green-700 font-bold hover:bg-green-200 border-2 border-green-200 transition-colors"
        >
          Thấp<br/><span className="text-xs font-normal">&lt;1%</span>
        </button>
      </div>

    </div>
  );
};
