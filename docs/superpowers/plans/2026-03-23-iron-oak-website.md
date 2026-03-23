# Iron & Oak Podcast Website — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build an Awwwards-level podcast website for The Iron & Oak Podcast — a faith-forward show hosted by Tyler Preisser and Lincoln Myers — with immersive scroll-driven storytelling, cinematic animations, and deep-linked question architecture for 100+ real faith questions across 12 episodes.

**Architecture:** Next.js 14+ (App Router, TypeScript, deployed to Vercel free tier with automatic SSR). GSAP + ScrollTrigger for scroll-driven animations, Lenis for smooth scrolling, Framer Motion for page transitions. Content lives in typed TypeScript data files (no CMS). Dark mode is default. The iron/oak duality (industrial meets organic, hard meets warm) drives every visual decision.

**Tech Stack:** Next.js 14+ (App Router), TypeScript, Tailwind CSS v4, GSAP (ScrollTrigger, SplitText, ScrollSmoother), Lenis, Framer Motion, lite-youtube-embed, Vercel deployment

**Source Spec:** `/Users/tylerpreisser/Downloads/iron-oak-claude-code-prompt.md` (the complete 1000-line build spec — ALL content data, design tokens, animation philosophy, page specs, and episode data live in this file)

---

## File Structure

```
iron-oak-podcast/
├── CLAUDE.md                          # Project memory (updated every commit)
├── PLAN.md                            # Master execution plan with status tracking
├── TASKS.md                           # Active task queue
├── KNOWLEDGE.md                       # Learning log (failures, discoveries, patterns)
├── docs/
│   ├── research/
│   │   ├── unseen-studio-breakdown.md
│   │   ├── stripe-homepage-breakdown.md
│   │   ├── virgin-galactic-breakdown.md
│   │   ├── airbnb-ux-breakdown.md
│   │   └── technical-implementation-guide.md
│   └── superpowers/plans/             # This plan lives here
├── public/
│   ├── fonts/                         # Self-hosted font files (if needed)
│   ├── images/
│   │   ├── logo-full.svg              # Full Iron & Oak logo
│   │   ├── logo-simple.svg            # Nav/footer simple logo
│   │   ├── textures/
│   │   │   ├── iron-texture.webp      # Brushed metal texture (subtle)
│   │   │   └── oak-texture.webp       # Wood grain texture (subtle)
│   │   ├── hosts/
│   │   │   ├── tyler-placeholder.webp
│   │   │   └── lincoln-placeholder.webp
│   │   └── episodes/                  # Episode thumbnails
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── layout.tsx                 # Root layout: providers, nav, footer, fonts, meta
│   │   ├── page.tsx                   # Home page (assembles 7 sections)
│   │   ├── globals.css                # Global styles, CSS variables, design tokens
│   │   ├── not-found.tsx              # Custom 404
│   │   ├── episodes/
│   │   │   ├── page.tsx               # Episodes listing with filter/search
│   │   │   └── [slug]/
│   │   │       └── page.tsx           # Individual episode page
│   │   ├── series/
│   │   │   ├── page.tsx               # Series overview
│   │   │   └── [slug]/
│   │   │       └── page.tsx           # Series detail with oak tree/timeline
│   │   ├── questions/
│   │   │   ├── page.tsx               # All questions browsable
│   │   │   └── [slug]/
│   │   │       └── page.tsx           # Individual question page
│   │   ├── about/
│   │   │   └── page.tsx               # About + host bios
│   │   ├── subscribe/
│   │   │   └── page.tsx               # Newsletter signup dedicated page
│   │   ├── contact/
│   │   │   └── page.tsx               # Contact form + social
│   │   ├── merch/
│   │   │   └── page.tsx               # Coming Soon placeholder
│   │   └── resources/
│   │       └── page.tsx               # Coming Soon placeholder
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navigation.tsx         # Sticky nav, glass-morphism, responsive
│   │   │   ├── Footer.tsx             # Footer with gradient border
│   │   │   ├── MobileMenu.tsx         # Full-screen overlay menu
│   │   │   └── PageTransition.tsx     # Framer Motion AnimatePresence wrapper
│   │   ├── ui/
│   │   │   ├── Button.tsx             # Primary/secondary/ghost variants
│   │   │   ├── ThemeToggle.tsx        # Dark/light mode switch
│   │   │   ├── CustomCursor.tsx       # Unseen-style cursor (desktop only)
│   │   │   ├── ScrollReveal.tsx       # Reusable scroll-triggered reveal wrapper
│   │   │   ├── TextReveal.tsx         # Line-by-line text animation
│   │   │   ├── MagneticElement.tsx    # Magnetic hover effect wrapper
│   │   │   ├── EpisodeCard.tsx        # Shared episode card component
│   │   │   ├── IronSparks.tsx         # Spark particle burst on click
│   │   │   └── ScriptureChisel.tsx    # Letter-by-letter verse reveal
│   │   ├── home/
│   │   │   ├── HeroSection.tsx        # Animated gradient + logo + tagline
│   │   │   ├── ConceptSection.tsx     # Sticky scroll + text reveal
│   │   │   ├── FeaturedSeries.tsx     # Horizontal scroll episode cards
│   │   │   ├── HostsSection.tsx       # Split-screen Tyler/Lincoln
│   │   │   ├── QuestionsCloud.tsx     # Floating interactive questions
│   │   │   └── SubscribeSection.tsx   # Newsletter + platform icons
│   │   ├── series/
│   │   │   └── OakTreeTimeline.tsx    # Animated SVG tree/timeline for series
│   │   └── effects/
│   │       ├── GradientBackground.tsx # Animated mesh gradient canvas
│   │       ├── EmberParticles.tsx     # Ember particle system (forge intro)
│   │       ├── ForgeIntro.tsx         # Full forge intro sequence
│   │       └── BackgroundTransition.tsx # Iron→oak scroll texture crossfade
│   ├── data/
│   │   ├── episodes.ts               # All 12 episodes with questions, talk tracks
│   │   ├── series.ts                  # Series data with phases
│   │   ├── hosts.ts                   # Host bios and metadata
│   │   ├── questions.ts              # All 100+ questions as addressable entities
│   │   └── navigation.ts             # Nav links and structure
│   ├── hooks/
│   │   ├── useGSAP.ts                # GSAP registration + cleanup hook
│   │   ├── useLenis.ts               # Lenis instance hook
│   │   ├── useTheme.ts               # Theme state management
│   │   ├── useMagnetic.ts            # Magnetic element logic
│   │   ├── useCustomCursor.ts        # Cursor tracking logic
│   │   └── useMediaQuery.ts          # Responsive breakpoint hook
│   ├── lib/
│   │   ├── gsap-register.ts          # GSAP plugin registration (client-side only)
│   │   ├── utils.ts                  # cn(), slugify(), etc.
│   │   └── constants.ts              # Animation durations, breakpoints, etc.
│   ├── providers/
│   │   ├── SmoothScrollProvider.tsx   # Lenis context provider
│   │   ├── ThemeProvider.tsx          # Dark/light mode context
│   │   └── CursorProvider.tsx         # Custom cursor context
│   └── types/
│       └── index.ts                   # Episode, Series, Host, Question interfaces
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── .gitignore
```

