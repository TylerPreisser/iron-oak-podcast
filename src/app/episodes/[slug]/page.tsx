import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { episodes } from '@/data/episodes';
import { EpisodeDetailClient } from './EpisodeDetailClient';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return episodes.map((ep) => ({ slug: ep.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const episode = episodes.find((ep) => ep.slug === slug);
  if (!episode) return {};
  return {
    title: `EP ${String(episode.number).padStart(2, '0')}: ${episode.title}`,
    description: episode.subtitle,
  };
}

export default async function EpisodeDetailPage({ params }: Props) {
  const { slug } = await params;
  const episode = episodes.find((ep) => ep.slug === slug);
  if (!episode) notFound();

  const episodeJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'PodcastEpisode',
    name: episode.title,
    description: episode.subtitle,
    episodeNumber: episode.number,
    partOfSeries: {
      '@type': 'PodcastSeries',
      name: 'The Iron and Oak Podcast',
      url: 'https://theironandoakpodcast.com',
    },
    url: `https://theironandoakpodcast.com/episodes/${episode.slug}`,
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://theironandoakpodcast.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Episodes',
        item: 'https://theironandoakpodcast.com/episodes',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: episode.title,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(episodeJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <EpisodeDetailClient episode={episode} />
    </>
  );
}
