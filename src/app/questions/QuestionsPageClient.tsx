'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { questions } from '@/data/questions';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { cn } from '@/lib/utils';

const phases = ['All', 'Foundation', 'The Fall', 'Redemption', 'The Christian Life', 'Hard Questions'];

export function QuestionsPageClient() {
  const [search, setSearch] = useState('');
  const [activePhase, setActivePhase] = useState('All');

  const filtered = useMemo(() => {
    return questions.filter((q) => {
      const matchesPhase = activePhase === 'All' || q.phase === activePhase;
      const matchesSearch = !search || q.text.toLowerCase().includes(search.toLowerCase());
      return matchesPhase && matchesSearch;
    });
  }, [search, activePhase]);

  return (
    <div className="pt-24 pb-16">
      <div className="container-default">
        {/* Hero */}
        <ScrollReveal className="text-center mb-12">
          <span className="font-[family-name:var(--font-accent)] text-sm tracking-[0.2em] uppercase text-[var(--accent-oak)]">
            Explore
          </span>
          <h1 className="font-[family-name:var(--font-display)] text-[var(--text-h1)] text-[var(--text-primary)] mt-2 mb-4">
            The Questions People Are Actually Asking
          </h1>
          <p className="text-[var(--text-body)] text-[var(--text-secondary)] max-w-xl mx-auto">
            {questions.length} questions across {12} episodes. Search, filter, and dig in.
          </p>
        </ScrollReveal>

        {/* Search */}
        <div className="max-w-lg mx-auto mb-8">
          <input
            type="text"
            placeholder="Search questions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-12 px-5 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-default)] text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none focus:border-[var(--accent-oak)] transition-colors duration-300"
          />
        </div>

        {/* Phase filter */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {phases.map((phase) => (
            <button
              key={phase}
              onClick={() => setActivePhase(phase)}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-medium transition-all duration-300',
                activePhase === phase
                  ? 'bg-[var(--accent-oak)] text-white'
                  : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-default)]'
              )}
            >
              {phase}
            </button>
          ))}
        </div>

        {/* Count */}
        <p className="text-sm text-[var(--text-tertiary)] mb-6">
          {filtered.length} question{filtered.length !== 1 ? 's' : ''}
        </p>

        {/* Question grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((q, i) => (
            <ScrollReveal key={q.id} delay={Math.min(i * 0.03, 0.5)}>
              <Link
                href={`/questions/${q.slug}`}
                className="block p-5 rounded-[var(--radius-md)] bg-[var(--bg-secondary)] border border-[var(--border-default)] hover:border-[rgba(196,132,62,0.3)] transition-all duration-300 group"
              >
                <p className="font-[family-name:var(--font-display)] italic text-lg text-[var(--text-primary)] group-hover:text-[var(--accent-oak)] transition-colors duration-300 mb-3">
                  {q.text}
                </p>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-[var(--text-tertiary)]">
                    EP {String(q.episodeNumber).padStart(2, '0')}
                  </span>
                  <span className="inline-block px-2 py-0.5 text-xs rounded-full bg-[var(--bg-accent-surface)] text-[var(--accent-oak-light)]">
                    {q.phase}
                  </span>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-[var(--text-secondary)] mt-12">
            No questions match your search.
          </p>
        )}
      </div>
    </div>
  );
}
