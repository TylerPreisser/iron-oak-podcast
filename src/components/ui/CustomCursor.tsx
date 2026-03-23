'use client';

import { useRef, useEffect, useState } from 'react';
import { gsap } from '@/lib/gsap-register';
import { ANIMATION } from '@/lib/constants';

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const [hovering, setHovering] = useState(false);
  const pos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Only show on desktop with fine pointer
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    setIsDesktop(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (!isDesktop || !cursorRef.current) return;

    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      if (cursorRef.current) {
        gsap.to(cursorRef.current, {
          x: pos.current.x,
          y: pos.current.y,
          duration: ANIMATION.cursorLerp,
          ease: 'none',
          overwrite: true,
        });
      }
      rafId = requestAnimationFrame(animate);
    };

    // Detect hoverable elements
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [role="button"], .spark-trigger, input, textarea, select')) {
        setHovering(true);
      }
    };
    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [role="button"], .spark-trigger, input, textarea, select')) {
        setHovering(false);
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseout', onMouseOut);
    rafId = requestAnimationFrame(animate);

    // Hide default cursor
    document.body.style.cursor = 'none';

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
      cancelAnimationFrame(rafId);
      document.body.style.cursor = '';
    };
  }, [isDesktop]);

  if (!isDesktop) return null;

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[10000] -translate-x-1/2 -translate-y-1/2"
      style={{ willChange: 'transform' }}
    >
      <div
        ref={dotRef}
        className="rounded-full border transition-all duration-200 ease-out"
        style={{
          width: hovering ? `${ANIMATION.cursorHover}px` : `${ANIMATION.cursorDefault}px`,
          height: hovering ? `${ANIMATION.cursorHover}px` : `${ANIMATION.cursorDefault}px`,
          borderColor: hovering ? 'var(--accent-oak)' : 'var(--accent-oak)',
          backgroundColor: hovering ? 'rgba(196, 132, 62, 0.15)' : 'transparent',
          borderWidth: hovering ? '1px' : '2px',
        }}
      />
    </div>
  );
}
