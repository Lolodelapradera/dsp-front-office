import { Hero } from '@/components/sections/Hero';
import { Problem } from '@/components/sections/Problem';
import { Services } from '@/components/sections/Services';
import { WhyMe } from '@/components/sections/WhyMe';
import { Examples } from '@/components/sections/Examples';
import { CallToAction } from '@/components/sections/CallToAction';

export function Home() {
  return (
    <>
      <Hero />
      <Problem />
      <Services />
      <WhyMe />
      <Examples />
      <CallToAction />
    </>
  );
}
