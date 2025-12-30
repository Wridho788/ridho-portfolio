import { Project } from '@/lib/projects';
import Image from 'next/image';

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="bg-[--color-surface] border border-white/10 rounded-xl overflow-hidden hover:shadow-[--shadow-soft] transition group">
      
      {project.image && (
        <div className="relative h-48 overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover group-hover:scale-105 transition duration-300"
          />
        </div>
      )}

      <div className="p-6">
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

        {project.slug && (
          <a
            href={`/case-studies/${project.slug}`}
            className="text-[--color-primary] text-sm hover:underline inline-flex items-center gap-1"
          >
            View Case Study →
          </a>
        )}
      </div>
    </div>
  );
}
