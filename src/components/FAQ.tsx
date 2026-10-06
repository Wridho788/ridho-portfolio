import { faq } from '@/lib/faq';

export default function FAQ() {
  return (
    <section id="faq" className="border-t border-[var(--color-line)] py-20 md:py-26">
      <div className="site-container grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:gap-16">
        <div>
          <p className="section-kicker mb-4">(FAQ)</p>
          <h2 data-reveal="mask" className="heading-section">Frequently asked questions.</h2>
          <p className="mt-5 max-w-sm leading-relaxed text-[var(--color-textMuted)]">Quick answers about how I work and what you can explore here.</p>
        </div>
        <div className="space-y-3">
          {faq.map((item, index) => (
            <details key={item.question} name="faq" open={index === 0} className="faq-item">
              <summary>
                {item.question}
                <svg className="faq-chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
              </summary>
              <p className="faq-answer">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
