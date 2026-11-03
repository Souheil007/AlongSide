import type { Metadata, Viewport } from 'next';
import './globals.css';
import { QueryProvider } from '@/components/providers/QueryProvider';
import { Header } from '@/components/shared/Header';
import { Footer } from '@/components/shared/Footer';
import { OfflineBanner } from '@/components/shared/OfflineBanner';

export const metadata: Metadata = {
  title: 'AlongSide — Parent Intelligence & Family Operating System',
  description:
    'The empathetic digital-parenting platform replacing screen conflict with calm developmental science, bilateral family agreements, and neutral automated enforcement.',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'AlongSide',
  },
};

export const viewport: Viewport = {
  themeColor: '#0D9488',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="flex min-h-screen flex-col bg-[#FDFBF7] text-slate-900 font-sans antialiased">
        <QueryProvider>
          <OfflineBanner />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </QueryProvider>
      </body>
    </html>
  );
}
