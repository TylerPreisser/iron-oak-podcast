'use client';

import { useRef } from 'react';
import { useGSAP } from '@/hooks/useGSAP';
import { hosts } from '@/data/hosts';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { cn } from '@/lib/utils';

export function HostsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP((gsap, ScrollTrigger) => {
    if (!sectionRef.current) return;
    const section = sectionRef.current;

    // Mirrored reveal: Tyler from left, Lincoln from right
    gsap.from(section.querySelector('.host-left'), {
      x: -60,
      opacity: 0,
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 75%',
      },
    });

    gsap.from(section.querySelector('.host-right'), {
      x: 60,
      opacity: 0,
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 75%',
      },
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hosts"
      className="section-padding bg-[var(--bg-secondary)]"
    >
      <div className="container-default">
        {/* Section header */}
        <ScrollReveal className="text-center mb-16">
          <span className="font-[family-name:var(--font-accent)] text-sm tracking-[0.2em] uppercase text-[var(--accent-oak)]">
            Your Hosts
          </span>
          <h2 className="font-[family-name:var(--font-display)] text-[var(--text-h1)] text-[var(--text-primary)] mt-2">
            Two Perspectives. One Table.
          </h2>
        </ScrollReveal>

        {/* Split screen */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 relative">
          {/* Center divider — visible on desktop */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[var(--accent-iron)] via-[var(--border-default)] to-[var(--accent-oak)]" />

          {hosts.map((host, i) => (
            <div
              key={host.name}
              className={cn(
                'p-8 lg:p-12',
                i === 0 ? 'host-left' : 'host-right',
                i === 0 ? 'lg:pr-16' : 'lg:pl-16'
              )}
            >
              {/* Host avatar placeholder — stylized circle with texture feel */}
              <div
                className={cn(
                  'w-24 h-24 rounded-full mb-6 flex items-center justify-center',
                  'font-[family-name:var(--font-display)] text-3xl font-bold',
                  host.texture === 'iron'
                    ? 'bg-[var(--accent-iron)]/10 text-[var(--accent-iron)] border border-[var(--accent-iron)]/30'
                    : 'bg-[var(--accent-oak)]/10 text-[var(--accent-oak)] border border-[var(--accent-oak)]/30'
                )}
              >
                {host.name.split(' ').map(n => n[0]).join('')}
              </div>

              {/* Name */}
              <h3
                className={cn(
                  'font-[family-name:var(--font-display)] text-[var(--text-h2)] leading-tight mb-1',
                  host.texture === 'iron' ? 'text-[var(--accent-iron-light)]' : 'text-[var(--accent-oak-light)]'
                )}
              >
                {host.name}
              </h3>

              {/* Role */}
              <p className="font-[family-name:var(--font-accent)] text-sm text-[var(--text-tertiary)] tracking-wider mb-4">
                {host.role}
              </p>

              {/* Bio */}
              <p className="text-[var(--text-body)] text-[var(--text-secondary)] leading-relaxed">
                {host.fullBio}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
