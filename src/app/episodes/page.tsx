import type { Metadata } from 'next';
import { EpisodesPageClient } from './EpisodesPageClient';

export const metadata: Metadata = {
  title: 'Episodes',
  description: 'Every Episode. Every Question. Search by topic, question, or phase.',
};

export default function EpisodesPage() {
  return <EpisodesPageClient />;
}
