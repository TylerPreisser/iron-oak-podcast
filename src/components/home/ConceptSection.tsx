'use client';

import { useRef } from 'react';
import { useGSAP } from '@/hooks/useGSAP';

export function ConceptSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP((gsap) => {
    if (!sectionRef.current || !textRef.current) return;

    // Single timeline pinned to the section: fade in, hold, fade out
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=150%',
        pin: true,
        scrub: 0.6,
      },
    });

    // 0-40%: fade in + rise
    tl.fromTo(textRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.4, ease: 'none' },
      0
    );

    // 40-70%: hold visible
    tl.to(textRef.current, { opacity: 1, duration: 0.3 });

    // 70-100%: fade out + rise
    tl.to(textRef.current, { opacity: 0, y: -30, duration: 0.3, ease: 'none' });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-[var(--bg-primary)] flex items-center justify-center"
    >
      <div ref={textRef} className="max-w-2xl px-6 text-center opacity-0">
        <p className="font-[family-name:var(--font-display)] text-xl md:text-2xl lg:text-3xl text-[var(--text-secondary)] leading-relaxed italic">
          Not to lecture. Not to perform. To dig into Scripture, into doubt, into the questions most people are afraid to ask. A space where faith gets pressure-tested and Christ remains the answer.
        </p>
      </div>
    </section>
  );
}
