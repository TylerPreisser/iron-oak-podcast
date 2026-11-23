#!/usr/bin/env bash
# Deploy a commit that is on origin/main and green on ci-local to Cloudflare Pages `iron-oak-podcast`
# (https://theironandoakpodcast.com) from the PC, in a clean scratch worktree. Mirrors the build in
# .github/workflows/deploy.yml (npm ci, npx next build -> out/) plus the manual `wrangler pages deploy out` step.
# Run it through the launcher, which supplies CLOUDFLARE_API_TOKEN from the vault:
#   _workspace/tools/deploy.sh <repo dir> <sha> [--dry-run]
# --dry-run: every gate and the full build; only read-only Cloudflare calls; nothing is deployed.
set -euo pipefail

SHA_ARG=""; DRY=0
for a in "$@"; do
  case "$a" in
    --dry-run) DRY=1 ;;
    -*) echo "unknown flag: $a (usage: deploy-from-clean-checkout.sh <sha on origin/main> [--dry-run])" >&2; exit 2 ;;
    *) [ -z "$SHA_ARG" ] || { echo "only one sha" >&2; exit 2; }; SHA_ARG="$a" ;;
  esac
done
[ -n "$SHA_ARG" ] || { echo "usage: deploy-from-clean-checkout.sh <sha on origin/main> [--dry-run]" >&2; exit 2; }
[ -n "${CLOUDFLARE_API_TOKEN:-}" ] || { echo "FATAL: CLOUDFLARE_API_TOKEN is unset; run through _workspace/tools/deploy.sh" >&2; exit 1; }
: "${CLOUDFLARE_ACCOUNT_ID:?FATAL: CLOUDFLARE_ACCOUNT_ID is unset; run through _workspace/tools/deploy.sh}"

REPO="$(cd "$(dirname "$0")/.." && git rev-parse --show-toplevel)"
HOST="https://theironandoakpodcast.com"
PROJECT="iron-oak-podcast"
GH_REPO="TylerPreisser/iron-oak-podcast"
WRANGLER="wrangler@4.161.0"
wr() { npx --yes "$WRANGLER" "$@"; }

REFUSALS=0
refuse() {
  if [ "$DRY" = 1 ]; then echo "DRY-RUN would refuse: $*" >&2; REFUSALS=$((REFUSALS + 1)); else echo "FATAL: $*" >&2; exit 1; fi
}
[ "$DRY" = 1 ] && echo "== DRY RUN: nothing will be changed in production"

# One deployer at a time.
LOCK="${TMPDIR:-/tmp}/iron-oak-podcast-deploy.lock"
exec 9>"$LOCK"
flock -n 9 || { echo "FATAL: another iron-oak-podcast deploy holds $LOCK" >&2; exit 1; }

# ---- gates: on origin/main, green ci-local ----
git -C "$REPO" fetch -q origin main
SHA="$(git -C "$REPO" rev-parse "${SHA_ARG}^{commit}")"
git -C "$REPO" merge-base --is-ancestor "$SHA" origin/main || refuse "$SHA is not on origin/main (push it first)"
GH_TOKEN="$(gh auth token --user TylerPreisser 2>/dev/null || true)"; export GH_TOKEN
STATUS_LINE="$(gh api "repos/$GH_REPO/commits/$SHA/status" --jq '[.statuses[] | select(.context=="ci-local")][0] | "\(.state)\t\(.description)"' 2>/dev/null || true)"
STATE="${STATUS_LINE%%$'\t'*}"
if [ "$STATE" = "success" ]; then
  echo "ci-local green for $SHA: ${STATUS_LINE#*$'\t'}"
else
  refuse "$SHA has no green ci-local status (found '${STATE:-none}'); run _workspace/tools/ci-local/run.sh --repo $REPO --status $SHA"
fi
unset GH_TOKEN

# ---- clean scratch worktree of exactly $SHA ----
SCRATCH="$(mktemp -d)"; WT="$SCRATCH/deploy"
git -C "$REPO" worktree add --detach "$WT" "$SHA" >/dev/null
cleanup() { git -C "$REPO" worktree remove --force "$WT" >/dev/null 2>&1 || true; rm -rf "$SCRATCH"; }
trap cleanup EXIT
BUILD_SHA="$(git -C "$WT" rev-parse HEAD)"
[ "$BUILD_SHA" = "$SHA" ] || { echo "FATAL: worktree HEAD $BUILD_SHA != requested $SHA" >&2; exit 1; }
TS="$(date -u +%Y%m%dT%H%M%SZ)"
VERSION="${BUILD_SHA:0:7}-$TS"

# ---- BUILD (uploads nothing) ----
echo "== building $BUILD_SHA ($VERSION)"
(cd "$WT" && npm ci --no-audit --no-fund > "$SCRATCH/ci.log" 2>&1 || { cat "$SCRATCH/ci.log"; exit 1; })
(cd "$WT" && npx next build)
[ -f "$WT/out/index.html" ] || { echo "FATAL: build produced no out/index.html" >&2; exit 1; }
(cd "$WT" && node scripts/verify-seo.mjs out)
[ -z "$(git -C "$WT" status --porcelain)" ] || { echo "FATAL: tree is dirty after the build: $(git -C "$WT" status --porcelain | head -5)" >&2; exit 1; }

