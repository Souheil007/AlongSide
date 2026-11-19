import * as React from 'react';
import {
  HeroSection,
  ProductStudioSection,
  ScreenPactSection,
  ScienceFoundationSection,
  PricingAndFaqSection,
} from '@/components/home';

export default function HomePage() {
  return (
    <div className="flex flex-col overflow-x-hidden">
      <HeroSection />
      <ProductStudioSection />
      <ScreenPactSection />
      <ScienceFoundationSection />
      <PricingAndFaqSection />
    </div>
  );
}
