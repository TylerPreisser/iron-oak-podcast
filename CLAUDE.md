# CLAUDE.md — Iron & Oak Podcast Website

Cinematic, faith-forward marketing site for the Iron & Oak Podcast (Tyler Preisser + Lincoln
Myers) — 12 episodes, 109 questions, one series ("Foundations of the Faith"), entirely static
content, no backend. 134 pages pre-rendered. Phase 6 — Polish & Deploy (last content pass
2026-03-25).

## Stack (exact versions — package.json)
Next.js 16.2.1 (App Router, `output: "export"`) · React 19.2.4 · TypeScript 5 (strict) ·
Tailwind CSS 4 (`@theme inline` in `globals.css`, no `tailwind.config.ts`) · GSAP 3.14.2 +
ScrollTrigger · Lenis 1.3.20 (smooth scroll, synced to ScrollTrigger) · Framer Motion 12.38.0 ·
lite-youtube-embed 0.3.4 · clsx + tailwind-merge (`cn()` in `src/lib/utils.ts`). Canvas effects
are **native Canvas 2D — not WebGL/Three.js**.

## Commands (real, from package.json)
- `npm run dev` — dev server, http://localhost:3000
- `npm run build` — static export to `/out` (134 pre-rendered pages)
- `npm run start` — serve the built `/out` locally
- `npm run lint` — ESLint 9 + `eslint-config-next` (core-web-vitals + typescript configs)
- No test suite exists in this repo.
- **Deploy**: `.github/workflows/deploy.yml` only builds on push to `main` (`npx next build`) —
  it does NOT deploy. Actual deploy is manual: `npx wrangler pages deploy out --project-name
  <cloudflare-project>` (declared — project name isn't recorded anywhere in-repo; confirm via
  `wrangler pages project list` or the Cloudflare dashboard before running).

## Key directories
- `src/app/**` — App Router routes: `/`, `/episodes`, `/episodes/[slug]`, `/questions`,
  `/questions/[slug]`, `/series`, `/series/[slug]`, `/about`, `/subscribe`, `/contact`,
  `/merch` + `/resources` (coming-soon), `not-found.tsx`. Each dynamic route splits
  server/client: `page.tsx` (async, `generateStaticParams`/`generateMetadata`) renders a
  `*Client.tsx` (`'use client'`, UI + effects). Reference pair:
  `src/app/episodes/[slug]/page.tsx` + `EpisodeDetailClient.tsx`.
- `src/data/*.ts` — the entire content layer, no CMS/database. `episodes.ts` (12 episodes with
  nested 109 questions, scripture, phase), `questions.ts` (pre-computed flat list for search),
  `series.ts`, `hosts.ts`, `navigation.ts` (nav + footer + social links). Edit these directly.
- `src/lib/` — `constants.ts` (`ANIMATION`/`SCROLL_TRIGGER`/`BREAKPOINTS`/`SECTIONS` presets),
  `basePath.ts` (`assetPath()`, see gotcha), `utils.ts` (`cn()`, `slugify()`,
  `formatEpisodeNumber()`), `gsap-register.ts` (registers ScrollTrigger + SplitText).
- `src/hooks/` — `useGSAP.ts` is the required wrapper for every GSAP usage (registers
  ScrollTrigger, wires cleanup; callback receives `(gsap, ScrollTrigger)` already registered).
  Never `import gsap` directly in a component. Also `useLenis`, `useTheme`, `useMagnetic`,
  `useCustomCursor`, `useMediaQuery`.
- `src/providers/` — `ThemeProvider` (persists to localStorage key **`iron-oak-theme`**),
  `SmoothScrollProvider` (Lenis instance; keeps GSAP in sync via
  `lenis.on('scroll', ScrollTrigger.update)`), `CursorProvider`.
- `src/components/effects/` — `GradientBackground` (fullscreen canvas, 4 slow oak/iron blobs),
  `ForgeIntro` (ember particles + text materialization, fires once per session via
  sessionStorage), `IronSparks` (golden/copper burst on `.spark-trigger` clicks).
- `src/app/globals.css` — the full design-token system (below), fonts, spacing, utilities.
- `public/images/` — `iron-oak-cross.webp` (Header logo), `iron-oak-logo.webp` (social OG image).

## Design tokens (globals.css — never hardcode a hex)
Dark is `:root` (DEFAULT); light is the `[data-theme="light"]` override, not the reverse.
Dark: `--bg-primary:#0F1114` `--bg-secondary:#1A1D23` `--text-primary:#F2EDE8`
`--accent-oak:#6B4226` `--accent-iron:#8A9BAE`. Light: `--bg-primary:#FAF8F5`
`--text-primary:#1A1D23` (others invert). Fonts: `--font-display` Playfair Display,
`--font-body` DM Sans, `--font-accent` JetBrains Mono; `--text-h1…--text-body` use `clamp()`.
Layout: `--section-padding: clamp(4rem,10vh,8rem)`, `--container-max: 1280px`,
`.container-default`. Google Fonts load with `display: 'swap'`.

## Conventions actually observed
- Scroll-driven animation → GSAP + ScrollTrigger only. Framer Motion is used ONLY for page-level
  `AnimatePresence` transitions (`PageTransition.tsx`). Do not mix the two for the same effect.
- `ANIMATION` presets in `constants.ts`: `fadeUp` (opacity 0→1, y 15, stagger 0.15), `textReveal`
  (y 40, `power3.out`, 1.2s), `lineStagger` 0.08s, `cardHover` (y −8px, 0.3s `power2.out`);
  `SCROLL_TRIGGER.start = 'top 85%'`.
