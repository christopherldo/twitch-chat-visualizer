const quickLinks = [
  { label: 'Funcionalidades', href: '#funcionalidades' },
  { label: 'Como funciona', href: '#como-funciona' },
  { label: 'Casos de uso', href: '#casos-de-uso' },
  { label: 'FAQ', href: '#faq' },
] as const;

function OverlayPreview() {
  return (
    <div className="relative isolate overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/80 p-5 shadow-2xl shadow-fuchsia-950/30">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(168,85,247,0.18),_transparent_45%),radial-gradient(circle_at_bottom_right,_rgba(34,211,238,0.16),_transparent_35%)]" />
      <div className="relative space-y-4">
        <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-xs text-slate-300">
          <span className="font-semibold tracking-[0.2em] text-fuchsia-300 uppercase">OBS Browser Source</span>
          <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-emerald-300">Ao vivo</span>
        </div>

        <div className="grid gap-3">
          <article className="rounded-2xl border border-fuchsia-400/30 bg-white/95 p-4 text-slate-900 shadow-lg">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">
              <span className="h-2 w-2 rounded-full bg-fuchsia-400" />
              streamerpro
            </div>
            <p className="text-sm leading-6">
              Esse overlay de chat Twitch ficou limpo demais. Agora da para ler tudo sem poluir a tela.
            </p>
          </article>

          <article className="ml-6 rounded-2xl border border-cyan-400/30 bg-slate-900/90 p-4 text-slate-100 shadow-lg">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-cyan-400/15 px-3 py-1 text-xs font-semibold text-cyan-200">
              <span className="h-2 w-2 rounded-full bg-cyan-300" />
              modchat
            </div>
            <p className="text-sm leading-6">
              Copiei a URL, colei no OBS e o visualizador de chat para streamers ja entrou na cena.
            </p>
          </article>
        </div>

        <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-4">
          <div className="mb-4 flex items-center justify-between text-sm text-slate-300">
            <span>Canal: `seu_canal`</span>
            <span>Overlay transparente</span>
          </div>
          <div className="grid grid-cols-2 gap-3 text-xs text-slate-300 sm:grid-cols-4">
            {['Nome', 'Mensagem', 'Fonte', 'Badges'].map((item) => (
              <div key={item} className="rounded-xl border border-white/10 bg-white/5 px-3 py-3">
                <p className="font-semibold text-white">{item}</p>
                <p className="mt-1 text-slate-400">Ajustavel</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function HeroSection() {
  return (
    <header className="relative overflow-hidden border-b border-white/10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(168,85,247,0.18),_transparent_30%),radial-gradient(circle_at_top_right,_rgba(34,211,238,0.14),_transparent_26%),linear-gradient(180deg,_rgba(15,23,42,0.96),_rgba(2,6,23,1))]" />
      <div className="relative mx-auto max-w-7xl px-6 py-6 lg:px-8">
        <nav className="flex flex-col gap-4 rounded-full border border-white/10 bg-white/5 px-5 py-4 backdrop-blur md:flex-row md:items-center md:justify-between">
          <a href="/" className="text-sm font-semibold tracking-[0.25em] text-white uppercase">
            Twitch Chat Visualizer
          </a>
          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-300">
            {quickLinks.map((link) => (
              <a key={link.href} href={link.href} className="transition hover:text-white">
                {link.label}
              </a>
            ))}
            <a
              href="/transparent"
              className="inline-flex items-center justify-center rounded-full bg-fuchsia-500 px-4 py-2 font-semibold text-white transition hover:bg-fuchsia-400"
              aria-label="Abrir painel para gerar meu overlay de chat Twitch"
            >
              Gerar meu overlay agora
            </a>
          </div>
        </nav>

        <section
          id="hero"
          className="grid items-center gap-12 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:py-24"
        >
          <div>
            <p className="inline-flex rounded-full border border-fuchsia-400/30 bg-fuchsia-400/10 px-4 py-2 text-sm font-medium text-fuchsia-100">
              Overlay de chat Twitch para OBS com setup em poucos minutos
            </p>
            <h1 className="mt-6 max-w-3xl text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
              O overlay de chat Twitch que deixa sua live mais legivel e profissional.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              Crie um visualizador de chat para streamers com fundo transparente, personalizacao
              de cores, badges e emotes. Gere sua URL, integre ao OBS Studio e publique um Twitch
              chat OBS overlay leve e pronto para conversao da sua audiencia.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a
                href="/transparent"
                className="inline-flex items-center justify-center rounded-full bg-fuchsia-500 px-6 py-3 text-base font-semibold text-white transition hover:bg-fuchsia-400"
              >
                Criar meu overlay gratis
              </a>
              <a
                href="#como-funciona"
                className="inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-3 text-base font-semibold text-white transition hover:bg-white/5"
              >
                Ver como funciona
              </a>
            </div>
            <dl className="mt-10 grid gap-4 text-sm text-slate-300 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
                <dt className="font-semibold text-white">Setup rapido</dt>
                <dd className="mt-2">Configure canal, cores e fonte em uma tela simples.</dd>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
                <dt className="font-semibold text-white">Foco em performance</dt>
                <dd className="mt-2">Estrutura enxuta para manter seu streaming responsivo.</dd>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
                <dt className="font-semibold text-white">Pronto para OBS</dt>
                <dd className="mt-2">Cole a URL no Browser Source e entre ao vivo.</dd>
              </div>
            </dl>
          </div>

          <OverlayPreview />
        </section>
      </div>
    </header>
  );
}
