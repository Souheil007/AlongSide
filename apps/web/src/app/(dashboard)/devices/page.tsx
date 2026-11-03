import type { Metadata } from 'next';
import { DevicesManagementView } from '@/components/devices/DevicesManagementView';

export const metadata: Metadata = {
  title: 'Device Profiles & Curfew Governance — AlongSide Parent OS',
  description:
    'Monitor enrolled family smartphones, configure bedtime app lock schedules, and deploy OTA Apple and Android Enterprise profiles.',
};

export default function DevicesPage() {
  return (
    <div className="py-6 sm:py-8">
      <DevicesManagementView />
    </div>
  );
}