- `<ScrollReveal delay direction={up|down|left|right} duration distance once>` wraps content in a
  `will-change-transform` div. `<Button variant={primary|secondary|ghost} size={sm|md|lg}
  sparkTrigger>` — `sparkTrigger` adds `.spark-trigger`, which fires IronSparks on click.
- `CustomCursor`: desktop only (hidden on touch), 8px base scaling to 40px on hover, RAF + GSAP
  lerp tracking, hidden under `prefers-reduced-motion`.
- All canvas effects respect `prefers-reduced-motion: reduce`, pause offscreen via
  `IntersectionObserver`, and cap device pixel ratio at 2.0.
- Never hardcode hex/rgb colors — read the CSS custom properties above so `[data-theme="light"]`
  keeps working. Use `cn()` for conditional classes; Tailwind utilities first, custom CSS only in
  `globals.css`; mobile-first `md:`/`lg:` prefixes.
- Always import via the `@/*` path alias (`tsconfig.json`); no multi-level relative imports.
- Any component using ScrollTrigger must clean up on unmount (`ScrollTrigger.getAll().forEach(t
  => t.kill())` or the cleanup path `useGSAP` already provides) — this app statically renders 134
  pages and stale ScrollTrigger instances leak across client-side navigations.
- TypeScript strict mode is on; no `any`. Accessibility bar: WCAG AA contrast in BOTH themes,
  `focus-visible` ring on every interactive element, semantic HTML.
- `output: "export"` is a hard constraint: no API routes, no server actions, no dynamic
  server-only APIs. Anything added must work as pre-rendered static HTML.
- Browser targets: Chrome 90+, Firefox 88+, Safari 14+. No polyfills needed.

## Gotchas — do not rediscover these
- **Deploy target migrated GitHub Pages → Cloudflare Pages at the root domain.** `next.config.ts`
  no longer sets `basePath`; `src/lib/basePath.ts` documents this explicitly and returns `''`.
  Any doc, comment, or older CLAUDE.md section still claiming a `/iron-oak-podcast` basePath or a
  gh-pages push is STALE. The repo also moved off `~/Desktop/` to
  `~/Projects/Coding Projects/iron-oak-podcast`.
- Newsletter and contact forms are client-side stubs only — no backend, submissions just
  `console.log`.
- Social/platform links in `src/data/navigation.ts` and components are `href="#"` placeholders.
- Episode video embeds are placeholders pending real YouTube IDs in `src/data/episodes.ts`.
- Host photos are initials (TP, LM) — real images still needed.
- `BackgroundTransition` (Iron→Oak texture crossfade on scroll) is designed but NOT built.
- iOS Safari: body text has a 1rem (16px) floor to prevent input-focus auto-zoom; momentum
  scroll via `-webkit-overflow-scrolling: touch`; notch handled with `env(safe-area-inset-*)`.
- `README.md` is untouched Next.js boilerplate — rewrite before launch.

## Domain terms
"Oak" and "Iron" are the show's two recurring visual/thematic motifs (Lincoln = oak, Tyler =
iron) — texture, color, and copy choices lean on this pairing throughout (`HostsSection`,
`OakMissionSection`, `IronAnvilSection`, `IronSparks` particle effect).

## Companion docs
`PLAN.md` — phase-by-phase checklist (53 tasks, phases 0–6). `KNOWLEDGE.md` — learning log,
animation research, patterns. `TASKS.md` — active queue. `docs/superpowers/plans/` — design docs.

## Tooling already wired globally — no per-repo setup needed
GitHub MCP and Context7 are connected at the account level.

## Settled decisions — see DECISIONS/
`DECISIONS/` is the source of truth for settled intent; review agents read it first. Walk up from
the working directory to find it (a parent workspace may own it). **Two folders are in force at
once:** `~/.claude-shared/DECISIONS/` holds the owner's UNIVERSAL policy decisions (cite as
`GLOBAL ADR-NNNN`), this repo's `DECISIONS/` holds codebase-scoped ones; **on conflict the GLOBAL
ADR wins**, and this repo may carve out an exception only via its own ADR naming that number.
- **Conformance to an Accepted ADR is NEVER a defect.** Do not "fix" or re-add what an ADR removed.
- Think a settled decision is wrong? Do not change code or file a bug — note it under "Decision
  Concerns" in your review output, citing the ADR number. Nothing more.
- **Accepted ADRs are immutable — supersede, never edit** (`ADR_SUPERSEDE=1`); the old file gets
  `Status: Superseded by ADR-000N`.
- Deterministic gates live in `.claude/hooks/` (live-deploy block, ADR/secret protection); this
  file is advisory, the hooks are not.
- **Record decisions as they happen, unasked:** when the owner settles a question (a real choice,
  a reversal, a course ruled in/out — architecture, libraries, schema, scope, workflow) write the
  ADR immediately as `Status: Accepted` at the next free `NNNN` from `0000-template.md`, then say
  in one line what you recorded. Task direction, questions and thinking aloud are NOT settled.
  Route by scope: universal → `~/.claude-shared/DECISIONS/`; this codebase only → here.

## graphify
Knowledge graph at `graphify-out/`. For codebase questions run `graphify query "<question>"`
first when `graphify-out/graph.json` exists; `graphify path "<A>" "<B>"` for relationships,
`graphify explain "<concept>"` for focused concepts — a scoped subgraph, cheaper than grep or
`GRAPH_REPORT.md`; `graphify-out/wiki/index.md` for broad navigation. After changing code run
`graphify update .` (AST-only, no API cost).
