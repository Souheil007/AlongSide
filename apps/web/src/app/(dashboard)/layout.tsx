import type { Metadata } from 'next';
import { MobileNav } from '@/components/shared/MobileNav';
import { FloatingAdvisorBubble } from '@/components/advisor/FloatingAdvisorBubble';
import { DashboardAuthGuard } from '@/components/auth/DashboardAuthGuard';
import { DemoModeBanner } from '@/components/shared/DemoModeBanner';

export const metadata: Metadata = {
  description:
    'The holistic child upbringing, pediatric health, developmental milestone and lifespan family operating system (Ages 0–18).',
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#F7F3EA] bg-[radial-gradient(circle_at_12%_10%,rgba(20,61,43,0.06)_0%,transparent_44%),radial-gradient(circle_at_88%_14%,rgba(232,174,73,0.12)_0%,transparent_44%)] pb-20 md:pb-8 flex flex-col">
      <DemoModeBanner />
      <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex-1">
        <DashboardAuthGuard>{children}</DashboardAuthGuard>
      </main>
      <FloatingAdvisorBubble />
      <MobileNav />
    </div>
  );
}
