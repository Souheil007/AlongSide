import type { Metadata } from 'next';
import { Suspense } from 'react';
import { DigestDashboardClient } from '@/components/digest/DigestDashboardClient';

export const metadata: Metadata = {
  title: 'Sunday Youth Culture Digest — AlongSide',
  description:
    'Weekly youth culture briefings, emerging slang decoders, hidden exploit alerts, and Sunday dinner conversation starters.',
};

export default function DigestPage() {
  return (
    <main className="min-h-screen py-2">
      <Suspense
        fallback={
          <div className="max-w-7xl mx-auto h-96 rounded-3xl border border-slate-200 bg-white p-8 animate-pulse flex items-center justify-center">
            <p className="text-sm text-slate-400">Loading Sunday Digest briefing...</p>
          </div>
        }
      >
        <DigestDashboardClient />
      </Suspense>
    </main>
  );
}
