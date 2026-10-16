#!/usr/bin/env node
// verify-seo.mjs — guards the BUILT static export (`out/`) against the search-presence gaps
// found in the 2026-10-16 portfolio audit (sites.md row #9 for this site): no canonical on
// home, and a sitemap.xml lastmod frozen at a hand-typed date instead of tracking the build.
//
// This repo has no test framework (CLAUDE.md: "No test suite exists in this repo."), so this
// script IS the regression bed for these two fixes — wired into scripts/ci-steps.sh. It reads
// only `out/`, the artifact `next build` actually produces; it never inspects source.
//
// Checks:
//   1. out/robots.txt exists, is plain text (not an HTML/SPA shell), has real directives.
//   2. out/sitemap.xml is well-formed XML, every <loc> is an absolute URL on the production
//      host, and no <lastmod> is frozen at the old stale date (2026-03-26) or empty — every
//      entry must carry today's build date (sitemap.ts emits BUILD_DATE for every entry).
//   3. out/index.html carries a self-referencing <link rel="canonical"> to the production
//      home URL.
//   4. out/index.html carries at least one <script type="application/ld+json"> block that
//      parses as valid JSON and contains a node whose @type matches the business's schema.org
//      type (PodcastSeries) — this site already had JSON-LD; this just keeps it from silently
//      breaking.

import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const OUT_DIR = process.argv[2] || 'out';
const PRODUCTION_HOST = 'https://theironandoakpodcast.com';
const STALE_LASTMOD = '2026-03-26';

const failures = [];
function fail(msg) {
  failures.push(msg);
}

function readOut(relPath) {
  const p = join(OUT_DIR, relPath);
  if (!existsSync(p)) {
    fail(`missing ${relPath} in ${OUT_DIR}/ — did the build run?`);
    return null;
  }
  return readFileSync(p, 'utf8');
}

// --- 1. robots.txt -----------------------------------------------------------------------
const robots = readOut('robots.txt');
if (robots !== null) {
  const trimmed = robots.trim();
  if (trimmed.startsWith('<')) {
    fail('robots.txt looks like HTML (an SPA/404 shell), not a real robots.txt file');
  }
  if (!/user-agent:/i.test(robots)) {
    fail('robots.txt has no "User-agent:" directive — not a real robots.txt');
  }
}

// --- 2. sitemap.xml ------------------------------------------------------------------------
const sitemap = readOut('sitemap.xml');
if (sitemap !== null) {
  if (!/^\s*<\?xml/.test(sitemap)) {
    fail('sitemap.xml does not start with an XML declaration — may be served as HTML');
  }
  const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  if (locs.length === 0) {
    fail('sitemap.xml has no <loc> entries');
  }
  for (const loc of locs) {
    if (!loc.startsWith(PRODUCTION_HOST + '/')) {
      fail(`sitemap.xml <loc> is not an absolute production URL: ${loc}`);
    }
  }
  const lastmods = [...sitemap.matchAll(/<lastmod>([^<]*)<\/lastmod>/g)].map((m) => m[1]);
  if (lastmods.length === 0) {
    fail('sitemap.xml has no <lastmod> entries at all');
  }
  const todayUTC = new Date().toISOString().slice(0, 10);
  for (const lm of lastmods) {
    if (!lm) {
      fail('sitemap.xml has an empty <lastmod>');
    } else if (lm.slice(0, 10) === STALE_LASTMOD) {
      fail(`sitemap.xml <lastmod> is still frozen at the old stale date ${STALE_LASTMOD}`);
    } else if (lm.slice(0, 10) !== todayUTC) {
      fail(`sitemap.xml <lastmod> ${lm} does not match today's build date ${todayUTC} — lastmod is not tracking the build`);
    }
  }
}

// --- 3. canonical on home ------------------------------------------------------------------
const home = readOut('index.html');
if (home !== null) {
  const canonicalMatch = home.match(/<link[^>]+rel=["']canonical["'][^>]*>/i);
  if (!canonicalMatch) {
    fail('home page (index.html) has no <link rel="canonical"> tag');
  } else {
    const hrefMatch = canonicalMatch[0].match(/href=["']([^"']+)["']/i);
    const href = hrefMatch ? hrefMatch[1] : null;
    const expected1 = `${PRODUCTION_HOST}/`;
    const expected2 = PRODUCTION_HOST;
    if (href !== expected1 && href !== expected2) {
      fail(`home page canonical href is "${href}", expected "${expected1}"`);
    }
  }

  // --- 4. JSON-LD parses, right schema.org type ---------------------------------------------
  const ldBlocks = [...home.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)].map(
    (m) => m[1],
  );
  if (ldBlocks.length === 0) {
    fail('home page has no application/ld+json block');
  } else {
    let sawPodcastSeries = false;
    for (const block of ldBlocks) {
      let parsed;
      try {
        parsed = JSON.parse(block);
      } catch (e) {
        fail(`home page JSON-LD block does not parse as JSON: ${e.message}`);
        continue;
      }
      const nodes = Array.isArray(parsed['@graph']) ? parsed['@graph'] : [parsed];
      for (const node of nodes) {
        if (node && node['@type'] === 'PodcastSeries') sawPodcastSeries = true;
      }
    }
    if (!sawPodcastSeries) {
      fail('home page JSON-LD has no node with @type "PodcastSeries" (the right schema.org type for this business)');
    }
  }
}

if (failures.length > 0) {
  console.error(`verify-seo: ${failures.length} failure(s) in ${OUT_DIR}/`);
  for (const f of failures) console.error(`  - ${f}`);
  process.exit(1);
}

console.log(`verify-seo: all checks passed against ${OUT_DIR}/`);
