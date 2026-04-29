import { useId } from 'react';
import { cn } from '../lib/utils';

interface ColorFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  description?: string;
  className?: string;
}

const sanitizeHex = (raw: string) => raw.replace(/[^0-9a-fA-F]/g, '').slice(0, 6);

export function ColorField({ label, value, onChange, description, className }: ColorFieldProps) {
  const id = useId();
  const safe = sanitizeHex(value).padEnd(6, '0').slice(0, 6);

  return (
    <label htmlFor={id} className={cn('group block', className)}>
      <span className="flex items-baseline justify-between gap-2 text-xs font-semibold tracking-wide text-slate-200 uppercase">
        <span>{label}</span>
        <span className="font-mono text-[10px] text-slate-400">#{safe}</span>
      </span>
      {description ? (
        <span className="mt-1 block text-[11px] leading-snug text-slate-400">{description}</span>
      ) : null}

      <div className="mt-2 flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 p-2 transition group-hover:border-white/20">
        <span
          className="relative inline-flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl ring-1 ring-white/10"
          style={{ background: `#${safe}` }}
        >
          <input
            id={id}
            type="color"
            value={`#${safe}`}
            onChange={(event) => onChange(sanitizeHex(event.target.value))}
            className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
            aria-label={`Selecionar ${label}`}
          />
        </span>
        <input
          type="text"
          value={safe}
          maxLength={6}
          onChange={(event) => onChange(sanitizeHex(event.target.value))}
          className="w-full bg-transparent font-mono text-sm tracking-wider text-white outline-none placeholder:text-slate-500"
          spellCheck={false}
          aria-label={`${label} em hexadecimal`}
        />
      </div>
    </label>
  );
}
