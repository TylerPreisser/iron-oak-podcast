import type { Metadata } from 'next';
import { ContactPageClient } from './ContactPageClient';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with The Iron & Oak Podcast team.',
};

export default function ContactPage() {
  return <ContactPageClient />;
}
