import type { Metadata } from 'next';
import { hosts } from '@/data/hosts';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'About',
  description: 'A podcast built for honest faith, not easy answers. Meet Tyler Preisser and Lincoln Myers.',
};

export default function AboutPage() {
  return (
    <div className="pt-24 pb-16">
      <div className="container-default">
        {/* Hero */}
        <ScrollReveal className="text-center mb-16">
          <span className="font-[family-name:var(--font-accent)] text-sm tracking-[0.2em] uppercase text-[var(--accent-oak)]">
            About
          </span>
          <h1 className="font-[family-name:var(--font-display)] text-[var(--text-h1)] text-[var(--text-primary)] mt-2 mb-4">
            A podcast built for honest faith, not easy answers.
          </h1>
          <p className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto">
            Tyler and Lincoln bring different instincts to the same table. One dissects systems. The other tells stories. Both refuse to flatten the hard parts.
          </p>
        </ScrollReveal>

        {/* Why section */}
        <ScrollReveal className="max-w-3xl mx-auto mb-20">
          <h2 className="font-[family-name:var(--font-display)] text-[var(--text-h2)] text-[var(--text-primary)] mb-6">
            Why This Podcast?
          </h2>
          <div className="space-y-4 text-[var(--text-body)] text-[var(--text-secondary)] leading-relaxed">
            <p>
              Because the hardest questions about faith deserve more than bumper-sticker answers. Because doubt is not the opposite of belief — it is the crucible that forges it.
            </p>
            <p>
              Iron & Oak exists for the person sitting in the pew who has real questions and does not know if they are allowed to ask them. For the skeptic who respects honesty more than performance. For anyone who wants to go deeper without leaving their brain at the door.
            </p>
            <p>
              Every episode takes one essential doctrine and pressure-tests it — not to tear it apart, but to show what survives the fire.
            </p>
          </div>
        </ScrollReveal>

        {/* Host bios */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {hosts.map((host, i) => (
            <ScrollReveal key={host.name} delay={i * 0.15}>
              <div className={cn(
                'p-8 rounded-[var(--radius-lg)] border',
                host.texture === 'iron'
                  ? 'bg-[var(--bg-secondary)] border-[var(--accent-iron)]/20'
                  : 'bg-[var(--bg-secondary)] border-[var(--accent-oak)]/20'
              )}>
                {/* Avatar */}
                <div className={cn(
                  'w-20 h-20 rounded-full mb-6 flex items-center justify-center text-2xl font-bold font-[family-name:var(--font-display)]',
                  host.texture === 'iron'
                    ? 'bg-[var(--accent-iron)]/10 text-[var(--accent-iron)] border border-[var(--accent-iron)]/30'
                    : 'bg-[var(--accent-oak)]/10 text-[var(--accent-oak)] border border-[var(--accent-oak)]/30'
                )}>
                  {host.name.split(' ').map(n => n[0]).join('')}
                </div>

                <h3 className={cn(
                  'font-[family-name:var(--font-display)] text-[var(--text-h2)] mb-1',
                  host.texture === 'iron' ? 'text-[var(--accent-iron-light)]' : 'text-[var(--accent-oak-light)]'
                )}>
                  {host.name}
                </h3>
                <p className="font-[family-name:var(--font-accent)] text-sm text-[var(--text-tertiary)] tracking-wider mb-4">
                  {host.role}
                </p>
                <p className="text-[var(--text-body)] text-[var(--text-secondary)] leading-relaxed">
                  {host.fullBio}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
}
