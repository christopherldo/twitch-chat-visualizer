import { ArrowLeft, BookOpen, Code2 } from 'lucide-react';
import { Logo } from '../components/Logo';
import { StudioPanel } from '../components/StudioPanel';

const REPO_URL = 'https://github.com/christopherldo/twitch-chat-visualizer';

export function SettingsPage() {
  return (
    <div className="relative min-h-screen overflow-x-clip">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-grid mask-fade-b opacity-30" />
      <div aria-hidden="true" className="pointer-events-none absolute -top-32 left-1/2 -z-10 h-[460px] w-[460px] -translate-x-1/2 animate-blob rounded-full bg-twitch-500/30 blur-[140px]" />
      <div aria-hidden="true" className="pointer-events-none absolute top-40 right-0 -z-10 h-[420px] w-[420px] animate-blob rounded-full bg-cyan-500/20 blur-[140px]" style={{ animationDelay: '-8s' }} />

      <header className="px-4 pt-6 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 rounded-full border border-white/10 bg-slate-950/70 px-3 py-2 pl-5 backdrop-blur-2xl">
          <a href="/" className="inline-flex shrink-0 items-center">
            <Logo />
          </a>
          <div className="flex items-center gap-2">
            <a
              href="/"
              className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1.5 text-xs font-medium text-slate-200 transition hover:border-white/30 hover:bg-white/5"
            >
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Inicio</span>
            </a>
            <a
              href={REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-1.5 rounded-full border border-white/10 px-3 py-1.5 text-xs font-medium text-slate-200 transition hover:border-white/30 hover:bg-white/5 sm:inline-flex"
            >
              <Code2 className="h-3.5 w-3.5" aria-hidden="true" />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-5xl px-4 pt-12 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-twitch-400/30 bg-twitch-500/10 px-4 py-1.5 text-xs font-semibold tracking-[0.18em] text-twitch-200 uppercase">
            Studio
          </span>
          <h1 className="mt-5 text-3xl font-black tracking-tight text-balance sm:text-4xl lg:text-5xl">
            Personalize seu <span className="text-gradient-twitch">overlay de chat</span>.
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
            Defina canal, presets e cores e tenha sua URL pronta para o OBS Studio em segundos.
          </p>
        </div>
      </section>

      <StudioPanel variant="page" />

      <section className="mx-auto max-w-5xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-6 sm:p-8">
          <div className="flex items-start gap-4">
            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-twitch-500/30 via-fuchsia-500/15 to-cyan-500/15 text-twitch-200">
              <BookOpen className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <h2 className="text-xl font-bold text-white">Como integrar no OBS Studio</h2>
              <ol className="mt-3 space-y-2 text-sm leading-7 text-slate-300">
                <li>
                  <strong className="font-semibold text-white">1.</strong> No OBS, clique em <em>Sources</em> e adicione uma <em>Browser Source</em>.
                </li>
                <li>
                  <strong className="font-semibold text-white">2.</strong> Cole a URL gerada acima no campo <em>URL</em>.
                </li>
                <li>
                  <strong className="font-semibold text-white">3.</strong> Defina largura e altura (ex.: 1920x1080) compativel com a sua cena.
                </li>
                <li>
                  <strong className="font-semibold text-white">4.</strong> Mantenha <em>Refresh browser when scene becomes active</em> ligado.
                </li>
                <li>
                  <strong className="font-semibold text-white">5.</strong> Salve a Browser Source e arraste para o canto da tela. O chat ja flui em tempo real.
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-slate-950/80">
        <div className="mx-auto max-w-7xl px-4 py-8 text-xs text-slate-400 sm:px-6 lg:px-8">
          <p className="text-center">
            Open source sob licenca MIT &middot; criado por
            <a
              href="https://chrisldo.com"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-1 font-semibold text-white hover:text-twitch-200"
            >
              Christopher de Oliveira
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
