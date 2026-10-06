import type { ReactNode } from 'react';
import { skills } from '@/lib/skills';
import MobileSlider from './MobileSlider';

const iconProps = { width: 20, height: 20, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true } as const;

const strengths: { title: string; description: string; tools: string[]; icon: ReactNode }[] = [
  {
    title: 'Web products',
    description: 'Complex interfaces, data-heavy workflows, and maintainable frontend architecture.',
    tools: skills.web,
    icon: <svg {...iconProps}><rect x="3" y="4" width="18" height="13" rx="2" /><path d="M8 21h8M12 17v4" /></svg>,
  },
  {
    title: 'Mobile workflows',
    description: 'Field-ready experiences across Flutter, React Native, and native Android.',
    tools: skills.mobile,
    icon: <svg {...iconProps}><rect x="6" y="2" width="12" height="20" rx="2" /><path d="M11 18h2" /></svg>,
  },
  {
    title: 'Quality engineering',
    description: 'Automated journeys that test real user behavior across web and mobile.',
    tools: skills.testing,
    icon: <svg {...iconProps}><path d="M9 12l2 2 4-4" /><circle cx="12" cy="12" r="9" /></svg>,
  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-20 md:py-26">
      <div className="site-container">
        <div className="mb-10 grid gap-5 md:grid-cols-2 md:items-end">
          <div>
            <p className="section-kicker mb-4">(What I do)</p>
            <h2 data-reveal="mask" className="heading-section">How I contribute.</h2>
          </div>
          <p className="max-w-md leading-relaxed text-[var(--color-textMuted)] md:justify-self-end">I work across product interfaces, mobile constraints, and the tests needed to keep releases dependable.</p>
        </div>
        <MobileSlider label="Capabilities" desktopClassName="grid gap-4 md:grid-cols-3">
          {strengths.map((item, index) => (
            <div key={item.title} data-reveal data-reveal-delay={index * 80} className="capability-card flex flex-col p-7">
              <span className="capability-icon">{item.icon}</span>
              <h3 className="mt-10 text-xl font-bold">{item.title}</h3>
              <p className="mt-3 flex-1 leading-relaxed text-[var(--color-textMuted)]">{item.description}</p>
              <p className="mt-6 border-t border-[#dedede] pt-4 text-sm font-medium">{item.tools.join(' · ')}</p>
            </div>
          ))}
        </MobileSlider>
      </div>
    </section>
  );
}
