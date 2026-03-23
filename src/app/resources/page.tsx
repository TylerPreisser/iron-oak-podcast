import type { Metadata } from 'next';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { ComingSoonForm } from '@/components/ui/ComingSoonForm';

export const metadata: Metadata = {
  title: 'Resources',
  description: 'Iron & Oak resources coming soon.',
};

export default function ResourcesPage() {
  return (
    <div className="pt-24 pb-16 min-h-[60vh] flex items-center">
      <div className="container-default max-w-2xl mx-auto text-center">
        <ScrollReveal>
          <span className="font-[family-name:var(--font-accent)] text-sm tracking-[0.2em] uppercase text-[var(--accent-oak)]">
            Resources
          </span>
          <h1 className="font-[family-name:var(--font-display)] text-[var(--text-h1)] text-[var(--text-primary)] mt-2 mb-4">
            Coming Soon
          </h1>
          <p className="text-xl text-[var(--text-secondary)] mb-8">
            We are building something here. It is not ready yet — but it will be worth the wait.
          </p>
          <ComingSoonForm />
        </ScrollReveal>
      </div>
    </div>
  );
}
