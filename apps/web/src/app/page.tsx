import {
  HeroSection,
  LifespanStageSelector,
  PillarsShowcase,
  CulturePlaygroundDemo,
  DeviceActionHubSpotlight,
  ClinicalAuthorityTestimonials,
  PricingSection,
  FaqSection,
} from '@/components/home';

export default function HomePage() {
  return (
    <div className="flex flex-col gap-8 md:gap-16 pb-20 overflow-x-hidden">
      {/* 1. Hero Section: v2.5.0 Advisory Sanctuary & Trust Signals */}
      <HeroSection />

      {/* 2. Interactive 6-Stage Lifespan Advisory Explorer (0-3, 4-6, 7-9, 10-12, 13-15, 16-18) */}
      <LifespanStageSelector />

      {/* 3. The 3 Core Pillars Architecture Showcase (Academy, Culture Digest, Family Pacts & Devices) */}
      <PillarsShowcase />

      {/* 4. Live Interactive Sunday Youth Culture & Slang Playground Demo */}
      <CulturePlaygroundDemo />

      {/* 5. "Thinking About Buying a Device?" Action Hub Spotlight */}
      <DeviceActionHubSpotlight />

      {/* 6. Clinical Authority Testimonials & Institutional Trust Badges */}
      <ClinicalAuthorityTestimonials />

      {/* 7. Pricing & 7-Day Risk-Free Trial Onboarding */}
      <PricingSection />

      {/* 8. Comprehensive Parenting & Clinical FAQ */}
      <FaqSection />
    </div>
  );
}
