import Image from 'next/image';
import type { CSSProperties } from 'react';
import { site } from '@/lib/site';

const letters = ['R', 'I', 'D', 'H', 'O'];

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-glow" aria-hidden="true" />
      <div className="hero-inner site-container">
        <h1 className="hero-wordmark">
          <span className="wordmark-drift" aria-hidden="true">
            {letters.map((letter, index) => (
              <span key={letter} className="wordmark-mask"><span className="wordmark-letter" style={{ '--i': index } as CSSProperties}>{letter}</span></span>
            ))}
            <span className="wordmark-mask"><span className="wordmark-letter wordmark-dot" style={{ '--i': letters.length } as CSSProperties}>.</span></span>
          </span>
          <span className="sr-only">Ridho Wahyu Nugroho, Frontend &amp; Mobile Engineer</span>
        </h1>

        <figure className="hero-portrait">
          <div className="portrait-drift">
            <Image src="/images/profile-cutout.webp" alt="Portrait of Ridho Wahyu Nugroho" width={704} height={898} priority fetchPriority="high" sizes="(min-width: 1024px) 520px, (min-width: 640px) 400px, 90vw" />
          </div>
        </figure>

        <div className="hero-intro hero-enter">
          <p>Hi, I&apos;m Ridho, a frontend &amp; mobile engineer. I build products people can rely on.</p>
          <div className="hero-links">
            <a href={site.cv} className="text-link" download>Download CV ↓</a>
            <a href={site.github} target="_blank" rel="noopener noreferrer" className="text-link">GitHub ↗</a>
            <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="text-link">LinkedIn ↗</a>
          </div>
        </div>

        <p className="hero-aside hero-enter">Web and mobile products, plus the Playwright and Maestro tests that keep them working.</p>

        <div className="hero-meta hero-enter">
          <p>© Ridho {new Date().getFullYear()}</p>
          <a href="#projects" className="scroll-cue font-medium">(Scroll down <span aria-hidden="true">↓</span>)</a>
        </div>
      </div>
    </section>
  );
}
