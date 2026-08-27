---
paths: ["src/**/*.tsx", "src/**/*.ts"]
---

# Frontend conventions — Iron & Oak Podcast

- Scroll-driven animation goes through GSAP + ScrollTrigger via the `useGSAP()` hook
  (`src/hooks/useGSAP.ts`) — never `import gsap` directly in a component. Framer Motion is used
  ONLY for page-level `AnimatePresence` transitions (`src/components/layout/PageTransition.tsx`).
  Do not use Framer Motion for a scroll-triggered effect, or GSAP for a route transition.
- Any component that creates a `ScrollTrigger` instance must clean it up on unmount
  (`ScrollTrigger.getAll().forEach(t => t.kill())`, or rely on `useGSAP`'s cleanup return). This
  app statically renders 134 pages; leaked ScrollTrigger instances accumulate across client-side
  route changes.
- Never hardcode a color (hex/rgb). Read CSS custom properties defined in `src/app/globals.css`
  (`--bg-primary`, `--accent-oak`, `--accent-iron`, etc.) so `[data-theme="light"]` overrides
  keep working. Dark mode (`:root`) is the default; light is the override.
- Import via the `@/*` path alias (`tsconfig.json`) — no multi-level relative imports
  (`../../../`).
- TypeScript strict mode is on. No `any`.
- This app builds with `output: "export"` (`next.config.ts`). No API routes, no server actions,
  no dynamic server-only APIs — everything must work as pre-rendered static HTML.
- Content lives entirely in `src/data/*.ts` (episodes, questions, series, hosts, navigation) —
  there is no CMS or database. Edit those files directly to change site content.
