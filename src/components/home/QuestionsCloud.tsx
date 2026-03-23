'use client';

import { useRef, useMemo } from 'react';
import Link from 'next/link';
import { useGSAP } from '@/hooks/useGSAP';
import { questions } from '@/data/questions';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { cn } from '@/lib/utils';

// Select 20 diverse questions spread across episodes
function selectQuestions() {
  const selected: typeof questions = [];
  const step = Math.floor(questions.length / 20);
  for (let i = 0; i < 20 && i * step < questions.length; i++) {
    selected.push(questions[i * step]);
  }
  return selected;
}

export function QuestionsCloud() {
  const cloudRef = useRef<HTMLDivElement>(null);
  const displayQuestions = useMemo(() => selectQuestions(), []);

  useGSAP((gsap) => {
    if (!cloudRef.current) return;

    const items = cloudRef.current.querySelectorAll('.cloud-question');

    items.forEach((item, i) => {
      // Each question drifts at a unique speed
      const speed = 20 + Math.random() * 40;
      const direction = i % 2 === 0 ? 1 : -1;

      gsap.to(item, {
        x: direction * (50 + Math.random() * 100),
        duration: speed,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    });
  }, []);

  return (
    <section id="questions-cloud" className="section-padding overflow-hidden">
      <div className="container-default">
        <ScrollReveal className="text-center mb-16">
          <span className="font-[family-name:var(--font-accent)] text-sm tracking-[0.2em] uppercase text-[var(--accent-oak)]">
            Explore
          </span>
          <h2 className="font-[family-name:var(--font-display)] text-[var(--text-h1)] text-[var(--text-primary)] mt-2">
            The questions people are actually asking.
          </h2>
        </ScrollReveal>
      </div>

      <div ref={cloudRef} className="relative h-[500px] md:h-[600px] overflow-hidden">
        {displayQuestions.map((q, i) => {
          // Distribute vertically
          const top = 5 + (i / displayQuestions.length) * 85;
          // Vary font size
          const sizes = ['text-sm', 'text-base', 'text-lg', 'text-xl'];
          const size = sizes[i % sizes.length];
          // Vary opacity
          const opacity = 0.4 + (i % 3) * 0.2;

          return (
            <Link
              key={q.id}
              href={`/questions/${q.slug}`}
              className={cn(
                'cloud-question absolute whitespace-nowrap px-4 py-2 rounded-full',
                'font-[family-name:var(--font-display)] italic',
                'text-[var(--text-secondary)] transition-all duration-300',
                'hover:text-[var(--accent-oak)] hover:opacity-100 hover:scale-105',
                'border border-transparent hover:border-[var(--border-hover)]',
                size
              )}
              style={{
                top: `${top}%`,
                left: `${10 + (i * 7) % 70}%`,
                opacity,
              }}
            >
              {q.text}
            </Link>
          );
        })}
      </div>
    </section>
  );
}
