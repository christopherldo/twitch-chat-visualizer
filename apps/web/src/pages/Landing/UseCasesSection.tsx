import { Gamepad2, Mic, Trophy } from 'lucide-react';
import { Reveal } from '../../components/Reveal';
import { useCases } from './data';

const icons = [Gamepad2, Mic, Trophy] as const;

export function UseCasesSection() {
  return (
    <section id="casos-de-uso" className="relative mx-auto max-w-7xl scroll-mt-28 px-4 py-24 sm:px-6 lg:px-8">
      <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        <Reveal className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-fuchsia-400/30 bg-fuchsia-500/10 px-4 py-1.5 text-xs font-semibold tracking-[0.18em] text-fuchsia-200 uppercase">
            Casos de uso
          </span>
          <h2 className="mt-5 text-3xl font-black tracking-tight text-balance sm:text-4xl lg:text-5xl">
            Um overlay, <span className="text-gradient-twitch">infinitos formatos</span>.
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-300 sm:text-lg">
            Do gameplay frenetico ao podcast intimo, do festival de e-sports a watch party. O mesmo
            chat acompanha o seu ritmo.
          </p>
          <div className="mt-8 rounded-3xl border border-cyan-400/20 bg-gradient-to-br from-cyan-500/10 via-cyan-500/5 to-transparent p-6 text-cyan-50">
            <h3 className="text-xl font-bold">Por que isso converte melhor?</h3>
            <p className="mt-3 text-sm leading-7 text-cyan-100/80">
              Um chat visivel e organizado aumenta interacao, retencao e sensacao de comunidade.
              Quanto mais facil mostrar a conversa ao vivo, maior o engajamento percebido na tela.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-4">
          {useCases.map((item, index) => {
            const Icon = icons[index % icons.length];
            return (
              <Reveal
                key={item.title}
                as="article"
                delay={index * 80}
                className="group flex gap-4 rounded-3xl border border-white/10 bg-white/[0.04] p-6 transition hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.07]"
              >
                <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-twitch-500/30 via-fuchsia-500/15 to-transparent text-twitch-200">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-300">{item.description}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
