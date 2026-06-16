import React, { useEffect } from 'react';
import { motion, useAnimation, useSpring, useTransform } from 'framer-motion';

export const drawLine: any = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: { 
    pathLength: 1, opacity: 1,
    transition: { pathLength: { duration: 1.5, ease: "easeInOut" }, opacity: { duration: 0.3 } }
  }
};

export const fadeUpLabel: any = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

export const FlowNode = ({ 
  x, y, label, labelBottom, width = 100, height = 40, color = 'var(--ink-primary)', bg = 'transparent',
  delay = 0 
}: any) => {
  return (
    <motion.g 
      initial={{ opacity: 0, scale: 0.8 }} 
      animate={{ opacity: 1, scale: 1 }} 
      transition={{ delay, duration: 0.4, type: "spring" }}
    >
      <rect 
        x={x - width/2} y={y - height/2} 
        width={width} height={height} 
        rx={8} 
        fill={bg} stroke={color} strokeWidth={2}
      />
      {label && (
        <text 
          x={x} y={y + 5} 
          textAnchor="middle" fill={color} fontSize={14} fontWeight="bold"
        >
          {label}
        </text>
      )}
      {labelBottom && (
        <text 
          x={x} y={y + height/2 + 20} 
          textAnchor="middle" fill="var(--ink-secondary)" fontSize={12}
        >
          {labelBottom}
        </text>
      )}
    </motion.g>
  );
};

export const FlowArrow = ({ 
  x1, y1, x2, y2, color = 'var(--ink-primary)', label, delay = 0 
}: any) => {
  const controls = useAnimation();
  
  useEffect(() => {
    controls.start("visible");
  }, [controls]);

  return (
    <g>
      <motion.line
        x1={x1} y1={y1} x2={x2} y2={y2}
        stroke={color} strokeWidth={2}
        initial="hidden" animate={controls} variants={drawLine} transition={{ delay }}
        markerEnd={`url(#arrowhead-${color})`}
      />
      {label && (
        <motion.text
          x={(x1+x2)/2} y={(y1+y2)/2 - 10}
          textAnchor="middle" fill={color} fontSize={12} fontWeight="bold"
          initial="hidden" animate={controls} variants={fadeUpLabel} transition={{ delay: delay + 0.5 }}
        >
          {label}
        </motion.text>
      )}
    </g>
  );
};

export const NumberOdometer = ({ value, suffix = '', prefix = '', color = 'var(--ink-primary)', delay = 0, duration = 1000 }: any) => {
  const springValue = useSpring(0, { stiffness: 50, damping: 20 });
  const displayValue = useTransform(springValue, (current) => `${prefix}${Math.round(current)}${suffix}`);
  
  useEffect(() => {
    setTimeout(() => {
      springValue.set(value);
    }, delay * 1000);
  }, [value, delay, springValue]);

  return (
    <motion.span style={{ color, fontVariantNumeric: 'tabular-nums' }}>
      {displayValue}
    </motion.span>
  );
};

export const StickFigure = ({ x, y, scale = 1, delay = 0 }: any) => {
  const controls = useAnimation();
  useEffect(() => { controls.start("visible"); }, [controls]);

  return (
    <motion.g 
      transform={`translate(${x}, ${y}) scale(${scale})`}
      initial="hidden" animate={controls} variants={drawLine} transition={{ delay }}
      stroke="var(--ink-primary)" strokeWidth={3} fill="none" strokeLinecap="round" strokeLinejoin="round"
    >
      <circle cx="0" cy="-40" r="15" />
      <line x1="0" y1="-25" x2="0" y2="20" />
      <line x1="-20" y1="-5" x2="20" y2="-5" />
      <line x1="0" y1="20" x2="-15" y2="50" />
      <line x1="0" y1="20" x2="15" y2="50" />
    </motion.g>
  );
};

export const DiagramLabel = ({ x, y, text, delay = 0, color = 'var(--ink-secondary)', font = 'inherit', fontSize, fontWeight }: any) => {
  return (
    <motion.text
      x={x} y={y} textAnchor="middle" fill={color} style={{ fontFamily: font }} fontSize={fontSize} fontWeight={fontWeight}
      initial="hidden" animate="visible" variants={fadeUpLabel} transition={{ delay }}
    >
      {text}
    </motion.text>
  );
};
