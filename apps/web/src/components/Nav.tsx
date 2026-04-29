import { ArrowUpRight, Code2 } from 'lucide-react';
import { Logo } from './Logo';

const links = [
  { label: 'Studio', href: '#studio' },
  { label: 'Funcionalidades', href: '#funcionalidades' },
  { label: 'Como funciona', href: '#como-funciona' },
  { label: 'FAQ', href: '#faq' },
];

interface NavProps {
  repoUrl?: string;
}

export function Nav({ repoUrl = 'https://github.com/christopherldo/twitch-chat-visualizer' }: NavProps) {
  return (
    <nav className="sticky top-3 z-40 mx-auto mt-4 flex max-w-6xl items-center justify-between gap-3 rounded-full border border-white/10 bg-slate-950/70 px-3 py-2 pl-5 backdrop-blur-2xl shadow-[0_8px_30px_-12px_rgba(0,0,0,0.6)] sm:mt-6">
      <a href="/" className="shrink-0">
        <Logo />
      </a>

      <ul className="hidden items-center gap-6 text-sm text-slate-300 lg:flex">
        {links.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              className="relative inline-flex items-center transition hover:text-white after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:w-0 after:rounded-full after:bg-gradient-to-r after:from-twitch-400 after:to-cyan-400 after:transition-all hover:after:w-full"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-2">
        <a
          href={repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden items-center gap-1.5 rounded-full border border-white/10 px-3 py-1.5 text-xs font-medium text-slate-200 transition hover:border-white/30 hover:bg-white/5 sm:inline-flex"
          aria-label="Repositorio no GitHub"
        >
          <Code2 className="h-3.5 w-3.5" aria-hidden="true" />
          <span>Star</span>
        </a>
        <a
          href="#studio"
          className="group inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-twitch-500 via-fuchsia-500 to-cyan-400 px-4 py-2 text-xs font-semibold text-white shadow-[0_8px_24px_-8px_rgba(145,70,255,0.7)] transition hover:shadow-[0_8px_24px_-4px_rgba(145,70,255,0.85)] sm:text-sm"
        >
          <span>Abrir studio</span>
          <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
        </a>
      </div>
    </nav>
  );
}
