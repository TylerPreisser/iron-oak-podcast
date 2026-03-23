'use client';

import { useState, useRef, useEffect } from 'react';
import { series } from '@/data/series';
import { cn } from '@/lib/utils';

export function FeaturedSeries() {
  const [activePhase, setActivePhase] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="featured-series"
      className="section-padding bg-[var(--bg-primary)]"
    >
      <div className="max-w-6xl mx-auto px-8 md:px-12 lg:px-16">
        {/* Header */}
        <div
          className="text-center mb-16 transition-all duration-1000"
          style={{ opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(20px)' }}
        >
          <span className="font-[family-name:var(--font-accent)] text-sm tracking-[0.2em] uppercase text-[var(--accent-oak)]">
            Season One
          </span>
          <h2 className="font-[family-name:var(--font-display)] text-[var(--text-h1)] text-[var(--text-primary)] mt-3 mb-3">
            {series.title}
          </h2>
          <p className="text-[var(--text-secondary)] max-w-2xl mx-auto text-lg">
            Five phases. Twelve episodes. One hundred and nine questions. The whole story of the Christian faith — from foundation to the hardest questions.
          </p>
        </div>

        {/* Interactive phase map */}
        <div
          className="transition-all duration-1000 delay-300"
          style={{ opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(20px)' }}
        >
          {/* Phase selector — horizontal bar */}
          <div className="relative mb-12">
            {/* Connecting line */}
            <div className="absolute top-5 left-0 right-0 h-[2px] bg-[var(--border-default)]" />
            <div
              className="absolute top-5 left-0 h-[2px] bg-gradient-to-r from-[var(--accent-iron)] to-[var(--accent-oak)] transition-all duration-500"
              style={{ width: `${((activePhase + 1) / series.phases.length) * 100}%` }}
            />

            <div className="relative flex justify-between">
              {series.phases.map((phase, i) => (
                <button
                  key={phase.slug}
                  onClick={() => setActivePhase(i)}
                  className="flex flex-col items-center group"
                >
                  {/* Node */}
                  <div
                    className={cn(
                      'w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold',
                      'font-[family-name:var(--font-accent)] transition-all duration-300',
                      'border-2 z-10 relative',
                      i <= activePhase
                        ? 'bg-[var(--bg-primary)] border-[var(--accent-oak)] text-[var(--accent-oak)] shadow-[0_0_20px_rgba(139,117,53,0.3)]'
                        : 'bg-[var(--bg-primary)] border-[var(--border-default)] text-[var(--text-tertiary)]'
                    )}
                  >
                    {phase.number}
                  </div>

                  {/* Label */}
                  <span
                    className={cn(
                      'mt-3 text-xs md:text-sm font-medium transition-colors duration-300 text-center',
                      i === activePhase ? 'text-[var(--text-primary)]' : 'text-[var(--text-tertiary)]'
                    )}
                  >
                    <span className="hidden md:inline">{phase.name}</span>
                    <span className="md:hidden">P{phase.number}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Active phase detail card */}
          <div className="relative overflow-hidden rounded-[var(--radius-xl)] border border-[var(--border-default)] bg-[var(--bg-secondary)]">
            {series.phases.map((phase, i) => (
              <div
                key={phase.slug}
                className="transition-all duration-500"
                style={{
                  opacity: activePhase === i ? 1 : 0,
                  position: activePhase === i ? 'relative' : 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  transform: activePhase === i ? 'none' : `translateX(${i < activePhase ? '-20px' : '20px'})`,
                  pointerEvents: activePhase === i ? 'auto' : 'none',
                }}
              >
                <div className="p-8 md:p-12 lg:p-16">
                  <div className="flex flex-col md:flex-row md:items-start gap-8">
                    {/* Phase number — large decorative */}
                    <div className="flex-shrink-0">
                      <span className="font-[family-name:var(--font-accent)] text-7xl md:text-8xl lg:text-9xl font-bold text-[var(--accent-oak)]/15 leading-none">
                        {String(phase.number).padStart(2, '0')}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <span className="font-[family-name:var(--font-accent)] text-xs tracking-[0.2em] uppercase text-[var(--accent-oak)] mb-2 block">
                        Phase {phase.number}
                      </span>
                      <h3 className="font-[family-name:var(--font-display)] text-[var(--text-h2)] text-[var(--text-primary)] mb-4">
                        {phase.name}
                      </h3>
                      <p className="text-[var(--text-secondary)] text-lg leading-relaxed mb-6">
                        {phase.description}
                      </p>

                      {/* Episode count for this phase */}
                      <div className="flex items-center gap-4 text-sm text-[var(--text-tertiary)]">
                        <span className="flex items-center gap-1.5">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                          </svg>
                          {i === 0 ? '3 episodes' : i === 1 ? '1 episode' : i === 2 ? '3 episodes' : i === 3 ? '2 episodes' : '3 episodes'}
                        </span>
                        <span>·</span>
                        <span>{i === 0 ? '27 questions' : i === 1 ? '9 questions' : i === 2 ? '27 questions' : i === 3 ? '18 questions' : '28 questions'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Stats bar */}
          <div className="mt-8 flex items-center justify-center gap-8 text-sm text-[var(--text-tertiary)]">
            <span className="font-[family-name:var(--font-accent)] tracking-wider">12 episodes</span>
            <span className="w-1 h-1 rounded-full bg-[var(--text-tertiary)]" />
            <span className="font-[family-name:var(--font-accent)] tracking-wider">109 questions</span>
            <span className="w-1 h-1 rounded-full bg-[var(--text-tertiary)]" />
            <span className="font-[family-name:var(--font-accent)] tracking-wider">One story</span>
          </div>
        </div>
      </div>
    </section>
  );
}
