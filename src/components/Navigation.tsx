'use client';

import { useState } from 'react';

export default function Navigation() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Top Navigation */}
      <nav className="fixed top-0 w-full backdrop-blur-md bg-[--color-background]/70 border-b border-white/10 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <a
            href="/"
            className="text-xl font-bold text-[--color-primary] hover:opacity-80 transition"
          >
            Ridho
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-6 text-sm">
            <NavLink href="/#projects">Projects</NavLink>
            <NavLink href="/#experience">Experience</NavLink>
            <NavLink href="/#skills">Skills</NavLink>
            <NavLink href="/writing">Writing</NavLink>
            <NavLink href="/#contact">Contact</NavLink>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-[--color-primary]"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <div className="space-y-1">
              <span className="block w-6 h-[2px] bg-current" />
              <span className="block w-6 h-[2px] bg-current" />
              <span className="block w-6 h-[2px] bg-current" />
            </div>
          </button>
        </div>
      </nav>

      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Bottom Sheet */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 md:hidden transform transition-transform duration-300 ${
          open ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="rounded-t-2xl bg-white text-gray-900 border-t border-gray-400 px-6 py-6">

          {/* Handle */}
          <div className="w-10 h-1 bg-white/20 rounded-full mx-auto mb-6" />

          <div className="flex flex-col divide-y divide-gray-200">
            <SheetLink href="/#projects" onClick={() => setOpen(false)}>
              Projects
            </SheetLink>
            <SheetLink href="/#experience" onClick={() => setOpen(false)}>
              Experience
            </SheetLink>
            <SheetLink href="/#skills" onClick={() => setOpen(false)}>
              Skills
            </SheetLink>
            <SheetLink href="/writing" onClick={() => setOpen(false)}>
              Writing
            </SheetLink>
            <SheetLink href="/#contact" onClick={() => setOpen(false)}>
              Contact
            </SheetLink>
          </div>
        </div>
      </div>
    </>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} className="hover:text-[--color-primary] transition">
      {children}
    </a>
  );
}

function SheetLink({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <a
      href={href}
      onClick={onClick}
className="py-3 text-lg font-medium text-[--color-primary] hover:opacity-80 transition"
    >
      {children}
    </a>
  );
}

