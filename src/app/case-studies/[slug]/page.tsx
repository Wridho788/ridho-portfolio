import { caseStudies } from '@/lib/caseStudies';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Navigation from '@/components/Navigation';

export function generateStaticParams() {
  return caseStudies.map((cs) => ({
    slug: cs.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cs = caseStudies.find((c) => c.slug === slug);
  
  if (!cs) {
    return {
      title: 'Case Study Not Found',
    };
  }

  return {
    title: cs.title,
    description: cs.summary,
    openGraph: {
      title: cs.title,
      description: cs.summary,
      images: cs.image ? [cs.image] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: cs.title,
      description: cs.summary,
      images: cs.image ? [cs.image] : undefined,
    },
  };
}

function CaseBlock({ title, content }: { title: string; content: string }) {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-semibold mb-3">{title}</h2>
      <p className="text-[--color-textMuted] leading-relaxed">{content}</p>
    </div>
  );
}

function CaseBulletBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-[--color-textMuted] leading-relaxed">
            <span className="text-[--color-primary] mt-1">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cs = caseStudies.find((c) => c.slug === slug);
  if (!cs) return notFound();

  return (
    <>
      <Navigation />
      <section className="py-32 pt-40">
        <div className="max-w-4xl mx-auto px-6">

        {cs.image && (
          <div
            className={`relative rounded-xl overflow-hidden mb-12 ${
              cs.imageFit === 'contain'
                ? 'h-[420px] md:h-[560px] bg-black/20'
                : 'h-64 md:h-96'
            }`}
          >
            <Image
              src={cs.image}
              alt={cs.title}
              fill
              className={cs.imageFit === 'contain' ? 'object-contain p-6' : 'object-cover'}
            />
          </div>
        )}

        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          {cs.title}
        </h1>

        <p className="text-[--color-textMuted] mb-6 text-lg">
          {cs.summary}
        </p>

        {(cs.liveDemo || cs.github) && (
          <div className="flex flex-wrap gap-4 mb-16">
            {cs.liveDemo && (
              <a
                href={cs.liveDemo}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[--color-primary] text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:shadow-[--shadow-glow] transition"
              >
                Live Demo →
              </a>
            )}
            {cs.github && (
              <a
                href={cs.github}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-white/20 px-5 py-2.5 rounded-xl text-sm hover:bg-white/5 transition"
              >
                GitHub →
              </a>
            )}
          </div>
        )}

        <CaseBlock title="Overview" content={cs.overview} />
        <CaseBulletBlock title="My Contribution" items={cs.contribution} />
        <CaseBulletBlock title="Technical Highlights" items={cs.highlights} />
        <CaseBulletBlock title="Challenges & Decisions" items={cs.challenges} />
        <CaseBulletBlock title="Impact" items={cs.impact} />

        <div className="mt-16">
          <h3 className="font-semibold mb-4">Tech Stack</h3>
          <div className="flex flex-wrap gap-3">
            {cs.stack.map((tech) => (
              <span
                key={tech}
                className="border border-white/20 rounded-full px-4 py-1 text-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10">
          <Link
            href="/#projects"
            className="text-[--color-primary] hover:underline inline-flex items-center gap-2"
          >
            ← Back to Projects
          </Link>
        </div>

      </div>
    </section>
    </>
  );
}
