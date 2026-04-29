import { cn } from '../lib/utils';

interface LogoProps {
  className?: string;
  showWordmark?: boolean;
  compact?: boolean;
}

export function Logo({ className, showWordmark = true, compact = false }: LogoProps) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-twitch-500 via-fuchsia-500 to-cyan-400 shadow-[0_0_24px_-4px_rgba(145,70,255,0.65)]">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          className="h-5 w-5 text-white drop-shadow"
        >
          <path
            d="M5 5.5h14a1.5 1.5 0 0 1 1.5 1.5v8a1.5 1.5 0 0 1-1.5 1.5H13l-3.5 3v-3H5A1.5 1.5 0 0 1 3.5 15V7A1.5 1.5 0 0 1 5 5.5Z"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinejoin="round"
          />
          <circle cx="9" cy="11" r="1" fill="currentColor" />
          <circle cx="13" cy="11" r="1" fill="currentColor" />
          <circle cx="17" cy="11" r="1" fill="currentColor" />
        </svg>
        <span className="absolute inset-0 -z-10 rounded-xl bg-twitch-500/40 blur-xl" />
      </span>
      {showWordmark ? (
        <span className="flex flex-col leading-none">
          <span className={cn('font-black tracking-tight text-white', compact ? 'text-base' : 'text-[15px]')}>
            Twitch <span className="text-gradient-twitch">Chat</span>
          </span>
          <span className="mt-0.5 text-[10px] font-semibold tracking-[0.32em] text-white/40 uppercase">
            Visualizer
          </span>
        </span>
      ) : null}
    </span>
  );
}
