import { faqItems } from './data';

export function FAQSection() {
  return (
    <section id="faq" className="border-t border-white/10 bg-white/5">
      <div className="mx-auto max-w-5xl px-6 py-20 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold tracking-[0.25em] text-cyan-400 uppercase">FAQ</p>
          <h2 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl">
            Perguntas frequentes sobre o overlay de chat Twitch.
          </h2>
          <p className="mt-4 text-lg leading-8 text-slate-300">
            Respostas diretas para acelerar a configuracao do seu Twitch chat OBS overlay e reduzir
            duvidas antes de ir ao ar.
          </p>
        </div>

        <div className="mt-12 space-y-4">
          {faqItems.map((item) => (
            <details
              key={item.question}
              className="group rounded-3xl border border-white/10 bg-slate-950/70 p-6"
            >
              <summary className="cursor-pointer list-none text-lg font-semibold text-white marker:hidden">
                <span className="flex items-center justify-between gap-4">
                  {item.question}
                  <span
                    aria-hidden="true"
                    className="rounded-full border border-white/10 px-3 py-1 text-sm text-slate-300 transition group-open:rotate-45"
                  >
                    +
                  </span>
                </span>
              </summary>
              <p className="mt-4 pr-10 text-base leading-7 text-slate-300">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
