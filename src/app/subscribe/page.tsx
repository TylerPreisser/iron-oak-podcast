import type { Metadata } from 'next';
import { SubscribePageClient } from './SubscribePageClient';

export const metadata: Metadata = {
  title: 'Subscribe',
  description: 'Never miss an episode. Join the launch list for The Iron & Oak Podcast.',
};

export default function SubscribePage() {
  return <SubscribePageClient />;
}
