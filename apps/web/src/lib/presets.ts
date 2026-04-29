export interface OverlayStyle {
  nameBackground: string;
  nameColor: string;
  messageBackground: string;
  messageColor: string;
  fontSize: number;
}

export interface OverlayPreset {
  id: string;
  name: string;
  description: string;
  style: OverlayStyle;
}

export const DEFAULT_STYLE: OverlayStyle = {
  nameBackground: '9146ff',
  nameColor: 'ffffff',
  messageBackground: 'ffffff',
  messageColor: '0f172a',
  fontSize: 16,
};

export const presets: OverlayPreset[] = [
  {
    id: 'twitch-classic',
    name: 'Twitch Classic',
    description: 'Roxo Twitch + balao branco. Identidade limpa que combina com qualquer cena.',
    style: {
      nameBackground: '9146ff',
      nameColor: 'ffffff',
      messageBackground: 'ffffff',
      messageColor: '0f172a',
      fontSize: 16,
    },
  },
  {
    id: 'midnight-glass',
    name: 'Midnight Glass',
    description: 'Tons profundos que se fundem em cenas dark sem brilho excessivo.',
    style: {
      nameBackground: '1e293b',
      nameColor: 'a5b4fc',
      messageBackground: '0f172a',
      messageColor: 'e2e8f0',
      fontSize: 16,
    },
  },
  {
    id: 'neon-pop',
    name: 'Neon Pop',
    description: 'Magenta e ciano para overlays vibrantes em vertical streams.',
    style: {
      nameBackground: 'ec4899',
      nameColor: 'fdf2f8',
      messageBackground: '0c1e3a',
      messageColor: '67e8f9',
      fontSize: 18,
    },
  },
  {
    id: 'minimal-light',
    name: 'Minimal Light',
    description: 'Visual sobrio para podcasts e reacts onde a leitura vem em primeiro lugar.',
    style: {
      nameBackground: '0f172a',
      nameColor: 'f8fafc',
      messageBackground: 'f8fafc',
      messageColor: '0f172a',
      fontSize: 15,
    },
  },
  {
    id: 'cyberwave',
    name: 'Cyberwave',
    description: 'Estetica synthwave para coberturas e watch parties que precisam destacar.',
    style: {
      nameBackground: '7c3aed',
      nameColor: 'fde68a',
      messageBackground: '0b1120',
      messageColor: '38bdf8',
      fontSize: 17,
    },
  },
  {
    id: 'forest',
    name: 'Forest',
    description: 'Verde acolhedor para canais de variedades, art e RPG de mesa.',
    style: {
      nameBackground: '15803d',
      nameColor: 'ecfccb',
      messageBackground: 'f7fee7',
      messageColor: '14532d',
      fontSize: 16,
    },
  },
  {
    id: 'sunset',
    name: 'Sunset',
    description: 'Calor de sunset para canais just chatting e IRL.',
    style: {
      nameBackground: 'f97316',
      nameColor: 'fff7ed',
      messageBackground: '1c1917',
      messageColor: 'fed7aa',
      fontSize: 16,
    },
  },
  {
    id: 'mono',
    name: 'Mono',
    description: 'Preto e branco absoluto para o mais puro foco editorial.',
    style: {
      nameBackground: '000000',
      nameColor: 'ffffff',
      messageBackground: 'ffffff',
      messageColor: '000000',
      fontSize: 16,
    },
  },
];

export const styleToSearchParams = (style: OverlayStyle) => {
  const params = new URLSearchParams({
    namebackground: style.nameBackground.replace('#', ''),
    namecolor: style.nameColor.replace('#', ''),
    messagebackground: style.messageBackground.replace('#', ''),
    messagecolor: style.messageColor.replace('#', ''),
    fontsize: String(style.fontSize),
  });
  return params.toString();
};

export const buildOverlayPath = (channel: string, style: OverlayStyle) => {
  const trimmed = channel.trim().toLowerCase().replace(/[^a-z0-9_]/g, '');
  if (!trimmed) return '';
  return `/${trimmed}/transparent?${styleToSearchParams(style)}`;
};
