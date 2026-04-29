import { HelpCircle, Plus } from 'lucide-react';
import { Reveal } from '../../components/Reveal';
import { faqItems } from './data';

export function FAQSection() {
  return (
    <section id="faq" className="relative scroll-mt-28 border-t border-white/10">
      <div className="mx-auto max-w-5xl px-4 py-24 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-semibold tracking-[0.18em] text-cyan-200 uppercase">
            <HelpCircle className="h-3.5 w-3.5" aria-hidden="true" /> FAQ
          </span>
          <h2 className="mt-5 text-3xl font-black tracking-tight text-balance sm:text-4xl lg:text-5xl">
            Perguntas <span className="text-gradient">frequentes</span>.
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-300 sm:text-lg">
            Respostas diretas para acelerar a configuracao do seu Twitch chat OBS overlay.
          </p>
        </Reveal>

        <div className="mt-14 space-y-3">
          {faqItems.map((item, index) => (
            <Reveal
              key={item.question}
              delay={index * 50}
              as="details"
              className="group rounded-3xl border border-white/10 bg-white/[0.03] px-6 py-5 transition hover:border-white/20 open:border-twitch-400/40 open:bg-white/[0.05] open:shadow-[0_24px_60px_-30px_rgba(145,70,255,0.45)]"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 marker:hidden">
                <span className="text-base font-semibold text-white sm:text-lg">{item.question}</span>
                <span
                  aria-hidden="true"
                  className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition group-open:rotate-45 group-open:border-twitch-400/50 group-open:bg-twitch-500/20 group-open:text-twitch-100"
                >
                  <Plus className="h-4 w-4" />
                </span>
              </summary>
              <p className="mt-4 pr-10 text-sm leading-7 text-slate-300">{item.answer}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
