import { Cpu, Layers3, MessageSquareText, Palette, Sparkles, Tv } from 'lucide-react';
import { features } from './data';

const icons = [Palette, Cpu, Tv, MessageSquareText, Sparkles, Layers3] as const;

export function FeaturesSection() {
  return (
    <section id="funcionalidades" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold tracking-[0.25em] text-fuchsia-400 uppercase">
          Funcionalidades
        </p>
        <h2 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl">
          Tudo o que voce precisa em um overlay de chat Twitch moderno.
        </h2>
        <p className="mt-4 text-lg leading-8 text-slate-300">
          O Twitch Chat Visualizer combina usabilidade, clareza visual e velocidade para quem quer
          um overlay OBS Twitch simples de configurar e forte em conversao visual.
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {features.map((feature, index) => {
          const Icon = icons[index];

          return (
            <article
              key={feature.title}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-slate-950/20"
            >
              <div className="inline-flex rounded-2xl bg-fuchsia-500/15 p-3 text-fuchsia-300">
                <Icon className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="mt-5 text-xl font-semibold text-white">{feature.title}</h3>
              <p className="mt-3 text-base leading-7 text-slate-300">{feature.description}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
