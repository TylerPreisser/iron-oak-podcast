import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'hero';
}

const sizes = {
  sm: 'text-lg',
  md: 'text-xl',
  lg: 'text-2xl',
  hero: 'text-5xl md:text-7xl lg:text-8xl',
};

export function Logo({ className, size = 'md' }: LogoProps) {
  return (
    <span
      className={cn(
        'font-[family-name:var(--font-display)] font-bold tracking-wider inline-flex items-baseline',
        sizes[size],
        className
      )}
    >
      <span className="text-[var(--accent-iron-light)]">IRON</span>
      <span className="text-[var(--accent-oak)] mx-[0.2em]">&amp;</span>
      <span className="text-[var(--accent-oak-light)]">OAK</span>
    </span>
  );
}
