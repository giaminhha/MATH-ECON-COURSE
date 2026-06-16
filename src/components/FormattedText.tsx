"use client";

import React from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

interface FormattedTextProps {
  text: string;
  className?: string;
}

export const FormattedText: React.FC<FormattedTextProps> = ({ text, className }) => {
  // Tách text thành các phần để match $...$ hoặc $$...$$
  const parts = text.split(/(\$\$[\s\S]+?\$\$|\$[^\$]+\$)/g);

  return (
    <span className={className}>
      {parts.map((part, i) => {
        if (part.startsWith('$$') && part.endsWith('$$')) {
          const math = part.slice(2, -2);
          try {
            const html = katex.renderToString(math, { displayMode: true, throwOnError: false });
            return (
              <span 
                key={i} 
                dangerouslySetInnerHTML={{ __html: html }} 
                className="block my-4 text-center text-lg sm:text-xl font-bold px-2 py-4 mx-auto relative z-10 w-full max-w-full overflow-x-auto scrollbar-hide" 
                style={{ color: 'var(--formula)', textShadow: '0 0 12px rgba(155, 89, 182, 0.3)' }}
              />
            );
          } catch (e) {
            return <span key={i}>{part}</span>;
          }
        } else if (part.startsWith('$') && part.endsWith('$')) {
          const math = part.slice(1, -1);
          try {
            const html = katex.renderToString(math, { displayMode: false, throwOnError: false });
            return (
              <span 
                key={i} 
                dangerouslySetInnerHTML={{ __html: html }} 
                className="font-bold mx-1" 
                style={{ color: 'var(--formula)' }}
              />
            );
          } catch (e) {
            return <span key={i}>{part}</span>;
          }
        } else {
          // Xử lý markdown đơn giản: **bold** và dòng mới
          return (
            <span key={i}>
              {part.split('\n').map((line, j, array) => {
                // Xử lý bold trong mỗi dòng
                const lineWithBold = line.split(/\*\*([^*]+)\*\*/g).map((subPart, k) => {
                   if (k % 2 === 1) return <strong key={`bold-${k}`} className="font-extrabold text-inherit">{subPart}</strong>;
                   return subPart;
                });
                
                return (
                  <React.Fragment key={j}>
                    {lineWithBold}
                    {j < array.length - 1 && <br />}
                  </React.Fragment>
                );
              })}
            </span>
          );
        }
      })}
    </span>
  );
};
