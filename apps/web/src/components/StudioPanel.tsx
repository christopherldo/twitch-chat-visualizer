import { useEffect, useMemo, useState } from 'react';
import { ArrowUpRight, ExternalLink, Pause, Play, RotateCcw, Sparkles } from 'lucide-react';
import { ChatPreview } from './ChatPreview';
import { ColorField } from './ColorField';
import { CopyButton } from './CopyButton';
import { PresetGallery } from './PresetGallery';
import { DEFAULT_STYLE, buildOverlayPath, presets } from '../lib/presets';
import type { OverlayPreset, OverlayStyle } from '../lib/presets';
import { cn } from '../lib/utils';

interface StudioPanelProps {
  variant?: 'landing' | 'page';
  initialChannel?: string;
  initialStyle?: OverlayStyle;
  className?: string;
}

const samples = ['alanzoka', 'gaules', 'cellbit', 'casimito', 'pokimane', 'shroud'];

export function StudioPanel({
  variant = 'landing',
  initialChannel = '',
  initialStyle = DEFAULT_STYLE,
  className,
}: StudioPanelProps) {
  const [channel, setChannel] = useState(initialChannel);
  const [style, setStyle] = useState<OverlayStyle>(initialStyle);
  const [paused, setPaused] = useState(false);
  const [activePreset, setActivePreset] = useState<string | undefined>(() => {
    const matched = presets.find((preset) => sameStyle(preset.style, initialStyle));
    return matched?.id;
  });
  const [origin] = useState(() => (typeof window !== 'undefined' ? window.location.origin : ''));

  useEffect(() => {
    const handler = (event: Event) => {
      const detail = (event as CustomEvent<string>).detail;
      if (typeof detail === 'string') {
        setChannel(detail);
      }
    };
    window.addEventListener('tcv:channel', handler);
    return () => window.removeEventListener('tcv:channel', handler);
  }, []);

  const overlayPath = useMemo(() => buildOverlayPath(channel, style), [channel, style]);
  const fullUrl = overlayPath ? `${origin}${overlayPath}` : '';

  const handlePreset = (preset: OverlayPreset) => {
    setStyle(preset.style);
    setActivePreset(preset.id);
  };

  const handleStyleChange = <K extends keyof OverlayStyle>(key: K, value: OverlayStyle[K]) => {
    setStyle((prev) => {
      const next = { ...prev, [key]: value };
      const matched = presets.find((preset) => sameStyle(preset.style, next));
      setActivePreset(matched?.id);
      return next;
    });
  };

  const handleReset = () => {
    setStyle(DEFAULT_STYLE);
    setActivePreset(presets.find((p) => sameStyle(p.style, DEFAULT_STYLE))?.id);
  };

  const headingId = variant === 'landing' ? 'studio-headline' : 'studio-page-headline';

  return (
    <section
      id={variant === 'landing' ? 'studio' : undefined}
      aria-labelledby={headingId}
      className={cn(
        variant === 'landing'
          ? 'relative mx-auto max-w-7xl scroll-mt-28 px-4 py-20 sm:px-6 lg:px-8'
          : 'relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8',
        className
      )}
    >
      {variant === 'landing' ? (
        <header className="mx-auto mb-10 max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-twitch-400/30 bg-twitch-500/10 px-4 py-1.5 text-xs font-semibold tracking-[0.18em] text-twitch-200 uppercase">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            Live Overlay Studio
          </span>
          <h2 id={headingId} className="mt-5 text-3xl font-black tracking-tight text-balance sm:text-4xl lg:text-5xl">
            <span className="text-gradient">Monte seu overlay</span> em tempo real, sem instalar nada.
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-300 sm:text-lg">
            Escolha um preset, ajuste cores e fonte, e veja o chat ganhando vida agora mesmo. Quando estiver pronto,
            copie a URL e cole em uma <strong className="font-semibold text-white">Browser Source</strong> do OBS.
          </p>
        </header>
      ) : null}

      <div
        className={cn(
          'relative isolate grid gap-6 rounded-[2.25rem] border border-white/10 bg-gradient-to-br from-slate-950/95 via-slate-950/70 to-slate-900/60 p-4 shadow-[0_60px_120px_-60px_rgba(76,29,149,0.6)] sm:p-6 lg:grid-cols-[minmax(0,_1.05fr)_minmax(0,_0.95fr)] lg:p-8',
          'before:absolute before:inset-px before:-z-10 before:rounded-[calc(2.25rem-1px)] before:bg-gradient-to-br before:from-twitch-500/10 before:via-transparent before:to-cyan-500/10'
        )}
      >
        <div aria-hidden="true" className="pointer-events-none absolute -top-20 -left-10 h-72 w-72 rounded-full bg-twitch-500/30 blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-24 right-0 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />

        <div className="relative flex flex-col gap-5">
          <div className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-slate-950/60 p-2 pl-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold tracking-[0.2em] text-slate-400 uppercase">Preview</span>
              <span className="text-xs text-slate-500">·</span>
              <span className="text-xs text-slate-300">aspect 16:9</span>
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setPaused((prev) => !prev)}
                className="inline-flex h-8 items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 text-xs font-medium text-slate-200 transition hover:bg-white/10"
                aria-label={paused ? 'Retomar simulacao' : 'Pausar simulacao'}
              >
                {paused ? <Play className="h-3 w-3" aria-hidden="true" /> : <Pause className="h-3 w-3" aria-hidden="true" />}
                <span>{paused ? 'Retomar' : 'Pausar'}</span>
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex h-8 items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 text-xs font-medium text-slate-200 transition hover:bg-white/10"
                aria-label="Restaurar tema padrao"
              >
                <RotateCcw className="h-3 w-3" aria-hidden="true" />
                <span>Reset</span>
              </button>
            </div>
          </div>

          <ChatPreview style={style} channel={channel} paused={paused} />

          <div className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-xs text-slate-300">
            <span>Demonstracao com mensagens simuladas. Conecte seu canal para ver mensagens reais.</span>
            <div className="flex items-center gap-2 text-slate-400">
              <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span>baixa latencia</span>
            </div>
          </div>
        </div>

        <div className="relative flex flex-col gap-5">
          <div>
            <label className="text-xs font-semibold tracking-[0.18em] text-slate-300 uppercase" htmlFor="studio-channel">
              Canal da Twitch
            </label>
            <div className="relative mt-2">
              <span aria-hidden="true" className="absolute top-1/2 left-4 -translate-y-1/2 text-base text-slate-500">
                /
              </span>
              <input
                id="studio-channel"
                type="text"
                value={channel}
                onChange={(event) => setChannel(event.target.value)}
                placeholder="seu_canal"
                spellCheck={false}
                autoCapitalize="none"
                autoCorrect="off"
                className="w-full rounded-2xl border border-white/10 bg-white/5 py-3 pr-4 pl-8 text-base text-white placeholder:text-slate-500 outline-none transition focus:border-twitch-400/70 focus:bg-slate-950/60 focus:shadow-[0_0_0_3px_rgba(167,139,250,0.2)]"
              />
            </div>
            <div className="mt-2 flex flex-wrap gap-1.5">
              <span className="text-[10px] font-medium tracking-wider text-slate-500 uppercase">sugestoes</span>
              {samples.map((sample) => (
                <button
                  key={sample}
                  type="button"
                  onClick={() => setChannel(sample)}
                  className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[11px] text-slate-300 transition hover:border-twitch-400/40 hover:bg-twitch-500/10 hover:text-white"
                >
                  {sample}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold tracking-[0.18em] text-slate-300 uppercase">Presets</p>
            <PresetGallery activeId={activePreset} onSelect={handlePreset} className="mt-3" />
          </div>

          <div>
            <p className="text-xs font-semibold tracking-[0.18em] text-slate-300 uppercase">Cores</p>
            <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <ColorField
                label="Fundo do nome"
                value={style.nameBackground}
                onChange={(value) => handleStyleChange('nameBackground', value)}
              />
              <ColorField
                label="Cor do nome"
                value={style.nameColor}
                onChange={(value) => handleStyleChange('nameColor', value)}
              />
              <ColorField
                label="Fundo da mensagem"
                value={style.messageBackground}
                onChange={(value) => handleStyleChange('messageBackground', value)}
              />
              <ColorField
                label="Cor da mensagem"
                value={style.messageColor}
                onChange={(value) => handleStyleChange('messageColor', value)}
              />
            </div>
          </div>

          <div>
            <div className="flex items-baseline justify-between text-xs font-semibold tracking-[0.18em] text-slate-300 uppercase">
              <span>Tamanho da fonte</span>
              <span className="font-mono text-[11px] text-slate-400">{style.fontSize}px</span>
            </div>
            <input
              type="range"
              min={10}
              max={32}
              value={style.fontSize}
              onChange={(event) => handleStyleChange('fontSize', Number(event.target.value))}
              className="mt-3 w-full appearance-none accent-twitch-400 [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-gradient-to-r [&::-webkit-slider-runnable-track]:from-twitch-500/40 [&::-webkit-slider-runnable-track]:via-fuchsia-500/40 [&::-webkit-slider-runnable-track]:to-cyan-400/40"
              aria-label="Tamanho da fonte em pixels"
            />
            <div className="mt-1 flex justify-between text-[10px] text-slate-500">
              <span>10px</span>
              <span>32px</span>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-semibold tracking-[0.18em] text-slate-300 uppercase">URL para OBS</span>
              {fullUrl ? (
                <a
                  href={overlayPath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-twitch-200 hover:text-white"
                >
                  <span>Abrir preview</span>
                  <ExternalLink className="h-3 w-3" aria-hidden="true" />
                </a>
              ) : null}
            </div>
            <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-stretch">
              <code className="flex-1 overflow-x-auto rounded-xl border border-white/10 bg-black/40 px-3 py-2.5 font-mono text-[11px] text-slate-200 select-all">
                {fullUrl || 'preencha o canal para gerar a URL'}
              </code>
              <CopyButton value={fullUrl} className="sm:shrink-0" />
            </div>
            <p className="mt-3 text-[11px] leading-relaxed text-slate-400">
              No OBS Studio, adicione uma <span className="text-white">Browser Source</span> e cole essa URL.
              Defina largura/altura conforme sua cena (ex.: 1920x1080) e mantenha "Refresh browser when scene
              becomes active" ativado.
            </p>
          </div>

          {variant === 'landing' ? (
            <a
              href={overlayPath || '#studio'}
              className={cn(
                'group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-twitch-500 via-fuchsia-500 to-cyan-400 px-6 py-3 text-sm font-semibold text-white shadow-[0_18px_60px_-20px_rgba(145,70,255,0.7)] transition',
                !overlayPath && 'pointer-events-none opacity-50'
              )}
            >
              <span>Ir para meu overlay ao vivo</span>
              <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
            </a>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function sameStyle(a: OverlayStyle, b: OverlayStyle) {
  return (
    a.nameBackground.toLowerCase() === b.nameBackground.toLowerCase() &&
    a.nameColor.toLowerCase() === b.nameColor.toLowerCase() &&
    a.messageBackground.toLowerCase() === b.messageBackground.toLowerCase() &&
    a.messageColor.toLowerCase() === b.messageColor.toLowerCase() &&
    a.fontSize === b.fontSize
  );
}
