import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="pt-24 pb-16 min-h-[60vh] flex items-center">
      <div className="container-default max-w-2xl mx-auto text-center">
        <span className="font-[family-name:var(--font-accent)] text-6xl text-[var(--accent-oak)]">404</span>
        <h1 className="font-[family-name:var(--font-display)] text-[var(--text-h1)] text-[var(--text-primary)] mt-4 mb-4">
          This page wandered into the wilderness.
        </h1>
        <p className="text-xl text-[var(--text-secondary)] mb-8">
          Let us bring you back.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-[var(--accent-oak)] text-white font-medium hover:bg-[var(--accent-oak-light)] transition-all duration-300 hover:shadow-[var(--shadow-glow)]"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
