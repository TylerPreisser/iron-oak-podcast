import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { questions } from '@/data/questions';
import { QuestionDetailClient } from './QuestionDetailClient';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return questions.map((q) => ({ slug: q.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const question = questions.find((q) => q.slug === slug);
  if (!question) return {};
  return {
    title: question.text,
    description: `From Episode ${question.episodeNumber}: ${question.episodeTitle}. Explore this question from The Iron & Oak Podcast.`,
  };
}

export default async function QuestionDetailPage({ params }: Props) {
  const { slug } = await params;
  const question = questions.find((q) => q.slug === slug);
  if (!question) notFound();

  // Find related questions (same episode, excluding current)
  const related = questions
    .filter((q) => q.episodeSlug === question.episodeSlug && q.id !== question.id)
    .slice(0, 4);

  return <QuestionDetailClient question={question} related={related} />;
}
