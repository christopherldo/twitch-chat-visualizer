import {
  Cpu,
  Layers3,
  MessageSquareText,
  Palette,
  ShieldCheck,
  Sparkles,
  Tv,
  Zap,
} from 'lucide-react';
import { Reveal } from '../../components/Reveal';
import { features } from './data';

const icons = [Palette, Cpu, Tv, MessageSquareText, Sparkles, Layers3, ShieldCheck, Zap] as const;

export function FeaturesSection() {
  return (
    <section
      id="funcionalidades"
      className="relative mx-auto max-w-7xl scroll-mt-28 px-4 py-24 sm:px-6 lg:px-8"
    >
      <Reveal className="mx-auto max-w-3xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-fuchsia-400/30 bg-fuchsia-500/10 px-4 py-1.5 text-xs font-semibold tracking-[0.18em] text-fuchsia-200 uppercase">
          <Sparkles className="h-3.5 w-3.5" aria-hidden="true" /> Funcionalidades
        </span>
        <h2 className="mt-5 text-3xl font-black tracking-tight text-balance sm:text-4xl lg:text-5xl">
          Tudo que um <span className="text-gradient-twitch">chat moderno</span> precisa.
        </h2>
        <p className="mt-4 text-base leading-7 text-slate-300 sm:text-lg">
          Combinamos performance enterprise com a experiencia visual que o seu canal merece. Sem
          travas, sem instalacao, sem fricao.
        </p>
      </Reveal>

      <div className="mt-14 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {features.map((feature, index) => {
          const Icon = icons[index % icons.length];
          return (
            <Reveal
              key={feature.title}
              delay={index * 60}
              as="article"
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.06] via-white/[0.03] to-transparent p-6 transition hover:-translate-y-1 hover:border-white/20"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-24 -right-24 h-48 w-48 rounded-full bg-gradient-to-br from-twitch-500/40 via-fuchsia-500/30 to-transparent opacity-0 blur-2xl transition-opacity group-hover:opacity-100"
              />
              <div className="relative inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-twitch-500/30 via-twitch-500/10 to-transparent text-twitch-200 shadow-inner shadow-twitch-500/30">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="relative mt-5 text-xl font-bold text-white">{feature.title}</h3>
              <p className="relative mt-3 text-sm leading-7 text-slate-300">{feature.description}</p>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
