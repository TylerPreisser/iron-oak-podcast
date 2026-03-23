'use client';

import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { cn } from '@/lib/utils';

export function SponsorsSection() {
  return (
    <section className="section-padding bg-[var(--bg-primary)]">
      <div className="container-default max-w-4xl mx-auto">
        <ScrollReveal className="text-center mb-16">
          <span className="font-[family-name:var(--font-accent)] text-sm tracking-[0.2em] uppercase text-[var(--accent-iron-light)]">
            Sponsored By
          </span>
        </ScrollReveal>

        {/* Inner Tech — primary sponsor, big and prominent */}
        <ScrollReveal delay={0.1} className="text-center mb-16">
          <div className="inline-block px-12 py-10 rounded-[var(--radius-xl)] border border-[var(--border-default)] bg-[var(--bg-tertiary)] hover:border-[var(--accent-oak)]/30 transition-all duration-300">
            <h3 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl lg:text-6xl text-[var(--text-primary)] font-bold tracking-wide mb-2">
              Inner Tech
            </h3>
            <p className="font-[family-name:var(--font-accent)] text-sm tracking-[0.15em] text-[var(--text-secondary)]">
              Wichita, Kansas
            </p>
          </div>
        </ScrollReveal>

        {/* CTA for more partners */}
        <ScrollReveal delay={0.2} className="text-center">
          <p className="text-[var(--text-secondary)] mb-4">
            Interested in partnering with Iron &amp; Oak?
          </p>
          <a
            href="mailto:hello@ironandoak.fm"
            className={cn(
              'inline-flex items-center justify-center h-11 px-6 text-sm font-medium',
              'rounded-full border border-[var(--accent-iron)] text-[var(--accent-iron-light)]',
              'hover:bg-[var(--accent-iron)]/10 transition-all duration-300'
            )}
          >
            Get in Touch
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}
