import type { OverlayPreset } from '../lib/presets';
import { presets } from '../lib/presets';
import { cn } from '../lib/utils';

interface PresetGalleryProps {
  activeId?: string;
  onSelect: (preset: OverlayPreset) => void;
  className?: string;
}

export function PresetGallery({ activeId, onSelect, className }: PresetGalleryProps) {
  return (
    <div
      className={cn('grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4', className)}
      role="radiogroup"
      aria-label="Presets de overlay"
    >
      {presets.map((preset) => {
        const isActive = activeId === preset.id;
        return (
          <button
            key={preset.id}
            type="button"
            role="radio"
            aria-checked={isActive}
            onClick={() => onSelect(preset)}
            className={cn(
              'group relative overflow-hidden rounded-2xl border bg-slate-950/40 p-3 text-left transition-all',
              'hover:-translate-y-0.5 hover:bg-slate-950/60',
              isActive
                ? 'border-twitch-400/70 shadow-[0_0_0_1px_rgba(167,139,250,0.45),0_18px_50px_-30px_rgba(145,70,255,0.7)]'
                : 'border-white/10 hover:border-white/30'
            )}
          >
            <span
              aria-hidden="true"
              className="block h-12 w-full overflow-hidden rounded-xl"
              style={{
                background: `linear-gradient(120deg, #${preset.style.nameBackground} 0%, #${preset.style.messageBackground} 100%)`,
              }}
            />
            <span className="mt-3 flex items-center gap-2">
              <span className="inline-flex h-3 w-3 rounded-full" style={{ background: `#${preset.style.nameBackground}` }} />
              <span className="inline-flex h-3 w-3 rounded-full" style={{ background: `#${preset.style.messageBackground}` }} />
              <span className="ml-auto text-[10px] font-mono tracking-tighter text-slate-500">{preset.style.fontSize}px</span>
            </span>
            <span className="mt-2 block text-sm font-semibold text-white">{preset.name}</span>
            <span className="mt-1 block text-xs leading-snug text-slate-400 line-clamp-2">{preset.description}</span>
            {isActive ? (
              <span className="pointer-events-none absolute right-3 top-3 inline-flex h-2 w-2 rounded-full bg-twitch-300 shadow-[0_0_12px_2px_rgba(167,139,250,0.7)]" />
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
