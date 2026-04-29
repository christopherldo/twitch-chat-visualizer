import { ArrowUpRight, Code2 } from 'lucide-react';
import { Reveal } from '../../components/Reveal';

interface CallToActionSectionProps {
  repoUrl?: string;
}

export function CallToActionSection({
  repoUrl = 'https://github.com/christopherldo/twitch-chat-visualizer',
}: CallToActionSectionProps) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <Reveal className="relative isolate overflow-hidden rounded-[2.5rem] border border-white/10">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-20 animate-gradient-shift bg-gradient-to-br from-twitch-700 via-fuchsia-600 to-cyan-500 opacity-90"
        />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-grid opacity-[0.18] mix-blend-overlay" />
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-40 -right-20 -z-10 h-[520px] w-[520px] rounded-full bg-cyan-300/30 blur-[120px]" />
        <div aria-hidden="true" className="pointer-events-none absolute -top-40 -left-20 -z-10 h-[520px] w-[520px] rounded-full bg-fuchsia-300/30 blur-[120px]" />

        <div className="relative grid gap-10 p-8 sm:p-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:p-16">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs font-semibold tracking-[0.18em] text-white/95 uppercase">
              Pronto pra ir ao ar
            </span>
            <h2 className="mt-5 text-3xl leading-tight font-black tracking-tight text-balance text-white sm:text-4xl lg:text-5xl">
              Gere seu overlay agora e cole no OBS.
            </h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-white/85 sm:text-lg">
              Studio sem cadastro, sem assinatura, sem limite. Configure em menos de um minuto e suba pra
              proxima live com aparencia de produto pago.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#studio"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-slate-950 transition hover:bg-slate-100"
              >
                <span>Abrir o studio</span>
                <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
              </a>
              <a
                href={repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                <Code2 className="h-4 w-4" aria-hidden="true" />
                <span>Star no GitHub</span>
              </a>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="rounded-3xl border border-white/20 bg-slate-950/50 p-5 text-sm font-mono text-slate-200 shadow-2xl backdrop-blur">
              <div className="flex items-center gap-1.5 pb-3">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                <span className="ml-2 text-[10px] tracking-widest text-white/40 uppercase">Browser source</span>
              </div>
              <pre className="overflow-x-auto rounded-xl bg-black/40 p-3 text-[11px] leading-5 text-cyan-100/90">
{`https://twitch.chrisldo.com/seu_canal/transparent
  ?namebackground=9146ff
  &namecolor=ffffff
  &messagebackground=ffffff
  &messagecolor=0f172a
  &fontsize=16`}
              </pre>
              <div className="mt-3 grid grid-cols-3 gap-2 text-[10px] tracking-widest text-white/60 uppercase">
                <div className="rounded-lg border border-white/10 bg-white/5 p-2 text-center">
                  <span className="block text-white">1920x1080</span>
                  <span>resolucao</span>
                </div>
                <div className="rounded-lg border border-white/10 bg-white/5 p-2 text-center">
                  <span className="block text-white">transparent</span>
                  <span>fundo</span>
                </div>
                <div className="rounded-lg border border-white/10 bg-white/5 p-2 text-center">
                  <span className="block text-white">on scene</span>
                  <span>refresh</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