---

## Phase 0: Research & Discovery

### Task 0.1: Research Unseen Studio

**Context:** Unseen Studio (unseen.co) is the primary design reference. We need to understand their technical approach to: custom cursor, smooth scroll, page transitions, WebGL, splash screen. This research informs our implementation decisions.

**Files:**
- Create: `docs/research/unseen-studio-breakdown.md`

- [ ] **Step 1: Research Unseen Studio's technical implementation**

Use internet-investigator agent to research unseen.co:
- What framework (Nuxt, Next, custom)?
- Custom cursor implementation (DOM tracking, GSAP lerp, context-aware scaling)
- Page transition approach
- Smooth scroll library (Lenis, Locomotive, custom)
- WebGL world (Three.js, OGL, custom shaders)
- "Enter with/without audio" gate pattern
- Splash/loading screen approach
- Inspect JavaScript bundles, identify every library

Save findings to `docs/research/unseen-studio-breakdown.md`.

### Task 0.2: Research Stripe Homepage

**Files:**
- Create: `docs/research/stripe-homepage-breakdown.md`

- [ ] **Step 1: Research Stripe's homepage technical approach**

Use internet-investigator agent to research stripe.com:
- Mesh gradient animation — find open-source replications (stripe-gradient, wave-gradient repos on GitHub)
- Mega-menu navigation structure
- Scroll-triggered product demos
- Animation library used
- "Telling animations" that explain without words
- What makes their copy scannable

Save findings to `docs/research/stripe-homepage-breakdown.md`.

### Task 0.3: Research Virgin Galactic

**Files:**
- Create: `docs/research/virgin-galactic-breakdown.md`

- [ ] **Step 1: Research Virgin Galactic's cinematic web approach**

Use internet-investigator agent to research virgingalactic.com:
- Full-viewport hero approach
- Video integration (background video, autoplay, performance)
- Large media asset handling without killing page load
- Typography choices and scale
- How they create a "premium" browser feeling

Save findings to `docs/research/virgin-galactic-breakdown.md`.

### Task 0.4: Research Airbnb UX

**Files:**
- Create: `docs/research/airbnb-ux-breakdown.md`

- [ ] **Step 1: Research Airbnb's warmth and filter UX**

Use internet-investigator agent to research airbnb.com:
- Search/filter pattern (applicable to episode/question browsing)
- How they make a tech platform feel human and inviting
- Responsive design approach across breakpoints
- Image-heavy layout performance

Save findings to `docs/research/airbnb-ux-breakdown.md`.

### Task 0.5: Synthesize Technical Implementation Guide

**Files:**
- Create: `docs/research/technical-implementation-guide.md`

- [ ] **Step 1: Read all four research documents**

Read `unseen-studio-breakdown.md`, `stripe-homepage-breakdown.md`, `virgin-galactic-breakdown.md`, `airbnb-ux-breakdown.md`.

- [ ] **Step 2: Write synthesis document**

Cross-reference research with Iron & Oak design goals. Answer:
- Which specific techniques from each reference site will we use?
- Which libraries?
- Which patterns?
- What is achievable within Next.js + GSAP + Lenis stack?
- What requires custom implementation?
- What do we skip?

Save to `docs/research/technical-implementation-guide.md`. This becomes the single source of truth for all technical decisions.

---

## Phase 0B: Project Initialization

### Task 0.6: Initialize Next.js Project

**Files:**
- Create: entire project scaffold

- [ ] **Step 1: Initialize Next.js with TypeScript + Tailwind + App Router**

```bash
cd /Users/tylerpreisser/Desktop/iron-oak-podcast
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm
```

Answer prompts: Yes to all defaults.

- [ ] **Step 2: Verify project runs**

```bash
npm run dev
```

Expected: Next.js dev server starts on localhost:3000.

- [ ] **Step 3: Install dependencies**

```bash
npm install gsap lenis framer-motion lite-youtube-embed
npm install -D @types/node
```

Note: GSAP's SplitText and ScrollSmoother are Club plugins. Start with ScrollTrigger (free) and basic text animations. If Club access is needed, document in KNOWLEDGE.md and use alternatives.

- [ ] **Step 4: Verify dependencies installed**

```bash
npm ls gsap lenis framer-motion lite-youtube-embed
```

Expected: All packages listed without errors.

### Task 0.7: Initialize Git + GitHub

**Files:**
- Modify: `.gitignore`

- [ ] **Step 1: Initialize git repo**

```bash
cd /Users/tylerpreisser/Desktop/iron-oak-podcast
git init
```

- [ ] **Step 2: Create GitHub repo and push**

```bash
gh repo create iron-oak-podcast --public --source=. --push
```

- [ ] **Step 3: Verify GitHub remote**

```bash
git remote -v
```

Expected: origin pointing to GitHub.

### Task 0.8: Create Persistent Memory Files

**Files:**
- Create: `CLAUDE.md`
- Create: `PLAN.md`
- Create: `TASKS.md`
- Create: `KNOWLEDGE.md`

- [ ] **Step 1: Create CLAUDE.md**

```markdown
# CLAUDE.md — Iron & Oak Podcast Website

## Project Overview
The Iron & Oak Podcast website — a faith-forward podcast by Tyler Preisser and Lincoln Myers. Pre-launch site with placeholder content, Awwwards-level design. Next.js 14+ (App Router, TS), Tailwind v4, GSAP, Lenis, Framer Motion. Deploys to Vercel.

## Current Phase
Phase 0B: Project Initialization

## Last Completed Task
Task 0.7: Git + GitHub initialized

## Next Task
Task 0.9: Design system configuration

## Architecture Decisions Made
- Next.js App Router (not Pages) for modern routing and layouts
- GSAP for scroll-driven animations (ScrollTrigger is free, SplitText is Club)
- Lenis for smooth scroll (over Locomotive — lighter, better GSAP integration)
- Framer Motion for page transitions (complements GSAP, doesn't replace it)
- TypeScript data files for content (no CMS — pre-launch site)
- Dark mode as default (matches brand — iron/oak duality)

## Known Issues
- GSAP SplitText is a Club plugin — may need alternative for text splitting
- No real host photos yet — using placeholders

## Agent Notes
- internet-investigator: Used for Phase 0 research (5 documents)
- web-code-debug: Primary build agent for all components
- web-code-executor: Verification after every significant change

## File Map (Key Files)
- `src/app/layout.tsx` — Root layout (providers, nav, footer)
- `src/app/page.tsx` — Home page (7 sections)
- `src/app/globals.css` — Design tokens + global styles
- `src/data/` — All content data (episodes, series, hosts, questions)
- `src/components/` — All UI components
- `src/hooks/` — Custom React hooks
- `src/providers/` — Context providers (scroll, theme, cursor)
```

- [ ] **Step 2: Create PLAN.md**

Initialize from the phase-by-phase execution plan in the source spec. All tasks listed with `- [ ]` checkboxes. (Copy the structure from source spec lines 823-938.)

- [ ] **Step 3: Create TASKS.md**

