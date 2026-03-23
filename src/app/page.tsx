import { HeroSection } from '@/components/home/HeroSection';
import { ConceptSection } from '@/components/home/ConceptSection';
import { FeaturedSeries } from '@/components/home/FeaturedSeries';
import { HostsSection } from '@/components/home/HostsSection';
import { SubscribeSection } from '@/components/home/SubscribeSection';

export default function Home() {
  return (
    <>
      <HeroSection />
      <ConceptSection />
      <FeaturedSeries />
      <HostsSection />
      <SubscribeSection />
    </>
  );
}
