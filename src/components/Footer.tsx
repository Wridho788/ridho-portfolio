export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-8">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        
        <p className="text-sm text-[--color-textMuted]">
          © {new Date().getFullYear()} Ridho. All rights reserved.
        </p>

        <div className="flex gap-4 text-sm">
          <a href="#projects" className="hover:text-[--color-primary] transition">Projects</a>
          <a href="#experience" className="hover:text-[--color-primary] transition">Experience</a>
          <a href="#skills" className="hover:text-[--color-primary] transition">Skills</a>
          <a href="#contact" className="hover:text-[--color-primary] transition">Contact</a>
        </div>
      </div>
    </footer>
  );
}
