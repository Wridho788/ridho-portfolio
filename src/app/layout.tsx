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
    'Frontend & Mobile Engineer specializing in React, TypeScript, Next.js, Flutter, and Android Kotlin. Experienced in building scalable, production-ready web and mobile applications.',
  metadataBase: new URL('https://ridho-portfolio.vercel.app'),
  openGraph: {
    title: 'Ridho — Frontend & Mobile Engineer',
    description:
      'Building scalable, high-performance web and mobile applications.',
    url: 'https://ridho-portfolio.vercel.app',
    siteName: 'Ridho Portfolio',
    images: ['/og-image.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ridho — Frontend & Mobile Engineer',
    description: 'Building scalable, high-performance web and mobile applications.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
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

