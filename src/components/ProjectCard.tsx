import Image from 'next/image';
import CaseStudyLink from './CaseStudyLink';
import type { Project } from '@/lib/projects';

export default function ProjectCard({ project, compact = false, index = 0 }: { project: Project; compact?: boolean; index?: number }) {
  return (
    <article data-reveal data-reveal-delay={compact ? (index % 2) * 90 : 0} className={`project-card ${compact ? 'project-card-compact' : 'project-card-featured'} overflow-hidden rounded-xl border border-[var(--color-line)] bg-white ${compact ? 'flex h-full flex-col' : 'grid lg:grid-cols-[.9fr_1.1fr]'}`}>
      <figure className={`flex flex-col bg-[#e6ece9] ${compact ? '' : index % 2 === 1 ? 'lg:order-2' : ''}`}>
        <div style={{ viewTransitionName: `project-${project.slug}` }} className={`project-preview relative flex items-center justify-center overflow-hidden ${compact ? 'h-48' : 'min-h-[400px] sm:min-h-[460px]'}`}>
          <Image
            src={project.image}
            alt={project.imageContext}
            fill
            sizes={compact ? '(min-width: 768px) 50vw, 100vw' : '(min-width: 1024px) 45vw, 100vw'}
            className={project.imageFit === 'contain' ? 'object-contain p-5' : 'object-cover'}
          />
        </div>
        <figcaption className="border-t border-[var(--color-line)] px-4 py-2 text-xs leading-relaxed text-[var(--color-textMuted)]">
          {project.imageContext}
        </figcaption>
      </figure>

      <div className={`project-body flex flex-col ${compact ? 'p-6' : 'justify-center p-7 sm:p-10 lg:p-12'}`}>
        <p className="section-kicker mb-3">{project.kind}</p>
        <h3 className={`font-bold ${compact ? 'text-xl' : 'text-3xl md:text-4xl'}`}>{project.title}</h3>
        <p className="mt-4 leading-relaxed text-[var(--color-textMuted)]">{project.description}</p>
        {!compact && (
          <div className="mt-6 border-l-2 border-[var(--color-primary)] pl-4">
            <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-primary)]">My contribution</p>
            <p className="mt-2 text-sm leading-relaxed">{project.highlight}</p>
          </div>
        )}
        <p className="mt-5 text-xs font-semibold text-[var(--color-textMuted)]">{project.role} · {project.stack.slice(0, 3).join(' / ')}</p>
        <div className="project-links mt-7 flex flex-wrap gap-x-5 gap-y-2 text-sm">
          <CaseStudyLink href={`/case-studies/${project.slug}/`} className="text-link project-link">Read case study <span aria-hidden="true">↗</span></CaseStudyLink>
          {project.liveDemo && <a href={project.liveDemo} target="_blank" rel="noopener noreferrer" className="text-link">Live demo ↗</a>}
          {project.github && <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-link">Source code ↗</a>}
          {project.download && <a href={project.download} download className="text-link">Download APK ↓</a>}
        </div>
      </div>
    </article>
  );
}
