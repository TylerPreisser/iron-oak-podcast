'use client';

import { useRef } from 'react';
import { useGSAP } from '@/hooks/useGSAP';

// Root definitions: path data, strokeWidth, color, opacity, layer order
// Layers: 0 = back (grows first), 1 = mid, 2 = front (grows last)
interface RootDef {
  d: string;
  width: number;
  color: string;
  opacity: number;
  layer: number;
}

const roots: RootDef[] = [
  // === MAIN THICK ROOTS (layer 0) — the backbone ===
  // These are gnarled, twisting with tight reversals

  // Root A: dominant central root — thick, twisting with knots
  {
    d: `M 950 260
        C 920 250, 890 275, 860 258
        C 830 240, 805 270, 775 255
        C 745 238, 720 272, 688 252
        C 655 232, 628 268, 595 248
        C 562 228, 538 265, 505 245
        C 472 225, 445 262, 412 242
        C 380 222, 352 258, 318 240
        C 285 222, 258 255, 225 238
        C 192 220, 162 250, 128 235
        C 95 220, 65 245, 30 232
        C 0 222, -30 240, -60 230`,
    width: 28,
    color: '#4A3322',
    opacity: 0.9,
    layer: 0,
  },
  // Root B: lower thick root — undulates below A, crosses over at points
  {
    d: `M 950 310
        C 915 325, 882 298, 848 318
        C 815 338, 785 305, 750 322
        C 715 340, 682 308, 648 328
        C 615 348, 585 312, 550 332
        C 518 350, 488 315, 455 335
        C 420 355, 390 318, 355 338
        C 322 356, 292 322, 258 342
        C 225 360, 195 328, 160 345
        C 128 360, 98 332, 62 348
        C 30 362, 0 340, -30 352`,
    width: 24,
    color: '#3D2B1A',
    opacity: 0.85,
    layer: 0,
  },
  // Root C: upper thick root
  {
    d: `M 950 205
        C 918 192, 885 218, 852 198
        C 818 178, 788 210, 755 192
        C 722 175, 692 205, 658 188
        C 625 172, 598 200, 565 185
        C 532 170, 502 198, 468 182
        C 435 166, 408 195, 375 178
        C 342 162, 312 190, 278 175
        C 245 160, 218 185, 185 172
        C 152 158, 125 180, 92 168
        C 60 155, 32 175, 0 162`,
    width: 22,
    color: '#3A2818',
    opacity: 0.8,
    layer: 0,
  },

  // === MEDIUM ROOTS (layer 1) — weave between the thick ones ===

  // Root D: twists between A and B
  {
    d: `M 950 285
        C 912 272, 878 298, 842 278
        C 808 260, 775 292, 738 272
        C 702 252, 672 288, 635 268
        C 598 248, 568 282, 530 265
        C 495 248, 465 280, 428 262
        C 392 245, 358 278, 322 258
        C 288 240, 255 272, 218 255
        C 182 238, 152 268, 115 252
        C 80 238, 48 262, 12 248`,
    width: 16,
    color: '#5C3D28',
    opacity: 0.85,
    layer: 1,
  },
  // Root E: crosses over root A from below
  {
    d: `M 950 278
        C 922 290, 892 262, 862 280
        C 832 298, 800 265, 770 282
        C 738 300, 708 268, 678 285
        C 648 302, 618 270, 588 288
        C 558 305, 525 275, 495 290
        C 462 308, 432 278, 400 292
        C 368 308, 338 280, 308 295
        C 278 310, 248 282, 218 296
        C 188 310, 158 285, 128 298`,
    width: 14,
    color: '#6B4832',
    opacity: 0.82,
    layer: 1,
  },
  // Root F: wraps tightly around Root C up top
  {
    d: `M 950 218
        C 925 228, 898 205, 870 220
        C 842 235, 815 208, 788 222
        C 760 236, 732 212, 705 225
        C 678 238, 650 215, 622 228
        C 595 240, 568 218, 540 230
        C 512 242, 485 220, 458 232
        C 430 244, 402 222, 375 234
        C 348 245, 320 225, 292 236
        C 265 246, 238 228, 210 238`,
    width: 12,
    color: '#5A3625',
    opacity: 0.78,
    layer: 1,
  },
  // Root G: thin-medium connector between B and lower area
  {
    d: `M 950 338
        C 910 348, 875 328, 838 342
        C 800 356, 768 332, 732 348
        C 695 362, 662 338, 625 352
        C 588 366, 555 342, 518 356
        C 482 368, 448 345, 412 358
        C 375 370, 342 348, 305 362
        C 270 374, 238 352, 202 365`,
    width: 10,
    color: '#4E3520',
    opacity: 0.72,
    layer: 1,
  },

  // === THIN BRANCHING TENDRILS (layer 2) — grow out from main roots ===

  // Tendril 1: branches up from Root A
  {
    d: `M 688 252 C 675 235, 658 218, 640 205 C 622 192, 600 182, 575 178`,
    width: 7,
    color: '#6B4832',
    opacity: 0.65,
    layer: 2,
  },
  // Tendril 2: branches down from Root A
  {
    d: `M 505 245 C 495 265, 480 282, 462 295 C 445 308, 425 315, 400 318`,
    width: 6,
    color: '#5C3D28',
    opacity: 0.6,
    layer: 2,
  },
  // Tendril 3: branches up from Root B
  {
    d: `M 550 332 C 542 315, 528 298, 512 288 C 498 278, 478 272, 458 270`,
    width: 6,
    color: '#6B4832',
    opacity: 0.6,
    layer: 2,
  },
  // Tendril 4: long branch off Root C going up
  {
    d: `M 468 182 C 455 165, 438 150, 418 142 C 398 135, 375 132, 350 135 C 328 138, 308 128, 288 122`,
    width: 5,
    color: '#5A3625',
    opacity: 0.55,
    layer: 2,
  },
  // Tendril 5: drooping off Root B
  {
    d: `M 355 338 C 348 358, 335 375, 318 388 C 302 400, 282 408, 258 410`,
    width: 5,
    color: '#4E3520',
    opacity: 0.55,
    layer: 2,
  },
  // Tendril 6: tight curl off Root A
  {
    d: `M 318 240 C 308 225, 292 215, 275 212 C 258 210, 242 215, 228 225`,
    width: 5,
    color: '#6B4832',
    opacity: 0.5,
    layer: 2,
  },
  // Tendril 7: up from Root E
  {
    d: `M 400 292 C 392 275, 378 260, 360 252 C 342 245, 320 242, 298 245`,
    width: 5,
    color: '#5C3D28',
    opacity: 0.5,
    layer: 2,
  },

  // === HAIR ROOTS (layer 2) — tiny wisps ===

  {
    d: `M 640 205 C 630 192, 615 182, 598 178`,
    width: 3,
    color: '#7A5438',
    opacity: 0.45,
    layer: 2,
  },
  {
    d: `M 288 122 C 272 118, 255 120, 240 125`,
    width: 2.5,
    color: '#7A5438',
    opacity: 0.4,
    layer: 2,
  },
  {
    d: `M 258 410 C 242 415, 225 412, 210 408`,
    width: 2.5,
    color: '#6B4832',
    opacity: 0.4,
    layer: 2,
  },
  {
    d: `M 228 225 C 218 235, 212 248, 210 262`,
    width: 2.5,
    color: '#7A5438',
    opacity: 0.4,
    layer: 2,
  },
  {
    d: `M 575 178 C 560 172, 542 170, 525 175`,
    width: 2.5,
    color: '#6B4832',
    opacity: 0.38,
    layer: 2,
  },
  {
    d: `M 462 295 C 450 308, 435 318, 418 322`,
    width: 2.5,
    color: '#5C3D28',
    opacity: 0.38,
    layer: 2,
  },
  {
    d: `M 298 245 C 282 248, 268 255, 255 265`,
    width: 2,
    color: '#7A5438',
    opacity: 0.35,
    layer: 2,
  },
  {
    d: `M 202 365 C 185 372, 168 368, 152 362`,
    width: 3,
    color: '#5A3625',
    opacity: 0.4,
    layer: 2,
  },
  // Extra wispy hair roots
  {
    d: `M 128 298 C 108 305, 88 302, 68 296`,
    width: 2,
    color: '#6B4832',
    opacity: 0.35,
    layer: 2,
  },
  {
    d: `M 400 318 C 385 325, 368 322, 352 316`,
    width: 2,
    color: '#5C3D28',
    opacity: 0.3,
    layer: 2,
  },
];

