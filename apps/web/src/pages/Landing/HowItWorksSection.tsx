import { ArrowRight, Sliders, Link as LinkIcon, Tv } from 'lucide-react';
import { Reveal } from '../../components/Reveal';
import { howItWorksSteps } from './data';

const icons = [Sliders, LinkIcon, Tv] as const;

export function HowItWorksSection() {
  return (
    <section
      id="como-funciona"
      className="relative scroll-mt-28 border-y border-white/10 bg-gradient-to-b from-white/[0.02] via-transparent to-white/[0.02]"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-twitch-500/40 to-transparent" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-semibold tracking-[0.18em] text-cyan-200 uppercase">
            Como funciona
          </span>
          <h2 className="mt-5 text-3xl font-black tracking-tight text-balance sm:text-4xl lg:text-5xl">
            <span className="text-gradient">Tres passos</span> ate o ar.
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-300 sm:text-lg">
            Um fluxo desenhado para streamers, podcasts e operacoes multicena. Sem extensoes, sem
            login, sem complicacao.
          </p>
        </Reveal>

        <ol className="mx-auto mt-14 grid max-w-5xl gap-6 lg:grid-cols-3">
          {howItWorksSteps.map((item, index) => {
            const Icon = icons[index];
            const isLast = index === howItWorksSteps.length - 1;
            return (
              <Reveal
                key={item.step}
                as="li"
                delay={index * 100}
                className="group relative rounded-3xl border border-white/10 bg-slate-950/60 p-6 backdrop-blur transition hover:border-white/20"
              >
                <div className="flex items-start gap-4">
                  <span className="relative inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/15 bg-gradient-to-br from-twitch-500/40 via-fuchsia-500/20 to-cyan-500/20 text-cyan-100">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <span className="block text-[11px] font-mono tracking-[0.32em] text-cyan-300/70">PASSO {item.step}</span>
                    <h3 className="mt-1 text-xl font-bold text-white">{item.title}</h3>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-7 text-slate-300">{item.description}</p>
                {!isLast ? (
                  <ArrowRight
                    aria-hidden="true"
                    className="absolute top-1/2 -right-3 hidden h-6 w-6 -translate-y-1/2 text-twitch-400/40 lg:block"
                  />
                ) : null}
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