# ---- prove the token and record the rollback target BEFORE rolling out ----
wr whoami > "$SCRATCH/whoami.txt" 2>&1 || true
grep -q "$CLOUDFLARE_ACCOUNT_ID" "$SCRATCH/whoami.txt" || { echo "FATAL: the Cloudflare token cannot see account $CLOUDFLARE_ACCOUNT_ID" >&2; exit 1; }
echo "cloudflare token ok for account $CLOUDFLARE_ACCOUNT_ID"
wr pages deployment list --project-name "$PROJECT" --environment production --json > "$SCRATCH/deps.json" 2> "$SCRATCH/deps.err" \
  || { echo "FATAL: cannot list Pages deployments, so no rollback target:" >&2; cat "$SCRATCH/deps.err" >&2; exit 1; }
PREV="$(python3 - "$SCRATCH/deps.json" <<'PY'
import json, sys
raw = open(sys.argv[1]).read()
d = json.loads(raw[raw.index("["):raw.rindex("]") + 1])
if not d:
    print("NONE\t-"); sys.exit(0)
c = max(d, key=lambda x: x.get("created_on") or x.get("Created") or "")
i = c.get("id") or c.get("Id") or "PARSE_ERROR"
sha = ((c.get("deployment_trigger") or {}).get("metadata") or {}).get("commit_hash") or c.get("Source") or "?"
print(i + "\t" + str(sha))
PY
)"
PREV_ID="${PREV%%$'\t'*}"; PREV_SHA="${PREV#*$'\t'}"
[ "$PREV_ID" != "PARSE_ERROR" ] || { echo "FATAL: cannot read the current deployment id; first bytes:" >&2; head -c 600 "$SCRATCH/deps.json" >&2; exit 1; }
# Pages rollback = the dashboard, or this API call (the token stays in the environment).
ROLLBACK="curl -fsS -X POST -H \"Authorization: Bearer \$CLOUDFLARE_API_TOKEN\" https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/pages/projects/$PROJECT/deployments/$PREV_ID/rollback  (run via _workspace/tools/deploy.sh's token; or redeploy the old sha $PREV_SHA)"
echo "ROLLBACK target: deployment $PREV_ID (commit $PREV_SHA)"
echo "ROLLBACK command: $ROLLBACK"

# Fingerprint of this build: the hashed /_next/static assets the home page references.
fp() { grep -o '/_next/static/[A-Za-z0-9_./-]*\.\(js\|css\)' | sort -u; }
fp < "$WT/out/index.html" > "$SCRATCH/want.txt"
[ -s "$SCRATCH/want.txt" ] || { echo "FATAL: no hashed assets found in out/index.html" >&2; exit 1; }

if [ "$DRY" = 1 ]; then
  echo "== DRY RUN: would run: wrangler pages deploy out --project-name $PROJECT --branch main --commit-hash $BUILD_SHA --commit-message $VERSION"
  echo "== DRY RUN: would then fetch $HOST and require its asset set to equal this build's ($(wc -l < "$SCRATCH/want.txt") assets)"
  echo "DRY-RUN COMPLETE for $BUILD_SHA: $REFUSALS gate(s) would refuse; nothing was deployed. Rollback: $ROLLBACK"
  exit 0
fi
[ "$REFUSALS" = 0 ] || exit 1

# ---- ROLL OUT (a separate command from the build above) ----
(cd "$WT" && wr pages deploy out --project-name "$PROJECT" --branch main --commit-hash "$BUILD_SHA" --commit-message "$VERSION" --commit-dirty=false)

# ---- prove the LIVE host serves this build ----
ok=0
for i in 1 2 3 4 5 6 7 8 9 10; do
  curl -fsS -H 'cache-control: no-cache' "$HOST/?v=$TS$i" 2>/dev/null | fp > "$SCRATCH/got.txt" || true
  if cmp -s "$SCRATCH/want.txt" "$SCRATCH/got.txt"; then ok=1; break; fi
  sleep 6
done
if [ "$ok" != 1 ]; then
  echo "FAILED: $HOST does not serve the assets of build $BUILD_SHA" >&2
  diff "$SCRATCH/want.txt" "$SCRATCH/got.txt" | head -10 >&2 || true
  echo "ROLLBACK: $ROLLBACK" >&2; exit 1
fi
echo "LIVE OK: $HOST serves $(wc -l < "$SCRATCH/want.txt") asset(s) identical to build $BUILD_SHA"
echo "DEPLOYED $BUILD_SHA ($VERSION) to $HOST; previous deployment $PREV_ID ($PREV_SHA)"
echo "ROLLBACK: $ROLLBACK"
