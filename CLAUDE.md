# CLAUDE.md — Iron & Oak Podcast Website

Cinematic, faith-forward marketing site for the Iron & Oak Podcast (Tyler Preisser + Lincoln
Myers) — 12 episodes, 109 questions, entirely static content, no backend.

## Stack (exact versions — package.json)
Next.js 16.2.1 (App Router, `output: "export"`) · React 19.2.4 · TypeScript 5 (strict) ·
Tailwind CSS 4 (`@theme inline` in `globals.css`, no `tailwind.config.ts`) · GSAP 3.14.2 +
ScrollTrigger · Lenis 1.3.20 (smooth scroll, synced to ScrollTrigger) · Framer Motion 12.38.0 ·
lite-youtube-embed · clsx + tailwind-merge (`cn()` in `src/lib/utils.ts`).

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
- `src/app/**` — App Router routes. Each dynamic route splits server/client: `page.tsx` (async,
  `generateStaticParams`/`generateMetadata`) renders a `*Client.tsx` (`'use client'`, UI +
  effects). See `src/app/episodes/[slug]/page.tsx` + `EpisodeDetailClient.tsx` as the reference.
- `src/data/*.ts` — the entire content layer (episodes, questions, series, hosts, navigation).
  No CMS, no database. Edit these `.ts` files directly to change content.
- `src/lib/constants.ts` — GSAP `ANIMATION`/`SCROLL_TRIGGER` presets; `src/lib/basePath.ts` —
  `assetPath()` helper (see gotcha below); `src/lib/utils.ts` — `cn()`, `slugify()`.
- `src/hooks/useGSAP.ts` — required wrapper for every GSAP usage (registers ScrollTrigger, wires
  cleanup). Never `import gsap` directly in a component.
- `src/app/globals.css` — the full design-token system: dark/light CSS custom properties, fonts,
  spacing, animation utilities.

## Conventions actually observed
- Scroll-driven animation → GSAP + ScrollTrigger only. Framer Motion is used ONLY for page-level
  `AnimatePresence` transitions (`PageTransition.tsx`). Do not mix the two for the same effect.
- Never hardcode hex/rgb colors — everything reads CSS custom properties (`--bg-primary`,
  `--accent-oak`, `--accent-iron`, …) so `[data-theme="light"]` overrides keep working. Dark mode
  is the default (`:root`), light is the override, not the other way around.
- Always import via the `@/*` path alias (`tsconfig.json`); no multi-level relative imports.
- Any component using ScrollTrigger must clean up on unmount (`ScrollTrigger.getAll().forEach(t
  => t.kill())` or the cleanup path `useGSAP` already provides) — this app statically renders 134
  pages and stale ScrollTrigger instances leak across client-side navigations.
- TypeScript strict mode is on; no `any`.
- `output: "export"` is a hard constraint: no API routes, no server actions, no dynamic
  server-only APIs. Anything added must work as pre-rendered static HTML.

## Gotchas — do not rediscover these
- **Deploy target migrated GitHub Pages → Cloudflare Pages at the root domain.** `next.config.ts`
  no longer sets `basePath`; `src/lib/basePath.ts` documents this explicitly and returns `''`.
  Any doc or comment still claiming a `/iron-oak-podcast` basePath is stale.
- Newsletter and contact forms are client-side stubs only — no backend, submissions just
  `console.log`.
- Social/platform links in `src/data/navigation.ts` and components are `href="#"` placeholders.
- Episode video embeds are placeholders pending real YouTube IDs in `src/data/episodes.ts`.
- iOS Safari: body text has a 1rem (16px) floor to prevent input-focus auto-zoom.

## Domain terms
"Oak" and "Iron" are the show's two recurring visual/thematic motifs (Lincoln = oak, Tyler =
iron) — texture, color, and copy choices lean on this pairing throughout (`HostsSection`,
`OakMissionSection`, `IronAnvilSection`, `IronSparks` particle effect).

## Tooling already wired globally — no per-repo setup needed
GitHub MCP and Context7 are connected at the account level.

## Settled decisions — see DECISIONS/
`DECISIONS/` is the source of truth for settled intent; review agents read it before reviewing.
Walk up from the working directory to find it (a parent workspace may own it).

**Two folders are in force at once.** `~/.claude-shared/DECISIONS/` holds the owner's UNIVERSAL
preference and policy decisions (cite as `GLOBAL ADR-NNNN`); this repo's `DECISIONS/` holds
decisions scoped to this codebase. A GLOBAL ADR is never shadowed by a repo that owns its own
folder, and on conflict **the GLOBAL ADR wins**. This repo may carve out an exception only via
its own ADR that names the GLOBAL ADR number and says why.
- **Conformance to an Accepted ADR is NEVER a defect.** Do not "fix" or recommend re-adding what
  an ADR removed.
- **If you believe a settled decision is wrong, do not change code or file a bug** — note it
  under "Decision Concerns" in your review output, citing the ADR number. Nothing more.
- **Accepted ADRs are immutable — supersede, never edit.** New decision = next number; the old
  file gets one line: `Status: Superseded by ADR-000N`.
- Deterministic gates live in `.claude/hooks/` (live-deploy block, ADR/secret protection); this
  file is advisory, the hooks are not.

### Record decisions as they happen — do not wait to be asked
When the owner settles a question, write the ADR immediately as `Status: Accepted`, then state in
one line what was recorded and its number. Settled = a real choice made, a reversal, or a course
ruled in/out (architecture, libraries, schema, scope, workflow). Not settled = task direction,
questions, thinking aloud. Route by scope: universal → `~/.claude-shared/DECISIONS/`; this
codebase only → this repo's `DECISIONS/`. Next free `NNNN`, start from `0000-template.md`. A
wrong capture is fixed by superseding, never editing.

## graphify
Knowledge graph at `graphify-out/` (god nodes, community structure, cross-file relationships).
For codebase questions, run `graphify query "<question>"` first when `graphify-out/graph.json`
exists; `graphify path "<A>" "<B>"` for relationships, `graphify explain "<concept>"` for focused
concepts — these return a scoped subgraph, cheaper than grep or `GRAPH_REPORT.md`. After changing
code, run `graphify update .` to keep it current (AST-only, no API cost).
