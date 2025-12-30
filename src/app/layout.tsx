import type { Metadata } from 'next';
import { Inter, Sora } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
});

export const metadata: Metadata = {
  title: {
    default: 'Ridho — Frontend & Mobile Engineer',
    template: '%s | Ridho',
  },
  description:
    'Frontend & Mobile Engineer specializing in React, TypeScript, Next.js, Flutter, and Android Kotlin. Focused on scalable architecture, performance, and production-ready applications.',
  metadataBase: new URL('https://ridho-portfolio.vercel.app'),
  openGraph: {
    title: 'Ridho — Frontend & Mobile Engineer',
    description:
      'Building scalable, high-performance web and mobile applications.',
    url: 'https://ridho-portfolio.vercel.app',
    siteName: 'Ridho Portfolio',
    images: ['/images/profile.jpeg'],
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${sora.variable}`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}

