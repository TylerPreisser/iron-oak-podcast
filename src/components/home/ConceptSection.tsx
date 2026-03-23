'use client';

import { useRef } from 'react';
import { useGSAP } from '@/hooks/useGSAP';

const lines = [
  'Two men from the Kansas plains sat down to talk about God.',
  'Not to lecture. Not to perform.',
  'To dig — into Scripture, into doubt, into the questions most people are afraid to ask.',
  'Iron & Oak is a space where faith gets pressure-tested and Christ remains the answer.',
];

export function ConceptSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP((gsap, ScrollTrigger) => {
    if (!sectionRef.current || !containerRef.current) return;

    const lineElements = containerRef.current.querySelectorAll('.concept-line');

    // ONE timeline, ONE ScrollTrigger — everything sequenced inside
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=100%',
        pin: true,
        scrub: 0.5,
      },
    });

    // Each line: fade in → hold → dim, sequenced in the timeline
    lineElements.forEach((line, i) => {
      const position = i * 0.22; // each line gets ~22% of timeline

      // Fade in + slide up
      tl.fromTo(line,
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.08, ease: 'power2.out' },
        position
      );

      // Dim when next line comes (skip last)
      if (i < lines.length - 1) {
        tl.to(line,
          { opacity: 0.15, duration: 0.06 },
          position + 0.18
        );
      }
    });

    // Hold the last line briefly, then fade all out
    tl.to(containerRef.current, { opacity: 0, duration: 0.08 }, 0.92);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="concept"
      className="relative min-h-screen flex items-center justify-center bg-[var(--bg-primary)]"
    >
      <div ref={containerRef} className="container-default max-w-3xl mx-auto px-6">
        {lines.map((line, i) => (
          <p
            key={i}
            className="concept-line font-[family-name:var(--font-display)] text-[var(--text-h2)] leading-relaxed text-[var(--text-primary)] mb-8 last:mb-0 will-change-[opacity,transform] opacity-0"
          >
            {line}
          </p>
        ))}
      </div>
    </section>
  );
}
