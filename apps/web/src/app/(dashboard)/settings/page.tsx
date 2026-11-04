import type { Metadata } from 'next';
import { AccountSettingsView } from '@/components/settings/AccountSettingsView';

export const metadata: Metadata = {
  title: 'Account & Family Settings • AlongSide',
  description:
    'Manage your guardian credentials, family children profiles, Annual Hero Pass subscription, and safety notification preferences.',
};

export default function SettingsPage() {
  return (
    <div className="py-6 sm:py-8">
      <AccountSettingsView />
    </div>
  );
}
