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
    <section id="experience" className="border-y border-[var(--color-line)] bg-white py-20 md:py-26">
      <div className="site-container grid gap-11 lg:grid-cols-[.65fr_1.35fr]">
        <div data-reveal>
          <p className="section-kicker mb-3">02 / Experience</p>
          <h2 className="text-4xl font-bold md:text-5xl">Built across contexts.</h2>
          <p className="mt-6 max-w-sm leading-relaxed text-[var(--color-textMuted)]">From native Android and internal systems to frontend architecture and test automation.</p>
          <a href="/Ridho-CV.pdf" download className="text-link mt-6 inline-block text-sm">Download the full CV ↗</a>
        </div>
        <ol ref={timelineRef} className="experience-timeline border-t border-[var(--color-line)]">
          {experiences.map((item) => (
            <li key={`${item.company}-${item.role}`} className="timeline-entry grid gap-3 border-b border-[var(--color-line)] py-6 sm:grid-cols-[155px_1fr] sm:gap-6">
              <p className="text-xs font-bold uppercase tracking-wide text-[var(--color-primary)]">{item.period}</p>
              <div>
                <h3 className="text-lg font-bold">{item.role}</h3>
                <p className="mt-1 text-sm font-semibold text-[var(--color-accent)]">{item.company}</p>
                <p className="mt-3 leading-relaxed text-[var(--color-textMuted)]">{item.summary}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
