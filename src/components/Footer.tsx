import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-[#38515a] bg-[var(--color-textMain)] py-7 text-[#d5dddd]">
      <div className="site-container flex flex-wrap items-center justify-between gap-4 text-sm">
        <p>© {new Date().getFullYear()} Ridho Wahyu Nugroho</p>
        <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-5 gap-y-2">
          <Link href="/#projects" className="hover:text-white">Work</Link>
          <Link href="/#experience" className="hover:text-white">Experience</Link>
          <Link href="/writing" className="hover:text-white">Writing</Link>
          <a href="mailto:wridho246@gmail.com" className="hover:text-white">Email</a>
        </nav>
      </div>
    </footer>
  );
}
