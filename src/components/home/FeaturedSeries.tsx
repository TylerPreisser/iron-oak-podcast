'use client';

import { useRef } from 'react';
import { useGSAP } from '@/hooks/useGSAP';
import { EpisodeCard } from '@/components/ui/EpisodeCard';
import { episodes } from '@/data/episodes';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export function FeaturedSeries() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP((gsap, ScrollTrigger) => {
    if (!sectionRef.current || !trackRef.current) return;

    const track = trackRef.current;
    const scrollWidth = track.scrollWidth - window.innerWidth;

    gsap.to(track, {
      x: -scrollWidth,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: () => `+=${scrollWidth}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="featured-series"
      className="relative min-h-screen overflow-hidden"
    >
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 pt-16 pb-8 z-10 container-default">
        <ScrollReveal>
          <span className="font-[family-name:var(--font-accent)] text-sm tracking-[0.2em] uppercase text-[var(--accent-oak)]">
            Season One
          </span>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <h2 className="font-[family-name:var(--font-display)] text-[var(--text-h1)] text-[var(--text-primary)] mt-2">
            Foundations of the Faith
          </h2>
        </ScrollReveal>
      </div>

      {/* Horizontal scroll track */}
      <div className="flex items-center min-h-screen">
        <div
          ref={trackRef}
          className="flex gap-6 pl-6 pr-[50vw] pt-32"
        >
          {episodes.map((episode, i) => (
            <div key={episode.slug} className="flex-shrink-0 w-[350px]">
              <EpisodeCard episode={episode} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
