import Image from 'next/image';
import { site } from '@/lib/site';
import Experience from './Experience';

export default function About() {
  return (
    <section id="about" className="py-22 md:py-28">
      <div className="site-container">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="section-kicker mb-4">(About me)</p>
            <h2 data-reveal="mask" className="heading-section max-w-xl">Seven years of building, then testing what I build.</h2>
          </div>
          <div>
            <div data-reveal="clip" className="about-photo">
              <Image src="/images/profile.jpeg" alt="Ridho Wahyu Nugroho against a teal studio backdrop" width={864} height={1080} sizes="(min-width: 1024px) 600px, 90vw" className="aspect-[5/4] w-full object-cover object-[50%_22%]" />
            </div>
            <div data-reveal className="mt-8 space-y-5 text-[1.0625rem] leading-relaxed text-[var(--color-textMuted)]">
              <p>
                I&apos;m a frontend and mobile engineer based in Indonesia. Since 2019 I&apos;ve built native Android apps in Kotlin, enterprise web interfaces in React and TypeScript, Flutter apps for field teams, and most recently end-to-end automation with Maestro and Playwright.
              </p>
              <p>
                That mix shapes how I work: I turn complex workflows into interfaces people can use, then test the journeys that matter so releases stay dependable.
              </p>
            </div>
            <a href={site.cv} download className="button-secondary mt-8">Download the full CV <span aria-hidden="true">↓</span></a>
          </div>
        </div>

        <Experience />
      </div>
    </section>
  );
}
