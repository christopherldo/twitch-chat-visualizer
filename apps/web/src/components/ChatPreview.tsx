import { useMemo } from 'react';
import type { OverlayStyle } from '../lib/presets';
import type { DemoMessage } from '../lib/demoChat';
import { useDemoChat } from '../lib/demoChat';
import { cn } from '../lib/utils';

interface ChatPreviewProps {
  style: OverlayStyle;
  channel?: string;
  paused?: boolean;
  className?: string;
  intervalMs?: number;
  maxMessages?: number;
  showFrame?: boolean;
}

const badgeIconMap: Record<string, { label: string; bg: string; fg: string }> = {
  mod: { label: 'MOD', bg: '#22c55e', fg: '#fff' },
  sub: { label: 'SUB', bg: '#9146ff', fg: '#fff' },
  vip: { label: 'VIP', bg: '#ec4899', fg: '#fff' },
  bot: { label: 'BOT', bg: '#0ea5e9', fg: '#fff' },
  cheer: { label: 'BITS', bg: '#f59e0b', fg: '#0f172a' },
};

function MessageItem({ msg, style }: { msg: DemoMessage; style: OverlayStyle }) {
  return (
    <div className="animate-message-in" style={{ fontSize: `${style.fontSize}px`, marginBottom: 5 }}>
      <span
        className="inline-flex flex-wrap items-center gap-1 px-2.5 py-1 align-middle font-bold uppercase whitespace-nowrap"
        style={{
          backgroundColor: `#${style.nameBackground}`,
          color: `#${style.nameColor}`,
          borderRadius: 3,
          marginRight: 0,
          letterSpacing: '0.02em',
        }}
      >
        {msg.badges.map((badge) => {
          const meta = badgeIconMap[badge];
          if (!meta) return null;
          return (
            <span
              key={badge}
              className="inline-flex items-center justify-center rounded-[3px] px-1 text-[8px] font-black tracking-widest"
              style={{ backgroundColor: meta.bg, color: meta.fg }}
            >
              {meta.label}
            </span>
          );
        })}
        <span>{msg.username}</span>
      </span>
      <span
        className="ml-2 inline-block px-3 py-1.5 align-middle uppercase"
        style={{
          backgroundColor: `#${style.messageBackground}`,
          color: `#${style.messageColor}`,
          borderRadius: 10,
          marginTop: -2,
          lineHeight: '1.25em',
        }}
      >
        {msg.message}
      </span>
    </div>
  );
}

export function ChatPreview({
  style,
  channel,
  paused = false,
  className,
  intervalMs = 2200,
  maxMessages = 6,
  showFrame = true,
}: ChatPreviewProps) {
  const messages = useDemoChat({ intervalMs, maxMessages, paused, initialCount: 3 });

  const status = useMemo(
    () => ({
      label: channel?.trim() ? `#${channel.trim().toLowerCase()}` : 'preview ao vivo',
    }),
    [channel]
  );

  const inner = (
    <div className="relative h-full w-full bg-checkered overflow-hidden">
      <div className="absolute inset-0 flex flex-col justify-end p-4">
        <div className="flex flex-col">
          {messages.map((msg) => (
            <MessageItem key={msg.id} msg={msg} style={style} />
          ))}
        </div>
      </div>
    </div>
  );

  if (!showFrame) return <div className={cn('h-full w-full', className)}>{inner}</div>;

  return (
    <div
      className={cn(
        'group relative isolate overflow-hidden rounded-[1.5rem] border border-white/10 bg-slate-950/60 shadow-2xl shadow-fuchsia-950/20',
        className
      )}
    >
      <div className="flex items-center justify-between border-b border-white/5 bg-slate-950/80 px-4 py-2.5 text-xs font-medium text-slate-300 backdrop-blur">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-2.5 w-2.5 items-center justify-center">
            <span className="absolute h-2.5 w-2.5 animate-pulse-ring rounded-full bg-rose-500/70" />
            <span className="relative h-2 w-2 rounded-full bg-rose-500" />
          </span>
          <span className="font-semibold tracking-[0.18em] text-rose-200 uppercase">Live</span>
          <span className="text-white/40">·</span>
          <span className="font-mono text-[11px] tracking-tight text-white/70">{status.label}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400/80" />
          <span className="hidden text-emerald-200/70 sm:inline">browser source</span>
        </div>
      </div>
      <div className="aspect-[16/10] sm:aspect-[16/9]">{inner}</div>
    </div>
  );
}
