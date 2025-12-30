export default function Contact() {
  return (
    <section id="contact" className="py-32 bg-[--color-surface]">
      <div className="max-w-6xl mx-auto px-6 text-center">
        
        <h2 className="text-3xl md:text-4xl font-semibold mb-6">
          Let&apos;s Work Together
        </h2>

        <p className="text-[--color-textMuted] max-w-xl mx-auto mb-10">
          Have a project, role, or collaboration in mind?  
          Feel free to reach out — I&apos;m always open to discussing meaningful work.
        </p>

        <div className="flex justify-center gap-6 flex-wrap">
          <a
            href="mailto:ridho@example.com"
            className="bg-[--color-primary] text-black px-6 py-3 rounded-xl hover:shadow-[--shadow-glow] transition"
          >
            Email Me
          </a>

          <a
            href="https://linkedin.com/in/ridho"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-white/20 px-6 py-3 rounded-xl hover:bg-white/5 transition"
          >
            LinkedIn
          </a>

          <a
            href="https://github.com/Wridho788"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-white/20 px-6 py-3 rounded-xl hover:bg-white/5 transition"
          >
            GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
