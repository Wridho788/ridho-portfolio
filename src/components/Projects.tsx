import { projects } from '@/lib/projects';
import ProjectCard from './ProjectCard';
import MobileSlider from './MobileSlider';

export default function Projects() {
  const selected = projects.filter((project) => project.featured);
  const additional = projects.filter((project) => !project.featured);

  return (
    <section id="projects" className="py-22 md:py-28">
      <div className="site-container">
        <div data-reveal className="mb-12 grid gap-5 md:grid-cols-[.8fr_1.2fr] md:items-end">
          <div>
            <p className="section-kicker mb-3">01 / Selected work</p>
            <h2 className="text-4xl font-bold leading-tight md:text-5xl">The work behind<br />the words.</h2>
          </div>
          <p className="max-w-xl text-[var(--color-textMuted)] leading-relaxed md:justify-self-end">
            A mix of shipped professional work and independent builds. Each story explains what I owned, the constraints I worked within, and what the available evidence actually shows.
          </p>
        </div>

        <MobileSlider label="Selected work" desktopClassName="space-y-5">
          {selected.map((project, index) => <ProjectCard key={project.slug} project={project} index={index} />)}
        </MobileSlider>

        <div className="mt-20 border-t border-[var(--color-line)] pt-10">
          <div className="mb-7 flex flex-wrap items-end justify-between gap-3">
            <h3 className="text-2xl font-bold">More product work</h3>
            <p className="text-sm text-[var(--color-textMuted)]">Additional projects across web, field, and Android workflows</p>
          </div>
          <MobileSlider label="More product work" desktopClassName="grid gap-4 md:grid-cols-2">
            {additional.map((project, index) => <ProjectCard key={project.slug} project={project} index={index} compact />)}
          </MobileSlider>
        </div>
      </div>
    </section>
  );
}
