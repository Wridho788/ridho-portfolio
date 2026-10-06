import Link from 'next/link';
import { site } from '@/lib/site';

export default function Footer() {
  return (
    <footer className="border-t border-[#262626] bg-[var(--color-panel)] py-7 text-[#d4d4d4]">
      <div className="site-container flex flex-wrap items-center justify-between gap-4 text-sm">
        <p>© {new Date().getFullYear()} Ridho Wahyu Nugroho</p>
        <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-5 gap-y-2">
          <Link href="/#projects" className="hover:text-white">Work</Link>
          <Link href="/#about" className="hover:text-white">About</Link>
          <Link href="/writing" className="hover:text-white">Writing</Link>
          <a href={`mailto:${site.email}`} className="hover:text-white">Email</a>
          <a href={site.github} target="_blank" rel="noopener noreferrer" className="hover:text-white">GitHub</a>
          <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-white">LinkedIn</a>
        </nav>
      </div>
    </footer>
  );
}
