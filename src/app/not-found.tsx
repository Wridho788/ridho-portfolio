import Link from 'next/link';
import Navigation from '@/components/Navigation';

export default function NotFound() {
  return (
    <>
      <Navigation />
      <section className="min-h-screen flex items-center justify-center px-6 pt-24">
        <div className="max-w-lg text-center">
          <p className="text-[--color-primary] font-mono text-sm mb-4">
            {'{ status: 404 }'}
          </p>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            This route doesn&apos;t exist
          </h1>

          <p className="text-[--color-textMuted] mb-10 leading-relaxed">
            Either the link is broken, or you just found an edge case I
            didn&apos;t handle — either way, let&apos;s get you back to
            something real.
          </p>

          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/"
              className="bg-[--color-primary] text-white px-6 py-3 rounded-xl font-medium hover:shadow-[--shadow-glow] transition"
            >
              Back to Home
            </Link>

            <Link
              href="/#projects"
              className="border border-white/20 px-6 py-3 rounded-xl hover:bg-white/5 transition"
            >
              View Projects
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
