# ADR-0001: Adopt the MIP infra baseline (CLAUDE.md, rules, REVIEW.md, plans/) in this repo
Status: Accepted — 2026-08-26 (GLOBAL ADR-0007, MIP infra rollout) — Owner: Tyler Preisser
Supersedes / Superseded by: —

## Context
- The 2026-08-26 Master Infrastructure Prompt (MIP) build standardizes CLAUDE.md structure,
  path-scoped `.claude/rules/`, a `REVIEW.md` evidence bar, and a `plans/`/`thoughts/` scaffold
  across every repo Tyler works, governed globally by `GLOBAL ADR-0007`
  (`~/.claude-shared/DECISIONS/`).
- Tyler chose "All repos incl. client" on 2026-08-26 when deciding rollout scope for the MIP
  build — this repo is in scope under that decision.
- This repo already carried `agent-kit` 1.2.0 guardrails (hooks, `DECISIONS/` folder, reviewer
  protocol, commit `a660044`); this ADR layers the MIP-specific artifacts on top, it does not
  replace agent-kit's guardrails.

## Decision
1. This repo's `CLAUDE.md` follows the MIP structure: one-line purpose, exact stack + versions,
   real build/test/lint/deploy commands, key directories as pointers, observed conventions and
   anti-patterns, domain terms — compressed to ≤120 lines, excluding anything a linter already
   enforces or generic framework knowledge.
2. `.claude/rules/frontend.md` and `.claude/rules/deploy.md` are added as path-scoped conventions
   derived from the actual code (GSAP/Framer boundary, ScrollTrigger cleanup, CSS-variable-only
   colors, static-export constraints, the Cloudflare Pages deploy path). No convention was
   invented; each is cited from real source.
3. `REVIEW.md` sets the evidence bar for reviewers of this repo (cited failing scenarios,
   confidence ≥80, no style/speculative findings) plus four repo-specific must-checks.
4. `plans/ACTIVE.md` and `thoughts/.gitkeep` are added as the standard planning scaffold.

## Consequences
- Future CLAUDE.md edits should preserve this structure rather than reverting to the prior
  free-form 676-line version; expand `.claude/rules/*.md` instead of re-bloating `CLAUDE.md`.
- Review agents use `REVIEW.md`'s bar and must-checks for this repo going forward.
- No code, dependency, or deploy behavior changed — this is documentation/process only.

## Open / not yet decided
- The Cloudflare Pages project name used for `wrangler pages deploy` is not recorded anywhere in
  this repo or in this ADR; it must be confirmed against the Cloudflare dashboard before any
  deploy.

## Status note for review agents
This is an Accepted decision: code and docs conforming to the structure above are CONFORMANT, not
defective. Disagreement goes under a non-blocking "Decision Concerns" note citing this ADR number.

## Revisit criteria
- GLOBAL ADR-0007 is superseded or the MIP structure changes.
- A maintainer identifies content this rollout dropped from the prior CLAUDE.md that is still
  load-bearing (see `git log` on `CLAUDE.md` for the pre-rollout version).

## Sources
- `~/.claude-shared/DECISIONS/` — GLOBAL ADR-0007 (MIP build, 2026-08-26)
- Tyler's rollout-scope decision: "All repos incl. client" (2026-08-26)
- This repo, commit `a660044` — agent-kit 1.2.0 guardrails already in place
