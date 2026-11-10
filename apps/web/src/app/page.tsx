import {
  HeroSection,
  PillarsShowcase,
  LifespanStageSelector,
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

      {/* 2. The 3 Core Pillars Architecture Showcase (Academy, Culture Digest, Family Pacts & Devices) */}
      <PillarsShowcase />

      {/* 3. Interactive 6-Stage Lifespan Advisory Explorer (0-3, 4-6, 7-9, 10-12, 13-15, 16-18) */}
      <LifespanStageSelector />

      {/* 4. Live Interactive Sunday Youth Culture & Slang Playground Demo */}
      <CulturePlaygroundDemo />

      {/* 5. "Thinking About Buying a Device?" Action Hub Spotlight */}
      <DeviceActionHubSpotlight />

      {/* 6. Developmental Authority Testimonials & Trust Badges */}
      <ClinicalAuthorityTestimonials />

      {/* 7. Pricing & 7-Day Risk-Free Trial Onboarding */}
      <PricingSection />

      {/* 8. Comprehensive Parenting & Development FAQ */}
      <FaqSection />
    </div>
  );
}
