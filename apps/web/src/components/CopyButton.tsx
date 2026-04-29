import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { cn } from '../lib/utils';

interface CopyButtonProps {
  value: string;
  label?: string;
  className?: string;
  size?: 'sm' | 'md';
}

export function CopyButton({ value, label = 'Copiar', className, size = 'md' }: CopyButtonProps) {
  const [state, setState] = useState<'idle' | 'copied' | 'error'>('idle');

  const handleClick = async () => {
    if (!value) return;
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(value);
      } else {
        throw new Error('clipboard not available');
      }
      setState('copied');
      window.setTimeout(() => setState('idle'), 1800);
    } catch {
      setState('error');
      window.setTimeout(() => setState('idle'), 1800);
    }
  };

  const isCopied = state === 'copied';

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={!value}
      className={cn(
        'group inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all',
        'border border-white/10 bg-white/5 text-white hover:border-white/25 hover:bg-white/10',
        'disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-white/5 disabled:hover:border-white/10',
        size === 'sm' ? 'px-3 py-1.5 text-xs' : 'px-4 py-2 text-sm',
        isCopied && 'border-emerald-400/40 bg-emerald-400/10 text-emerald-200',
        className
      )}
      aria-live="polite"
    >
      {isCopied ? (
        <>
          <Check className={size === 'sm' ? 'h-3.5 w-3.5' : 'h-4 w-4'} aria-hidden="true" />
          <span>Copiado!</span>
        </>
      ) : (
        <>
          <Copy className={size === 'sm' ? 'h-3.5 w-3.5' : 'h-4 w-4'} aria-hidden="true" />
          <span>{state === 'error' ? 'Tente de novo' : label}</span>
        </>
      )}
    </button>
  );
}
