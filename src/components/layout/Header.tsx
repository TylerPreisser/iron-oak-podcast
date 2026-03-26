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
      {/* Single fixed header that starts at the true top of the screen.
          viewport-fit=cover (set in layout.tsx) makes top:0 mean the physical
          top edge, including behind the notch / Dynamic Island on iPhone.
          padding-top: env(safe-area-inset-top) pushes the visible nav content
          below the status bar, while the header's background fills the notch
          zone naturally. This is the canonical iOS notch fix — one element,
          not two. The background must always be opaque in the safe area, so we
          layer bg-[var(--bg-primary)] behind the optional blur. */}
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'backdrop-blur-[12px] bg-[var(--bg-primary)]/80 shadow-[0_1px_0_rgba(255,255,255,0.06)]'
            : 'bg-[var(--bg-primary)]'
        )}
        style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}
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
