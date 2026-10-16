import type { MetadataRoute } from 'next';
import { episodes } from '@/data/episodes';
import { questions } from '@/data/questions';
import { series } from '@/data/series';

const BASE_URL = 'https://theironandoakpodcast.com';

// `lastmod` was previously hand-typed in public/sitemap.xml and froze at 2026-03-26 the day
// someone forgot to bump it (search-presence audit 2026-10-16). This file is a Next.js
// metadata-route convention (supported with `output: "export"`): it runs once per `next
// build` and its return value is written to a static sitemap.xml in `out/`, so every entry's
// lastmod is the build date — it can never go stale again without a rebuild, and every
// deploy is itself a rebuild. None of the content in `src/data/*` carries a per-item
// published/updated date today; if one is added later, prefer it over BUILD_DATE for that URL.
const BUILD_DATE = new Date();

// Required by `output: "export"` for a metadata-route handler: forces this to render once at
// build time into a static sitemap.xml rather than needing a server to run it per-request.
export const dynamic = 'force-static';

type ChangeFrequency = NonNullable<MetadataRoute.Sitemap[number]['changeFrequency']>;

function entry(path: string, changeFrequency: ChangeFrequency, priority: number): MetadataRoute.Sitemap[number] {
  return {
    url: `${BASE_URL}${path}`,
    lastModified: BUILD_DATE,
    changeFrequency,
    priority,
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [
    entry('/', 'monthly', 1.0),
    entry('/about', 'monthly', 0.8),
    entry('/episodes', 'weekly', 0.9),
  ];

  for (const episode of episodes) {
    entries.push(entry(`/episodes/${episode.slug}`, 'weekly', 0.8));
  }

  entries.push(entry('/questions', 'monthly', 0.7));
  for (const question of questions) {
    entries.push(entry(`/questions/${question.slug}`, 'monthly', 0.5));
  }

  entries.push(entry('/series', 'monthly', 0.7));
  entries.push(entry(`/series/${series.slug}`, 'monthly', 0.7));

  entries.push(entry('/subscribe', 'monthly', 0.6));
  entries.push(entry('/contact', 'monthly', 0.5));
  entries.push(entry('/merch', 'monthly', 0.3));
  entries.push(entry('/resources', 'monthly', 0.3));

  return entries;
}
