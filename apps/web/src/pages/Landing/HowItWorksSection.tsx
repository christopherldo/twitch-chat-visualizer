import { howItWorksSteps } from './data';

export function HowItWorksSection() {
  return (
    <section id="como-funciona" className="border-y border-white/10 bg-white/5">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold tracking-[0.25em] text-cyan-400 uppercase">
            Como funciona
          </p>
          <h2 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl">
            Configure, copie e publique seu Twitch chat OBS overlay.
          </h2>
          <p className="mt-4 text-lg leading-8 text-slate-300">
            O fluxo foi pensado para streamers, creators e equipes de producao que precisam
            colocar um overlay de chat Twitch no ar sem perder tempo.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {howItWorksSteps.map((item) => (
            <article
              key={item.step}
              className="rounded-3xl border border-white/10 bg-slate-950/70 p-6"
            >
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-cyan-400/15 text-lg font-black text-cyan-200">
                {item.step}
              </div>
              <h3 className="mt-5 text-2xl font-semibold text-white">{item.title}</h3>
              <p className="mt-3 text-base leading-7 text-slate-300">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
