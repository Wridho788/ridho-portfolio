import { posts } from '@/lib/posts';
import type { Metadata } from 'next';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Writing',
  description: 'Notes on frontend engineering, mobile workflows, and QA automation from Ridho Wahyu Nugroho.',
};

export default function WritingPage() {
  return (
    <>
      <Navigation />
      <main id="main-content" className="site-container min-h-[70vh] py-16 md:py-22">
        <Link href="/" className="text-link text-sm">← Home</Link>
        <div className="mt-12 max-w-2xl">
          <p className="section-kicker mb-3">Writing</p>
          <h1 className="text-5xl font-bold md:text-6xl">Ideas tested in practice.</h1>
          <p className="mt-6 text-lg leading-relaxed text-[var(--color-textMuted)]">Notes on building product interfaces, supporting mobile workflows, and testing what ships.</p>
        </div>
        <div className="mt-15 border-t border-[var(--color-line)]">
          {posts.map((post) => (
            <Link key={post.slug} href={`/writing/${post.slug}`} className="group grid gap-3 border-b border-[var(--color-line)] py-7 md:grid-cols-[160px_1fr] md:gap-8">
              <time dateTime={post.date} className="section-kicker">{new Date(post.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</time>
              <div><h2 className="text-xl font-bold group-hover:text-[var(--color-primary)]">{post.title}</h2><p className="mt-3 max-w-2xl leading-relaxed text-[var(--color-textMuted)]">{post.summary}</p></div>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
