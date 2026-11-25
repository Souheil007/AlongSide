import type { Metadata, Viewport } from 'next';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Inter, JetBrains_Mono, Newsreader } from 'next/font/google';
import './globals.css';
import { QueryProvider } from '@/components/providers/QueryProvider';
import { PostHogProvider } from '@/components/providers/PostHogProvider';
import { Header } from '@/components/shared/Header';
import { Footer } from '@/components/shared/Footer';
import { OfflineBanner } from '@/components/shared/OfflineBanner';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const newsreader = Newsreader({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-newsreader',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: {
    default: 'Alongside',
    template: '%s | Alongside',
  },
  description:
    'Age-calibrated parenting guidance from 0 to 18: developmental guides, exact words for hard moments, phone readiness checks, and built-in Apple & Google parental control blueprints.',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Alongside',
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
    <html
      lang="en"
      className={`h-full scroll-smooth ${inter.variable} ${newsreader.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <link rel="dns-prefetch" href="https://assets.alongside.care" />
        <link
          rel="preconnect"
          href="https://assets.alongside.care"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://img.youtube.com" />
        <link
          rel="preconnect"
          href="https://img.youtube.com"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://i.ytimg.com" />
        <link
          rel="preconnect"
          href="https://i.ytimg.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="flex min-h-screen flex-col bg-[#FBFBF9] text-[#111413] font-sans antialiased selection:bg-[#EAF3EE] selection:text-[#143D2B]">
        <QueryProvider>
          <PostHogProvider>
            <OfflineBanner />
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </PostHogProvider>
        </QueryProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
