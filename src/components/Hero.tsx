export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 py-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Text */}
          <div>
            <p className="text-[--color-primary] mb-4">Hi, I&apos;m Ridho</p>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Frontend & Mobile Engineer
              <br />
              <span className="text-[--color-primary]">
                Building Scalable Applications
              </span>
            </h1>

            <p className="mt-6 text-[--color-textMuted] max-w-xl leading-relaxed">
              I design and develop high-performance web and mobile applications
              using React, TypeScript, Next.js, Flutter, and Android Kotlin,
              focusing on clean architecture, performance, and real business
              needs.
            </p>

            <div className="mt-10 flex gap-4 flex-wrap">
              <a
                href="#projects"
                className="bg-[--color-primary] text-white px-6 py-3 rounded-xl font-medium hover:shadow-[--shadow-glow] transition"
              >
                View Projects
              </a>

              <a
                href="/Ridho-CV.pdf"
                className="border border-white/20 px-6 py-3 rounded-xl hover:bg-white/5 transition"
              >
                Download CV
              </a>
            </div>
          </div>

          {/* Visual */}
                    <div className="hidden lg:block relative">
            <div className="absolute inset-0 bg-[--color-primary]/10 blur-3xl rounded-full" />
            
            {/* Profile Image */}
            <div className="relative mb-6">
              <div className="w-70 h-60 mx-auto rounded-full overflow-hidden border-4 border-[--color-primary]/30 shadow-[--shadow-glow]">
                <img 
                  src="/images/profile.jpeg" 
                  alt="Ridho Profile" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="relative bg-[--color-surface] border border-white/10 rounded-xl p-8 shadow-[--shadow-soft]">
              <p className="text-sm text-[--color-textMuted]">
                7+ years experience • Web & Mobile • Production-ready mindset
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Background Accent */}
      <div className="absolute top-[-100px] right-[-100px] w-[300px] h-[300px] bg-[--color-accent]/20 rounded-full blur-3xl" />
    </section>
  );
}
