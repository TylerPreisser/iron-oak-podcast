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
    <header
      className={cn(
        'fixed left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'backdrop-blur-[12px] bg-[var(--bg-primary)]/80 shadow-[0_1px_0_rgba(255,255,255,0.06)]'
          : 'bg-transparent'
      )}
      style={{
        top: 0,
        paddingTop: 'env(safe-area-inset-top, 0px)',
        paddingLeft: 'env(safe-area-inset-left, 0px)',
        paddingRight: 'env(safe-area-inset-right, 0px)',
      }}
    >
      {/*
        iOS Safari safe-area strip.
        viewport-fit=cover extends web content behind the notch/Dynamic Island.
        When the header is in its transparent (unscrolled) state, the safe-area
        padding zone is transparent, leaving canvas content visible under the
        status bar — which renders as a dark gap in some cases.
        This absolutely-positioned element always fills that exact strip with the
        page background, so the status bar area is seamless regardless of scroll.
        It sits behind the header content (z-[-1]) so it never obscures the icon.
        On desktop, env(safe-area-inset-top) resolves to 0px, so this is a 0-height
        element with no visual effect — no desktop regression.
      */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 'env(safe-area-inset-top, 0px)',
          background: 'var(--bg-primary)',
          zIndex: -1,
        }}
      />
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
  );
}
