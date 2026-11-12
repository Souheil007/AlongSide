import type { Metadata } from 'next';
import { MobileNav } from '@/components/shared/MobileNav';
import { FloatingAdvisorBubble } from '@/components/advisor/FloatingAdvisorBubble';
import { DashboardAuthGuard } from '@/components/auth/DashboardAuthGuard';

export const metadata: Metadata = {
  title: 'Family OS Dashboard — AlongSide',
  description:
    'The holistic child upbringing, pediatric health, developmental milestone and lifespan family operating system (Ages 0–18).',
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#F4F6F3] bg-[radial-gradient(circle_at_15%_10%,#EBF4EE_0%,transparent_45%),radial-gradient(circle_at_85%_25%,#F7F5EE_0%,transparent_50%),radial-gradient(circle_at_50%_85%,#EAF0EC_0%,transparent_55%)] pb-20 md:pb-8 flex flex-col">
      <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex-1">
        <DashboardAuthGuard>{children}</DashboardAuthGuard>
      </main>
      <FloatingAdvisorBubble />
      <MobileNav />
    </div>
  );
}
