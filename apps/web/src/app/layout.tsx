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
  themeColor: '#143D2B',
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;0,6..72,700;1,6..72,400;1,6..72,600&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="flex min-h-screen flex-col bg-[#FBFBF9] text-[#111413] font-sans antialiased selection:bg-[#EAF3EE] selection:text-[#143D2B]">
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
