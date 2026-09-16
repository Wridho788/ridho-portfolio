import { experiences } from '@/lib/experience';
import Reveal from './Reveal';

export default function Experience() {
  return (
    <section id="experience" className="py-32 bg-[--color-background]">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal>
          <h2 className="text-3xl md:text-4xl font-semibold mb-16">
            Experience
          </h2>
        </Reveal>

        <div className="space-y-10">
          {experiences.map((exp, i) => (
            <Reveal key={exp.summary} delay={i * 80}>
              <div className="border-l border-white/10 pl-6">
                <h3 className="font-semibold">
                  {exp.role}
                  <span className="text-[--color-textMuted]">
                    {' '}— {exp.company}
                  </span>
                </h3>

                {exp.period && (
                  <p className="text-sm text-[--color-textMuted] mt-1">
                    {exp.period}
                  </p>
                )}

                <p className="text-[--color-textMuted] mt-2 max-w-3xl">
                  {exp.summary}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
