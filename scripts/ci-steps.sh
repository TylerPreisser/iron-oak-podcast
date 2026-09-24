#!/usr/bin/env bash
# THIS REPO'S CI GATE: the steps of .github/workflows/deploy.yml, in its order (Node 20: npm ci, npx next build).
# That workflow only builds ("Deploy handled manually via wrangler CLI"), so it is a validating workflow and now
# runs on workflow_dispatch only; this file is the gate. Run by the canonical runner
# (_workspace/tools/ci-local/run.sh, through the global pre-push hook) inside a CLEAN worktree ($WT); the first
# failing step ends the gate, as the workflow stops. Keep it in step with deploy.yml.
# Helpers: run <name> <dir> <command...>; $CI_PYTHON3 is /usr/bin/python3 (3.9); $LOG is the gate's log.
CI_NODE=20
ci_steps() {
  run npm-ci . npm ci --no-audit --no-fund
  run next-build . npx next build
}
ci_summary() { printf 'next build green; out %s files' "$(find "$WT/out" -type f 2>/dev/null | wc -l | tr -d ' ')"; }
