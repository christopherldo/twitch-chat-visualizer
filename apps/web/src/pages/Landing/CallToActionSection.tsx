export function CallToActionSection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
      <div className="rounded-[2rem] border border-fuchsia-400/20 bg-[linear-gradient(135deg,rgba(168,85,247,0.2),rgba(34,211,238,0.12),rgba(15,23,42,0.95))] p-8 shadow-2xl shadow-fuchsia-950/20 sm:p-12">
        <p className="text-sm font-semibold tracking-[0.25em] text-fuchsia-200 uppercase">
          Call to action
        </p>
        <h2 className="mt-4 max-w-3xl text-3xl font-black tracking-tight text-white sm:text-4xl">
          Gere seu overlay de chat Twitch agora e entre no OBS com um link pronto.
        </h2>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-200">
          O painel leva menos de um minuto para configurar. Escolha seu canal, personalize o visual
          e publique um overlay de chat Twitch transparente pronto para streaming.
        </p>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <a
            href="/transparent"
            className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-base font-semibold text-slate-950 transition hover:bg-slate-100"
          >
            Gerar meu overlay agora
          </a>
          <a
            href="#faq"
            className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-base font-semibold text-white transition hover:bg-white/5"
          >
            Tirar duvidas
          </a>
        </div>
      </div>
    </section>
  );
}
