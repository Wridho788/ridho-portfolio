'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/#projects', label: 'Work', section: 'projects' },
  { href: '/#experience', label: 'Experience', section: 'experience' },
  { href: '/writing', label: 'Writing', section: 'writing' },
  { href: '/#contact', label: 'Contact', section: 'contact' },
];

export default function Navigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const buttonRef = useRef<HTMLButtonElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const pageSection = pathname.startsWith('/case-studies') ? 'projects' : pathname.startsWith('/writing') ? 'writing' : '';
  const active = pageSection || (pathname === '/' ? activeSection : '');

  useEffect(() => {
    let frame = 0;
    const sections = links.map(({ section }) => document.getElementById(section)).filter((element): element is HTMLElement => !!element);
    const update = () => {
      frame = 0;
      let section = pageSection;
      if (pathname === '/') {
        const readingLine = Math.min(window.innerHeight * 0.35, 240);
        sections.forEach((element) => {
          if (element.getBoundingClientRect().top <= readingLine) section = element.id;
        });
        if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4) section = 'contact';
        setActiveSection(section);
      }
      const nav = navRef.current;
      const link = nav?.querySelector<HTMLElement>(`[data-section="${section}"]`);
      if (nav) {
        nav.style.setProperty('--indicator-x', `${link?.offsetLeft || 0}px`);
        nav.style.setProperty('--indicator-width', String(link?.offsetWidth || 0));
        nav.dataset.hasActive = String(!!link);
      }
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    schedule();
    const resizeObserver = new ResizeObserver(schedule);
    if (navRef.current) resizeObserver.observe(navRef.current);
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, [pathname, pageSection]);

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    const closeOutside = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const desktop = window.matchMedia('(min-width: 768px)');
    const closeOnDesktop = () => { if (desktop.matches) setOpen(false); };
    document.addEventListener('keydown', closeOnEscape);
    document.addEventListener('pointerdown', closeOutside);
    desktop.addEventListener('change', closeOnDesktop);
    return () => {
      document.removeEventListener('keydown', closeOnEscape);
      document.removeEventListener('pointerdown', closeOutside);
      desktop.removeEventListener('change', closeOnDesktop);
    };
  }, [open]);

  const closeMenu = () => {
    setOpen(false);
    buttonRef.current?.focus();
  };

  return (
    <header ref={headerRef} className="site-header sticky top-0 z-50 border-b border-[var(--color-line)] bg-[var(--color-background)]/95 backdrop-blur-md">
      <div className="site-container flex h-18 items-center justify-between gap-6">
        <Link href="/" className="font-heading text-lg font-extrabold tracking-tight" onClick={() => setOpen(false)}>
          Ridho<span className="text-[var(--color-primary)]">.</span>
          <span className="sr-only"> Home</span>
        </Link>

        <nav ref={navRef} aria-label="Primary navigation" className="primary-navigation hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} data-section={link.section} aria-current={active === link.section ? 'location' : undefined} className="nav-link py-3 text-sm font-semibold text-[var(--color-textMuted)] hover:text-[var(--color-primary)]">
              {link.label}
            </Link>
          ))}
          <span className="nav-indicator" aria-hidden="true" />
        </nav>

        <a href="mailto:wridho246@gmail.com" className="nav-contact hidden rounded-full border border-[var(--color-textMain)] px-4 py-2 text-xs font-bold hover:bg-[var(--color-textMain)] hover:text-white md:inline-flex">
          Get in touch <span aria-hidden="true" className="ml-2">↗</span>
        </a>

        <button ref={buttonRef} type="button" aria-controls="mobile-navigation" aria-expanded={open} aria-label={open ? 'Close menu' : 'Open menu'} className="mobile-menu-toggle inline-flex min-h-11 min-w-11 items-center justify-center rounded-md border border-[var(--color-line)] md:hidden" onClick={() => setOpen((current) => !current)}>
          <span className="menu-icon" data-open={open} aria-hidden="true"><span /><span /></span>
        </button>
      </div>

      <div id="mobile-navigation" className="mobile-menu-panel md:hidden" data-open={open} inert={!open} aria-hidden={!open}>
        <div className="mobile-menu-clip">
          <nav aria-label="Mobile navigation" className="border-t border-[var(--color-line)] bg-[var(--color-background)] px-5 py-4 shadow-lg">
            <div className="site-container flex flex-col">
              {links.map((link) => (
                <Link key={link.href} href={link.href} onClick={closeMenu} aria-current={active === link.section ? 'location' : undefined} className="nav-link border-b border-[var(--color-line)] py-3 font-semibold">{link.label}</Link>
              ))}
              <a href="mailto:wridho246@gmail.com" onClick={closeMenu} className="py-3 font-semibold text-[var(--color-primary)]">Email Ridho ↗</a>
            </div>
          </nav>
        </div>
      </div>
      <noscript>
        <style>{'.mobile-menu-toggle { display: none; }'}</style>
        <nav aria-label="Mobile navigation" className="flex flex-wrap justify-center gap-5 border-t border-[var(--color-line)] px-5 py-3 text-sm md:hidden">
          {links.map((link) => <Link key={link.href} href={link.href}>{link.label}</Link>)}
        </nav>
      </noscript>
    </header>
  );
}
