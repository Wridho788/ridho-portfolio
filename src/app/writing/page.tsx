import { posts } from '@/lib/posts';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Writing',
  description: 'Notes and insights on frontend engineering, mobile development, and building production-ready applications.',
};

export default function WritingPage() {
  return (
    <section className="py-32">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Writing
        </h1>

        <p className="text-[--color-textMuted] max-w-xl mb-16">
          Notes and insights on frontend engineering, mobile development, and
          building production-ready applications.
        </p>

        <div className="space-y-10">
          {posts.map((post) => (
            <a
              key={post.slug}
              href={`/writing/${post.slug}`}
              className="block border-b border-white/10 pb-6 hover:text-[--color-primary] transition"
            >
              <h2 className="text-2xl font-semibold">
                {post.title}
              </h2>

              <p className="text-[--color-textMuted] mt-2">
                {post.summary}
              </p>

              <p className="text-sm text-[--color-textMuted] mt-3">
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
