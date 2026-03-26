'use client';

import { useRef, useEffect, useState } from 'react';

export function ConceptSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;

      // How far through the section are we? 0 = just entered, 1 = about to leave
      const sectionH = rect.height;
      const scrolled = -rect.top / (sectionH - vh);
      const t = Math.max(0, Math.min(1, scrolled));

      // Fade in during first 30%, hold during middle, fade out during last 30%
      let op = 0;
      if (t < 0.3) {
        op = t / 0.3;
      } else if (t < 0.7) {
        op = 1;
      } else {
        op = 1 - (t - 0.7) / 0.3;
      }
      setOpacity(Math.max(0, Math.min(1, op)));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[var(--bg-primary)]"
      style={{ height: '200vh' }}
    >
      <div
        className="sticky top-0 h-screen flex items-center justify-center"
        style={{ opacity }}
      >
        <div className="max-w-2xl px-6 text-center">
          <p className="font-[family-name:var(--font-display)] text-xl md:text-2xl lg:text-3xl text-[var(--text-secondary)] leading-relaxed italic">
            Not to lecture. Not to perform. To dig into Scripture, into doubt, into the questions most people are afraid to ask. A space where faith gets pressure-tested and Christ remains the answer.
          </p>
        </div>
      </div>
    </section>
  );
}
