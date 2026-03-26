'use client';

import { useState, useEffect } from 'react';
import { assetPath } from "@/lib/basePath";
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { NAV_SCROLL_THRESHOLD } from '@/lib/constants';

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > NAV_SCROLL_THRESHOLD);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Safe area background — always visible, covers the notch/Dynamic Island zone.
          This is a separate fixed div so its background is never transparent. */}
      <div
        className="fixed top-0 left-0 right-0 z-50 bg-[var(--bg-primary)]"
        style={{ height: 'env(safe-area-inset-top, 0px)' }}
      />

      {/* Actual header — sits below the safe area strip */}
      <header
        className={cn(
          'fixed left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'backdrop-blur-[12px] bg-[var(--bg-primary)]/80 shadow-[0_1px_0_rgba(255,255,255,0.06)]'
            : 'bg-transparent'
        )}
        style={{ top: 'env(safe-area-inset-top, 0px)' }}
      >
        <div className="container-default flex items-center h-16 lg:h-20">
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <Image
              src={assetPath("/images/iron-oak-icon.webp")}
              alt="Iron & Oak"
              width={160}
              height={160}
              className="w-16 h-16 lg:w-20 lg:h-20"
            />
          </button>
        </div>
      </header>
    </>
  );
}
