import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Family Dashboard — AlongSide Parent OS',
  description:
    'Calm developmental parenting dashboard with personalized Road 1 readiness scoring and Road 2 bedtime lockout governance.',
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#FDFBF7]">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {children}
      </div>
    </div>
  );
}
