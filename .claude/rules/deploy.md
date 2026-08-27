---
paths: ["next.config.ts", ".github/workflows/**", "src/lib/basePath.ts"]
---

# Deploy conventions — Iron & Oak Podcast

- Deploy target is **Cloudflare Pages at the root domain**, not GitHub Pages. `next.config.ts`
  does not set `basePath`; `src/lib/basePath.ts` returns `''` and documents the migration inline.
  Do not reintroduce a `/iron-oak-podcast` basePath or GitHub Pages assumptions.
- `.github/workflows/deploy.yml` runs on push to `main` and only builds (`npx next build`) — it
  does not deploy. The real deploy step is manual: `npx wrangler pages deploy out --project-name
  <cloudflare-project>`. The Cloudflare Pages project name is not recorded anywhere in this repo
  — confirm it (`wrangler pages project list` or the Cloudflare dashboard) before deploying.
- Live deploys are hook-blocked by `.claude/hooks/block-live-deploy.sh`; treat that block as a
  correction, not an obstacle, per repo/global policy.
