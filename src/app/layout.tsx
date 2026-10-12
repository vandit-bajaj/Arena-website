import { Suspense } from 'react';
import type { Metadata } from 'next';
import { Oswald, Inter } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { AnnouncementRibbon } from '@/components/AnnouncementRibbon';
import { getSiteConfig, getAnnouncements } from '@/lib/sheets';

const oswald = Oswald({
  variable: '--font-display',
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  display: 'swap',
});

const inter = Inter({
  variable: '--font-sans',
  subsets: ['latin'],
  display: 'swap',
});

export async function generateMetadata(): Promise<Metadata> {
  const config = await getSiteConfig();
  return {
    title: `${config.site_name} | ${config.subtitle}`,
    description: `Official portal for ${config.site_name}, organized by ${config.organiser}. Dates: ${config.event_dates_text} at ${config.venue}. Tagline: ${config.tagline}.`,
    openGraph: {
      title: `${config.site_name} - DTU Sports Fest`,
      description: `${config.tagline}. ${config.event_dates_text} at ${config.venue}.`,
      type: 'website',
    },
    icons: {
      icon: [
        { url: '/favicon.ico', sizes: '48x48' },
        { url: '/sports-council-logo.png', sizes: '375x375', type: 'image/png' },
      ],
      apple: [
        { url: '/sports-council-logo.png', sizes: '375x375', type: 'image/png' },
      ],
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [config, announcements] = await Promise.all([
    getSiteConfig(),
    getAnnouncements(),
  ]);

  const explicitRibbon = (
    config.announcement_ribbon_text ||
    config.announcement ||
    config.ribbon_text ||
    ''
  ).trim();

  const isExplicitlyOff =
    explicitRibbon.toLowerCase() === 'off' || explicitRibbon.toLowerCase() === 'none';

  const latestAnnouncement =
    announcements.length > 0 ? announcements[announcements.length - 1] : null;

  const ribbonText = isExplicitlyOff
    ? ''
    : explicitRibbon
    ? explicitRibbon
    : latestAnnouncement
    ? latestAnnouncement.text
    : '';

  const ribbonDate =
    !explicitRibbon && !isExplicitlyOff && latestAnnouncement
      ? latestAnnouncement.date_time
      : undefined;

  return (
    <html lang="en" className={`${oswald.variable} ${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900">
        <Suspense fallback={<div className="h-16 sm:h-18 bg-white border-b border-slate-200" />}>
          <Navbar siteName={config.site_name} />
        </Suspense>
        <AnnouncementRibbon text={ribbonText} dateTime={ribbonDate} />
        <main className="flex-1">{children}</main>
        <Footer config={config} />
      </body>
    </html>
  );
}
