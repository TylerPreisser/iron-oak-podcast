'use client';

import { useRef, useEffect, useState } from 'react';

const lines = [
  'Two men from the Kansas plains sat down to talk about God.',
  'Not to lecture. Not to perform.',
  'To dig — into Scripture, into doubt, into the questions most people are afraid to ask.',
  'Iron & Oak is a space where faith gets pressure-tested and Christ remains the answer.',
];

function FadeInLine({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className="transition-all duration-1000 ease-out"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
      }}
    >
      {children}
    </div>
  );
}

export function ConceptSection() {
  return (
    <section id="concept" className="bg-[var(--bg-primary)]">
      {/* Cross divider */}
      <div className="flex justify-center py-16">
        <div className="relative w-8 h-16">
          <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[2px] h-full bg-gradient-to-b from-transparent via-[var(--accent-oak)]/40 to-transparent" />
          <div className="absolute top-[35%] left-0 w-full h-[2px] bg-[var(--accent-oak)]/40" />
        </div>
      </div>

      <div className="container-default max-w-3xl mx-auto px-6 pb-24">
        <div className="space-y-16">
          {lines.map((line, i) => (
            <FadeInLine key={i} delay={i * 100}>
              <p className="font-[family-name:var(--font-display)] text-[var(--text-h2)] leading-relaxed text-[var(--text-primary)] text-center">
                {line}
              </p>
            </FadeInLine>
          ))}
        </div>

        {/* Cross after the text */}
        <div className="flex justify-center pt-24">
          <svg width="60" height="80" viewBox="0 0 60 80" fill="none" className="opacity-20">
            <rect x="25" y="0" width="10" height="80" rx="2" fill="var(--accent-oak)" />
            <rect x="8" y="18" width="44" height="10" rx="2" fill="var(--accent-oak)" />
          </svg>
        </div>
      </div>
    </section>
  );
}
