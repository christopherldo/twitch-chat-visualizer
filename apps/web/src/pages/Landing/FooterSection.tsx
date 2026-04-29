import { Code2, Globe, Heart } from 'lucide-react';
import { Logo } from '../../components/Logo';

interface FooterProps {
  repoUrl?: string;
  authorUrl?: string;
  authorName?: string;
}

const navGroups: Array<{
  title: string;
  links: Array<{ label: string; href: string; external?: boolean }>;
}> = [
  {
    title: 'Produto',
    links: [
      { label: 'Studio', href: '#studio' },
      { label: 'Funcionalidades', href: '#funcionalidades' },
      { label: 'Como funciona', href: '#como-funciona' },
      { label: 'FAQ', href: '#faq' },
    ],
  },
  {
    title: 'Recursos',
    links: [
      { label: 'Painel completo', href: '/transparent' },
      { label: 'Documentacao', href: 'https://github.com/christopherldo/twitch-chat-visualizer#readme', external: true },
      { label: 'Issues', href: 'https://github.com/christopherldo/twitch-chat-visualizer/issues', external: true },
    ],
  },
];

export function FooterSection({
  repoUrl = 'https://github.com/christopherldo/twitch-chat-visualizer',
  authorUrl = 'https://chrisldo.com',
  authorName = 'Christopher de Oliveira',
}: FooterProps) {
  const year = new Date().getFullYear();
  return (
    <footer className="relative mt-20 border-t border-white/10 bg-slate-950/80">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-twitch-500/40 to-transparent" />
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_repeat(2,_minmax(0,_1fr))]">
          <div>
            <Logo />
            <p className="mt-4 max-w-md text-sm leading-7 text-slate-400">
              Overlay de chat Twitch open source para streamers que querem performance, leitura e estetica
              em um produto so. Construido com React 19, NestJS 11 e muito carinho.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <a
                href={repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-200 transition hover:border-white/30 hover:bg-white/10"
              >
                <Code2 className="h-3.5 w-3.5" aria-hidden="true" />
                GitHub
              </a>
              <a
                href={authorUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-200 transition hover:border-white/30 hover:bg-white/10"
              >
                <Globe className="h-3.5 w-3.5" aria-hidden="true" />
                chrisldo.com
              </a>
            </div>
          </div>

          {navGroups.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <p className="text-xs font-semibold tracking-[0.24em] text-slate-400 uppercase">{group.title}</p>
              <ul className="mt-4 space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target={link.external ? '_blank' : undefined}
                      rel={link.external ? 'noopener noreferrer' : undefined}
                      className="text-sm text-slate-300 transition hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-white/5 pt-6 text-xs text-slate-400 sm:flex-row sm:items-center">
          <p>
            &copy; {year} Twitch Chat Visualizer. Codigo aberto sob licenca MIT.
          </p>
          <p className="inline-flex items-center gap-1.5">
            Feito com
            <Heart className="h-3 w-3 text-rose-400" aria-hidden="true" />
            por
            <a href={authorUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-white hover:text-twitch-200">
              {authorName}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
