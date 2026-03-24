'use client';

import { ScrollReveal } from '@/components/ui/ScrollReveal';

export function SubscribeSection() {
  return (
    <section
      id="subscribe"
      className="section-padding relative overflow-hidden"
    >
      {/* Warm oak glow background effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[var(--accent-oak-glow)] blur-[100px]" />
      </div>

      <div className="container-default relative z-10 max-w-2xl mx-auto text-center">
        <ScrollReveal>
          <span className="font-[family-name:var(--font-accent)] text-sm tracking-[0.2em] uppercase text-[var(--accent-oak)]">
            Stay Connected
          </span>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="font-[family-name:var(--font-display)] text-[var(--text-h1)] text-[var(--text-primary)] mt-4 mb-4">
            Never miss an episode.
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p className="text-[var(--text-body)] text-[var(--text-secondary)] mb-10">
            Join the launch list. Be the first to know when new episodes drop, and get exclusive content straight to your inbox.
          </p>
        </ScrollReveal>

        {/* Email form */}
        <ScrollReveal delay={0.3}>
          <form className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto mb-12" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 h-12 px-5 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-default)] text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none focus:border-[var(--accent-oak)] transition-colors duration-300"
            />
            <button
              type="submit"
              className="h-12 px-8 rounded-full bg-[var(--accent-oak)] text-white font-medium hover:bg-[var(--accent-oak-light)] transition-all duration-300 hover:scale-[1.03] hover:shadow-[var(--shadow-glow)] active:scale-[0.97]"
            >
              Join the List
            </button>
          </form>
        </ScrollReveal>

        {/* Platform icons */}
        <ScrollReveal delay={0.4}>
          <p className="text-sm text-[var(--text-tertiary)] mb-4">Available on</p>
          {/* gap-4 on mobile, gap-8 on sm+; p-2 on each icon gives 44px+ tap target */}
          <div className="flex items-center justify-center gap-4 sm:gap-8">
            {/* YouTube */}
            <a href="#" className="p-2 text-[var(--text-tertiary)] hover:text-[var(--accent-oak)] transition-colors duration-300" aria-label="YouTube">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            </a>
            {/* Spotify */}
            <a href="#" className="p-2 text-[var(--text-tertiary)] hover:text-[var(--accent-oak)] transition-colors duration-300" aria-label="Spotify">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>
            </a>
            {/* Apple Podcasts */}
            <a href="#" className="p-2 text-[var(--text-tertiary)] hover:text-[var(--accent-oak)] transition-colors duration-300" aria-label="Apple Podcasts">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M5.34 0A5.328 5.328 0 000 5.34v13.32A5.328 5.328 0 005.34 24h13.32A5.328 5.328 0 0024 18.66V5.34A5.328 5.328 0 0018.66 0H5.34zm6.525 2.568c4.988 0 7.399 3.378 7.399 6.48 0 1.74-.756 3.768-1.77 4.956-.396.456-1.044.744-1.596.744-.852 0-1.344-.54-1.344-1.344 0-.264.048-.504.144-.768.492-1.272.768-2.52.768-3.588 0-2.064-1.32-4.248-3.6-4.248-2.28 0-3.6 2.184-3.6 4.248 0 1.068.276 2.316.768 3.588.096.264.144.504.144.768 0 .804-.492 1.344-1.344 1.344-.552 0-1.2-.288-1.596-.744-1.014-1.188-1.77-3.216-1.77-4.956-.001-3.102 2.41-6.48 7.397-6.48zM12 9.132a2.64 2.64 0 00-2.64 2.64 2.64 2.64 0 002.64 2.64 2.64 2.64 0 002.64-2.64A2.64 2.64 0 0012 9.132zm-.005 6.228c-.924 0-1.692.552-1.956 1.428l-1.212 4.188c-.252.876.312 1.464 1.188 1.464h3.96c.876 0 1.44-.588 1.188-1.464l-1.212-4.188c-.264-.876-1.032-1.428-1.956-1.428z"/></svg>
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
