import { site } from '@/lib/site';

export default function Contact() {
  return (
    <section id="contact" className="bg-[var(--color-panel)] py-20 text-white md:py-28">
      <div className="site-container grid gap-10 md:grid-cols-[1.1fr_.9fr] md:items-end">
        <div>
          <p className="text-sm font-medium text-[var(--color-panelMuted)]">(Contact)</p>
          <h2 data-reveal="mask" className="display-panel mt-5 max-w-3xl !text-[clamp(2.75rem,6.5vw,5.5rem)]">Let’s make the next product work better.</h2>
        </div>
        <div data-reveal className="md:justify-self-end">
          <p className="max-w-md leading-relaxed text-[#d4d4d4]">Building a web or mobile product, improving a complex workflow, or strengthening release confidence? Tell me what you’re working on.</p>
          <a href={`mailto:${site.email}?subject=Project%20conversation`} className="contact-button mt-7 inline-flex min-h-13 items-center gap-3 rounded-full px-6 py-3 font-semibold">{site.email} <span aria-hidden="true">↗</span></a>
          <p className="mt-4 text-sm text-[#d4d4d4]">You can also connect on <a className="underline underline-offset-4 hover:text-white" href={site.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a> or <a className="underline underline-offset-4 hover:text-white" href={site.github} target="_blank" rel="noopener noreferrer">GitHub</a>.</p>
        </div>
      </div>
    </section>
  );
}
