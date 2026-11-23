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
      <div className="content-auto">
        <ProductStudioSection />
      </div>
      <div className="content-auto">
        <ScreenPactSection />
      </div>
      <div className="content-auto">
        <ScienceFoundationSection />
      </div>
      <div className="content-auto">
        <PricingAndFaqSection />
      </div>
    </div>
  );
}
