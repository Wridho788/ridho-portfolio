import { skills } from '@/lib/skills';
import MobileSlider from './MobileSlider';

const strengths = [
  { number: '01', title: 'Web products', description: 'Complex interfaces, data-heavy workflows, and maintainable frontend architecture.', tools: skills.web },
  { number: '02', title: 'Mobile workflows', description: 'Field-ready experiences across Flutter, React Native, and native Android.', tools: skills.mobile },
  { number: '03', title: 'Quality engineering', description: 'Automated journeys that test real user behavior across web and mobile.', tools: skills.testing },
];

export default function Skills() {
  return (
    <section id="skills" className="py-20 md:py-26">
      <div className="site-container">
        <div className="mb-10 grid gap-4 md:grid-cols-2">
          <div><p className="section-kicker mb-3">03 / Capabilities</p><h2 className="text-4xl font-bold md:text-5xl">How I contribute.</h2></div>
          <p className="max-w-md leading-relaxed text-[var(--color-textMuted)] md:justify-self-end">I work across product interfaces, mobile constraints, and the tests needed to keep releases dependable.</p>
        </div>
        <MobileSlider label="Capabilities" desktopClassName="grid gap-4 md:grid-cols-3">
          {strengths.map((item) => (
            <div key={item.number} className="rounded-xl border border-[var(--color-line)] bg-white p-7">
              <p className="section-kicker">{item.number}</p>
              <h3 className="mt-8 text-xl font-bold">{item.title}</h3>
              <p className="mt-3 min-h-22 leading-relaxed text-[var(--color-textMuted)]">{item.description}</p>
              <p className="mt-5 border-t border-[var(--color-line)] pt-4 text-xs font-semibold leading-relaxed text-[var(--color-accent)]">{item.tools.join(' · ')}</p>
            </div>
          ))}
        </MobileSlider>
      </div>
    </section>
  );
}
