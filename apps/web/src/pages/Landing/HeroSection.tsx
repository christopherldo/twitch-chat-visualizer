import { useEffect, useState } from 'react';
import { ArrowRight, MousePointerClick, ShieldCheck, Zap } from 'lucide-react';
import { ChatPreview } from '../../components/ChatPreview';
import { Reveal } from '../../components/Reveal';
import { presets } from '../../lib/presets';

const stats = [
  { label: 'Setup', value: '<2 min', icon: Zap },
  { label: 'Latencia', value: '~0 ms', icon: MousePointerClick },
  { label: 'XSS', value: 'sanitizado', icon: ShieldCheck },
];

const techRotators = [
  'Twitch IRC',
  'OBS Studio',
  'BTTV',
  'FrankerFaceZ',
  'Streamlabs',
  'XSplit',
  'Restream',
  'Twitch IRC',
];

export function HeroSection() {
  const [channel, setChannel] = useState('');
  const previewStyle = presets[0].style;

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      const target = (event.currentTarget as HTMLElement | null) ?? document.body;
      const rect = target.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      target.style.setProperty('--mx', `${x}%`);
      target.style.setProperty('--my', `${y}%`);
    };
    const root = document.getElementById('hero');
    root?.addEventListener('mousemove', handler);
    return () => root?.removeEventListener('mousemove', handler);
  }, []);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const trimmed = channel.trim();
    if (trimmed) {
      window.dispatchEvent(new CustomEvent<string>('tcv:channel', { detail: trimmed }));
    }
    document.getElementById('studio')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      id="hero"
      className="relative isolate overflow-hidden"
      style={{ ['--mx' as never]: '50%', ['--my' as never]: '40%' }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20 bg-grid mask-fade-b opacity-40"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-30 bg-noise opacity-[0.6]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(600px circle at var(--mx, 50%) var(--my, 40%), rgba(145, 70, 255, 0.18), transparent 45%)',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -left-32 -z-10 h-[420px] w-[420px] animate-blob rounded-full bg-twitch-500/30 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-20 right-0 -z-10 h-[420px] w-[420px] animate-blob rounded-full bg-cyan-500/20 blur-[120px]"
        style={{ animationDelay: '-6s' }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-1/3 -z-10 h-[360px] w-[360px] animate-blob rounded-full bg-fuchsia-500/15 blur-[120px]"
        style={{ animationDelay: '-12s' }}
      />

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 pt-12 pb-20 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:px-8 lg:pt-20 lg:pb-28">
        <div>
          <Reveal as="span" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-slate-200 backdrop-blur">
            <span className="relative inline-flex h-2 w-2">
              <span className="absolute inset-0 animate-pulse-ring rounded-full bg-emerald-400/80" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <span className="font-semibold tracking-[0.18em] text-emerald-200 uppercase">v1 ao vivo</span>
            <span className="text-white/40">·</span>
            <span>open source &amp; gratis</span>
          </Reveal>

          <Reveal as="h1" delay={80} className="mt-6 text-4xl leading-[1.05] font-black tracking-tight text-balance sm:text-5xl lg:text-[64px]">
            O <span className="text-gradient-twitch">overlay de chat</span> que sua live merecia.
          </Reveal>

          <Reveal as="p" delay={150} className="mt-6 max-w-xl text-base leading-7 text-slate-300 sm:text-lg">
            Studio em tempo real para personalizar cores, badges, emotes e tipografia. Cole a URL no
            <span className="font-semibold text-white"> OBS Browser Source</span> e tenha um chat
            limpo, performatico e <span className="font-semibold text-white">100% transparente</span>.
          </Reveal>

          <Reveal as="form" delay={220} onSubmit={handleSubmit} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <label htmlFor="hero-channel" className="sr-only">
              Canal da Twitch
            </label>
            <div className="relative flex-1">
              <span aria-hidden="true" className="absolute top-1/2 left-5 -translate-y-1/2 text-slate-500">
                twitch.tv/
              </span>
              <input
                id="hero-channel"
                type="text"
                value={channel}
                onChange={(event) => setChannel(event.target.value)}
                placeholder="seu_canal"
                spellCheck={false}
                autoCapitalize="none"
                autoCorrect="off"
                className="w-full rounded-full border border-white/10 bg-white/5 py-4 pr-4 pl-[88px] text-base text-white placeholder:text-slate-500 outline-none transition focus:border-twitch-400/70 focus:bg-slate-950/60 focus:shadow-[0_0_0_3px_rgba(167,139,250,0.2)]"
              />
            </div>
            <button
              type="submit"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-twitch-500 via-fuchsia-500 to-cyan-400 px-6 py-4 text-sm font-semibold text-white shadow-[0_18px_60px_-20px_rgba(145,70,255,0.7)] transition hover:shadow-[0_18px_60px_-10px_rgba(145,70,255,0.95)]"
            >
              <span>Abrir studio</span>
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden="true" />
            </button>
          </Reveal>

          <Reveal as="dl" delay={300} className="mt-10 grid max-w-xl grid-cols-3 gap-3">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-white/10 bg-white/5 px-3 py-3 backdrop-blur transition hover:border-white/20 hover:bg-white/10"
                >
                  <dt className="flex items-center gap-1.5 text-[10px] font-semibold tracking-widest text-slate-400 uppercase">
                    <Icon className="h-3 w-3 text-twitch-300" aria-hidden="true" />
                    {stat.label}
                  </dt>
                  <dd className="mt-1.5 text-lg font-bold text-white">{stat.value}</dd>
                </div>
              );
            })}
          </Reveal>
        </div>

        <Reveal delay={120} className="relative">
          <div aria-hidden="true" className="pointer-events-none absolute -inset-6 -z-10 rounded-[3rem] bg-gradient-to-br from-twitch-500/30 via-fuchsia-500/15 to-cyan-500/20 blur-2xl" />
          <ChatPreview style={previewStyle} channel="seu_canal" intervalMs={2500} maxMessages={5} />
        </Reveal>
      </div>

      <div
        aria-hidden="true"
        className="relative -mt-2 mask-fade-t opacity-50 [mask-image:linear-gradient(90deg,transparent,black_15%,black_85%,transparent)]"
      >
        <div className="flex w-max animate-marquee items-center gap-12 py-6 pr-12 text-xs font-semibold tracking-[0.32em] text-slate-500 uppercase whitespace-nowrap">
          {[...techRotators, ...techRotators].map((item, idx) => (
            <span key={`${item}-${idx}`} className="flex items-center gap-3">
              <span className="inline-flex h-1.5 w-1.5 rounded-full bg-twitch-400/60" />
              {item}
            </span>
          ))}
        </div>
      </div>
    </header>
  );
}
