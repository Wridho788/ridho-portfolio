import Link from 'next/link';
import { posts } from '@/lib/posts';
import Reveal from './Reveal';

export default function Writing() {
  const latest = posts.slice(0, 3);

  return (
    <section id="writing" className="py-32">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal>
          <div className="flex items-end justify-between flex-wrap gap-4 mb-16">
            <div>
              <h2 className="text-3xl md:text-4xl font-semibold mb-4">
                Writing
              </h2>

              <p className="text-[--color-textMuted] max-w-xl">
                Notes on frontend engineering, mobile development, and QA
                automation, drawn from real project work.
              </p>
            </div>

            <Link
              href="/writing"
              className="text-[--color-primary] text-sm hover:underline inline-flex items-center gap-1"
            >
              View all writing →
            </Link>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-8">
          {latest.map((post, i) => (
            <Reveal key={post.slug} delay={i * 100}>
              <Link
                href={`/writing/${post.slug}`}
                className="h-full flex flex-col bg-[--color-surface] border border-white/10 rounded-xl p-6 hover:shadow-[--shadow-soft] transition group"
              >
                <p className="text-sm text-[--color-textMuted] mb-3">
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>

                <h3 className="text-lg font-semibold mb-2 group-hover:text-[--color-primary] transition">
                  {post.title}
                </h3>

                <p className="text-sm text-[--color-textMuted]">
                  {post.summary}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
