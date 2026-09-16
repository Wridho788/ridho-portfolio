'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

type Command = {
  id: string;
  label: string;
  hint: string;
  group: string;
  href: string;
  external?: boolean;
};

const COMMANDS: Command[] = [
  { id: 'home', label: 'Home', hint: 'Back to top', group: 'Navigate', href: '/' },
  { id: 'projects', label: 'Projects', hint: 'Featured & professional work', group: 'Navigate', href: '/#projects' },
  { id: 'experience', label: 'Experience', hint: 'Work history', group: 'Navigate', href: '/#experience' },
  { id: 'skills', label: 'Skills', hint: 'Tech stack', group: 'Navigate', href: '/#skills' },
  { id: 'github-activity', label: 'Development Activity', hint: 'GitHub contribution graph', group: 'Navigate', href: '/#github-activity' },
  { id: 'writing', label: 'Writing', hint: 'Articles & notes', group: 'Navigate', href: '/writing' },
  { id: 'contact', label: 'Contact', hint: 'Get in touch', group: 'Navigate', href: '/#contact' },

  { id: 'lapakbenz-case', label: 'LapakBenz — Case Study', hint: 'Community & marketplace platform', group: 'Projects', href: '/case-studies/lapakbenz/' },
  { id: 'lapakbenz-demo', label: 'LapakBenz — Live Demo', hint: 'lapakbenzz.vercel.app', group: 'Projects', href: 'https://lapakbenzz.vercel.app/', external: true },
  { id: 'ravasim-case', label: 'RavaSIM — Case Study', hint: 'eSIM management SaaS dashboard', group: 'Projects', href: '/case-studies/ravasim/' },
  { id: 'ravasim-demo', label: 'RavaSIM — Live Demo', hint: 'ravasim.vercel.app', group: 'Projects', href: 'https://ravasim.vercel.app', external: true },

  { id: 'cv', label: 'Download CV', hint: 'PDF resume', group: 'Contact', href: '/Ridho-CV.pdf', external: true },
  { id: 'email', label: 'Email Me', hint: 'wridho246@gmail.com', group: 'Contact', href: 'mailto:wridho246@gmail.com', external: true },
  { id: 'github', label: 'GitHub Profile', hint: 'github.com/Wridho788', group: 'Contact', href: 'https://github.com/Wridho788', external: true },
  { id: 'linkedin', label: 'LinkedIn', hint: 'Connect on LinkedIn', group: 'Contact', href: 'https://www.linkedin.com/in/ridho-wahyu-nugroho-4a1544142/', external: true },
];

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Latest-value ref so the mount-only keydown listener can read current
  // `open` without needing it in its effect dependencies.
  const openRef = useRef(open);
  useEffect(() => {
    openRef.current = open;
  }, [open]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return COMMANDS;
    return COMMANDS.filter(
      (c) =>
        c.label.toLowerCase().includes(q) ||
        c.hint.toLowerCase().includes(q) ||
        c.group.toLowerCase().includes(q)
    );
  }, [query]);

  const openPalette = () => {
    setActiveIndex(0);
    setOpen(true);
  };

  const closePalette = () => {
    setOpen(false);
    setQuery('');
    setActiveIndex(0);
  };

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (openRef.current) closePalette();
        else openPalette();
        return;
      }
      if (e.key === 'Escape') closePalette();
    };
    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, []);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const runCommand = (cmd: Command) => {
    closePalette();
    if (cmd.external) {
      window.open(cmd.href, '_blank', 'noopener,noreferrer');
    } else {
      window.location.href = cmd.href;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const cmd = results[activeIndex];
      if (cmd) runCommand(cmd);
    }
  };

  return (
    <>
      <button
        onClick={openPalette}
        aria-label="Open command palette"
        className="hidden md:flex fixed bottom-6 right-6 z-40 items-center gap-2 bg-[--color-surface] border border-white/10 rounded-full px-4 py-2 text-xs text-[--color-textMuted] hover:border-[--color-primary]/50 hover:text-[--color-textMain] transition shadow-[--shadow-soft]"
      >
        Quick nav
        <span className="border border-white/20 rounded px-1.5 py-0.5 font-mono">
          ⌘K
        </span>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[60] flex items-start justify-center pt-[15vh] px-4 bg-black/60 backdrop-blur-sm"
          onClick={closePalette}
        >
          <div
            className="w-full max-w-lg bg-[--color-surface] border border-white/10 rounded-xl shadow-[--shadow-soft] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setActiveIndex(0);
              }}
              onKeyDown={handleKeyDown}
              placeholder="Jump to a section, project, or link…"
              className="w-full bg-transparent px-5 py-4 text-sm outline-none border-b border-white/10 placeholder:text-[--color-textMuted]"
            />

            <div className="max-h-80 overflow-y-auto py-2">
              {results.length === 0 && (
                <p className="px-5 py-6 text-sm text-[--color-textMuted]">
                  No results.
                </p>
              )}

              {results.map((cmd, i) => (
                <button
                  key={cmd.id}
                  onClick={() => runCommand(cmd)}
                  onMouseEnter={() => setActiveIndex(i)}
                  className={`w-full text-left px-5 py-3 flex items-center justify-between gap-4 transition ${
                    i === activeIndex ? 'bg-[--color-primary]/10' : ''
                  }`}
                >
                  <span>
                    <span className="text-sm font-medium">{cmd.label}</span>
                    <span className="block text-xs text-[--color-textMuted]">
                      {cmd.hint}
                    </span>
                  </span>
                  <span className="text-[10px] uppercase tracking-wide text-[--color-textMuted] shrink-0">
                    {cmd.group}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
