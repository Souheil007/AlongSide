import type { Metadata } from 'next';
import { ChildOnboardingFlow } from '@/components/children/ChildOnboardingFlow';

export const metadata: Metadata = {
  title: 'Add Child Profile • AlongSide Parent Calm System',
  description:
    'Calibrate our developmental blueprints to your child’s age and select Road 1 (Pre-Device) or Road 2 (Active-Device).',
};

export default function NewChildPage() {
  return (
    <div className="min-h-[calc(100vh-8rem)] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <ChildOnboardingFlow />
      </div>
    </div>
  );
}
