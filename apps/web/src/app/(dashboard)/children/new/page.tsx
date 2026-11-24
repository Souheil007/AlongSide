import type { Metadata } from 'next';
import { ChildOnboardingFlow } from '@/components/children/ChildOnboardingFlow';

export const metadata: Metadata = {
  title: 'Add Child · Alongside',
  description:
    'Calibrate our developmental blueprints to your child’s age and select Road 1 (Pre-Device) or Road 2 (Active-Device).',
};

export default function NewChildPage() {
  return (
    <div className="py-2 sm:py-6 max-w-5xl mx-auto">
      <ChildOnboardingFlow />
    </div>
  );
}
