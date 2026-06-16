"use client";

import { motion, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

// Cấu hình Spring vật lý (Độ nảy)
const springConfig = { stiffness: 300, damping: 20, mass: 1 };

export function SavingsInteractiveNode() {
  // Biến toán học
  const income = 10000;
  const [expense, setExpense] = useState(6000);
  const savings = income - expense;

  // Animate con số bằng Spring Physics
  const animatedExpense = useSpring(expense, springConfig);
  const animatedSavings = useSpring(savings, springConfig);

  // Transform số thực thành string để hiển thị (Odometer effect đơn giản)
  const displayExpense = useTransform(animatedExpense, (latest) => Math.round(latest).toLocaleString());
  const displaySavings = useTransform(animatedSavings, (latest) => Math.round(latest).toLocaleString());

  return (
    <div className="min-h-[400px] w-full bg-slate-50 dark:bg-slate-900 rounded-[32px] p-8 shadow-2xl shadow-indigo-500/10 border-2 border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center gap-8 font-sans">
      
      {/* KHU VỰC CÔNG THỨC TOÁN HỌC (Nổi bật màu sắc) */}
      <motion.div 
        layout
        className="text-4xl md:text-5xl font-bold tracking-tight bg-white dark:bg-slate-800 px-8 py-6 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-none"
      >
        <span className="text-slate-400">Tiết kiệm (</span>
        <span className="text-purple-500">y</span>
        <span className="text-slate-400">) = </span>
        
        <span className="text-slate-400">Thu nhập - </span>
        <span className="text-blue-500">Chi phí (x)</span>
      </motion.div>

      {/* HIỂN THỊ SỐ LIỆU ĐỘNG (Dynamic Ticking) */}
      <div className="flex w-full max-w-2xl justify-between items-center bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-lg border border-slate-100 dark:border-slate-700">
        <div className="flex flex-col items-center gap-2">
          <span className="text-rose-500 font-bold uppercase tracking-widest text-sm">Chi Phí (- $)</span>
          <motion.div className="text-3xl font-extrabold text-rose-500">
            {displayExpense}
          </motion.div>
        </div>

        <motion.div 
          animate={{ rotate: savings > 5000 ? 0 : 180 }}
          transition={springConfig}
          className="text-4xl text-slate-300"
        >
          ➔
        </motion.div>

        <div className="flex flex-col items-center gap-2">
          <span className="text-emerald-500 font-bold uppercase tracking-widest text-sm">Tiết Kiệm (+ $)</span>
          {/* Glowing Aura if savings > 5000 */}
          <motion.div 
            animate={{ 
              textShadow: savings > 5000 ? "0px 0px 20px rgba(16, 185, 129, 0.5)" : "0px 0px 0px rgba(16, 185, 129, 0)" 
            }}
            className="text-4xl font-extrabold text-emerald-500"
          >
            {displaySavings}
          </motion.div>
        </div>
      </div>

      {/* THÔNG TƯƠNG TÁC (Micro-interactions & Slider) */}
      <div className="w-full max-w-xl flex flex-col gap-4 mt-4">
        <div className="flex justify-between text-slate-500 font-medium">
          <span>Giảm thiểu</span>
          <span>Phung phí</span>
        </div>
        <input 
          type="range" 
          min="2000" 
          max="9000" 
          step="100"
          value={expense}
          onChange={(e) => setExpense(Number(e.target.value))}
          className="w-full h-4 bg-slate-200 dark:bg-slate-700 rounded-full appearance-none cursor-pointer accent-blue-500"
        />
        <p className="text-center text-slate-400 mt-2 text-sm italic">Hành động: Kéo thanh trượt để thay đổi biến số <span className="text-blue-500 font-bold">x</span></p>
      </div>
      
    </div>
  );
}
