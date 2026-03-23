'use client';

import { useRef } from 'react';
import { useGSAP } from '@/hooks/useGSAP';
import { ButtonLink } from '@/components/ui/Button';
import { Logo } from '@/components/ui/Logo';
import { GradientBackground } from '@/components/effects/GradientBackground';

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP((gsap) => {
    if (!sectionRef.current) return;
    const section = sectionRef.current;

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.from(section.querySelector('.hero-logo'), { opacity: 0, y: 20, duration: 0.8 }, 0)
      .from(section.querySelector('.hero-headline'), { opacity: 0, y: 40, duration: 1.2 }, 0.2)
      .from(section.querySelector('.hero-subtitle'), { opacity: 0, y: 20, duration: 0.8 }, 0.8)
      .from(section.querySelector('.hero-ctas'), { opacity: 0, y: 20, duration: 0.8 }, 1.0)
      .from(section.querySelector('.hero-email'), { opacity: 0, y: 20, duration: 0.8 }, 1.2)
      .from(section.querySelector('.hero-scroll'), { opacity: 0, duration: 0.8 }, 1.4);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <GradientBackground className="z-0" />

      <div className="relative z-10 container-default text-center max-w-4xl mx-auto px-6">
        {/* Logo — same component as everywhere */}
        <div className="hero-logo mb-8">
          <Logo size="hero" />
        </div>

        {/* Subtle cross watermark behind headline */}
        <div className="relative">
          <svg width="50" height="65" viewBox="0 0 50 65" fill="none" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.06]" style={{ width: '120px', height: '156px' }}>
            <rect x="21" y="0" width="8" height="65" rx="1.5" fill="var(--accent-oak)" />
            <rect x="5" y="14" width="40" height="8" rx="1.5" fill="var(--accent-oak)" />
          </svg>
          <h1 className="hero-headline relative font-[family-name:var(--font-display)] text-[var(--text-hero)] leading-[1.1] text-[var(--text-primary)] mb-6">
            Where Iron Sharpens Iron<br />
            and Deep Roots Hold
          </h1>
        </div>

        <p className="hero-subtitle text-[var(--text-body)] text-[var(--text-secondary)] max-w-2xl mx-auto mb-10 text-lg md:text-xl">
          Hard questions. Honest faith. No easy answers.
        </p>

        <div className="hero-ctas mb-8">
          <ButtonLink href="#subscribe" variant="primary" size="lg" sparkTrigger>
            Listen Now
          </ButtonLink>
        </div>

        <div className="hero-email max-w-md mx-auto">
          <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Enter your email for updates"
              className="flex-1 h-12 px-5 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-default)] text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none focus:border-[var(--accent-oak)] transition-colors duration-300 text-sm"
            />
            <button
              type="submit"
              className="h-12 px-6 rounded-full bg-[var(--accent-oak)] text-white font-medium text-sm hover:bg-[var(--accent-oak-light)] transition-colors duration-300 active:scale-[0.97]"
            >
              Join
            </button>
          </form>
        </div>
      </div>

      <div className="hero-scroll absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-xs text-[var(--text-tertiary)] tracking-wider uppercase">Scroll</span>
        <div className="w-5 h-8 rounded-full border border-[var(--border-default)] flex items-start justify-center p-1.5">
          <div className="w-1 h-2 rounded-full bg-[var(--accent-oak)] animate-bounce" />
        </div>
      </div>
    </section>
  );
}
