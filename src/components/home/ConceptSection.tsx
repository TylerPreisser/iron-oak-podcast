'use client';

import { useRef } from 'react';
import { useGSAP } from '@/hooks/useGSAP';

export function ConceptSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP((gsap, ScrollTrigger) => {
    if (!sectionRef.current || !textRef.current) return;

    gsap.fromTo(textRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          end: 'top 20%',
          scrub: true,
        },
      }
    );

    gsap.to(textRef.current, {
      opacity: 0,
      y: -20,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'bottom 80%',
        end: 'bottom 40%',
        scrub: true,
      },
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[80vh] bg-[var(--bg-primary)] flex items-center justify-center"
    >
      <div ref={textRef} className="max-w-2xl px-6 text-center opacity-0">
        <p className="font-[family-name:var(--font-display)] text-xl md:text-2xl lg:text-3xl text-[var(--text-secondary)] leading-relaxed italic">
          Not to lecture. Not to perform. To dig into Scripture, into doubt, into the questions most people are afraid to ask. A space where faith gets pressure-tested and Christ remains the answer.
        </p>
      </div>
    </section>
  );
}
