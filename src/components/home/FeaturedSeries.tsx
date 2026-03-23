'use client';

import { series } from '@/data/series';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { cn } from '@/lib/utils';

export function FeaturedSeries() {
  return (
    <section id="featured-series" className="section-padding bg-[var(--bg-secondary)]">
      <div className="container-default max-w-4xl mx-auto">
        {/* Header */}
        <ScrollReveal className="text-center mb-12">
          <span className="font-[family-name:var(--font-accent)] text-sm tracking-[0.2em] uppercase text-[var(--accent-oak)]">
            Season One
          </span>
          <h2 className="font-[family-name:var(--font-display)] text-[var(--text-h1)] text-[var(--text-primary)] mt-2 mb-4">
            {series.title}
          </h2>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
            Season One walks through the essential doctrines of the Christian faith — not to hand you answers, but to give you the tools to wrestle with them yourself. From the reliability of Scripture to the hope of eternity, each phase builds on the last.
          </p>
        </ScrollReveal>

        {/* Phase journey — 5 phases as connected steps */}
        <div className="mb-12">
          {series.phases.map((phase, i) => (
            <ScrollReveal key={phase.slug} delay={i * 0.1}>
              <div className="flex items-start gap-6 mb-8 last:mb-0">
                {/* Phase number + connector */}
                <div className="flex flex-col items-center flex-shrink-0">
                  <div className={cn(
                    'w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold font-[family-name:var(--font-accent)]',
                    i < 3
                      ? 'bg-[var(--accent-iron)]/15 text-[var(--accent-iron)] border border-[var(--accent-iron)]/30'
                      : 'bg-[var(--accent-oak)]/15 text-[var(--accent-oak)] border border-[var(--accent-oak)]/30'
                  )}>
                    {phase.number}
                  </div>
                  {i < series.phases.length - 1 && (
                    <div className="w-px h-8 bg-gradient-to-b from-[var(--border-default)] to-transparent mt-2" />
                  )}
                </div>

                {/* Phase content */}
                <div className="pt-1.5">
                  <h3 className={cn(
                    'font-[family-name:var(--font-display)] text-[var(--text-h3)] mb-1',
                    i < 3 ? 'text-[var(--accent-iron-light)]' : 'text-[var(--accent-oak-light)]'
                  )}>
                    {phase.name}
                  </h3>
                  <p className="text-[var(--text-secondary)] text-[var(--text-body)]">
                    {phase.description}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Stats + CTA */}
        <ScrollReveal className="text-center">
          <p className="font-[family-name:var(--font-accent)] text-sm tracking-wider text-[var(--text-tertiary)] mb-6">
            12 episodes · 109 questions · One story
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
