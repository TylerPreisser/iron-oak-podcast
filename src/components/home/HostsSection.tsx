'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { assetPath } from "@/lib/basePath";
import { hosts } from '@/data/hosts';
import { cn } from '@/lib/utils';

const hostImages: Record<string, string> = {
  'Tyler Preisser': assetPath('/images/tyler-headshot.webp'),
  // Drop Lincoln's headshot at /public/images/lincoln-headshot.webp to activate
  // 'Lincoln Myers': '/images/lincoln-headshot.webp',
};

function FadeIn({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setTimeout(() => setVisible(true), delay); observer.disconnect(); } },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : 'translateY(25px)',
        transition: 'opacity 0.8s ease, transform 0.8s ease',
      }}
    >
      {children}
    </div>
  );
}

export function HostsSection() {
  return (
    <section id="hosts" className="section-padding bg-[var(--bg-primary)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 md:px-12 lg:px-16">
        <FadeIn className="text-center mb-16">
          <span className="font-[family-name:var(--font-accent)] text-sm tracking-[0.2em] uppercase text-[var(--accent-oak)]">
            Your Hosts
          </span>
          <h2 className="font-[family-name:var(--font-display)] text-[var(--text-h1)] text-[var(--text-primary)] mt-2">
            Two Perspectives. One Table.
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {hosts.map((host, i) => (
            <FadeIn key={host.name} delay={i * 200}>
              <div className="text-center lg:text-left">
                {/* Headshot */}
                <div className="mb-6 flex justify-center lg:justify-start">
                  <div
                    className={cn(
                      'w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden',
                      'border-2',
                      host.texture === 'iron'
                        ? 'border-[var(--accent-iron)]/40'
                        : 'border-[var(--accent-oak)]/40'
                    )}
                  >
                    {hostImages[host.name] ? (
                      <Image
                        src={hostImages[host.name]}
                        alt={host.name}
                        width={200}
                        height={200}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className={cn(
                        'w-full h-full flex items-center justify-center text-3xl font-bold font-[family-name:var(--font-display)]',
                        host.texture === 'iron' ? 'bg-[var(--accent-iron)]/10 text-[var(--accent-iron)]' : 'bg-[var(--accent-oak)]/10 text-[var(--accent-oak)]'
                      )}>
                        {host.name.split(' ').map(n => n[0]).join('')}
                      </div>
                    )}
                  </div>
                </div>

                <h3
                  className={cn(
                    'font-[family-name:var(--font-display)] text-[var(--text-h2)] leading-tight mb-1',
                    host.texture === 'iron' ? 'text-[var(--accent-iron-light)]' : 'text-[var(--accent-oak-light)]'
                  )}
                >
                  {host.name}
                </h3>

                <p className="font-[family-name:var(--font-accent)] text-sm text-[var(--text-tertiary)] tracking-wider mb-4">
                  {host.role}
                </p>

                <p className="text-[var(--text-body)] text-[var(--text-secondary)] leading-relaxed max-w-md mx-auto lg:mx-0">
                  {host.fullBio}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
