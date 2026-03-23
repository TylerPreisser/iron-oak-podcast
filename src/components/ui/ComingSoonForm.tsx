'use client';

export function ComingSoonForm() {
  return (
    <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
      <input
        type="email"
        placeholder="Get notified"
        className="flex-1 h-12 px-5 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-default)] text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none focus:border-[var(--accent-oak)] transition-colors duration-300"
      />
      <button type="submit" className="h-12 px-6 rounded-full bg-[var(--accent-oak)] text-white font-medium hover:bg-[var(--accent-oak-light)] transition-colors duration-300">
        Notify Me
      </button>
    </form>
  );
}
