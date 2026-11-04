import {
  HeroSection,
  LifespanStageSelector,
  PillarsShowcase,
  DeviceActionHubSpotlight,
  ClinicalAuthorityTestimonials,
  PricingSection,
  FaqSection,
} from '@/components/home';

export default function HomePage() {
  return (
    <div className="flex flex-col gap-8 md:gap-16 pb-20 overflow-x-hidden">
      {/* 1. Hero Section: 0-18 Lifespan Proposition & Trust Signals */}
      <HeroSection />

      {/* 2. Interactive Lifespan Stage Selector (0-3, 4-6, 7-9, 10-18) */}
      <LifespanStageSelector />

      {/* 3. The 5 Balanced Pillars Architecture Showcase */}
      <PillarsShowcase />

      {/* 4. "Thinking About Buying a Device?" Action Hub Spotlight */}
      <DeviceActionHubSpotlight />

      {/* 5. Clinical Authority Testimonials & Institutional Trust Badges */}
      <ClinicalAuthorityTestimonials />

      {/* 6. Pricing & 7-Day Risk-Free Trial Onboarding */}
      <PricingSection />

      {/* 7. Comprehensive Parenting & Clinical FAQ */}
      <FaqSection />
    </div>
  );
}
