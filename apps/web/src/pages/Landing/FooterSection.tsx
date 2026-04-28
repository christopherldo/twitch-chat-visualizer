export function FooterSection() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-10 text-sm text-slate-400 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div>
          <p className="font-semibold text-white">Twitch Chat Visualizer</p>
          <p className="mt-2 max-w-2xl">
            Landing page focada em SEO tecnico para captar buscas como overlay de chat Twitch,
            visualizador de chat para streamers e Twitch chat OBS overlay.
          </p>
        </div>

        <nav className="flex flex-wrap gap-4">
          <a href="/transparent" className="transition hover:text-white">
            Painel
          </a>
          <a href="#funcionalidades" className="transition hover:text-white">
            Funcionalidades
          </a>
          <a href="#faq" className="transition hover:text-white">
            FAQ
          </a>
          <a href="/transparent" className="transition hover:text-white">
            Criar overlay
          </a>
        </nav>
      </div>
    </footer>
  );
}