```markdown
# TASKS.md — Active Task Queue

## In Progress
- [ ] Building: Design system configuration (Tailwind, fonts, CSS variables)
  - Assigned to: web-code-debug
  - Blocked by: nothing

## Up Next (Priority Order)
1. Global styles + design tokens
2. SmoothScroll provider (Lenis)
3. ThemeToggle component
4. CustomCursor component
5. Navigation component

## Blocked
- [None currently]

## Recently Completed
- [x] Project initialized — Next.js + TS + Tailwind + dependencies
- [x] GitHub repo created and pushed
- [x] Research documents completed (5 docs in /docs/research/)
```

- [ ] **Step 4: Create KNOWLEDGE.md**

```markdown
# KNOWLEDGE.md — What Works & What Doesn't

## Technical Discoveries
(Populated during build)

## What Didn't Work (and Why)
(Populated during build)

## What Worked Well
(Populated during build)

## Subagent Learnings
(Populated during build)

## Patterns & Snippets
(Populated during build)
```

- [ ] **Step 5: Commit scaffold**

```bash
git add .
git commit -m "feat(scaffold): initialize project with Next.js, dependencies, and memory files"
```

### Task 0.9: Configure Design System

**Files:**
- Modify: `src/app/globals.css`
- Modify: `tailwind.config.ts`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Set up CSS variables in globals.css**

Add the full color palette from the spec (dark mode as `:root` default, light mode in `[data-theme="light"]`), typography scale, spacing, border radius, shadows. All values are defined in the source spec lines 246-334.

Key variables:
```css
:root {
  /* Background */
  --bg-primary: #0F1114;
  --bg-secondary: #1A1D23;
  --bg-tertiary: #242830;
  --bg-accent-surface: #2A1F14;
  /* Text */
  --text-primary: #F2EDE8;
  --text-secondary: #9CA3AF;
  --text-tertiary: #6B7280;
  /* Accents */
  --accent-iron: #8A9BAE;
  --accent-iron-light: #B8C5D4;
  --accent-oak: #C4843E;
  --accent-oak-light: #D4A054;
  --accent-oak-glow: rgba(196, 132, 62, 0.15);
  /* Borders */
  --border-default: #2A2E36;
  --border-hover: #3A3F4A;
  /* Gradients */
  --gradient-warm: linear-gradient(135deg, #C4843E 0%, #8A5A2B 100%);
  --gradient-iron: linear-gradient(135deg, #8A9BAE 0%, #5A6B7E 100%);
  /* Typography */
  --text-hero: clamp(3rem, 8vw, 7rem);
  --text-h1: clamp(2.25rem, 5vw, 4rem);
  --text-h2: clamp(1.75rem, 3.5vw, 2.5rem);
  --text-h3: clamp(1.25rem, 2vw, 1.75rem);
  --text-body: clamp(1rem, 1.1vw, 1.125rem);
  /* Spacing */
  --section-padding: clamp(4rem, 10vh, 8rem);
  --container-max: 1280px;
  --container-wide: 1440px;
  /* Radius */
  --radius-sm: 0.375rem;
  --radius-md: 0.75rem;
  --radius-lg: 1.25rem;
  --radius-xl: 2rem;
  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.3);
  --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.4);
  --shadow-lg: 0 12px 40px rgba(0, 0, 0, 0.5);
  --shadow-glow: 0 0 40px rgba(196, 132, 62, 0.12);
}

[data-theme="light"] {
  --bg-primary: #FAF8F5;
  --bg-secondary: #F0ECE6;
  --bg-tertiary: #FFFFFF;
  --bg-accent-surface: #FDF6EE;
  --text-primary: #1A1D23;
  --text-secondary: #4B5563;
  --text-tertiary: #9CA3AF;
  --accent-iron: #5A6B7E;
  --accent-oak: #B5742E;
  --border-default: #E5E1DB;
}
```

- [ ] **Step 2: Configure Tailwind to use CSS variables**

Extend `tailwind.config.ts` to map CSS variables to Tailwind utilities (colors, fonts, spacing, etc.).

- [ ] **Step 3: Load Google Fonts in layout.tsx**

Use Next.js `next/font/google` to load Playfair Display (400, 700, 900, italic 400), DM Sans (400, 500, 700), and JetBrains Mono (400, 500). Apply font variables to `<html>`.

- [ ] **Step 4: Verify design system renders**

Create a temporary test page with sample typography, colors, and spacing to verify tokens work in both dark and light modes.

```bash
npm run dev
```

- [ ] **Step 5: Commit design system**

```bash
git add src/app/globals.css tailwind.config.ts src/app/layout.tsx
git commit -m "feat(design): configure full design system with tokens, fonts, and Tailwind"
```

---

## Phase 1: Core Infrastructure

### Task 1.1: TypeScript Types + Utility Functions

**Files:**
- Create: `src/types/index.ts`
- Create: `src/lib/utils.ts`
- Create: `src/lib/constants.ts`

- [ ] **Step 1: Define TypeScript interfaces**

```typescript
// src/types/index.ts
export interface Episode {
  number: number;
  slug: string;
  title: string;
  subtitle: string;
  seriesSlug: string;
  phaseNumber: number;
  phaseTitle: string;
  description: string;
  questions: Question[];
  talkTrack: string;
  youtubeVideoId: string | null;
  spotifyUrl: string | null;
  applePodcastsUrl: string | null;
  scriptureReferences: string[];
  externalResources: { title: string; url: string }[];
  publishedDate: string | null;
  duration: string | null;
  thumbnailUrl: string | null;
}

export interface Series {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  episodeCount: number;
  phases: Phase[];
  seasonNumber: number;
}

export interface Phase {
  number: number;
  title: string;
  episodeSlugs: string[];
}

export interface Host {
  name: string;
  role: string;
  bio: string;
  shortBio: string;
  businessName: string;
  businessUrl: string;
  location: string;
  imageUrl: string | null;
  socialLinks: { platform: string; url: string }[];
}

export interface Question {
  text: string;
  slug: string;
  episodeSlug: string;
  episodeNumber: number;
  episodeTitle: string;
  phaseNumber: number;
  phaseTitle: string;
  youtubeTimestamp: string | null;
}
```

- [ ] **Step 2: Create utility functions**

```typescript
// src/lib/utils.ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 80);
}
```

Install clsx + tailwind-merge: `npm install clsx tailwind-merge`

- [ ] **Step 3: Create constants**

```typescript
// src/lib/constants.ts
export const ANIMATION = {
  duration: { fast: 0.3, normal: 0.6, slow: 1.2 },
  ease: { out: "power3.out", inOut: "power2.inOut" },
  stagger: { fast: 0.05, normal: 0.1, slow: 0.15 },
} as const;

export const BREAKPOINTS = {
  sm: 640, md: 768, lg: 1024, xl: 1280, "2xl": 1536,
} as const;
```

- [ ] **Step 4: Commit**

```bash
git add src/types/ src/lib/
git commit -m "feat(core): add TypeScript interfaces, utilities, and constants"
```

### Task 1.2: Content Data Layer

