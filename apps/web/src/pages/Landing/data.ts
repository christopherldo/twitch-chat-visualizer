export const landingSiteUrl =
  (import.meta.env.VITE_SITE_URL || 'https://SEU_DOMINIO_AQUI.com').replace(/\/+$/, '');

export const googleSiteVerification = import.meta.env.VITE_GOOGLE_SITE_VERIFICATION || '';

export const landingMetadata = {
  title: 'Overlay de Chat Twitch para OBS | Twitch Chat Visualizer',
  description:
    'Crie um overlay de chat Twitch para OBS em minutos. Personalize cores, badges e emotes, copie a URL e use um visualizador de chat leve para streamers.',
  keywords:
    'overlay de chat Twitch, visualizador de chat para streamers, Twitch chat OBS overlay, overlay OBS Twitch, chat Twitch transparente, chat overlay gratis',
  canonicalUrl: `${landingSiteUrl}/`,
  ogImage: `${landingSiteUrl}/og-image.svg`,
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
  featureList: [
    'Overlay de chat Twitch transparente para OBS',
    'Personalizacao de cores e tipografia',
    'Renderizacao de emotes e badges',
    'Baixo consumo de CPU',
    'Geracao instantanea de URL para Browser Source',
  ],
} as const;

export const features = [
  {
    title: 'Personalizacao total',
    description:
      'Ajuste fundo, cor do nome, cor da mensagem e fonte para combinar com a identidade visual da sua live.',
  },
  {
    title: 'Leve para transmitir',
    description:
      'Overlay enxuto, rapido e com baixo impacto para manter seu setup responsivo durante streaming e gravacao.',
  },
  {
    title: 'Integracao simples com OBS',
    description:
      'Configure o visual, copie a URL do Browser Source e cole no OBS Studio sem extensoes complicadas.',
  },
  {
    title: 'Emotes e badges nativos',
    description:
      'Mostre nomes, badges e mensagens em um layout legivel para destacar a conversa da sua comunidade.',
  },
  {
    title: 'Gratis para sempre',
    description:
      'Use o visualizador de chat para streamers sem barreiras de entrada, assinaturas ou bloqueios de recursos.',
  },
  {
    title: 'Pronto para cenas transparentes',
    description:
      'Ideal para overlays limpos com fundo transparente, encaixando no design da sua cena principal ou vertical.',
  },
] as const;

export const howItWorksSteps = [
  {
    step: '1',
    title: 'Configure as cores',
    description:
      'Escolha o canal, ajuste paleta e tamanho da fonte ate o overlay combinar com o seu setup.',
  },
  {
    step: '2',
    title: 'Copie o link',
    description:
      'O painel gera automaticamente a URL do seu overlay de chat Twitch com todos os parametros salvos.',
  },
  {
    step: '3',
    title: 'Cole no OBS',
    description:
      'Adicione uma Browser Source no OBS Studio, cole a URL e deixe o chat aparecendo ao vivo na sua cena.',
  },
] as const;

export const useCases = [
  {
    title: 'Streamers de games',
    description:
      'Mostre o chat na tela sem sacrificar desempenho, mantendo leitura facil durante partidas intensas.',
  },
  {
    title: 'Podcasters e talk shows',
    description:
      'Destaque perguntas do publico em entrevistas, reacts e programas ao vivo com um layout elegante.',
  },
  {
    title: 'Eventos e e-sports',
    description:
      'Use o Twitch chat OBS overlay em coberturas, watch parties e campeonatos para aproximar audiencia e apresentacao.',
  },
] as const;

export const faqItems = [
  {
    question: 'Como criar um overlay de chat Twitch para OBS?',
    answer:
      'Basta abrir o painel, informar o canal, ajustar cores e fonte, copiar a URL gerada e colar em uma Browser Source no OBS Studio.',
  },
  {
    question: 'O Twitch Chat Visualizer e gratis?',
    answer:
      'Sim. O gerador de overlay de chat Twitch e gratis para usar e foi pensado para streamers que querem agilidade e personalizacao.',
  },
  {
    question: 'Funciona com fundo transparente?',
    answer:
      'Sim. O overlay transparente foi feito para cenas no OBS, permitindo encaixe limpo sobre gameplay, webcam ou layout de podcast.',
  },
  {
    question: 'O overlay mostra badges e emotes do chat?',
    answer:
      'Sim. O visualizador de chat exibe mensagens e badges recebidos pelo overlay, preservando identidade da comunidade e leitura.',
  },
  {
    question: 'Preciso instalar algum plugin no OBS?',
    answer:
      'Nao. O fluxo usa apenas Browser Source. Voce configura no navegador, copia o link e cola no OBS ou software compativel.',
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
