import type { Metadata } from 'next';
import { Suspense } from 'react';
import { DigestDashboardClient } from '@/components/digest/DigestDashboardClient';
import { Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Sunday Youth Culture Digest — AlongSide',
  description:
    'Weekly tween culture briefings, emerging slang decoders, hidden exploit alerts, and dinner table conversation starters.',
};

export default function DigestPage() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto py-2">
      {/* Header */}
      <header className="space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full border border-purple-200 bg-purple-50/80 px-3 py-1 text-xs font-semibold text-purple-800">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Sunday Youth Culture Digest</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
          The Weekly Tween Intelligence Briefing
        </h1>

        <p className="text-slate-600 text-sm sm:text-base max-w-3xl leading-relaxed">
          Stay fluently ahead of adolescent slang, algorithmic viral trends, and covert device exploits without becoming the family police officer.
        </p>
      </header>

      {/* Main Client Dashboard */}
      <Suspense
        fallback={
          <div className="h-96 rounded-3xl border border-slate-200 bg-white p-8 animate-pulse flex items-center justify-center">
            <p className="text-sm text-slate-400">Loading Sunday Digest briefing...</p>
          </div>
        }
      >
        <DigestDashboardClient />
      </Suspense>
    </div>
  );
}
