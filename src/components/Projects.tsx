import { projects } from '@/lib/projects';
import ProjectCard from './ProjectCard';

export default function Projects() {
  return (
    <section id="projects" className="py-32">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-semibold mb-4">
          Selected Projects
        </h2>

        <p className="text-[--color-textMuted] max-w-xl mb-16">
          A selection of real-world projects I&apos;ve built or contributed to,
          focusing on scalability, performance, and maintainability.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
