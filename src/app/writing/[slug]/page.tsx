import { posts } from '@/lib/posts';
import { notFound } from 'next/navigation';
import React from 'react';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

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
  'ai-agents-qa-automation-maestro-playwright': (
    <>
      <p className="mb-6">
        Most of the conversation around AI coding agents focuses on writing application code. In QA automation, the more immediate impact has been somewhere less discussed: turning a requirement or a raw screen hierarchy into a maintainable test flow, and doing it consistently across a large regression suite instead of one script at a time.
      </p>

      <h2 className="text-2xl font-semibold mt-12 mb-4">Where an Agent Actually Helps</h2>
      <p className="mb-6">
        Maestro flows for mobile and Playwright specs for web are both, at their core, translations from a requirement (&quot;given the user is on the login screen, when they enter a wrong password, then an error toast appears&quot;) into a sequence of selectors and assertions. Writing that translation by hand for every requirement case doesn&apos;t scale well once a milestone has dozens of tickets. An agent that has been shown the house conventions — how flows are structured, how selectors are named, how Given/When/Then maps to steps — can produce a first draft flow directly from the requirement text, leaving the review to focus on whether the logic is right rather than on boilerplate.
      </p>

      <h2 className="text-2xl font-semibold mt-12 mb-4">Maestro Hierarchy as Ground Truth</h2>
      <p className="mb-6">
        Maestro Hierarchy dumps the live view hierarchy of whatever screen is currently on the device — every element, its text, its resource ID, its bounds. Guessing selectors from a screenshot alone leads to brittle flows that break the moment a layout shifts. Feeding the actual hierarchy dump to an agent, and cross-checking candidate selectors against the app&apos;s source rather than just the dump, produces selectors that are more likely to survive the next UI change and easier to explain in review.
      </p>

      <h2 className="text-2xl font-semibold mt-12 mb-4">One Convention, Two Platforms</h2>
      <p className="mb-6">
        Mobile automation runs on Maestro, web automation on Playwright, and the two occasionally meet — an action performed on the mobile app that needs to be verified on the web admin panel. Keeping both under one structured convention (shared naming, a consistent page-object style, the same Given/When/Then vocabulary) is what makes an agent-generated flow usable without a rewrite. Without that shared structure, every generated flow becomes a one-off that the next person has to relearn.
      </p>

      <h2 className="text-2xl font-semibold mt-12 mb-4">Debugging Failures Faster</h2>
      <p className="mb-6">
        A failing flow can mean a flaky selector, a genuine app regression, a backend response that changed shape, or an environment that&apos;s simply down. Sorting through which one it is by re-running the flow manually and reading logs line by line is slow. An agent that can be pointed at the failure, the flow definition, and the relevant logs at once shortens that investigation considerably — it still needs a person to confirm the diagnosis, but it removes most of the manual log-chasing.
      </p>

      <h2 className="text-2xl font-semibold mt-12 mb-4">What Still Needs a Human</h2>
      <p className="mb-6">
        None of this removes the need to understand the product. The requirement still has to be written clearly before an agent can expand it into Given/When/Then cases, and every generated flow gets run and reviewed before it goes into the regression suite — an agent can produce a plausible-looking flow that asserts the wrong thing if the requirement was ambiguous to begin with. The value isn&apos;t in removing judgment from the process; it&apos;s in removing the repetitive setup so more time goes into the judgment calls that actually matter.
      </p>
    </>
  ),
  'flutter-state-management-performance-caching-error-handling': (
    <>
      <p className="mb-6">
        On a field data-capture app running on mid-range Android devices, often in warehouse areas with weak signal, state management stops being an abstract architecture debate and becomes the difference between a screen that feels responsive and one that stutters every time an operator taps a field.
      </p>

      <h2 className="text-2xl font-semibold mt-12 mb-4">Scoping Provider Correctly</h2>
      <p className="mb-6">
        Provider with ChangeNotifier is straightforward, but it&apos;s easy to end up with one large notifier behind an entire screen, where a single <code>notifyListeners()</code> call rebuilds far more of the widget tree than actually changed. Splitting notifiers per operational flow, and using <code>Selector</code> or <code>context.select</code> to subscribe widgets to only the specific field they depend on, keeps rebuilds scoped to what actually changed. On lower-end hardware, that difference shows up directly as dropped frames versus a smooth scroll.
      </p>

      <h2 className="text-2xl font-semibold mt-12 mb-4">Two Kinds of Cache, Two Lifetimes</h2>
      <p className="mb-6">
        Not all state deserves the same durability. Ephemeral UI state — a filter, a form field mid-edit, a toggle — belongs in the notifier and can disappear when the screen unmounts. Anything the operator would be upset to lose, like a form partially filled out before a scan or a submission still waiting to sync, belongs in local persistent storage, written as the operator progresses rather than only on final submit. Treating both as the same kind of &quot;state&quot; is what leads to either losing real work or over-persisting things that don&apos;t need to survive a restart.
      </p>

      <h2 className="text-2xl font-semibold mt-12 mb-4">Modeling Errors as State, Not Exceptions</h2>
      <p className="mb-6">
        Camera access, barcode/QR scanning, and network calls all fail in different ways, and letting those failures surface as uncaught exceptions in the widget tree makes for an app that crashes instead of degrading gracefully. Isolating camera and scanner access behind service classes, and having each async operation resolve into an explicit state — loading, success, error, empty — lets the UI react to a typed error instead of catching a generic exception at the top of the tree. It also makes retry logic a deliberate decision: a network timeout is usually worth a silent retry, while a denied camera permission needs to surface to the operator directly.
      </p>

      <h2 className="text-2xl font-semibold mt-12 mb-4">Why It Has to Work Together</h2>
      <p className="mb-6">
        Scoped rebuilds, a clear boundary between ephemeral and durable state, and typed error handling aren&apos;t independent concerns — they compound. A notifier that rebuilds too broadly makes a slow network call feel worse than it is, because the whole screen freezes instead of just the field waiting on data. Getting all three right is what made the workflow usable on the actual hardware and connectivity it had to run on, not just clean in the architecture diagram.
      </p>
    </>
  ),
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
        We switched to Zustand to reduce the number of files a small UI state change required. State updates became easier to follow and maintain, especially when a feature changed hands between developers.
      </p>

      <h2 className="text-2xl font-semibold mt-12 mb-4">Decision Framework</h2>
      <p className="mb-6">
        Here&apos;s what I consider now when choosing state management:
      </p>

      <ul className="list-disc list-inside mb-6 space-y-2 text-[var(--color-textMuted)]">
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

      <ul className="list-disc list-inside mb-6 space-y-2 text-[var(--color-textMuted)]">
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

      <ul className="list-disc list-inside mb-6 space-y-2 text-[var(--color-textMuted)]">
        <li>Separation of concerns: UI components shouldn&apos;t know about API details</li>
        <li>Dependency direction: Business logic should never depend on UI frameworks</li>
        <li>Testability: Core logic should be testable without rendering components</li>
      </ul>

      <p className="mb-6">
        This isn&apos;t about being dogmatic — it&apos;s about creating systems where you can change your API client, swap UI libraries, or refactor features without fear of breaking everything.
      </p>

      <h2 className="text-2xl font-semibold mt-12 mb-4">Real-World Benefits</h2>
      <p className="mb-6">
        In practice, the clearest benefit was being able to change the API-facing code without tracing its details through every screen. That made reviews and onboarding easier because the responsibility of each layer was clearer.
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
      <main id="main-content">
        <article className="site-container max-w-[780px] pb-15 pt-28 md:pb-20 md:pt-32">
          <Link href="/writing" className="text-link text-sm">← All writing</Link>
          <header className="mt-13 border-b border-[var(--color-line)] pb-10">
            <p className="section-kicker mb-4">(Field notes)</p>
            <h1 className="text-4xl font-bold leading-tight md:text-5xl">{post.title}</h1>
            <time dateTime={post.date} className="mt-5 block text-sm text-[var(--color-textMuted)]">
              {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </time>
            <p className="mt-5 text-lg leading-relaxed text-[var(--color-textMuted)]">{post.summary}</p>
          </header>
          <div className="article-copy pt-10">{content || <p>Content coming soon.</p>}</div>
          <div className="mt-15 border-t border-[var(--color-line)] pt-7"><Link href="/writing" className="text-link">← Back to writing</Link></div>
        </article>
      </main>
      <Footer />
    </>
  );
}
