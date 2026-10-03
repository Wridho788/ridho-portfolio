import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function NotFound() {
  return (
    <>
      <Navigation />
      <main id="main-content" className="site-container flex min-h-[70vh] flex-col items-start justify-center py-20">
        <p className="section-kicker mb-4">404 / Page not found</p>
        <h1 className="max-w-xl text-4xl font-bold md:text-6xl">This page went missing.</h1>
        <p className="mt-5 max-w-lg leading-relaxed text-[var(--color-textMuted)]">The link may have changed. You can return to the portfolio or explore the selected work.</p>
        <div className="mt-9 flex flex-wrap gap-3"><Link href="/" className="button-primary">Back to home</Link><Link href="/#projects" className="button-secondary">Explore work</Link></div>
      </main>
      <Footer />
    </>
  );
}
