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
  return <EpisodeDetailClient episode={episode} />;
}
