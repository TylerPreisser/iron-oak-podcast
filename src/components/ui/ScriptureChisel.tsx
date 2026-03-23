'use client';

import { useRef } from 'react';
import { useGSAP } from '@/hooks/useGSAP';
import { cn } from '@/lib/utils';

interface ScriptureChiselProps {
  text: string;
  reference: string;
  className?: string;
}

export function ScriptureChisel({ text, reference, className }: ScriptureChiselProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP((gsap, ScrollTrigger) => {
    if (!containerRef.current) return;

    const chars = containerRef.current.querySelectorAll('.chisel-char');
    if (!chars.length) return;

    // Calculate stagger: 0.015s/char but cap total at 3s
    const totalChars = chars.length;
    const stagger = Math.min(0.015, 3 / totalChars);

    gsap.from(chars, {
      opacity: 0,
      stagger,
      duration: 0.1,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
      },
    });
  }, [text]);

  return (
    <div ref={containerRef} className={cn('p-8 rounded-[var(--radius-lg)] bg-[var(--bg-accent-surface)] border border-[var(--accent-oak)]/20', className)}>
      <p className="font-[family-name:var(--font-display)] italic text-xl text-[var(--text-primary)] leading-relaxed mb-4">
        <span>&ldquo;</span>
        {text.split('').map((char, i) => (
          <span key={i} className="chisel-char inline-block will-change-[opacity]" style={{ whiteSpace: char === ' ' ? 'pre' : undefined }}>
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
        <span>&rdquo;</span>
      </p>
      <p className="font-[family-name:var(--font-accent)] text-sm text-[var(--accent-oak)]">
        — {reference}
      </p>
    </div>
  );
}
