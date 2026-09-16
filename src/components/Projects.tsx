import { projects } from '@/lib/projects';
import ProjectCard from './ProjectCard';
import Reveal from './Reveal';

export default function Projects() {
  const featured = projects.filter((project) => project.featured);
  const professional = projects.filter((project) => !project.featured);

  return (
    <section id="projects" className="py-32">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal>
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">
            Selected Projects
          </h2>

          <p className="text-[--color-textMuted] max-w-xl mb-16">
            A selection of real-world projects I&apos;ve built or contributed to,
            focusing on scalability, performance, and maintainability.
          </p>
        </Reveal>

        {featured.length > 0 && (
          <div className="mb-20">
            <Reveal>
              <h3 className="text-xl font-semibold mb-8 text-[--color-textMuted]">
                Featured Personal Projects
              </h3>
            </Reveal>
            <div className="grid md:grid-cols-2 gap-8">
              {featured.map((project, i) => (
                <Reveal key={project.title} delay={i * 100}>
                  <ProjectCard project={project} />
                </Reveal>
              ))}
            </div>
          </div>
        )}

        {professional.length > 0 && (
          <div>
            <Reveal>
              <h3 className="text-xl font-semibold mb-8 text-[--color-textMuted]">
                Professional Experience
              </h3>
            </Reveal>
            <div className="grid md:grid-cols-2 gap-8">
              {professional.map((project, i) => (
                <Reveal key={project.title} delay={(i % 2) * 100}>
                  <ProjectCard project={project} />
                </Reveal>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
