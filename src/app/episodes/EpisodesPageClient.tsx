'use client';

import { useState, useMemo } from 'react';
import { episodes } from '@/data/episodes';
import { EpisodeCard } from '@/components/ui/EpisodeCard';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { cn } from '@/lib/utils';

const phases = ['All', 'Foundation', 'The Fall', 'Redemption', 'The Christian Life', 'Hard Questions'];

export function EpisodesPageClient() {
  const [search, setSearch] = useState('');
  const [activePhase, setActivePhase] = useState('All');

  const filtered = useMemo(() => {
    return episodes.filter((ep) => {
      const matchesPhase = activePhase === 'All' || ep.phase === activePhase;
      const matchesSearch = !search ||
        ep.title.toLowerCase().includes(search.toLowerCase()) ||
        ep.subtitle.toLowerCase().includes(search.toLowerCase()) ||
        ep.questions.some(q => q.text.toLowerCase().includes(search.toLowerCase()));
      return matchesPhase && matchesSearch;
    });
  }, [search, activePhase]);

  return (
    <div className="pt-24 pb-16">
      <div className="container-default">
        {/* Hero */}
        <ScrollReveal className="text-center mb-12">
          <span className="font-[family-name:var(--font-accent)] text-sm tracking-[0.2em] uppercase text-[var(--accent-oak)]">
            Season One
          </span>
          <h1 className="font-[family-name:var(--font-display)] text-[var(--text-h1)] text-[var(--text-primary)] mt-2 mb-4">
            Every Episode. Every Question.
          </h1>
          <p className="text-[var(--text-body)] text-[var(--text-secondary)] max-w-xl mx-auto">
            Search by topic, question, or phase.
          </p>
        </ScrollReveal>

        {/* Search */}
        <div className="max-w-lg mx-auto mb-8">
          <input
            type="text"
            placeholder="Search episodes and questions..."
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

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((episode, i) => (
            <ScrollReveal key={episode.slug} delay={i * 0.05}>
              <EpisodeCard episode={episode} index={i} />
            </ScrollReveal>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-[var(--text-secondary)] mt-12">
            No episodes match your search. Try a different term.
          </p>
        )}
      </div>
    </div>
  );
}
