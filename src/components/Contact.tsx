export default function Contact() {
  return (
    <section id="contact" className="bg-[var(--color-textMain)] py-20 text-white md:py-28">
      <div data-reveal className="site-container grid gap-10 md:grid-cols-[1.1fr_.9fr] md:items-end">
        <div>
          <p className="text-xs font-bold uppercase tracking-[.16em] text-[#9fd4cd]">05 / Contact</p>
          <h2 className="mt-5 max-w-2xl text-4xl font-bold leading-tight md:text-6xl">Let’s make the next product work better.</h2>
        </div>
        <div className="md:justify-self-end">
          <p className="max-w-md leading-relaxed text-[#c9d4d4]">Building a web or mobile product, improving a complex workflow, or strengthening release confidence? Tell me what you’re working on.</p>
          <a href="mailto:wridho246@gmail.com?subject=Project%20conversation" className="contact-button mt-7 inline-flex min-h-13 items-center gap-3 rounded-lg bg-white px-5 py-3 font-bold text-[var(--color-textMain)] hover:bg-[#dfeae6]">wridho246@gmail.com <span aria-hidden="true">↗</span></a>
          <p className="mt-4 text-sm text-[#c9d4d4]">You can also connect on <a className="underline underline-offset-4" href="https://www.linkedin.com/in/ridho-wahyu-6b08613a2/" target="_blank" rel="noopener noreferrer">LinkedIn</a>.</p>
        </div>
      </div>
    </section>
  );
}
