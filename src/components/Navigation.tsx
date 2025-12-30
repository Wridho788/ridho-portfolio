export default function Navigation() {
  return (
    <nav className="fixed top-0 w-full backdrop-blur-md bg-[--color-background]/70 border-b border-white/10 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <a href="/" className="text-xl font-bold text-[--color-primary] hover:opacity-80 transition">
          Ridho
        </a>
        
        <div className="flex gap-6 text-sm">
          <a href="/#projects" className="hover:text-[--color-primary] transition">
            Projects
          </a>
          <a href="/#experience" className="hover:text-[--color-primary] transition">
            Experience
          </a>
          <a href="/#skills" className="hover:text-[--color-primary] transition">
            Skills
          </a>
          <a href="/writing" className="hover:text-[--color-primary] transition">
            Writing
          </a>
          <a href="/#contact" className="hover:text-[--color-primary] transition">
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
}
