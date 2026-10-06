import Image from 'next/image';
import CaseStudyLink from './CaseStudyLink';
import type { Project } from '@/lib/projects';

export default function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  const href = `/case-studies/${project.slug}/`;
  return (
    <article data-reveal data-reveal-delay={(index % 3) * 80} className="project-card">
      <figure>
        {/* The title link is the accessible link; the image repeats it for pointer users only. */}
        <CaseStudyLink href={href} tabIndex={-1} aria-hidden="true" className="block">
          <div style={{ viewTransitionName: `project-${project.slug}` }} className="project-preview project-frame">
            <Image
              src={project.image}
              alt=""
              fill
              sizes="(min-width: 1024px) 380px, (min-width: 768px) 45vw, 90vw"
              className={project.imageFit === 'contain' ? 'object-contain p-5' : 'object-cover'}
            />
            <span className="project-badge">{project.kind}</span>
          </div>
        </CaseStudyLink>
        <figcaption className="mt-2 text-xs leading-relaxed text-[var(--color-panelMuted)]">{project.imageContext}</figcaption>
      </figure>

      <div className="flex flex-1 flex-col">
        <h3 className="text-lg font-semibold tracking-tight">
          <CaseStudyLink href={href} className="project-link hover:underline hover:underline-offset-4">{project.title} <span aria-hidden="true">↗</span></CaseStudyLink>
        </h3>
        <p className="mt-1 text-sm text-[var(--color-panelMuted)]">{project.role} · {project.stack.slice(0, 2).join(' / ')}</p>
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-[#d4d4d4]">{project.description}</p>
        {(project.liveDemo || project.github || project.download) && (
          <div className="project-links mt-auto flex flex-wrap gap-x-4 gap-y-2 pt-4">
            {project.liveDemo && <a href={project.liveDemo} target="_blank" rel="noopener noreferrer" className="project-external">Live demo ↗</a>}
            {project.github && <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-external">Source code ↗</a>}
            {project.download && <a href={project.download} download className="project-external">Download APK ↓</a>}
          </div>
        )}
      </div>
    </article>
  );
}
