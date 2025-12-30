import { posts } from '@/lib/posts';
import { notFound } from 'next/navigation';
import React from 'react';
import Navigation from '@/components/Navigation';

export function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.title,
    description: post.summary,
  };
}

// Article content for each post
const articleContent: Record<string, React.ReactElement> = {
  'state-management-is-a-product-decision': (
    <>
      <p className="mb-6">
        State management is often treated as a purely technical choice. Teams debate Redux vs. Zustand vs. Context API based on bundle size, API ergonomics, or what&apos;s trending on Twitter. But in reality, state management directly affects how fast teams ship features and maintain systems over time.
      </p>

      <h2 className="text-2xl font-semibold mt-12 mb-4">The Real Cost of State Management</h2>
      <p className="mb-6">
        When I joined the ERP-POS project, the team was using Redux with a complex middleware setup. Every new feature required touching multiple files: actions, reducers, selectors, and saga files. The cognitive overhead was real — new developers took weeks to feel productive.
      </p>

      <p className="mb-6">
        We switched to Zustand not because it was trendy, but because it reduced cognitive load for the team. Suddenly, state updates became colocated with their logic. Feature development accelerated by 40%.
      </p>

      <h2 className="text-2xl font-semibold mt-12 mb-4">Decision Framework</h2>
      <p className="mb-6">
        Here&apos;s what I consider now when choosing state management:
      </p>

      <ul className="list-disc list-inside mb-6 space-y-2 text-[--color-textMuted]">
        <li>Team size and experience level</li>
        <li>Feature velocity requirements</li>
        <li>Debugging and testing needs</li>
        <li>Long-term maintenance burden</li>
      </ul>

      <p className="mb-6">
        The best state management solution isn&apos;t the one with the best documentation or most stars on GitHub. It&apos;s the one that helps your team ship reliable features faster.
      </p>
    </>
  ),
  'offline-first-mobile-apps': (
    <>
      <p className="mb-6">
        Building offline-first applications isn&apos;t just about handling network failures. It&apos;s about respecting your users&apos; reality — unstable connections, limited data plans, and the expectation that their work won&apos;t disappear when the WiFi drops.
      </p>

      <h2 className="text-2xl font-semibold mt-12 mb-4">The Challenge</h2>
      <p className="mb-6">
        In retail environments, internet connectivity is often unreliable. Store managers can&apos;t afford to tell customers &quot;sorry, our POS system is down&quot; every time the network hiccups. The application needs to work regardless of connectivity.
      </p>

      <h2 className="text-2xl font-semibold mt-12 mb-4">Architecture Decisions</h2>
      <p className="mb-6">
        We implemented a queue-based synchronization system where transactions are stored locally first, then synced when connectivity is available. Critical decisions included:
      </p>

      <ul className="list-disc list-inside mb-6 space-y-2 text-[--color-textMuted]">
        <li>Using AsyncStorage with encryption for sensitive data</li>
        <li>Implementing conflict resolution for concurrent edits</li>
        <li>Building a priority queue system for sync operations</li>
        <li>Creating visual feedback for sync status</li>
      </ul>

      <p className="mb-6">
        The result was a system that felt instant to users while maintaining data integrity across devices and locations.
      </p>
    </>
  ),
  'clean-architecture-frontend': (
    <>
      <p className="mb-6">
        Clean architecture isn&apos;t about following rigid rules or creating elaborate folder structures. It&apos;s about making your codebase understandable and maintainable over time, especially as teams and requirements change.
      </p>

      <h2 className="text-2xl font-semibold mt-12 mb-4">Why It Matters</h2>
      <p className="mb-6">
        Frontend applications often start simple but grow complex quickly. What begins as a few components becomes a tangled web of dependencies, making changes risky and time-consuming. Clean architecture provides structure that scales.
      </p>

      <h2 className="text-2xl font-semibold mt-12 mb-4">Key Principles</h2>
      <p className="mb-6">
        In practice, I focus on three core principles:
      </p>

      <ul className="list-disc list-inside mb-6 space-y-2 text-[--color-textMuted]">
        <li>Separation of concerns: UI components shouldn&apos;t know about API details</li>
        <li>Dependency direction: Business logic should never depend on UI frameworks</li>
        <li>Testability: Core logic should be testable without rendering components</li>
      </ul>

      <p className="mb-6">
        This isn&apos;t about being dogmatic — it&apos;s about creating systems where you can change your API client, swap UI libraries, or refactor features without fear of breaking everything.
      </p>

      <h2 className="text-2xl font-semibold mt-12 mb-4">Real-World Benefits</h2>
      <p className="mb-6">
        When we restructured our e-commerce platform with these principles, we reduced bug rates by 60% and cut average feature development time in half. New team members could understand and contribute to the codebase within days instead of weeks.
      </p>
    </>
  ),
};

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return notFound();

  const content = articleContent[slug];

  return (
    <>
      <Navigation />
      <article className="py-32">
      <div className="max-w-3xl mx-auto px-6">

        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          {post.title}
        </h1>

        <p className="text-[--color-textMuted] mb-12">
          {new Date(post.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </p>

        <div className="prose prose-invert max-w-none text-[--color-textMuted]">
          {content || (
            <p>Content coming soon...</p>
          )}
        </div>

        <div className="mt-16 pt-8 border-t border-white/10">
          <a
            href="/writing"
            className="text-[--color-primary] hover:underline inline-flex items-center gap-2"
          >
            ← Back to Writing
          </a>
        </div>

      </div>
    </article>
    </>
  );
}
