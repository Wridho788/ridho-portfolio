'use client';

import { useEffect, useRef } from 'react';
import { experiences } from '@/lib/experience';

export default function Experience() {
  const timelineRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const timeline = timelineRef.current;
    if (!timeline) return;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const entries = Array.from(timeline.querySelectorAll<HTMLElement>('.timeline-entry'));
    let frame = 0;
    const update = () => {
      frame = 0;
      const bounds = timeline.getBoundingClientRect();
      const readingLine = window.innerHeight * 0.55;
      const progress = Math.min(1, Math.max(0, (readingLine - bounds.top) / bounds.height));
      timeline.style.setProperty('--timeline-progress', preference.matches ? '1' : String(progress));
      let active = -1;
      entries.forEach((entry, index) => {
        if (entry.getBoundingClientRect().top <= readingLine) active = index;
      });
      entries.forEach((entry, index) => { entry.dataset.active = String(index === active); });
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    schedule();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    preference.addEventListener('change', schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      preference.removeEventListener('change', schedule);
    };
  }, []);

  return (
    <div id="experience" className="mt-20 grid gap-8 border-t border-[var(--color-line)] pt-12 md:mt-28 lg:grid-cols-[.65fr_1.35fr] lg:gap-16">
      <div>
        <p className="section-kicker mb-4">(Experience)</p>
        <h3 data-reveal="mask" className="text-3xl font-bold leading-tight md:text-4xl">Built across contexts.</h3>
        <p className="mt-5 max-w-sm leading-relaxed text-[var(--color-textMuted)]">From native Android and internal systems to frontend architecture and test automation.</p>
      </div>
      <ol ref={timelineRef} className="experience-timeline">
        {experiences.map((item, index) => (
          <li key={`${item.company}-${item.role}`} data-reveal data-reveal-delay={index * 60} className="timeline-entry grid gap-2 py-6 sm:grid-cols-[170px_1fr] sm:gap-6">
            <p className="text-sm font-medium text-[var(--color-textMuted)]">{item.period}</p>
            <div>
              <h4 className="text-lg font-bold">{item.role}</h4>
              <p className="mt-1 text-sm font-semibold">{item.company}</p>
              <p className="mt-3 leading-relaxed text-[var(--color-textMuted)]">{item.summary}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
