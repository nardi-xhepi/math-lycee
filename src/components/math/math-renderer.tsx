'use client';

import { useEffect, useRef } from 'react';

interface MathRendererProps {
  content: string;
}

export default function MathRenderer({ content }: MathRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Load MathJax script if not already loaded
    if (typeof window !== 'undefined' && !window.MathJax) {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js';
      script.async = true;
      document.head.appendChild(script);
      
      script.onload = () => {
        if (window.MathJax && containerRef.current) {
          window.MathJax.typeset([containerRef.current]);
        }
      };
    } else if (window.MathJax && containerRef.current) {
      // If MathJax is already loaded, just typeset the content
      window.MathJax.typeset([containerRef.current]);
    }
  }, [content]);
  
  return (
    <div 
      ref={containerRef} 
      className="prose max-w-none"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}

// Add MathJax to the Window object type
declare global {
  interface Window {
    MathJax: any;
  }
}