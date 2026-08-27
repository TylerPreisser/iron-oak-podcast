# REVIEW.md — evidence bar for this repo

Every finding needs a concrete failing scenario plus `file:line` citations. Score confidence
0–100; discard anything under 80. Read the actual implementation, not just the diff — trace
callers before claiming something is unused or unreachable. Discard a finding if the behavior is
guarded, clearly intentional, or you cannot demonstrate the failure concretely.

**Excluded** — do not report: style preferences, speculative/hypothetical risk, feature requests,
generated or vendored code, lockfiles, anything ESLint (`npm run lint`) already catches.
Conformance to an Accepted ADR in `DECISIONS/` (or `~/.claude-shared/DECISIONS/`) is never a
defect — see `CLAUDE.md` for how to handle a disagreement with a settled decision.

## Repo-specific must-checks

1. **GSAP vs. Framer boundary** — any new scroll-triggered effect must use
   `useGSAP()`/ScrollTrigger, never Framer Motion; Framer Motion must appear only inside
   `AnimatePresence`/page-transition code. Cite the component and which library it imports.
2. **ScrollTrigger cleanup** — any component that registers a `ScrollTrigger` must kill it on
   unmount. Missing cleanup is a real leak here: 134 statically exported pages navigate
   client-side, so leaked triggers accumulate across route changes.
3. **Static-export compatibility** — `next.config.ts` sets `output: "export"`. Flag any API
   route, server action, `cookies()`/`headers()` call, or other server-only API — none of it
   survives a static export build.
4. **Hardcoded color values** — flag any hex/rgb color introduced outside `src/app/globals.css`;
   it breaks the `[data-theme="light"]` override, since the app assumes every color resolves
   through a CSS custom property.
