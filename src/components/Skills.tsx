import { skills } from '@/lib/skills';

export default function Skills() {
  return (
    <section id="skills" className="py-32">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-semibold mb-12">
          Skills
        </h2>

        <div className="grid md:grid-cols-2 gap-12">
          {Object.entries(skills).map(([group, items]) => (
            <div key={group}>
              <h3 className="text-[--color-primary] font-medium mb-4 capitalize">
                {group.replace(/([A-Z])/g, ' $1')}
              </h3>

              <div className="flex flex-wrap gap-3">
                {items.map((skill) => (
                  <span
                    key={skill}
                    className="border border-white/20 rounded-full px-4 py-1 text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
