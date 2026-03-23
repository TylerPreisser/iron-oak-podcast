'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { useGSAP } from '@/hooks/useGSAP';
import { series } from '@/data/series';
import { episodes } from '@/data/episodes';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { EpisodeCard } from '@/components/ui/EpisodeCard';
import { cn } from '@/lib/utils';

export function SeriesDetailClient() {
  const timelineRef = useRef<HTMLDivElement>(null);

  // Animate the vertical line drawing on scroll
  useGSAP((gsap, ScrollTrigger) => {
    if (!timelineRef.current) return;

    const line = timelineRef.current.querySelector('.timeline-line-fill');
    if (!line) return;

    gsap.fromTo(line,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: timelineRef.current,
          start: 'top 60%',
          end: 'bottom 40%',
          scrub: true,
        },
      }
    );

    // Light up nodes as they enter viewport
    const nodes = timelineRef.current.querySelectorAll('.timeline-node');
    nodes.forEach((node) => {
      gsap.from(node, {
        scale: 0,
        opacity: 0,
        duration: 0.5,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: node,
          start: 'top 75%',
        },
      });
    });
  }, []);

  return (
    <div className="pt-24 pb-16">
      <div className="container-default">
        {/* Hero */}
        <ScrollReveal className="text-center mb-20">
          <span className="font-[family-name:var(--font-accent)] text-sm tracking-[0.2em] uppercase text-[var(--accent-oak)]">
            Season One
          </span>
          <h1 className="font-[family-name:var(--font-display)] text-[var(--text-h1)] text-[var(--text-primary)] mt-2 mb-4">
            {series.title}
          </h1>
          <p className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto">
            {series.tagline}
          </p>
        </ScrollReveal>

        {/* Phase timeline */}
        <div ref={timelineRef} className="relative max-w-4xl mx-auto">
          {/* Vertical line track */}
          <div className="absolute left-8 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-[var(--border-default)]">
            <div className="timeline-line-fill absolute inset-0 bg-gradient-to-b from-[var(--accent-iron)] to-[var(--accent-oak)] origin-top" />
          </div>

          {/* Phase nodes */}
          {series.phases.map((phase, i) => {
            const phaseEpisodes = episodes.filter((ep) => ep.phaseNumber === phase.number);
            const isEven = i % 2 === 0;

            return (
              <div
                key={phase.slug}
                className={cn(
                  'relative mb-20 last:mb-0',
                  'pl-20 md:pl-0',
                  isEven ? 'md:pr-[calc(50%+2rem)]' : 'md:pl-[calc(50%+2rem)]'
                )}
              >
                {/* Node dot */}
                <div
                  className={cn(
                    'timeline-node absolute w-4 h-4 rounded-full border-2',
                    'left-6 md:left-1/2 md:-translate-x-1/2 top-2',
                    i < 3
                      ? 'border-[var(--accent-iron)] bg-[var(--accent-iron)]/20'
                      : 'border-[var(--accent-oak)] bg-[var(--accent-oak)]/20'
                  )}
                />

                {/* Phase content */}
                <ScrollReveal direction={isEven ? 'left' : 'right'}>
                  <div className="mb-2">
                    <span className="font-[family-name:var(--font-accent)] text-xs tracking-[0.2em] uppercase text-[var(--text-tertiary)]">
                      Phase {phase.number}
                    </span>
                  </div>
                  <h3 className="font-[family-name:var(--font-display)] text-[var(--text-h2)] text-[var(--text-primary)] mb-2">
                    {phase.name}
                  </h3>
                  <p className="text-[var(--text-secondary)] mb-6">
                    {phase.description}
                  </p>

                  {/* Episode cards for this phase */}
                  <div className="grid grid-cols-1 gap-4">
                    {phaseEpisodes.map((ep) => (
                      <EpisodeCard key={ep.slug} episode={ep} className="!bg-[var(--bg-tertiary)]" />
                    ))}
                  </div>
                </ScrollReveal>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