**Files:**
- Create: `src/data/hosts.ts`
- Create: `src/data/episodes.ts`
- Create: `src/data/series.ts`
- Create: `src/data/questions.ts`
- Create: `src/data/navigation.ts`

- [ ] **Step 1: Create hosts data**

Populate with Tyler Preisser and Lincoln Myers data from source spec lines 632-635. Include full bios, roles, business info, locations.

- [ ] **Step 2: Create episodes data**

Populate all 12 episodes from source spec lines 643-820. Each episode includes: number, slug, title, subtitle, phase, questions array (with slugified slugs), talk track notes. YouTube IDs are null (pre-launch).

This is the most data-heavy file. All 100+ questions from the spec must be included, each with a `slug` generated by `slugify()`.

- [ ] **Step 3: Create series data**

Populate "Foundations of the Faith" series with 5 phases, each referencing its episode slugs.

- [ ] **Step 4: Create questions data**

Generate a flat array of all Question objects extracted from episodes data. Each question gets its own slug for deep-linking.

- [ ] **Step 5: Create navigation data**

```typescript
export const navLinks = [
  { label: "Episodes", href: "/episodes" },
  { label: "Series", href: "/series" },
  { label: "Questions", href: "/questions" },
  { label: "About", href: "/about" },
];
```

- [ ] **Step 6: Commit**

```bash
git add src/data/
git commit -m "feat(data): add complete content data layer with 12 episodes, 100+ questions, hosts, series"
```

### Task 1.3: GSAP Registration Hook

**Files:**
- Create: `src/lib/gsap-register.ts`
- Create: `src/hooks/useGSAP.ts`

- [ ] **Step 1: Create GSAP plugin registration**

```typescript
// src/lib/gsap-register.ts
"use client";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };
```

- [ ] **Step 2: Create useGSAP hook with cleanup**

```typescript
// src/hooks/useGSAP.ts
"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap-register";

export function useGSAP(callback: (ctx: gsap.Context) => void, deps: unknown[] = []) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => callback(ctx), ref.current);
    return () => ctx.revert();
  }, deps);

  return ref;
}
```

- [ ] **Step 3: Commit**

```bash
git add src/lib/gsap-register.ts src/hooks/useGSAP.ts
git commit -m "feat(core): add GSAP registration and cleanup hook"
```

### Task 1.4: Lenis Smooth Scroll Provider

**Files:**
- Create: `src/providers/SmoothScrollProvider.tsx`
- Create: `src/hooks/useLenis.ts`

- [ ] **Step 1: Create SmoothScrollProvider**

```typescript
// src/providers/SmoothScrollProvider.tsx
"use client";
import { createContext, useContext, useEffect, useRef, ReactNode } from "react";
import Lenis from "lenis";
import { ScrollTrigger } from "@/lib/gsap-register";

const LenisContext = createContext<Lenis | null>(null);

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return (
    <LenisContext.Provider value={lenisRef.current}>
      {children}
    </LenisContext.Provider>
  );
}

export function useLenisContext() {
  return useContext(LenisContext);
}
```

- [ ] **Step 2: Create useLenis hook**

```typescript
// src/hooks/useLenis.ts
"use client";
export { useLenisContext as useLenis } from "@/providers/SmoothScrollProvider";
```

- [ ] **Step 3: Commit**

```bash
git add src/providers/SmoothScrollProvider.tsx src/hooks/useLenis.ts
git commit -m "feat(core): add Lenis smooth scroll provider with GSAP ScrollTrigger sync"
```

### Task 1.5: Theme Provider + ThemeToggle

**Files:**
- Create: `src/providers/ThemeProvider.tsx`
- Create: `src/hooks/useTheme.ts`
- Create: `src/components/ui/ThemeToggle.tsx`

- [ ] **Step 1: Create ThemeProvider**

Uses `data-theme` attribute on `<html>`. Reads from localStorage, defaults to "dark". Provides toggle function.

- [ ] **Step 2: Create ThemeToggle component**

Sun/moon icon toggle. Animated icon transition (rotation + opacity swap). Accessible: `aria-label`, keyboard navigable.

- [ ] **Step 3: Verify both themes render correctly**

```bash
npm run dev
```

Toggle between dark and light. Verify CSS variables swap.

- [ ] **Step 4: Commit**

```bash
git add src/providers/ThemeProvider.tsx src/hooks/useTheme.ts src/components/ui/ThemeToggle.tsx
git commit -m "feat(core): add theme provider with dark/light toggle"
```

### Task 1.6: Custom Cursor

**Files:**
- Create: `src/providers/CursorProvider.tsx`
- Create: `src/components/ui/CustomCursor.tsx`
- Create: `src/hooks/useCustomCursor.ts`
- Create: `src/hooks/useMediaQuery.ts`

- [ ] **Step 1: Create useMediaQuery hook**

```typescript
// src/hooks/useMediaQuery.ts
"use client";
import { useState, useEffect } from "react";

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia(query);
    setMatches(mql.matches);
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, [query]);
  return matches;
}
```

- [ ] **Step 2: Create CustomCursor**

Small dot (8px) that tracks mouse with GSAP lerp (not direct position — creates buttery trailing effect). Scales up on hover over interactive elements (`a`, `button`, `[data-cursor="pointer"]`). Desktop only — hidden on touch devices. Uses `pointer-events: none` and `position: fixed`.

- [ ] **Step 3: Create CursorProvider**

Context provider that lets child components set cursor state (default, pointer, hidden).

- [ ] **Step 4: Verify cursor works on desktop, hidden on mobile**

```bash
npm run dev
```

- [ ] **Step 5: Commit**

```bash
git add src/providers/CursorProvider.tsx src/components/ui/CustomCursor.tsx src/hooks/useCustomCursor.ts src/hooks/useMediaQuery.ts
git commit -m "feat(core): add Unseen-style custom cursor with GSAP lerp tracking"
```

### Task 1.7: Navigation Component

**Files:**
- Create: `src/components/layout/Navigation.tsx`
- Create: `src/components/layout/MobileMenu.tsx`

- [ ] **Step 1: Build Navigation**

Sticky nav. Glass-morphism effect on scroll (backdrop-blur + semi-transparent bg). Layout:
- Left: Logo (simple SVG, link to /)
- Center: Nav links (Episodes, Series, Questions, About)
- Right: ThemeToggle + "Subscribe" CTA button

On scroll past 100px: add glass-morphism background. GSAP or Framer Motion for the transition.

- [ ] **Step 2: Build MobileMenu**

Full-screen overlay. Hamburger icon toggle. All routes listed. Staggered animation on menu items (slide in from right with 0.05s stagger). Close on link click or X button.

- [ ] **Step 3: Verify responsive behavior**

Desktop: horizontal nav links visible, no hamburger.
Mobile: hamburger visible, nav links hidden, menu overlay works.

- [ ] **Step 4: Commit**

```bash
git add src/components/layout/Navigation.tsx src/components/layout/MobileMenu.tsx
git commit -m "feat(nav): build sticky navigation with glass-morphism and mobile menu"
```

### Task 1.8: Footer Component

**Files:**
- Create: `src/components/layout/Footer.tsx`

