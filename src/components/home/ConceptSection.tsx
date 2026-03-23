'use client';

import { useRef, useState, useEffect } from 'react';

const lines = [
  'Two men from the Kansas plains sat down to talk about God.',
  'Not to lecture. Not to perform.',
  'To dig — into Scripture, into doubt, into the questions most people are afraid to ask.',
  'Iron & Oak is a space where faith gets pressure-tested and Christ remains the answer.',
];

export function ConceptSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeLine, setActiveLine] = useState(-1);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const sectionHeight = rect.height;
      const viewportH = window.innerHeight;

      // How far through the section are we (0 = top just hit viewport, 1 = bottom leaving)
      const scrolled = (viewportH - rect.top) / (sectionHeight + viewportH);

      // Map scroll progress to active line
      if (scrolled < 0.15) setActiveLine(-1);
      else if (scrolled < 0.30) setActiveLine(0);
      else if (scrolled < 0.45) setActiveLine(1);
      else if (scrolled < 0.60) setActiveLine(2);
      else if (scrolled < 0.80) setActiveLine(3);
      else setActiveLine(4); // all done, fade out
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="concept"
      className="min-h-[200vh] relative bg-[var(--bg-primary)]"
    >
      <div className="sticky top-0 h-screen flex items-center justify-center">
        <div className="container-default max-w-3xl mx-auto px-6">
          {lines.map((line, i) => (
            <p
              key={i}
              className="font-[family-name:var(--font-display)] text-[var(--text-h2)] leading-relaxed text-[var(--text-primary)] mb-8 last:mb-0 transition-all duration-700 ease-out"
              style={{
                opacity: activeLine === i ? 1 : activeLine > i ? 0.12 : 0,
                transform: `translateY(${activeLine >= i ? 0 : 20}px)`,
              }}
            >
              {line}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
