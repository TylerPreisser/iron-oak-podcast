'use client';

import { ScrollReveal } from '@/components/ui/ScrollReveal';

export function SubscribePageClient() {
  return (
    <div className="pt-24 pb-16">
      <div className="container-default max-w-2xl mx-auto text-center">
        <ScrollReveal>
          <span className="font-[family-name:var(--font-accent)] text-sm tracking-[0.2em] uppercase text-[var(--accent-oak)]">
            Subscribe
          </span>
          <h1 className="font-[family-name:var(--font-display)] text-[var(--text-h1)] text-[var(--text-primary)] mt-2 mb-4">
            Never Miss an Episode
          </h1>
          <p className="text-xl text-[var(--text-secondary)] mb-10">
            Join the launch list. Be the first to know when new episodes drop.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <form className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto mb-16" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 h-14 px-6 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-default)] text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none focus:border-[var(--accent-oak)] transition-colors duration-300 text-base"
            />
            <button
              type="submit"
              className="h-14 px-10 rounded-full bg-[var(--accent-oak)] text-white font-medium text-base hover:bg-[var(--accent-oak-light)] transition-all duration-300 hover:scale-[1.03] hover:shadow-[var(--shadow-glow)] active:scale-[0.97]"
            >
              Join the List
            </button>
          </form>
        </ScrollReveal>

        {/* Platform links */}
        <ScrollReveal delay={0.3}>
          <h3 className="font-[family-name:var(--font-display)] text-[var(--text-h3)] text-[var(--text-primary)] mb-6">
            Listen On Your Favorite Platform
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-6">
            {['YouTube', 'Spotify', 'Apple Podcasts', 'Google Podcasts'].map((platform) => (
              <a
                key={platform}
                href="#"
                className="px-6 py-3 rounded-[var(--radius-md)] bg-[var(--bg-secondary)] border border-[var(--border-default)] text-[var(--text-secondary)] hover:text-[var(--accent-oak)] hover:border-[var(--accent-oak)] transition-all duration-300"
              >
                {platform}
              </a>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
