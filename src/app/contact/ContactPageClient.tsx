'use client';

import { ScrollReveal } from '@/components/ui/ScrollReveal';

export function ContactPageClient() {
  return (
    <div className="pt-24 pb-16">
      <div className="container-default max-w-2xl mx-auto">
        <ScrollReveal className="text-center mb-12">
          <span className="font-[family-name:var(--font-accent)] text-sm tracking-[0.2em] uppercase text-[var(--accent-oak)]">
            Contact
          </span>
          <h1 className="font-[family-name:var(--font-display)] text-[var(--text-h1)] text-[var(--text-primary)] mt-2 mb-4">
            Get In Touch
          </h1>
          <p className="text-[var(--text-secondary)]">
            Have a question, suggestion, or just want to say hey? We would love to hear from you.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-[var(--text-primary)] mb-2">Name</label>
              <input
                id="name"
                type="text"
                placeholder="Your name"
                className="w-full h-12 px-5 rounded-[var(--radius-md)] bg-[var(--bg-secondary)] border border-[var(--border-default)] text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none focus:border-[var(--accent-oak)] transition-colors duration-300"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[var(--text-primary)] mb-2">Email</label>
              <input
                id="email"
                type="email"
                placeholder="your@email.com"
                className="w-full h-12 px-5 rounded-[var(--radius-md)] bg-[var(--bg-secondary)] border border-[var(--border-default)] text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none focus:border-[var(--accent-oak)] transition-colors duration-300"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-[var(--text-primary)] mb-2">Message</label>
              <textarea
                id="message"
                rows={6}
                placeholder="What is on your mind?"
                className="w-full px-5 py-4 rounded-[var(--radius-md)] bg-[var(--bg-secondary)] border border-[var(--border-default)] text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none focus:border-[var(--accent-oak)] transition-colors duration-300 resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full h-12 rounded-[var(--radius-md)] bg-[var(--accent-oak)] text-white font-medium hover:bg-[var(--accent-oak-light)] transition-all duration-300 hover:shadow-[var(--shadow-glow)] active:scale-[0.97]"
            >
              Send Message
            </button>
          </form>
        </ScrollReveal>
      </div>
    </div>
  );
}
