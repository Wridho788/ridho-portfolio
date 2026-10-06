import type { Metadata } from 'next';
import { Inter, Inter_Tight } from 'next/font/google';
import './globals.css';
import MotionEffects from '@/components/MotionEffects';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const interTight = Inter_Tight({ subsets: ['latin'], weight: ['600', '700', '800'], variable: '--font-inter-tight' });

export const metadata: Metadata = {
  title: {
    default: 'Ridho Wahyu Nugroho | Frontend & Mobile Engineer',
    template: '%s | Ridho Wahyu Nugroho',
  },
  description:
    'Ridho Wahyu Nugroho builds reliable web and mobile products with React, Next.js, Flutter and Kotlin, and verifies critical journeys with Playwright and Maestro.',
  metadataBase: new URL('https://ridho-portfolio.vercel.app'),
  openGraph: {
    title: 'Ridho Wahyu Nugroho | Frontend & Mobile Engineer',
    description: 'Web and mobile products built for real use, with testing that helps keep them working.',
    url: 'https://ridho-portfolio.vercel.app',
    siteName: 'Ridho Wahyu Nugroho',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Ridho Wahyu Nugroho — Frontend & Mobile Engineer' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ridho Wahyu Nugroho | Frontend & Mobile Engineer',
    description: 'Web and mobile products built for real use, with testing that helps keep them working.',
    images: ['/og-image.png'],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${interTight.variable}`}>
      <body>
        <a href="#main-content" className="skip-link">Skip to content</a>
        {children}
        <MotionEffects />
      </body>
    </html>
  );
}
