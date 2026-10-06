import { projects } from '@/lib/projects';
import { site } from '@/lib/site';
import ProjectCard from './ProjectCard';
import MobileSlider from './MobileSlider';

export default function Projects() {
  // Featured work first; the rest keeps its order from projects.ts.
  const ordered = [...projects.filter((project) => project.featured), ...projects.filter((project) => !project.featured)];

  return (
    <section id="projects" className="py-6 md:py-10">
      <div className="site-container">
        <div className="projects-panel on-dark">
          <div className="mb-10 md:mb-14">
            <p className="text-sm font-medium text-[var(--color-panelMuted)]">(Selected work)</p>
            <h2 data-reveal="mask" className="display-panel mt-3">My best projects</h2>
            <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
              <p className="max-w-xl leading-relaxed text-[#d4d4d4]">
                A mix of shipped professional work and independent builds. Each case study explains what I owned, the constraints I worked within, and what the available evidence actually shows.
              </p>
              <a href={site.github} target="_blank" rel="noopener noreferrer" className="button-light">More on GitHub <span aria-hidden="true">↗</span></a>
            </div>
          </div>

          <MobileSlider label="Selected work" desktopClassName="grid gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {ordered.map((project, index) => <ProjectCard key={project.slug} project={project} index={index} />)}
          </MobileSlider>
        </div>
      </div>
    </section>
  );
}
