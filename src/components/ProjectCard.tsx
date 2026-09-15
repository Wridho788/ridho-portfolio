import { Project } from '@/lib/projects';
import { caseStudies } from '@/lib/caseStudies';
import Image from 'next/image';

export default function ProjectCard({ project }: { project: Project }) {
  // Only link to a case study that actually exists — `output: 'export'` only
  // generates pages from `caseStudies`, so a slug without a matching entry
  // would render a CTA straight into a 404.
  const hasCaseStudy = caseStudies.some((cs) => cs.slug === project.slug);
  const contain = project.imageFit === 'contain';

  return (
    <div className="h-full flex flex-col bg-[--color-surface] border border-white/10 rounded-xl overflow-hidden hover:shadow-[--shadow-soft] transition group">

      {project.image && (
        <div
          className={`relative h-48 overflow-hidden ${
            contain ? 'bg-black/20' : ''
          }`}
        >
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className={`group-hover:scale-105 transition duration-300 ${
              contain ? 'object-contain p-3' : 'object-cover'
            }`}
          />
        </div>
      )}

      <div className="p-6 flex flex-col flex-1">
        {project.featured && (
          <span className="self-start text-xs font-medium text-[--color-primary] border border-[--color-primary]/40 rounded-full px-3 py-1 mb-3">
            Featured Project
          </span>
        )}

        <h3 className="text-xl font-semibold mb-2">
          {project.title}
        </h3>

        <p className="text-[--color-textMuted] mb-4">
          {project.description}
        </p>

        <p className="text-sm mb-3">
          <span className="text-[--color-primary]">Role:</span> {project.role}
        </p>

        <p className="text-sm mb-4">
          <span className="text-[--color-primary]">Highlight:</span> {project.highlight}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="text-xs border border-white/20 rounded-full px-3 py-1"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-auto" />

        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          {hasCaseStudy && (
            <a
              href={`/case-studies/${project.slug}`}
              className="text-[--color-primary] text-sm hover:underline inline-flex items-center gap-1"
            >
              View Case Study →
            </a>
          )}

          {project.liveDemo && (
            <a
              href={project.liveDemo}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[--color-primary] text-sm hover:underline inline-flex items-center gap-1"
            >
              Live Demo →
            </a>
          )}

          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[--color-primary] text-sm hover:underline inline-flex items-center gap-1"
            >
              GitHub →
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
