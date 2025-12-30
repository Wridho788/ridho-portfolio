import { caseStudies } from '@/lib/caseStudies';
import { notFound } from 'next/navigation';
import Image from 'next/image';
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
          <div className="relative h-64 md:h-96 rounded-xl overflow-hidden mb-12">
            <Image
              src={cs.image}
              alt={cs.title}
              fill
              className="object-cover"
            />
          </div>
        )}

        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          {cs.title}
        </h1>

        <p className="text-[--color-textMuted] mb-16 text-lg">
          {cs.summary}
        </p>

        <CaseBlock title="Context" content={cs.context} />
        <CaseBlock title="Problem" content={cs.problem} />
        <CaseBlock title="Solution" content={cs.solution} />
        <CaseBlock title="Impact" content={cs.impact} />

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
          <a
            href="/#projects"
            className="text-[--color-primary] hover:underline inline-flex items-center gap-2"
          >
            ← Back to Projects
          </a>
        </div>

      </div>
    </section>
    </>
  );
}
