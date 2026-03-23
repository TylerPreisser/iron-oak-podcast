'use client';

import { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface GradientBackgroundProps {
  className?: string;
}

interface Blob {
  x: number;
  y: number;
  radius: number;
  color: string;
  speedX: number;
  speedY: number;
  phase: number;
}

export function GradientBackground({ className }: GradientBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const visibleRef = useRef(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Check reduced motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Size canvas
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (!rect) return;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener('resize', resize);

    // Define blobs
    const blobs: Blob[] = [
      { x: 0.3, y: 0.3, radius: 0.4, color: 'rgba(196, 132, 62, 0.3)', speedX: 0.0003, speedY: 0.0002, phase: 0 },
      { x: 0.7, y: 0.5, radius: 0.35, color: 'rgba(138, 155, 174, 0.25)', speedX: 0.0002, speedY: 0.0003, phase: Math.PI / 3 },
      { x: 0.5, y: 0.7, radius: 0.3, color: 'rgba(139, 105, 20, 0.2)', speedX: 0.00025, speedY: 0.00015, phase: Math.PI / 2 },
      { x: 0.2, y: 0.6, radius: 0.35, color: 'rgba(42, 31, 20, 0.35)', speedX: 0.00015, speedY: 0.00025, phase: Math.PI },
    ];

    let time = 0;

    // Intersection Observer
    const observer = new IntersectionObserver(
      ([entry]) => { visibleRef.current = entry.isIntersecting; },
      { threshold: 0 }
    );
    observer.observe(canvas);

    const draw = () => {
      if (!visibleRef.current || prefersReduced) {
        rafRef.current = requestAnimationFrame(draw);
        return;
      }

      const w = canvas.width / (Math.min(window.devicePixelRatio, 2));
      const h = canvas.height / (Math.min(window.devicePixelRatio, 2));

      ctx.clearRect(0, 0, w, h);

      // Dark base
      ctx.fillStyle = '#0F1114';
      ctx.fillRect(0, 0, w, h);

      // Draw blobs
      blobs.forEach((blob) => {
        const bx = w * (blob.x + Math.sin(time * blob.speedX * 1000 + blob.phase) * 0.15);
        const by = h * (blob.y + Math.cos(time * blob.speedY * 1000 + blob.phase) * 0.1);
        const br = Math.max(w, h) * blob.radius;

        const gradient = ctx.createRadialGradient(bx, by, 0, bx, by, br);
        gradient.addColorStop(0, blob.color);
        gradient.addColorStop(1, 'transparent');

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, w, h);
      });

      time += 1;
      rafRef.current = requestAnimationFrame(draw);
    };

    // If reduced motion, draw once statically
    if (prefersReduced) {
      time = 0;
      visibleRef.current = true;
      const w = canvas.width / (Math.min(window.devicePixelRatio, 2));
      const h = canvas.height / (Math.min(window.devicePixelRatio, 2));
      ctx.fillStyle = '#0F1114';
      ctx.fillRect(0, 0, w, h);
      blobs.forEach((blob) => {
        const bx = w * blob.x;
        const by = h * blob.y;
        const br = Math.max(w, h) * blob.radius;
        const gradient = ctx.createRadialGradient(bx, by, 0, bx, by, br);
        gradient.addColorStop(0, blob.color);
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, w, h);
      });
    } else {
      rafRef.current = requestAnimationFrame(draw);
    }

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={cn('absolute inset-0 w-full h-full', className)}
      aria-hidden="true"
    />
  );
}