- [ ] **Step 1: Build Footer**

- Subtle top border with gradient (iron to oak colors)
- Logo (simple version)
- Navigation links (same as nav)
- Social links (YouTube, Spotify, Apple Podcasts, Instagram — placeholder hrefs)
- "Built with conviction in Hays, Kansas."
- Copyright: "2026 The Iron & Oak Podcast. All rights reserved."
- Dark, minimal design

- [ ] **Step 2: Commit**

```bash
git add src/components/layout/Footer.tsx
git commit -m "feat(footer): build footer with gradient border, nav, and social links"
```

### Task 1.9: Root Layout Assembly

**Files:**
- Modify: `src/app/layout.tsx`
- Create: `src/components/layout/PageTransition.tsx`

- [ ] **Step 1: Create PageTransition wrapper**

Framer Motion `AnimatePresence` wrapper for page transitions. Fade + slight y-offset on enter/exit.

- [ ] **Step 2: Assemble root layout**

Wire up in `layout.tsx`:
1. HTML with `data-theme` attribute
2. Font variable classes on `<html>`
3. ThemeProvider
4. SmoothScrollProvider
5. CursorProvider
6. CustomCursor (rendered once globally)
7. Navigation
8. PageTransition wrapping `{children}`
9. Footer
10. Metadata (title, description, Open Graph, etc.)

- [ ] **Step 3: Verify full layout renders**

```bash
npm run dev
```

Check: nav sticky, footer at bottom, smooth scroll active, cursor tracking, theme toggle working.

- [ ] **Step 4: Commit**

```bash
git add src/app/layout.tsx src/components/layout/PageTransition.tsx
git commit -m "feat(layout): assemble root layout with all providers, nav, footer, transitions"
```

### Task 1.10: Reusable UI Components

**Files:**
- Create: `src/components/ui/Button.tsx`
- Create: `src/components/ui/ScrollReveal.tsx`
- Create: `src/components/ui/TextReveal.tsx`
- Create: `src/components/ui/MagneticElement.tsx`
- Create: `src/hooks/useMagnetic.ts`

- [ ] **Step 1: Build Button component**

Three variants: primary (oak accent bg), secondary (ghost/outline), and ghost (text only). Hover animations: slight scale, background shift. Add `data-cursor="pointer"` for custom cursor integration. Accepts `href` prop (renders as `<a>`) or onClick (renders as `<button>`).

- [ ] **Step 2: Build ScrollReveal wrapper**

Reusable component. Wraps children. Uses GSAP ScrollTrigger to animate from `opacity: 0, y: 40` to `opacity: 1, y: 0` when entering viewport. Props: `delay`, `duration`, `direction` (up/left/right).

- [ ] **Step 3: Build TextReveal component**

Takes a text string. Splits into lines (or words). Animates each line sliding up from below with clip-path mask and stagger. Uses GSAP ScrollTrigger. Falls back to simple fade if `prefers-reduced-motion` is set.

- [ ] **Step 4: Build MagneticElement wrapper**

On mouse enter, element subtly pulls toward cursor (max 10-20px offset). On mouse leave, snaps back with elastic ease. Desktop only. Uses `onMouseMove` to calculate offset from center, applies transform.

- [ ] **Step 5: Verify all components**

Create a temporary test route `/test` that uses each component. Verify animations fire, magnetic effect works, buttons render in all variants.

- [ ] **Step 6: Commit**

```bash
git add src/components/ui/Button.tsx src/components/ui/ScrollReveal.tsx src/components/ui/TextReveal.tsx src/components/ui/MagneticElement.tsx src/hooks/useMagnetic.ts
git commit -m "feat(ui): add Button, ScrollReveal, TextReveal, and MagneticElement components"
```

### Task 1.11: Iron Sparks Effect

**Files:**
- Create: `src/components/ui/IronSparks.tsx`

- [ ] **Step 1: Build IronSparks canvas overlay**

