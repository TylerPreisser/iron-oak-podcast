'use client';

import { useRef, useEffect, useState } from 'react';
import { series } from '@/data/series';
import { episodes } from '@/data/episodes';

export function FeaturedSeries() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 }
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
      <div className="max-w-4xl mx-auto px-4 sm:px-8 md:px-12 lg:px-16">

        {/* Header */}
        <div
          className="text-center mb-16 transition-all duration-700"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'none' : 'translateY(24px)',
          }}
        >
          <span
            className="block font-[family-name:var(--font-accent)] text-xs tracking-[0.25em] uppercase text-[var(--accent-oak)] mb-4"
          >
            Season One
          </span>
          <h2
            className="font-[family-name:var(--font-display)] text-[var(--text-h1)] text-[var(--text-primary)] mb-4 leading-tight"
          >
            {series.title}
          </h2>
          <p className="text-[var(--text-secondary)] text-lg max-w-xl mx-auto leading-relaxed">
            Five phases. Twelve episodes. The whole story of the Christian faith.
          </p>
        </div>

        {/* Vertical Timeline */}
        <div
          className="relative transition-all duration-700 delay-200"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'none' : 'translateY(24px)',
          }}
        >
          {/* Vertical connecting line — positioned behind phase rows */}
          <div
            className="absolute left-[1.375rem] top-3 bottom-3 w-px bg-[var(--border-default)] hidden sm:block"
            aria-hidden="true"
          />

          <div className="space-y-0">
            {series.phases.map((phase, phaseIndex) => {
              const phaseEpisodes = episodes.filter(
                (ep) => ep.phaseNumber === phase.number
              );
              const isLast = phaseIndex === series.phases.length - 1;

              return (
                <div key={phase.slug}>
                  {/* Phase row */}
                  <div className="flex gap-6 sm:gap-10 pt-6 pb-2">

                    {/* Left column: phase dot + number */}
                    <div className="flex-shrink-0 flex flex-col items-center hidden sm:flex">
                      {/* Dot on the timeline */}
                      <div
                        className="w-11 h-11 rounded-full border border-[var(--border-hover)] bg-[var(--bg-secondary)] flex items-center justify-center z-10 relative mt-0.5"
                        style={{ boxShadow: '0 0 0 4px var(--bg-primary)' }}
                      >
                        <span
                          className="font-[family-name:var(--font-accent)] text-sm font-bold text-[var(--accent-oak)]"
                        >
                          {phase.number}
                        </span>
                      </div>
                    </div>

                    {/* Right column: phase name + episodes */}
                    <div className="flex-1 min-w-0 pb-6">
                      {/* Phase header */}
                      <div className="flex items-baseline gap-3 mb-1 sm:hidden">
                        <span
                          className="font-[family-name:var(--font-accent)] text-xs font-bold text-[var(--accent-oak)] tracking-[0.15em] uppercase"
                        >
                          Phase {phase.number}
                        </span>
                      </div>
                      <div className="flex items-baseline gap-3 mb-4">
                        <h3
                          className="font-[family-name:var(--font-display)] text-[var(--text-h3)] text-[var(--text-primary)] leading-snug"
                        >
                          {phase.name}
                        </h3>
                        <span
                          className="hidden sm:inline font-[family-name:var(--font-accent)] text-xs tracking-[0.15em] uppercase text-[var(--text-tertiary)] mt-0.5"
                        >
                          {phaseEpisodes.length} ep{phaseEpisodes.length !== 1 ? 's' : ''}
                        </span>
                      </div>

                      {/* Episode list */}
                      <div className="space-y-0">
                        {phaseEpisodes.map((ep, epIndex) => (
                          <div
                            key={ep.slug}
                            className="flex items-baseline gap-4 py-2.5 border-t border-[var(--border-default)] first:border-t-0"
                          >
                            <span
                              className="font-[family-name:var(--font-accent)] text-xs text-[var(--accent-oak)] flex-shrink-0 w-10 tabular-nums"
                              aria-label={`Episode ${ep.number}`}
                            >
                              EP {String(ep.number).padStart(2, '0')}
                            </span>
                            <span
                              className="font-[family-name:var(--font-display)] text-[var(--text-primary)] text-base leading-snug"
                            >
                              {ep.title}
                            </span>
                            <span
                              className="hidden md:block font-[family-name:var(--font-body)] text-sm text-[var(--text-tertiary)] leading-snug ml-auto text-right max-w-xs"
                            >
                              {ep.subtitle}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Divider between phases — skip after last */}
                  {!isLast && (
                    <div className="ml-0 sm:ml-[4.25rem] h-px bg-[var(--border-default)]" aria-hidden="true" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer tagline */}
        <div
          className="mt-12 flex items-center justify-center gap-6 transition-all duration-700 delay-400"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'none' : 'translateY(16px)',
          }}
        >
          <span className="w-8 h-px bg-[var(--border-hover)]" aria-hidden="true" />
          <span
            className="font-[family-name:var(--font-accent)] text-xs tracking-[0.2em] uppercase text-[var(--text-tertiary)]"
          >
            12 episodes
          </span>
          <span className="w-1 h-1 rounded-full bg-[var(--text-tertiary)]" aria-hidden="true" />
          <span
            className="font-[family-name:var(--font-accent)] text-xs tracking-[0.2em] uppercase text-[var(--text-tertiary)]"
          >
            One story
          </span>
          <span className="w-8 h-px bg-[var(--border-hover)]" aria-hidden="true" />
        </div>

      </div>
    </section>
  );
}