function OakRootsSVG({ svgRef, className }: { svgRef: React.RefObject<SVGSVGElement | null>; className?: string }) {
  return (
    <svg
      ref={svgRef}
      viewBox="0 0 950 500"
      className={className}
      preserveAspectRatio="xMaxYMid meet"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Render back to front */}
      {roots
        .sort((a, b) => a.layer - b.layer)
        .map((root, i) => (
          <path
            key={i}
            d={root.d}
            className="root-path"
            data-layer={root.layer}
            stroke={root.color}
            strokeWidth={root.width}
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={root.opacity}
            fill="none"
          />
        ))}
    </svg>
  );
}

export function OakMissionSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useGSAP((gsap, ScrollTrigger) => {
    if (!sectionRef.current || !svgRef.current || !textRef.current) return;

    const allPaths = svgRef.current.querySelectorAll('.root-path');

    // Set up stroke-dashoffset for grow animation
    allPaths.forEach((path) => {
      const el = path as SVGPathElement;
      const length = el.getTotalLength();
      el.style.strokeDasharray = `${length}`;
      el.style.strokeDashoffset = `${length}`;
    });

    // Separate paths by layer for staggered growing
    const layer0 = svgRef.current.querySelectorAll('[data-layer="0"]');
    const layer1 = svgRef.current.querySelectorAll('[data-layer="1"]');
    const layer2 = svgRef.current.querySelectorAll('[data-layer="2"]');

    const textElements = textRef.current.querySelectorAll('.mission-text-item');

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=180%',
        pin: true,
        scrub: 0.8,
      },
    });

    // 0.0–0.20: Main thick roots GROW in (stroke-dashoffset → 0)
    layer0.forEach((path, i) => {
      tl.to(path, {
        strokeDashoffset: 0,
        duration: 0.18,
        ease: 'power2.out',
      }, 0.01 + i * 0.02);
    });

    // 0.10–0.30: Medium roots grow in (slightly delayed)
    layer1.forEach((path, i) => {
      tl.to(path, {
        strokeDashoffset: 0,
        duration: 0.15,
        ease: 'power2.out',
      }, 0.10 + i * 0.02);
    });

    // 0.18–0.38: Thin tendrils + hair roots sprout
    layer2.forEach((path, i) => {
      tl.to(path, {
        strokeDashoffset: 0,
        duration: 0.10,
        ease: 'power2.out',
      }, 0.18 + i * 0.012);
    });

    // 0.08–0.40: Text fades in as roots are growing
    textElements.forEach((el, i) => {
      tl.fromTo(el,
        { opacity: 0, x: -25 },
        { opacity: 1, x: 0, duration: 0.10, ease: 'power3.out' },
        0.08 + i * 0.06
      );
    });

    // 0.65–0.85: Roots SHRINK back (reverse grow — dashoffset returns)
    // Text fades out first
    tl.to(textRef.current,
      { opacity: 0, x: -20, duration: 0.10, ease: 'power2.in' },
      0.62
    );

    // Tendrils retract first, then medium, then thick
    layer2.forEach((path, i) => {
      const el = path as SVGPathElement;
      const length = el.getTotalLength();
      tl.to(path, {
        strokeDashoffset: length,
        duration: 0.08,
        ease: 'power2.in',
      }, 0.66 + i * 0.005);
    });
    layer1.forEach((path, i) => {
      const el = path as SVGPathElement;
      const length = el.getTotalLength();
      tl.to(path, {
        strokeDashoffset: length,
        duration: 0.10,
        ease: 'power2.in',
      }, 0.72 + i * 0.01);
    });
    layer0.forEach((path, i) => {
      const el = path as SVGPathElement;
      const length = el.getTotalLength();
      tl.to(path, {
        strokeDashoffset: length,
        duration: 0.12,
        ease: 'power2.in',
      }, 0.78 + i * 0.015);
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-[var(--bg-primary)] overflow-hidden"
    >
      <div className="absolute inset-0 flex items-center">
        {/* Text — left side */}
        <div ref={textRef} className="w-full lg:w-[45%] px-6 lg:pl-12 xl:pl-20 relative z-10">
          <span className="mission-text-item block font-[family-name:var(--font-accent)] text-sm tracking-[0.2em] uppercase text-[var(--accent-oak)] mb-4 opacity-0">
            Our Mission
          </span>
          <h2 className="mission-text-item font-[family-name:var(--font-display)] text-[var(--text-h1)] text-[var(--text-primary)] leading-tight mb-6 opacity-0">
            What&apos;s Our Mission?
          </h2>
          <p className="mission-text-item text-lg text-[var(--text-secondary)] leading-relaxed mb-4 max-w-lg opacity-0">
            To create a space where the hardest questions about faith aren&apos;t avoided — they&apos;re welcomed. Where Scripture is the foundation, not a prop. Where honesty matters more than polish.
          </p>
          <p className="mission-text-item text-lg text-[var(--text-secondary)] leading-relaxed max-w-lg opacity-0">
            Iron &amp; Oak exists to sharpen believers and invite skeptics into the same conversation — one that doesn&apos;t flinch.
          </p>
        </div>

        {/* Roots — right side, grows in via stroke animation */}
        <div className="absolute right-[-5%] top-1/2 -translate-y-1/2 w-[75%] lg:w-[62%] pointer-events-none">
          <OakRootsSVG svgRef={svgRef} className="w-full h-auto" />
        </div>
      </div>
    </section>
  );
}
