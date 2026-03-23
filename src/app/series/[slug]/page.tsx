import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { series } from '@/data/series';
import { SeriesDetailClient } from './SeriesDetailClient';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return [{ slug: series.slug }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (slug !== series.slug) return {};
  return {
    title: series.title,
    description: series.tagline,
  };
}

export default async function SeriesDetailPage({ params }: Props) {
  const { slug } = await params;
  if (slug !== series.slug) notFound();
  return <SeriesDetailClient />;
}
