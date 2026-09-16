import type { Metadata } from 'next';
import { Inter, Sora } from 'next/font/google';
import './globals.css';
import CursorSpotlight from '@/components/CursorSpotlight';
import CommandPalette from '@/components/CommandPalette';

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
    default: 'Ridho — Frontend Engineer',
    template: '%s | Ridho',
  },
  description:
    'Frontend Engineer specializing in React, Next.js, and TypeScript, with experience in frontend architecture, state management, REST API integration, and responsive UI development — continuing to expand into full-stack development.',
  metadataBase: new URL('https://ridho-portfolio.vercel.app'),
  openGraph: {
    title: 'Ridho — Frontend Engineer',
    description:
      'Building production-ready web and mobile applications with React, Next.js, and TypeScript.',
    url: 'https://ridho-portfolio.vercel.app',
    siteName: 'Ridho Portfolio',
    images: ['/og-image.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ridho — Frontend Engineer',
    description: 'Building production-ready web and mobile applications with React, Next.js, and TypeScript.',
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
        <CursorSpotlight />
        {children}
        <CommandPalette />
      </body>
    </html>
  );
}

