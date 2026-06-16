"use client";

import React, { useState } from "react";
import { FluidSlider, OdometerNumber, ActionInput } from "./Controls";
import { MathAura } from "./Typography";
import { SemanticCoordinateSystem, MorphingCurve } from "./MathGraphics";
import { motion } from "framer-motion";

export const LinearSavingsWidget = ({ variables, onComplete }: { variables?: any, onComplete?: (isCorrect: boolean, score: number, impact?: any) => void }) => {
  const [initialAmount, setInitialAmount] = useState<number>(500); 
  const [monthlyDeposit, setMonthlyDeposit] = useState<number>(200); 
  const [months, setMonths] = useState<number>(12); 

  const getSavingsAtMonth = (x: number) => initialAmount + x * monthlyDeposit;

  const maxSavings = getSavingsAtMonth(months);
  const yMax = Math.max(1000, Math.ceil(maxSavings * 1.2)); 

  return (
    <div className="flex flex-col lg:flex-row gap-6 w-full h-full max-w-6xl mx-auto bg-transparent">
      
      {/* Left Column: Controls */}
      <div className="flex flex-col gap-4 lg:w-[40%] h-full overflow-y-auto no-scrollbar pb-2">
        <div className="mb-2 px-2">
          <h2 className="text-3xl font-extrabold text-slate-800 mb-2 tracking-tight">Cấp Số Cộng</h2>
          <p className="text-slate-500 text-base font-medium leading-relaxed">
            Tích luỹ đều đặn mỗi tháng không lãi suất. Tăng trưởng theo đường thẳng tuyến tính.
          </p>
        </div>

        <FluidSlider
          label="Vốn ban đầu (u₁)"
          value={initialAmount}
          min={0}
          max={5000}
          step={100}
          unit="k"
          color="indigo"
          onChange={setInitialAmount}
        />

        <FluidSlider
          label="Tiết kiệm mỗi tháng (d)"
          value={monthlyDeposit}
          min={0}
          max={2000}
          step={50}
          unit="k"
          color="emerald"
          onChange={setMonthlyDeposit}
        />

        <FluidSlider
          label="Thời gian chờ (n)"
          value={months}
          min={1}
          max={36}
          step={1}
          unit=" tháng"
          color="coral"
          onChange={setMonths}
        />

        {/* Dashboard Insight (PlaygroundCard style) */}
        <motion.div 
          layout
          className="mt-2 p-6 bg-white overflow-hidden relative rounded-[32px] border border-slate-100 shadow-xl shadow-slate-200/50 shrink-0"
        >
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-emerald-50 rounded-full blur-3xl"></div>
          <p className="text-slate-500 font-semibold text-sm mb-2 relative z-10 w-full uppercase tracking-wider">Tổng tài sản sau <span className="text-rose-500">{months}</span> tháng:</p>
          <div className="flex items-baseline gap-2 relative z-10 mb-4">
            <OdometerNumber 
              value={maxSavings} 
              className="text-4xl font-black text-slate-800 tracking-tight"
            />
            <span className="text-emerald-500 font-bold text-lg">VNĐ</span>
          </div>
          
          <div className="text-sm font-sans font-medium text-slate-500 bg-slate-50 p-4 rounded-2xl border border-slate-100 flex flex-col gap-2">
            <div className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-1">Công thức tổng quát</div>
            <div className="flex items-center gap-2 text-lg">
              <span className="text-slate-800 font-bold">u_n</span> = 
              <span className="text-indigo-500 font-bold">{initialAmount}</span> + 
              (<span className="text-rose-500 font-bold">{months}</span>) &times; 
              <span className="text-emerald-500 font-bold">{monthlyDeposit}</span>
            </div>
          </div>
        </motion.div>

        <div className="mt-auto pt-4 shrink-0">
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-lg rounded-2xl shadow-lg shadow-emerald-500/30 transition-colors"
            onClick={() => onComplete && onComplete(true, 100, { moneyDelta: maxSavings })}
          >
            Chốt Phương Án
          </motion.button>
        </div>
      </div>

      {/* Right Column: Visualization */}
      <div className="lg:w-[60%] flex-1 min-h-[400px] flex flex-col relative bg-white rounded-[32px] shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden p-4">
        <SemanticCoordinateSystem
          width={800}
          height={500}
          xDomain={[0, Math.max(12, months)]}
          yDomain={[0, yMax]}
          xAxisLabel="Thời gian (Số tháng)"
          yAxisLabel="Khối lượng tiền (VNĐ)"
          padding={{ top: 40, right: 40, bottom: 60, left: 80 }}
        >
          <MorphingCurve
            fn={getSavingsAtMonth}
            color="#10b981" // emerald-500
            strokeWidth={5}
            samples={months} 
            showArea={true}
          />
        </SemanticCoordinateSystem>
      </div>
      
    </div>
  );
};
