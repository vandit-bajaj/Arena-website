import type { Metadata } from 'next';
import { Oswald, Inter } from 'next/font/google';
import './globals.css';

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

export const metadata: Metadata = {
  title: 'Arena 2026 | DTU Annual Inter Departmental Sports Tournament',
  description:
    'Official website for Arena 2026, the Annual Inter Departmental Sports Tournament organized by the DTU Department of Physical Education & Sports. 16, 17 & 18 October 2026 at DTU Sports Complex.',
  openGraph: {
    title: 'Arena 2026 - DTU Sports Fest',
    description: 'Hustle, Hit, Never Quit. 16, 17 & 18 October 2026 at DTU Sports Complex.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${oswald.variable} ${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900">
        {children}
      </body>
    </html>
  );
}
