import { caseStudies } from '@/lib/caseStudies';
import { projects } from '@/lib/projects';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import CaseStudyLink from '@/components/CaseStudyLink';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export function generateStaticParams() {
  return caseStudies.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = caseStudies.find((item) => item.slug === slug);
  if (!study) return { title: 'Case Study Not Found' };
  return {
    title: study.title,
    description: study.summary,
    openGraph: { title: study.title, description: study.summary, images: study.image ? [study.image] : undefined },
  };
}

function StorySection({ number, title, items }: { number: string; title: string; items: string[] }) {
  return (
    <section className="grid gap-4 border-t border-[var(--color-line)] py-9 md:grid-cols-[170px_1fr] md:gap-10">
      <div>
        <p className="section-kicker mb-2">{number}</p>
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
      <ul className="space-y-4 text-[var(--color-textMuted)] leading-relaxed">
        {items.map((item) => <li key={item} className="border-l-2 border-[var(--color-line)] pl-4">{item}</li>)}
      </ul>
    </section>
  );
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = caseStudies.find((item) => item.slug === slug);
  const project = projects.find((item) => item.slug === slug);
  if (!study || !project) return notFound();

  return (
    <>
      <Navigation />
      <main id="main-content">
        <div className="site-container pb-20 pt-13 md:pt-18">
          <CaseStudyLink href="/#projects" className="text-link text-sm">← All work</CaseStudyLink>

          <header className="mt-11 grid gap-9 border-b border-[var(--color-line)] pb-11 md:grid-cols-[1.45fr_.55fr] md:items-end">
            <div>
              <p className="section-kicker mb-4">{project.kind}</p>
              <h1 className="max-w-3xl text-4xl font-bold leading-tight md:text-6xl">{study.title}</h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--color-textMuted)]">{study.summary}</p>
              <div className="mt-7 flex flex-wrap gap-3">
                {study.liveDemo && <a href={study.liveDemo} target="_blank" rel="noopener noreferrer" className="button-primary">Explore live demo ↗</a>}
                {study.github && <a href={study.github} target="_blank" rel="noopener noreferrer" className="button-secondary">Browse source code ↗</a>}
              </div>
            </div>
            <dl className="grid gap-4 rounded-lg bg-white p-5 text-sm">
              <div><dt className="section-kicker mb-1">Role</dt><dd className="font-semibold">{project.role}</dd></div>
              <div><dt className="section-kicker mb-1">Platform</dt><dd className="font-semibold">{study.stack.slice(0, 3).join(' / ')}</dd></div>
              <div><dt className="section-kicker mb-1">Access</dt><dd className="font-semibold">{study.github ? 'Public source and demo' : 'Private professional project'}</dd></div>
            </dl>
          </header>

          {study.image && (
            <figure className="my-12 overflow-hidden rounded-xl border border-[var(--color-line)] bg-[#e6ece9]">
              <div style={{ viewTransitionName: `project-${project.slug}` }} className={`project-preview relative overflow-hidden ${study.imageFit === 'contain' ? 'h-100 md:h-130' : 'h-65 md:h-115'}`}>
                <Image src={study.image} alt={project.imageContext} fill sizes="(min-width: 1160px) 1160px, 100vw" className={study.imageFit === 'contain' ? 'object-contain p-5 md:p-8' : 'object-cover'} priority />
              </div>
              <figcaption className="border-t border-[var(--color-line)] bg-white px-5 py-3 text-sm text-[var(--color-textMuted)]">{project.imageContext}</figcaption>
            </figure>
          )}

          <div className="mx-auto max-w-4xl">
            <div className="grid gap-4 py-8 md:grid-cols-[170px_1fr] md:gap-10">
              <div><p className="section-kicker mb-2">Context</p><h2 className="text-xl font-bold">The problem</h2></div>
              <p className="leading-relaxed text-[var(--color-textMuted)]">{study.overview}</p>
            </div>
            <StorySection number="01 / Ownership" title="What I built" items={study.contribution} />
            <StorySection number="02 / Decisions" title="Constraints & trade-offs" items={study.challenges} />
            <StorySection number="03 / Implementation" title="Technical approach" items={study.highlights} />
            <StorySection number="04 / Outcome" title="What changed" items={study.impact} />

            <div className="border-t border-[var(--color-line)] py-9">
              <p className="section-kicker mb-4">Tools used</p>
              <div className="flex flex-wrap gap-2">
                {study.stack.map((item) => <span key={item} className="rounded-full border border-[var(--color-line)] bg-white px-3 py-1.5 text-xs font-semibold">{item}</span>)}
              </div>
            </div>
            <div className="mt-5 rounded-xl bg-[#dfeae6] p-7 md:p-9">
              <p className="section-kicker mb-3">Next step</p>
              <h2 className="text-2xl font-bold">Have a similar problem to solve?</h2>
              <p className="mt-3 text-[var(--color-textMuted)]">Tell me about the users, constraints, and what needs to work reliably.</p>
              <a href="mailto:wridho246@gmail.com" className="button-primary mt-6">Email Ridho ↗</a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
