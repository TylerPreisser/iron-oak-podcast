'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { cn } from '@/lib/utils';

interface Ember {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  life: number;
  maxLife: number;
  rotation: number;
  rotationSpeed: number;
  stretch: number; // elongation for motion blur effect
  turbulencePhase: number;
  turbulenceSpeed: number;
  type: 'spark' | 'ember' | 'ash';
}

// Realistic heat color — white-hot core → orange → red → dark
function heatColor(life: number, maxLife: number): string {
  const t = life / maxLife; // 1 = fresh, 0 = dead
  if (t > 0.8) {
    // White-hot core
    const w = (t - 0.8) / 0.2;
    return `rgba(${255}, ${220 + w * 35}, ${180 + w * 75}, ${t})`;
  } else if (t > 0.5) {
    // Bright orange
    const w = (t - 0.5) / 0.3;
    return `rgba(255, ${140 + w * 80}, ${20 + w * 30}, ${t * 0.95})`;
  } else if (t > 0.2) {
    // Deep orange to red
    const w = (t - 0.2) / 0.3;
    return `rgba(${200 + w * 55}, ${60 + w * 80}, ${10 + w * 10}, ${t * 0.85})`;
  } else {
    // Dying red-brown
    return `rgba(${120 + t * 400}, ${20 + t * 200}, 5, ${t * 3})`;
  }
}

