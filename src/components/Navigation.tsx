'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { site } from '@/lib/site';

const links = [
  { href: '/#projects', label: 'Work', section: 'projects' },
  { href: '/#about', label: 'About', section: 'about' },
  { href: '/writing', label: 'Writing', section: 'writing' },
  { href: '/#contact', label: 'Contact', section: 'contact' },
];

function HomeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5 9.5V20h14V9.5" />
    </svg>
  );
}

export default function Navigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
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
        section = 'home';
        const readingLine = Math.min(window.innerHeight * 0.35, 240);
        sections.forEach((element) => {
          if (element.getBoundingClientRect().top <= readingLine) section = element.id;
        });
        if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4) section = 'contact';
        setActiveSection(section);
      }
      if (headerRef.current) headerRef.current.dataset.scrolled = String(window.scrollY > 80);
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
    <header ref={headerRef} className="site-header">
      <div className="nav-shell site-container">
        <div className="nav-pill">
          <Link href="/" className="nav-logo" onClick={() => setOpen(false)}>
            Ridho<span>.</span>
            <span className="sr-only"> Home</span>
          </Link>

          <nav ref={navRef} aria-label="Primary navigation" className="primary-navigation">
            <Link href="/" data-section="home" aria-current={active === 'home' ? 'location' : undefined} className="nav-link">
              <HomeIcon />
              <span className="sr-only">Home</span>
            </Link>
            {links.map((link) => (
              <Link key={link.href} href={link.href} data-section={link.section} aria-current={active === link.section ? 'location' : undefined} className="nav-link">
                {link.label}
              </Link>
            ))}
            <span className="nav-indicator" aria-hidden="true" />
          </nav>

          <button ref={buttonRef} type="button" aria-controls="mobile-navigation" aria-expanded={open} aria-label={open ? 'Close menu' : 'Open menu'} className="mobile-menu-toggle" onClick={() => setOpen((current) => !current)}>
            <span className="menu-icon" data-open={open} aria-hidden="true"><span /><span /></span>
          </button>

          <noscript>
            <style>{'.mobile-menu-toggle { display: none !important; }'}</style>
            <nav aria-label="Mobile navigation" className="noscript-nav">
              {links.map((link) => <Link key={link.href} href={link.href}>{link.label}</Link>)}
            </nav>
          </noscript>

          <div id="mobile-navigation" className="mobile-menu-panel" data-open={open} inert={!open} aria-hidden={!open}>
            <div className="mobile-menu-clip">
              <nav aria-label="Mobile navigation" className="bg-[var(--color-textMain)] px-5 py-3 shadow-xl">
                {links.map((link) => (
                  <Link key={link.href} href={link.href} onClick={closeMenu} aria-current={active === link.section ? 'location' : undefined} className="mobile-nav-link">{link.label}</Link>
                ))}
                <a href={`mailto:${site.email}`} onClick={closeMenu} className="flex min-h-12 items-center font-semibold text-[#6cc3b4]">Email Ridho ↗</a>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
