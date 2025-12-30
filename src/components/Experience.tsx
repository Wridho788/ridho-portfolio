import { experiences } from '@/lib/experience';

export default function Experience() {
  return (
    <section id="experience" className="py-32 bg-[--color-background]">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-semibold mb-16">
          Experience
        </h2>

        <div className="space-y-10">
          {experiences.map((exp) => (
            <div key={exp.summary} className="border-l border-white/10 pl-6">
              <h3 className="font-semibold">
                {exp.role}
                <span className="text-[--color-textMuted]">
                  {' '}— {exp.company}
                </span>
              </h3>

              <p className="text-[--color-textMuted] mt-2 max-w-3xl">
                {exp.summary}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