export function ForgeIntro() {
  const [visible, setVisible] = useState(false);
  const [textVisible, setTextVisible] = useState(false);
  const [fadingOut, setFadingOut] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const embersRef = useRef<Ember[]>([]);

  const dismiss = useCallback(() => {
    setFadingOut(true);
    setTimeout(() => setVisible(false), 500);
  }, []);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    setVisible(true);
    const textTimer = setTimeout(() => setTextVisible(true), 1000);
    const dismissTimer = setTimeout(() => dismiss(), 3500);
    return () => {
      clearTimeout(textTimer);
      clearTimeout(dismissTimer);
    };
  }, [dismiss]);

  // Skip on click/scroll
  useEffect(() => {
    if (!visible) return;
    const handler = () => dismiss();
    window.addEventListener('click', handler);
    window.addEventListener('wheel', handler, { passive: true });
    window.addEventListener('touchstart', handler, { passive: true });
    return () => {
      window.removeEventListener('click', handler);
      window.removeEventListener('wheel', handler);
      window.removeEventListener('touchstart', handler);
    };
  }, [visible, dismiss]);

  // Particle system
  useEffect(() => {
    if (!visible) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const spawnEmber = (scattered?: boolean): Ember => {
      const type = Math.random();
      const isSpark = type < 0.3;
      const isAsh = type > 0.85;

      // Embers rise from bottom-center area (like a forge)
      const centerX = canvas.width / 2;
      const spread = canvas.width * 0.4;

      return {
        x: centerX + (Math.random() - 0.5) * spread,
        y: scattered ? Math.random() * canvas.height : canvas.height + Math.random() * 40,
        // Sparks move faster and more erratically
        vx: (Math.random() - 0.5) * (isSpark ? 3 : 1.2),
        vy: isSpark
          ? -(3 + Math.random() * 5)    // sparks: fast upward
          : -(0.5 + Math.random() * 2), // embers: slow float
        size: isSpark
          ? 0.5 + Math.random() * 1.5   // sparks: tiny
          : isAsh
            ? 1 + Math.random() * 2.5   // ash: medium
            : 1 + Math.random() * 2,    // embers: small-medium
        life: 1,
        maxLife: isSpark
          ? 0.4 + Math.random() * 0.6   // sparks burn out fast
          : 0.8 + Math.random() * 1.2,  // embers linger
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.1,
        stretch: isSpark ? 1.5 + Math.random() * 2 : 1, // sparks elongate
        turbulencePhase: Math.random() * Math.PI * 2,
        turbulenceSpeed: 0.02 + Math.random() * 0.04,
        type: isSpark ? 'spark' : isAsh ? 'ash' : 'ember',
      };
    };

    // Init — scattered across screen
    embersRef.current = Array.from({ length: 250 }, () => spawnEmber(true));

    let time = 0;

    const draw = () => {
      // Slight motion blur effect — semi-transparent clear
      ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      time += 1;

      embersRef.current.forEach((ember, i) => {
        // Turbulence — realistic air current wobble
        const turbX = Math.sin(ember.turbulencePhase + time * ember.turbulenceSpeed) * 0.8;
        const turbY = Math.cos(ember.turbulencePhase * 1.3 + time * ember.turbulenceSpeed * 0.7) * 0.3;

        ember.x += ember.vx + turbX;
        ember.y += ember.vy + turbY;

        // Sparks decelerate due to air resistance
        if (ember.type === 'spark') {
          ember.vx *= 0.995;
          ember.vy *= 0.99;
          // Slight gravity pull on sparks
          ember.vy += 0.01;
        } else {
          // Embers: very slight updraft acceleration then slowdown
          ember.vy *= 0.999;
          ember.vx *= 0.998;
        }

        ember.rotation += ember.rotationSpeed;

        // Life decay
        const decayRate = ember.type === 'spark' ? 0.025 : 0.008;
        ember.life -= decayRate;

        // Respawn dead or off-screen
        if (ember.life <= 0 || ember.y < -30 || ember.x < -50 || ember.x > canvas.width + 50) {
          embersRef.current[i] = spawnEmber(false);
          return;
        }

        const t = ember.life / ember.maxLife;
        const color = heatColor(ember.life, ember.maxLife);

        ctx.save();
        ctx.translate(ember.x, ember.y);
        ctx.rotate(ember.rotation);

        if (ember.type === 'spark') {
          // Sparks: elongated streaks (motion blur)
          ctx.beginPath();
          ctx.ellipse(0, 0, ember.size * 0.4, ember.size * ember.stretch, 0, 0, Math.PI * 2);
          ctx.fillStyle = color;
          ctx.fill();

          // Hot core
          ctx.beginPath();
          ctx.arc(0, 0, ember.size * 0.3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 220, ${t * 0.6})`;
          ctx.fill();
        } else if (ember.type === 'ash') {
          // Ash: irregular flickering shape
          ctx.beginPath();
          ctx.ellipse(0, 0, ember.size, ember.size * 0.6, 0, 0, Math.PI * 2);
          ctx.fillStyle = color;
          ctx.globalAlpha = t * 0.6 * (0.7 + Math.sin(time * 0.1 + ember.turbulencePhase) * 0.3);
          ctx.fill();
          ctx.globalAlpha = 1;
        } else {
          // Embers: round glowing dots
          // Outer glow
          const glowRadius = ember.size * 4;
          const glow = ctx.createRadialGradient(0, 0, 0, 0, 0, glowRadius);
          glow.addColorStop(0, `rgba(255, ${120 + t * 100}, ${20 + t * 30}, ${t * 0.2})`);
          glow.addColorStop(1, 'rgba(255, 80, 0, 0)');
          ctx.beginPath();
          ctx.arc(0, 0, glowRadius, 0, Math.PI * 2);
          ctx.fillStyle = glow;
          ctx.fill();

          // Core
          ctx.beginPath();
          ctx.arc(0, 0, ember.size, 0, Math.PI * 2);
          ctx.fillStyle = color;
          ctx.fill();

          // White-hot center flicker
          if (t > 0.6) {
            const flicker = 0.3 + Math.sin(time * 0.3 + ember.turbulencePhase) * 0.3;
            ctx.beginPath();
            ctx.arc(0, 0, ember.size * 0.4, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 240, ${flicker * t})`;
            ctx.fill();
          }
        }

        ctx.restore();
      });

      // Subtle ambient glow at bottom (forge light source)
      const forgeGlow = ctx.createRadialGradient(
        canvas.width / 2, canvas.height + 50, 0,
        canvas.width / 2, canvas.height + 50, canvas.height * 0.6
      );
      forgeGlow.addColorStop(0, 'rgba(196, 100, 30, 0.08)');
      forgeGlow.addColorStop(0.5, 'rgba(160, 60, 10, 0.03)');
      forgeGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = forgeGlow;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [visible]);

  // Lock body scroll
  useEffect(() => {
    if (visible && !fadingOut) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [visible, fadingOut]);

  if (!visible) return null;

  return (
    <div
      className={cn(
        'fixed inset-0 z-[9999] bg-black flex items-center justify-center transition-opacity duration-500',
        fadingOut ? 'opacity-0' : 'opacity-100'
      )}
    >
      <canvas ref={canvasRef} className="absolute inset-0" />

      {/* Text */}
      <div
        className={cn(
          'relative z-10 text-center transition-all duration-1000',
          textVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        )}
      >
        <h1 className="font-[family-name:var(--font-display)] text-5xl md:text-7xl lg:text-8xl font-bold tracking-wider">
          <span className="text-[var(--accent-iron-light)]">IRON</span>
          <span className="text-[var(--accent-oak)] mx-3">&amp;</span>
          <span className="text-[var(--accent-oak-light)]">OAK</span>
        </h1>
      </div>

      {/* Skip hint */}
      <p className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs text-white/30 tracking-wider">
        Click to skip
      </p>
    </div>
  );
}