Canvas element (position: fixed, pointer-events: none, full viewport). Listens for click events on `.spark-trigger` elements. On click: spawns 8-15 spark particles at click coordinates. Particles have:
- Randomized radial velocity vectors
- Initial opacity 1.0, fading to 0
- Size 2-4px
- Color gradient from amber (#C4843E) to white
- Simple physics: velocity + slight gravity + friction
- Total burst duration: ~400ms
- Self-cleans after all particles fade

Desktop only (check `hover` media query). On mobile, buttons use a scale-pulse CSS animation instead.

- [ ] **Step 2: Integrate with Button component**

Add `spark-trigger` class to primary Button variant.

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/IronSparks.tsx
git commit -m "feat(effects): add iron spark particle burst on CTA button clicks"
```

### Task 1.12: Gradient Background + Background Transition

**Files:**
- Create: `src/components/effects/GradientBackground.tsx`
- Create: `src/components/effects/BackgroundTransition.tsx`

- [ ] **Step 1: Build GradientBackground**

Canvas-based animated mesh gradient. Adapted from Stripe's pattern but using Iron & Oak colors: deep charcoal base with subtle amber/oak light bleeding through (like firelight). Uses requestAnimationFrame. GPU-accelerated. Performance-conscious — test on throttled CPU.

Research the open-source stripe-gradient implementations found in Task 0.2.

- [ ] **Step 2: Build BackgroundTransition**

Two pseudo-element texture layers on a wrapper div:
- Layer 1: iron/steel grain texture (opacity starts at 0.04)
- Layer 2: oak/wood grain texture (opacity starts at 0)

GSAP ScrollTrigger scrubs the crossfade as user scrolls: iron fades to 0, oak fades to 0.04 by footer.

Textures must be tileable, low-res, subtle (0.03-0.05 opacity max — atmospheric, not wallpaper).

- [ ] **Step 3: Commit**

```bash
git add src/components/effects/
git commit -m "feat(effects): add animated gradient background and iron-to-oak scroll texture transition"
```

### Task 1.13: Push + Tag Phase 1

- [ ] **Step 1: Update memory files**

Update CLAUDE.md, PLAN.md, TASKS.md, KNOWLEDGE.md with Phase 1 completion status.

- [ ] **Step 2: Push and tag**

```bash
git push origin main
git tag v0.1-core-infrastructure
git push origin v0.1-core-infrastructure
```

---

## Phase 2: Home Page

### Task 2.1: Hero Section

**Files:**
- Create: `src/components/home/HeroSection.tsx`

- [ ] **Step 1: Build HeroSection**

Full viewport height (100vh). Contains:
- GradientBackground canvas behind everything
- Iron & Oak Podcast logo (large, centered) — use placeholder SVG text if no logo file
- Tagline: "Where Iron Sharpens Iron and Deep Roots Hold." (Playfair Display, `--text-hero` size)
- Subtitle: "Hard questions. Honest faith. No easy answers." (DM Sans, `--text-secondary` color)
- Two CTA buttons: "Watch Episodes" (primary) | "About the Show" (secondary/ghost)
- Newsletter email signup (compact: styled input + submit button, "Get notified when we launch") — this is a PRIMARY conversion goal per spec
- Scroll indicator at bottom (animated chevron with subtle bounce)

Animation sequence (auto-plays on mount):
1. Logo fades in with slight scale (1.05 to 1.0) — 0.6s
2. Tagline reveals word-by-word (GSAP, 0.05s stagger) — starts at 0.4s
3. Subtitle fades in — starts after tagline completes
4. CTAs slide up with 0.1s stagger
5. Scroll indicator fades in last

- [ ] **Step 2: Verify hero renders at all breakpoints**

Desktop (1440px), Tablet (768px), Mobile (375px).

- [ ] **Step 3: Commit**

```bash
git add src/components/home/HeroSection.tsx
git commit -m "feat(home): build hero section with animated gradient, tagline reveal, and CTAs"
```

### Task 2.2: Concept Section (Sticky Scroll + Text Reveal)

**Files:**
- Create: `src/components/home/ConceptSection.tsx`

- [ ] **Step 1: Build ConceptSection**

Sticky scroll section. The section pins while text animates, then unpins.

Content (exact copy from spec):
> "Two men from the Kansas plains sit down to wrestle with the questions that keep people up at night. Not to lecture. Not to perform. To dig — into Scripture, into doubt, into the tension between what we were taught and what we actually believe. Iron & Oak is a space where faith gets pressure-tested and Christ remains the answer."

Text reveals line-by-line as user scrolls. Each line clips in from below using TextReveal component. GSAP ScrollTrigger pins the section during the animation, then releases.

- [ ] **Step 2: Commit**

```bash
git add src/components/home/ConceptSection.tsx
git commit -m "feat(home): build concept section with sticky scroll and line-by-line text reveal"
```

### Task 2.3: Featured Series Section

**Files:**
- Create: `src/components/home/FeaturedSeries.tsx`
- Create: `src/components/ui/EpisodeCard.tsx`

- [ ] **Step 1: Build EpisodeCard**

Displays: episode number (JetBrains Mono, large, oak accent), title (Playfair Display, bold), subtitle/question (DM Sans, text-secondary), phase label (small chip/tag).

Hover: card lifts (translateY -4px), border glows oak accent, episode number scales up. Smooth transitions. Links to `/episodes/[slug]`.

- [ ] **Step 2: Build FeaturedSeries section**

Header: "Season One: Foundations of the Faith", description, "5 Phases, 12 Episodes, 100+ Real Questions".

Horizontal scroll row of EpisodeCards. GSAP ScrollTrigger pins the container and translates cards horizontally as user scrolls vertically. Cards stagger in from below as section enters viewport.

- [ ] **Step 3: Commit**

```bash
git add src/components/home/FeaturedSeries.tsx src/components/ui/EpisodeCard.tsx
git commit -m "feat(home): build featured series section with horizontal scroll episode cards"
```

### Task 2.4: Hosts Section

**Files:**
- Create: `src/components/home/HostsSection.tsx`

- [ ] **Step 1: Build HostsSection**

Split screen — Tyler left, Lincoln right (stacked on mobile).

Each side shows:
- Placeholder image (abstract silhouette or iron/oak themed graphic)
- Name + Role
- Short bio

Tyler's side: subtle iron/steel texture background.
Lincoln's side: subtle wood grain texture background.

Animation: mirrored — Tyler slides from left, Lincoln slides from right, meeting in the middle. GSAP ScrollTrigger.

- [ ] **Step 2: Commit**

```bash
git add src/components/home/HostsSection.tsx
git commit -m "feat(home): build hosts section with split-screen reveal animations"
```

### Task 2.5: Questions Cloud Section

**Files:**
- Create: `src/components/home/QuestionsCloud.tsx`

- [ ] **Step 1: Build QuestionsCloud**

Display a sampling of real questions (8-12 questions) as floating, animated text elements.

Questions float with CSS animation (translateY oscillation + slight rotation). Different sizes, opacities, and speeds create depth. Parallax on scroll at different rates.

Interaction:
- Hover: question enlarges, others dim (opacity reduction)
- Click: navigates to the relevant episode page

Accessible: keyboard navigable, proper links.

- [ ] **Step 2: Commit**

```bash
git add src/components/home/QuestionsCloud.tsx
git commit -m "feat(home): build interactive floating questions cloud section"
```

### Task 2.6: Subscribe Section

**Files:**
- Create: `src/components/home/SubscribeSection.tsx`

- [ ] **Step 1: Build SubscribeSection**

Dark section with warm accent lighting.

Content:
- "Never miss an episode."
- Platform icons: YouTube, Spotify, Apple Podcasts, Google Podcasts (all placeholder links)
- Email signup form (just the UI — styled input + submit button, no backend)

Platform icons use iron-gray color, glow oak on hover. Email input styled with the design system.

- [ ] **Step 2: Commit**

```bash
git add src/components/home/SubscribeSection.tsx
git commit -m "feat(home): build subscribe section with platform icons and email signup UI"
```

### Task 2.7: Assemble Home Page

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Assemble all sections into page.tsx**

Import and render in order:
1. HeroSection
2. ConceptSection
3. FeaturedSeries
4. HostsSection
5. QuestionsCloud
6. SubscribeSection

(Footer is in root layout, renders automatically.)

Wrap with BackgroundTransition for the iron-to-oak texture crossfade.

- [ ] **Step 2: Full verification**

Run dev server. Scroll through entire page. Check:
- All sections render
- Animations fire on scroll
- Horizontal scroll section works
- Sticky section pins and unpins
- Questions cloud interaction works
- Responsive at all breakpoints

- [ ] **Step 3: Commit and push**

```bash
git add src/app/page.tsx
git commit -m "feat(home): assemble complete home page with all 7 sections"
git push origin main
```

### Task 2.8: Forge Intro Sequence

**Files:**
- Create: `src/components/effects/EmberParticles.tsx`
- Create: `src/components/effects/ForgeIntro.tsx`

- [ ] **Step 1: Build EmberParticles**

Canvas-based particle system. 200-400 ember particles with:
- Randomized size (1-3px)
- Opacity (0.3-1.0)
- Upward velocity with slight horizontal drift
- Fade-out at top
- Vanilla Canvas 2D — no Three.js

- [ ] **Step 2: Build ForgeIntro**

Full-screen overlay that plays on first visit:
1. Dark screen with ember particles drifting upward
2. "IRON" text appears with forging effect (bright orange-white edges cooling to steel gray — CSS filters: brightness + blur keyframes + gradient mask sweep)
3. "OAK" text grows from root-like tendrils (SVG stroke-dashoffset animation from 100% to 0)
4. After 3.5s, overlay fades out revealing the hero section

Skip on repeat visits (sessionStorage check). Skip on click or any scroll.

Canvas layered over hero (position: fixed during intro, fades out after).

- [ ] **Step 3: Integrate into home page**

Add ForgeIntro to `page.tsx`, rendered before HeroSection.

- [ ] **Step 4: Commit**

```bash
git add src/components/effects/EmberParticles.tsx src/components/effects/ForgeIntro.tsx src/app/page.tsx
git commit -m "feat(effects): add forge intro sequence with ember particles and logo animation"
```

### Task 2.9: Push + Tag Phase 2

- [ ] **Step 1: Update memory files**

- [ ] **Step 2: Push and tag**

```bash
git push origin main
git tag v0.2-home-page
git push origin v0.2-home-page
```

---

## Phase 3: Content Pages

### Task 3.1: Episodes Listing Page

**Files:**
- Create: `src/app/episodes/page.tsx`

- [ ] **Step 1: Build episodes listing page**

- Smaller hero: "All Episodes" title + filter/search bar
- Filters: By Series (dropdown), By Phase (dropdown/chips), Search by title/question (text input)
- Responsive card grid: 3 columns desktop, 2 tablet, 1 mobile
- Uses EpisodeCard component
- Filter changes animate cards (Framer Motion layout animations)
- Cards stagger in on page load

- [ ] **Step 2: Commit**

```bash
git add src/app/episodes/page.tsx
git commit -m "feat(pages): build episodes listing page with filter and search"
```

### Task 3.2: Episode Detail Page

**Files:**
- Create: `src/app/episodes/[slug]/page.tsx`
- Create: `src/components/ui/ScriptureChisel.tsx`

- [ ] **Step 1: Build episode detail page**

- Hero: Episode number (large, oak accent) + title + series badge
- Video section: lite-youtube-embed placeholder (thumbnail, plays on click). Full-width or 16:9.
- Show notes:
  - "Questions Covered" — list of questions from this episode, each linking to `/questions/[slug]`
  - "Talk Track Notes" — editorial context
  - "Scripture References" — placeholder list
  - "Resources & Further Reading" — placeholder
- Prev/Next episode links at bottom
- Desktop sidebar: episode metadata, share buttons, series navigation

- [ ] **Step 2: Build ScriptureChisel component**

At bottom of episode page. Key verse animates character-by-character:
- Each character appears with 3px y-offset drop-in
- Staggered at 0.02s per character
- Cap total animation at 3s regardless of verse length
- ScrollTrigger fires on viewport entry
- Container has subtle stone/concrete texture background

Use GSAP to split text into characters and animate. (Alternative to SplitText Club plugin: split manually with spans.)

- [ ] **Step 3: Generate static params**

```typescript
export function generateStaticParams() {
  return episodes.map((ep) => ({ slug: ep.slug }));
}
```

- [ ] **Step 4: Commit**

```bash
git add src/app/episodes/[slug]/ src/components/ui/ScriptureChisel.tsx
git commit -m "feat(pages): build episode detail page with video embed, show notes, and scripture chisel"
```

### Task 3.3: Questions Listing Page

**Files:**
- Create: `src/app/questions/page.tsx`

- [ ] **Step 1: Build questions listing page**

All 100+ questions displayed. Searchable text input. Filterable by phase (5 phases) and by episode (12 episodes).

Each question shows:
- Question text
- Episode it belongs to (with link)
- Phase badge

Clean, scannable layout. Instant filter results with Framer Motion layout animation.

- [ ] **Step 2: Commit**

```bash
git add src/app/questions/page.tsx
git commit -m "feat(pages): build questions listing with search, filter by phase and episode"
```

### Task 3.4: Individual Question Page

**Files:**
- Create: `src/app/questions/[slug]/page.tsx`

- [ ] **Step 1: Build question detail page**

- The question text (large, Playfair Display)
- Which episode answers it (with link to episode)
- Phase context
- YouTube timestamp link placeholder (null for now — architecture in place for future population)
- "Watch the Full Episode" CTA
- Related questions from the same episode

- [ ] **Step 2: Generate static params from all questions**

- [ ] **Step 3: Commit**

```bash
git add src/app/questions/[slug]/
git commit -m "feat(pages): build individual question page with deep-link timestamp architecture"
```

### Task 3.5: Series Overview Page

**Files:**
- Create: `src/app/series/page.tsx`

- [ ] **Step 1: Build series overview**

Lists all series (currently just "Foundations of the Faith"). Each series card shows title, subtitle, description, episode count, phase count. Links to `/series/[slug]`.

- [ ] **Step 2: Commit**

```bash
git add src/app/series/page.tsx
git commit -m "feat(pages): build series overview page"
```

### Task 3.6: Series Detail Page with Oak Tree Timeline

**Files:**
- Create: `src/app/series/[slug]/page.tsx`
- Create: `src/components/series/OakTreeTimeline.tsx`

- [ ] **Step 1: Build OakTreeTimeline**

Animated SVG timeline that evokes the oak tree metaphor:
- Vertical trunk line representing the series
- 5 branch points for the 5 phases
- Each branch has leaf/marker elements for its episodes
- GSAP ScrollTrigger scrubs growth: at 0% just trunk, at 20% Phase 1 grows, at 40% Phase 2, etc.
- Each episode marker is clickable (navigates to episode)
- Hover: highlights branch, shows episode title tooltip
- Sticky-positioned while user scrolls through series content beside it (split layout: timeline left, content right)
- Mobile: simplify to vertical timeline with markers

**Fallback:** If full tree SVG is too complex, implement as an animated vertical timeline with branching lines.

- [ ] **Step 2: Build series detail page**

- Hero: Series title, description, phase breakdown
- Split layout: OakTreeTimeline left, episode content right
- Each phase section shows its episodes in order

- [ ] **Step 3: Commit**

```bash
git add src/app/series/[slug]/ src/components/series/OakTreeTimeline.tsx
git commit -m "feat(pages): build series detail page with animated oak tree timeline navigation"
```

### Task 3.7: About Page

**Files:**
- Create: `src/app/about/page.tsx`

- [ ] **Step 1: Build about page**

4 sections:
1. "What Is Iron & Oak?" — origin story, mission
2. Host bios (expanded) — full bio text from spec, placeholder images
3. "Why This Podcast?" — the gap it fills, the audience
4. "Our Approach" — honest, pressure-testing, Christ-centered

ScrollReveal on each section. Use the iron/oak visual language throughout.

- [ ] **Step 2: Commit**

```bash
git add src/app/about/page.tsx
git commit -m "feat(pages): build about page with mission, bios, and approach sections"
```

### Task 3.8: Subscribe Page

**Files:**
- Create: `src/app/subscribe/page.tsx`

- [ ] **Step 1: Build subscribe page**

Dedicated, beautiful, compelling newsletter signup page:
- Headline: compelling reason to subscribe
- Email input + submit button (UI only)
- Platform links (YouTube, Spotify, Apple Podcasts)
- "What you'll get" section
- Visually rich — not a boring form page

- [ ] **Step 2: Commit**

```bash
git add src/app/subscribe/page.tsx
git commit -m "feat(pages): build dedicated subscribe/newsletter page"
```

### Task 3.9: Contact Page

**Files:**
- Create: `src/app/contact/page.tsx`

- [ ] **Step 1: Build contact page**

- Contact form (name, email, message — UI only, no backend)
- Social links
- "Reach us" copy

- [ ] **Step 2: Commit**

```bash
git add src/app/contact/page.tsx
git commit -m "feat(pages): build contact page with form and social links"
```

### Task 3.10: Coming Soon Pages (Merch + Resources)

**Files:**
- Create: `src/app/merch/page.tsx`
- Create: `src/app/resources/page.tsx`

- [ ] **Step 1: Build Coming Soon template**

Beautiful placeholder — NOT a boring 404:
- Iron & Oak logo centered
- "Coming Soon" in display type (Playfair Display)
- "We are building something here. It is not ready yet — but it will be worth the wait."
- Email signup to be notified
- Subtle ambient animation: logo breathing glow effect, background gradient slow shift

- [ ] **Step 2: Apply to both merch and resources routes**

Same template, different page titles.

- [ ] **Step 3: Commit**

```bash
git add src/app/merch/ src/app/resources/
git commit -m "feat(pages): build beautiful Coming Soon placeholder for merch and resources"
```

### Task 3.11: 404 Page

**Files:**
- Create: `src/app/not-found.tsx`

- [ ] **Step 1: Build custom 404**

Copy: "This page wandered into the wilderness. Let us bring you back."
Link back to home. Styled with design system. Brief, warm, on-brand.

- [ ] **Step 2: Commit**

```bash
git add src/app/not-found.tsx
git commit -m "feat(pages): build custom 404 page"
```

### Task 3.12: Push + Tag Phase 3

- [ ] **Step 1: Update memory files**

- [ ] **Step 2: Push and tag**

```bash
git push origin main
git tag v0.3-content-pages
git push origin v0.3-content-pages
```

---

## Phase 4: Polish & Mobile

### Task 4.1: Full Desktop Audit

- [ ] **Step 1: Run web-code-executor for full audit**

Check every page at desktop (1440px) and tablet (768px):
- All sections render
- All animations fire correctly
- All links work
- No console errors
- Both themes work on every page
- Navigation works on every route

- [ ] **Step 2: Fix any issues found**

- [ ] **Step 3: Commit fixes**

```bash
git add .
git commit -m "fix(audit): resolve desktop audit issues"
```

### Task 4.2: Mobile Optimization

- [ ] **Step 1: Run ui-mobile agent for full mobile pass**

Optimize the entire site for mobile:
- Touch-friendly tap targets (44px minimum)
- Custom cursor disabled on touch devices (already built — verify)
- Animations reduced/simplified for mobile performance
- `prefers-reduced-motion` respected everywhere
- Full-screen mobile menu verified
- Horizontal scroll sections become vertical stacks on mobile
- All text readable without zooming
- No horizontal overflow

- [ ] **Step 2: Fix all mobile issues**

- [ ] **Step 3: Commit**

```bash
git add .
git commit -m "feat(mobile): comprehensive mobile optimization pass"
```

### Task 4.3: Performance Optimization

- [ ] **Step 1: Run Lighthouse audit**

Target: 90+ on all four categories (Performance, Accessibility, Best Practices, SEO).

- [ ] **Step 2: Optimize**

- Lazy load all images below fold (`loading="lazy"`, `decoding="async"`)
- Verify lite-youtube-embed is used (not full YouTube iframe)
- Verify `will-change` on animated elements
- Verify GSAP ScrollTrigger instances killed on unmount
- Verify Lenis destroyed on route change
- Font loading optimized (`display=swap`)
- No unused CSS/JS in bundle

- [ ] **Step 3: Commit**

```bash
git add .
git commit -m "perf: optimize for Lighthouse 90+ scores"
```

### Task 4.4: SEO + Accessibility

- [ ] **Step 1: Add meta tags to every page**

- Title, description
- Open Graph (og:title, og:description, og:image)
- Twitter cards
- Structured data for podcast episodes (JSON-LD)

- [ ] **Step 2: Accessibility pass**

- Keyboard navigation on all interactive elements
- Focus states visible
- ARIA labels on icons, buttons, nav
- Screen reader testing (verify content order makes sense)
- Color contrast meets WCAG AA

- [ ] **Step 3: Commit**

```bash
git add .
git commit -m "feat(seo): add meta tags, Open Graph, structured data, and accessibility improvements"
```

### Task 4.5: Final Visual QA

- [ ] **Step 1: Check every hover state, transition, and color**

Both themes. Every page. Every component.

- [ ] **Step 2: Fix any visual issues**

- [ ] **Step 3: Commit**

```bash
git add .
git commit -m "fix(visual): final visual QA fixes"
```

### Task 4.6: Push + Tag Phase 4

- [ ] **Step 1: Update memory files**

- [ ] **Step 2: Push and tag**

```bash
git push origin main
git tag v0.4-polish-mobile
git push origin v0.4-polish-mobile
```

---

## Phase 5: Deploy

### Task 5.1: Production Build Verification

- [ ] **Step 1: Run production build**

```bash
npm run build
```

Expected: Build completes without errors or warnings.

- [ ] **Step 2: Test production build locally**

```bash
npm start
```

Navigate through every route. Verify no console errors.

### Task 5.2: Vercel Deployment

- [ ] **Step 1: Connect GitHub repo to Vercel**

```bash
npx vercel link
npx vercel --prod
```

Or: Connect via Vercel dashboard (https://vercel.com/new) — import the `iron-oak-podcast` GitHub repo. Zero-config for Next.js.

- [ ] **Step 2: Verify live deployment**

Check the Vercel URL. Navigate every route. Test on mobile device.

- [ ] **Step 3: Tag release**

```bash
git tag v1.0.0
git push origin v1.0.0
```

### Task 5.3: Final Memory Update

- [ ] **Step 1: Update all four memory files to final state**

CLAUDE.md: Phase 5 complete, deployed.
PLAN.md: All tasks checked off.
TASKS.md: All tasks in "Recently Completed".
KNOWLEDGE.md: All learnings logged.

- [ ] **Step 2: Final commit and push**

```bash
git add .
git commit -m "docs: final memory file update — v1.0.0 deployed"
git push origin main
```

---

## Final Checklist

Reference source spec lines 981-1010 for the complete verification checklist. Every item must pass before declaring done:

- [ ] All 11+ routes render correctly
- [ ] Dark/light mode pixel-perfect
- [ ] Custom cursor works desktop, degrades mobile
- [ ] Lenis smooth scroll works all pages
- [ ] Page transitions animate between routes
- [ ] All 12 episodes populated from data
- [ ] Episode cards render correctly
- [ ] YouTube embed placeholder works
- [ ] Horizontal scroll section works on home
- [ ] Sticky text reveal works on home
- [ ] Questions Cloud is interactive
- [ ] Navigation responsive (hamburger on mobile)
- [ ] Footer on all pages
- [ ] Lighthouse 90+ all categories
- [ ] `prefers-reduced-motion` respected
- [ ] Clean GitHub commits
- [ ] Deployed to Vercel
- [ ] 100+ questions with search/filter
- [ ] Question deep-link architecture in place
- [ ] Newsletter signup in hero, section, and footer
- [ ] Iron spark effect on CTA clicks (desktop)
- [ ] Background iron-to-oak transition on scroll
- [ ] Forge intro on first visit, skip on repeat
- [ ] Scripture chisel reveal on episode pages
- [ ] Oak tree timeline on series page
- [ ] 5 research docs in /docs/research/
- [ ] All 4 memory files populated and current
- [ ] No console errors in production
