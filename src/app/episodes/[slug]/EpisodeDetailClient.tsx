'use client';

import Link from 'next/link';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { formatEpisodeNumber } from '@/lib/utils';
import type { Episode } from '@/types';

interface Props {
  episode: Episode;
}

export function EpisodeDetailClient({ episode }: Props) {
  return (
    <div className="pt-24 pb-16">
      <div className="container-default max-w-4xl">
        {/* Header */}
        <ScrollReveal>
          <Link
            href="/episodes"
            className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--accent-oak)] transition-colors mb-8"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            All Episodes
          </Link>
        </ScrollReveal>

        <ScrollReveal>
          <span className="font-[family-name:var(--font-accent)] text-sm tracking-[0.2em] text-[var(--accent-oak)]">
            {formatEpisodeNumber(episode.number)}
          </span>
          <span className="mx-3 text-[var(--border-default)]">·</span>
          <span className="inline-block px-2.5 py-0.5 text-xs font-medium rounded-full bg-[var(--bg-accent-surface)] text-[var(--accent-oak-light)]">
            {episode.phase}
          </span>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h1 className="font-[family-name:var(--font-display)] text-[var(--text-h1)] text-[var(--text-primary)] mt-4 mb-2">
            {episode.title}
          </h1>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <p className="text-xl text-[var(--text-secondary)] mb-12">
            {episode.subtitle}
          </p>
        </ScrollReveal>

        {/* Video placeholder */}
        <ScrollReveal delay={0.2}>
          <div className="aspect-video rounded-[var(--radius-lg)] bg-[var(--bg-secondary)] border border-[var(--border-default)] flex items-center justify-center mb-12">
            <div className="text-center">
              <svg className="w-16 h-16 text-[var(--accent-oak)] mx-auto mb-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
              <p className="text-sm text-[var(--text-tertiary)]">Episode video coming soon</p>
            </div>
          </div>
        </ScrollReveal>

        {/* Questions */}
        <ScrollReveal delay={0.25}>
          <h2 className="font-[family-name:var(--font-display)] text-[var(--text-h2)] text-[var(--text-primary)] mb-6">
            Questions We Explore
          </h2>
        </ScrollReveal>

        <div className="space-y-4 mb-12">
          {episode.questions.map((q, i) => (
            <ScrollReveal key={q.id} delay={0.05 * i}>
              <Link
                href={`/questions/${q.slug}`}
                className="block p-5 rounded-[var(--radius-md)] bg-[var(--bg-secondary)] border border-[var(--border-default)] hover:border-[rgba(196,132,62,0.3)] transition-all duration-300 group"
              >
                <span className="font-[family-name:var(--font-accent)] text-xs text-[var(--text-tertiary)] mr-3">
                  Q{i + 1}
                </span>
                <span className="font-[family-name:var(--font-display)] italic text-[var(--text-primary)] group-hover:text-[var(--accent-oak)] transition-colors duration-300">
                  {q.text}
                </span>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        {/* Scripture */}
        <ScrollReveal>
          <div className="p-8 rounded-[var(--radius-lg)] bg-[var(--bg-accent-surface)] border border-[var(--accent-oak)]/20">
            <p className="font-[family-name:var(--font-display)] italic text-xl text-[var(--text-primary)] leading-relaxed mb-4">
              &ldquo;{episode.scripture.text}&rdquo;
            </p>
            <p className="font-[family-name:var(--font-accent)] text-sm text-[var(--accent-oak)]">
              — {episode.scripture.reference}
            </p>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
