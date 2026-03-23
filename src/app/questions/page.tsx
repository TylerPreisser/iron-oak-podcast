import type { Metadata } from 'next';
import { QuestionsPageClient } from './QuestionsPageClient';

export const metadata: Metadata = {
  title: 'Questions',
  description: 'The questions people are actually asking. 100+ searchable faith questions across 12 episodes.',
};

export default function QuestionsPage() {
  return <QuestionsPageClient />;
}
