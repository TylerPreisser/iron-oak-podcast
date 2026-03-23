import type { Metadata } from 'next';
import Link from 'next/link';
import { series } from '@/data/series';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export const metadata: Metadata = {
  title: 'Series',
  description: 'One Season. Five Phases. The Whole Story.',
};

export default function SeriesPage() {
  return (
    <div className="pt-24 pb-16">
      <div className="container-default">
        <ScrollReveal className="text-center mb-16">
          <span className="font-[family-name:var(--font-accent)] text-sm tracking-[0.2em] uppercase text-[var(--accent-oak)]">
            Series
          </span>
          <h1 className="font-[family-name:var(--font-display)] text-[var(--text-h1)] text-[var(--text-primary)] mt-2 mb-4">
            One Season. Five Phases. The Whole Story.
          </h1>
        </ScrollReveal>

        {/* Series card */}
        <ScrollReveal className="max-w-2xl mx-auto">
          <Link
            href={`/series/${series.slug}`}
            className="block p-8 rounded-[var(--radius-lg)] bg-[var(--bg-secondary)] border border-[var(--border-default)] hover:border-[rgba(196,132,62,0.3)] hover:shadow-[var(--shadow-glow)] transition-all duration-300 group"
          >
            <span className="font-[family-name:var(--font-accent)] text-sm tracking-[0.2em] uppercase text-[var(--accent-oak)]">
              Season One
            </span>
            <h2 className="font-[family-name:var(--font-display)] text-[var(--text-h2)] text-[var(--text-primary)] mt-2 mb-3 group-hover:text-[var(--accent-oak-light)] transition-colors duration-300">
              {series.title}
            </h2>
            <p className="text-[var(--text-secondary)] mb-4">
              {series.description}
            </p>
            <div className="flex items-center gap-4 text-sm text-[var(--text-tertiary)]">
              <span>{series.phases.length} phases</span>
              <span>&middot;</span>
              <span>{series.episodeCount} episodes</span>
            </div>
          </Link>
        </ScrollReveal>
      </div>
    </div>
  );
}
