import Link from 'next/link';
import { posts } from '@/lib/posts';
import MobileSlider from './MobileSlider';

export default function Writing() {
  return (
    <section id="writing" className="border-y border-[var(--color-line)] bg-white py-20 md:py-26">
      <div className="site-container">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-5">
          <div><p className="section-kicker mb-3">04 / Writing</p><h2 className="text-4xl font-bold md:text-5xl">Notes from the work.</h2></div>
          <Link href="/writing" className="text-link text-sm">View all articles ↗</Link>
        </div>
        <MobileSlider label="Writing" desktopClassName="grid gap-4 md:grid-cols-2">
          {posts.slice(0, 2).map((post) => (
            <Link key={post.slug} href={`/writing/${post.slug}`} className="group flex flex-col rounded-xl border border-[var(--color-line)] bg-[var(--color-background)] p-7 hover:border-[var(--color-primary)]">
              <time dateTime={post.date} className="section-kicker">{new Date(post.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</time>
              <h3 className="mt-7 text-xl font-bold group-hover:text-[var(--color-primary)]">{post.title}</h3>
              <p className="mt-3 flex-1 leading-relaxed text-[var(--color-textMuted)]">{post.summary}</p>
              <span className="mt-7 text-sm font-bold text-[var(--color-primary)]">Read article ↗</span>
            </Link>
          ))}
        </MobileSlider>
      </div>
    </section>
  );
}
