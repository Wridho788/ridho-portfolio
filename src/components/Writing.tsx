import Link from 'next/link';
import { posts } from '@/lib/posts';
import MobileSlider from './MobileSlider';

export default function Writing() {
  return (
    <section id="writing" className="py-20 md:py-26">
      <div className="site-container">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="section-kicker mb-4">(Writing)</p>
            <h2 data-reveal="mask" className="heading-section">Notes from the work.</h2>
          </div>
          <Link href="/writing" className="text-link text-sm">View all articles ↗</Link>
        </div>
        <MobileSlider label="Writing" desktopClassName="" always>
          {posts.map((post) => (
            <Link key={post.slug} href={`/writing/${post.slug}`} className="writing-card flex flex-col p-7">
              <time dateTime={post.date} className="section-kicker">{new Date(post.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</time>
              <h3 className="mt-8 text-xl font-bold leading-snug"><span className="writing-title">{post.title}</span></h3>
              <p className="mt-3 line-clamp-3 flex-1 leading-relaxed text-[var(--color-textMuted)]">{post.summary}</p>
              <span className="mt-7 text-sm font-semibold">Read article ↗</span>
            </Link>
          ))}
        </MobileSlider>
      </div>
    </section>
  );
}
