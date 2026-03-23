'use client';

import Link from 'next/link';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { formatEpisodeNumber } from '@/lib/utils';
import type { Question } from '@/types';

interface Props {
  question: Question;
  related: Question[];
}

export function QuestionDetailClient({ question, related }: Props) {
  return (
    <div className="pt-24 pb-16">
      <div className="container-default max-w-3xl">
        {/* Back */}
        <ScrollReveal>
          <Link
            href="/questions"
            className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--accent-oak)] transition-colors mb-8"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            All Questions
          </Link>
        </ScrollReveal>

        {/* Question */}
        <ScrollReveal>
          <h1 className="font-[family-name:var(--font-display)] italic text-[var(--text-h1)] text-[var(--text-primary)] leading-tight mb-6">
            {question.text}
          </h1>
        </ScrollReveal>

        {/* Episode link */}
        <ScrollReveal delay={0.1}>
          <Link
            href={`/episodes/${question.episodeSlug}`}
            className="inline-flex items-center gap-3 px-5 py-3 rounded-[var(--radius-md)] bg-[var(--bg-secondary)] border border-[var(--border-default)] hover:border-[var(--accent-oak)] transition-all duration-300 mb-12"
          >
            <span className="font-[family-name:var(--font-accent)] text-sm text-[var(--accent-oak)]">
              {formatEpisodeNumber(question.episodeNumber)}
            </span>
            <span className="text-[var(--text-primary)]">{question.episodeTitle}</span>
            <svg className="w-4 h-4 text-[var(--text-tertiary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </ScrollReveal>

        {/* Timestamp placeholder */}
        <ScrollReveal delay={0.15}>
          <div className="p-6 rounded-[var(--radius-md)] bg-[var(--bg-accent-surface)] border border-[var(--accent-oak)]/20 mb-12">
            <p className="text-sm text-[var(--text-secondary)]">
              Video timestamp will be linked here when episodes launch.
            </p>
          </div>
        </ScrollReveal>

        {/* Related questions */}
        {related.length > 0 && (
          <>
            <ScrollReveal>
              <h2 className="font-[family-name:var(--font-display)] text-[var(--text-h3)] text-[var(--text-primary)] mb-4">
                Related Questions
              </h2>
            </ScrollReveal>
            <div className="space-y-3">
              {related.map((q, i) => (
                <ScrollReveal key={q.id} delay={0.05 * i}>
                  <Link
                    href={`/questions/${q.slug}`}
                    className="block p-4 rounded-[var(--radius-md)] bg-[var(--bg-secondary)] border border-[var(--border-default)] hover:border-[rgba(196,132,62,0.3)] transition-all duration-300 group"
                  >
                    <span className="font-[family-name:var(--font-display)] italic text-[var(--text-primary)] group-hover:text-[var(--accent-oak)] transition-colors duration-300">
                      {q.text}
                    </span>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
