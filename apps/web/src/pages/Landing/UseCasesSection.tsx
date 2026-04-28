import { useCases } from './data';

export function UseCasesSection() {
  return (
    <section id="casos-de-uso" className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold tracking-[0.25em] text-fuchsia-400 uppercase">
            Casos de uso
          </p>
          <h2 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl">
            Um visualizador de chat para streamers, eventos e formatos ao vivo.
          </h2>
          <p className="mt-4 text-lg leading-8 text-slate-300">
            O mesmo overlay de chat Twitch atende criadores solo, podcasts, coberturas especiais
            e operacoes multicena que precisam de leitura clara e integracao rapida com OBS.
          </p>
          <div className="mt-8 rounded-3xl border border-cyan-400/20 bg-cyan-400/10 p-6 text-cyan-50">
            <h3 className="text-xl font-semibold">Por que isso converte melhor?</h3>
            <p className="mt-3 leading-7">
              Um chat visivel e organizado aumenta interacao, retencao e sensacao de comunidade.
              Quanto mais facil for mostrar a conversa ao vivo, maior o engajamento percebido na
              tela.
            </p>
          </div>
        </div>

        <div className="grid gap-6">
          {useCases.map((item) => (
            <article
              key={item.title}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-slate-950/20"
            >
              <h3 className="text-2xl font-semibold text-white">{item.title}</h3>
              <p className="mt-3 text-base leading-7 text-slate-300">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
