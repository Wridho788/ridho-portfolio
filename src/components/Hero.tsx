import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-[var(--color-line)]">
      <div className="site-container grid gap-10 py-18 md:py-24 lg:grid-cols-[1.15fr_.85fr] lg:items-center lg:gap-18">
        <div className="max-w-2xl">
          <p className="hero-enter hero-intro section-kicker mb-5">Ridho Wahyu Nugroho · Frontend & Mobile Engineer</p>
          <h1 className="hero-enter hero-title max-w-3xl text-[clamp(2.7rem,6.4vw,5.7rem)] leading-[1.08] font-bold">
            I build products people can <span className="text-[var(--color-primary)]">rely on.</span>
          </h1>
          <p className="hero-enter hero-description mt-7 max-w-xl text-lg leading-relaxed text-[var(--color-textMuted)]">
            I turn complex web and mobile workflows into usable products, then test the journeys that matter with Playwright and Maestro. Seven years across customer products, internal tools, and field operations.
          </p>
          <div className="hero-enter hero-actions mt-9 flex flex-wrap gap-3">
            <a href="#projects" className="button-primary">Explore selected work <span aria-hidden="true">↗</span></a>
            <a href="mailto:wridho246@gmail.com" className="button-secondary">Start a conversation</a>
          </div>
          <div className="hero-enter hero-actions mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-semibold">
            <a href="/Ridho-CV.pdf" className="text-link" download>Download CV ↓</a>
            <a href="https://github.com/Wridho788" target="_blank" rel="noopener noreferrer" className="text-link">GitHub ↗</a>
            <a href="https://www.linkedin.com/in/ridho-wahyu-nugroho-4a1544142/" target="_blank" rel="noopener noreferrer" className="text-link">LinkedIn ↗</a>
          </div>
        </div>

        <div className="hero-enter hero-portrait relative mx-auto w-full max-w-[420px] lg:max-w-none">
          <div className="absolute -right-4 -top-4 h-full w-full rounded-2xl border border-[var(--color-accent)]/35" aria-hidden="true" />
          <div className="relative overflow-hidden rounded-2xl bg-[#0d3c46]">
            <Image src="/images/profile.jpeg" alt="Portrait of Ridho Wahyu Nugroho" width={864} height={1080} priority className="aspect-[4/4.5] w-full object-cover object-top" sizes="(min-width: 1024px) 420px, (min-width: 640px) 380px, 90vw" />
          </div>
          <div className="absolute -bottom-5 -left-3 rounded-lg border border-[var(--color-line)] bg-white px-4 py-3 shadow-lg sm:-left-6">
            <p className="text-[10px] font-bold uppercase tracking-[.15em] text-[var(--color-primary)]">What I bring</p>
            <p className="mt-1 text-sm font-bold">Product engineering + QA</p>
          </div>
        </div>
      </div>
    </section>
  );
}
