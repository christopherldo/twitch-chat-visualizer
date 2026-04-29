export const landingSiteUrl =
  (import.meta.env.VITE_SITE_URL || 'https://twitch.chrisldo.com').replace(/\/+$/, '');

export const googleSiteVerification = import.meta.env.VITE_GOOGLE_SITE_VERIFICATION || '';

export const landingMetadata = {
  title: 'Twitch Chat Visualizer | Studio de overlay de chat para OBS',
  description:
    'Studio em tempo real para criar um overlay de chat Twitch transparente e pronto para OBS. Personalize cores, badges, emotes e tipografia em segundos. Open source e gratis.',
  keywords:
    'overlay de chat Twitch, visualizador de chat para streamers, Twitch chat OBS overlay, overlay OBS Twitch, chat Twitch transparente, chat overlay gratis, twitch chat visualizer',
  canonicalUrl: `${landingSiteUrl}/`,
  ogImage: `${landingSiteUrl}/og-image.svg`,
  authorName: 'Christopher de Oliveira',
  authorUrl: 'https://chrisldo.com',
  repoUrl: 'https://github.com/christopherldo/twitch-chat-visualizer',
} as const;

export const softwareApplicationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Twitch Chat Visualizer',
  applicationCategory: 'MultimediaApplication',
  applicationSubCategory: 'Streaming Overlay Tool',
  operatingSystem: 'Web, Windows, macOS, Linux',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  description: landingMetadata.description,
  url: landingMetadata.canonicalUrl,
  image: landingMetadata.ogImage,
  author: {
    '@type': 'Person',
    name: landingMetadata.authorName,
    url: landingMetadata.authorUrl,
  },
  sameAs: [landingMetadata.repoUrl, landingMetadata.authorUrl],
  featureList: [
    'Studio em tempo real com preview animado',
    'Presets visuais para diferentes formatos de live',
    'Personalizacao de cores, badges e tipografia',
    'Renderizacao de emotes Twitch, BTTV e FFZ',
    'Sanitizacao XSS e baixa latencia via Socket.IO',
    'Geracao instantanea de URL para Browser Source no OBS',
  ],
} as const;

export const features = [
  {
    title: 'Studio em tempo real',
    description:
      'Veja cada ajuste de cor, fonte ou preset acontecer no preview animado, com mensagens simuladas indo e vindo.',
  },
  {
    title: 'Performance enterprise',
    description:
      'WebSocket dedicado, conexao TMI compartilhada e cache em Redis. Latencia proxima de zero ate em chats lotados.',
  },
  {
    title: 'Pronto pra OBS, XSplit & cia',
    description:
      'Cole a URL em qualquer Browser Source, defina largura/altura e mantenha "refresh on scene active" — pronto.',
  },
  {
    title: 'Emotes & badges nativos',
    description:
      'Suporte oficial para emotes Twitch, BTTV e FFZ. Mostre badges de mod, sub, VIP e bits sem configuracao extra.',
  },
  {
    title: 'Sanitizacao XSS',
    description:
      'Cada mensagem passa por um sanitizador estrito antes de entrar na cena. Seu OBS continua seguro mesmo em chats hostis.',
  },
  {
    title: 'Presets feitos com gosto',
    description:
      'De Twitch Classic a Cyberwave, escolha o tema que combina com a sua identidade ou comece do zero.',
  },
  {
    title: 'Customizacao via URL',
    description:
      'Toda configuracao mora na URL. Compartilhe com seus moderadores, salve em alias do OBS ou versione no seu git.',
  },
  {
    title: 'Open source e gratis',
    description:
      'Codigo aberto sob MIT. Self-host, fork, contribua. Sem trial, sem rate limit, sem upsell.',
  },
] as const;

export const howItWorksSteps = [
  {
    step: '1',
    title: 'Personalize no studio',
    description:
      'Escolha um preset, ajuste cores e fonte, e veja o chat reagir em tempo real com mensagens simuladas.',
  },
  {
    step: '2',
    title: 'Copie a URL gerada',
    description:
      'A URL ja vem com canal, cores e tamanho da fonte salvos. Compartilhe com a sua equipe ou versione com a sua cena.',
  },
  {
    step: '3',
    title: 'Cole no OBS',
    description:
      'Adicione uma Browser Source, cole a URL, ajuste largura e altura. Sua cena ganha um chat ao vivo na hora.',
  },
] as const;

export const useCases = [
  {
    title: 'Streamers de games',
    description:
      'Mostre o chat sem perder FPS. Cores que combinam com a sua HUD e tamanho ajustavel para qualquer resolucao.',
  },
  {
    title: 'Podcasts e talk shows',
    description:
      'Destaque perguntas do publico em entrevistas, reacts e programas ao vivo com um layout legivel para a tela toda.',
  },
  {
    title: 'Eventos e e-sports',
    description:
      'Coberturas, watch parties e campeonatos: mantenha o chat das comunidades visivel ao lado do gameplay.',
  },
] as const;

export const faqItems = [
  {
    question: 'Como criar um overlay de chat Twitch para OBS?',
    answer:
      'Abra o studio direto na pagina, informe o canal, ajuste cores e fonte, copie a URL gerada e cole em uma Browser Source no OBS Studio. Pronto, ja esta no ar.',
  },
  {
    question: 'O Twitch Chat Visualizer e gratis?',
    answer:
      'Sim. O projeto e open source sob licenca MIT. Sem cadastro, sem assinatura, sem rate limit. Voce pode usar, hospedar e contribuir como quiser.',
  },
  {
    question: 'Funciona com fundo transparente?',
    answer:
      'Sim. O overlay e desenhado para cenas no OBS, ficando 100% transparente sobre gameplay, webcam, podcast ou layouts verticais.',
  },
  {
    question: 'O overlay mostra badges e emotes do chat?',
    answer:
      'Sim. Renderizamos badges nativos da Twitch (mod, sub, VIP, bits) e emotes da Twitch, BTTV e FrankerFaceZ, com cache em Redis para evitar rate limit.',
  },
  {
    question: 'Preciso instalar plugin no OBS?',
    answer:
      'Nao. Tudo acontece via Browser Source. Voce gera a URL no studio, cola no OBS ou em qualquer software de streaming compativel e segue o fluxo.',
  },
  {
    question: 'Posso hospedar a minha propria copia?',
    answer:
      'Sim. O monorepo (apps/api + apps/web) ja vem com docker-compose para subir tudo localmente ou em uma VPS. Veja o README no GitHub.',
  },
] as const;

export const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
} as const;
