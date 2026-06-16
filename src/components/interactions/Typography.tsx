"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import katex from "katex";
import "katex/dist/katex.min.css";

// --- MathAura ---
interface MathAuraProps {
  formula: string;
  className?: string;
  color?: "default" | "indigo" | "emerald" | "coral";
  size?: "sm" | "md" | "lg" | "xl";
  isSuccess?: boolean;
  isError?: boolean;
}

const colorMap = {
  "default": "text-slate-800 dark:text-slate-200",
  "indigo": "text-indigo-500 drop-shadow-[0_2px_10px_rgba(99,102,241,0.2)]",
  "emerald": "text-emerald-500 drop-shadow-[0_2px_10px_rgba(16,185,129,0.2)]",
  "coral": "text-rose-500 drop-shadow-[0_2px_10px_rgba(244,63,94,0.2)]",
};

const sizeMap = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-xl",
  xl: "text-3xl",
};

export const MathAura: React.FC<MathAuraProps> = ({ 
  formula, 
  className = "", 
  color = "default",
  size = "lg",
  isSuccess = false,
  isError = false
}) => {
  const [html, setHtml] = useState<string>("");

  useEffect(() => {
    try {
      const rendered = katex.renderToString(formula, {
        throwOnError: false,
        displayMode: true,
      });
      setHtml(rendered);
    } catch (e) {
      console.error("KaTeX error:", e);
      setHtml(formula); // Fallback
    }
  }, [formula]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={formula}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ 
          opacity: 1, 
          scale: 1,
          x: isError ? [-10, 10, -10, 10, 0] : 0,
          filter: isSuccess ? ["brightness(1)", "brightness(1.5) drop-shadow(0 0 15px rgba(16,185,129,0.6))", "brightness(1) drop-shadow(0 0 0px rgba(16,185,129,0))"] : "brightness(1)",
        }}
        exit={{ opacity: 0, scale: 1.05, position: "absolute" }}
        transition={{ 
          duration: isError ? 0.4 : 0.4, 
          type: isError ? "tween" : "spring", 
          bounce: 0.4 
        }}
        className={`inline-block ${colorMap[color]} ${sizeMap[size]} ${className}`}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </AnimatePresence>
  );
};
