import { useEffect, useRef, useState } from 'react';

export interface DemoMessage {
  id: string;
  username: string;
  color: string;
  message: string;
  badges: string[];
}

export const demoUsers: Array<Pick<DemoMessage, 'username' | 'color' | 'badges'>> = [
  { username: 'streamerpro', color: '#a78bfa', badges: ['mod', 'sub'] },
  { username: 'viewer42', color: '#f472b6', badges: [] },
  { username: 'modchat', color: '#22d3ee', badges: ['mod'] },
  { username: 'partyhost', color: '#facc15', badges: ['vip'] },
  { username: 'queenoftrolls', color: '#34d399', badges: ['sub'] },
  { username: 'lurker_tv', color: '#fb7185', badges: [] },
  { username: 'cheersbot', color: '#60a5fa', badges: ['bot'] },
  { username: 'emote_lover', color: '#fda4af', badges: ['sub', 'cheer'] },
  { username: 'speedrunner', color: '#86efac', badges: ['sub'] },
  { username: 'art_studio', color: '#c4b5fd', badges: ['vip', 'sub'] },
];

export const demoSnippets: string[] = [
  'esse overlay ficou liiindo demais, parabens',
  'qual a config disso aqui? quero igual no meu setup',
  'pog! a leitura do chat ta perfeita assim',
  'finalmente um overlay que nao trava o OBS',
  'KKKK chat empolgado hoje',
  'gente, copia o link e cola no browser source, simples assim',
  'esse roxo ai casou com a cena',
  'ja salvei o preset, valeu demais',
  'transparencia perfeita, parece nativo do OBS',
  'bom demais ver o nick com badge no balao',
  'compartilhei com a galera do meu discord',
  'minha mae aprovou o overlay novo',
  'ja entrou na categoria de "preciso ter"',
  'a transicao do chat ta suavissima',
  'levou 2 minutos pra configurar, juro',
  'agora a live ta com cara de profissional',
  'kappaPride muito show',
  'esse fontsize 18 ficou top demais',
  'pode falar pra galera do podcast experimentar',
  'salvei nos meus favoritos, brigadao',
];

let counter = 0;
const generateId = () => {
  counter += 1;
  return `m-${counter}`;
};

export function buildDemoMessage(seed?: number): DemoMessage {
  const userIndex =
    seed === undefined ? Math.floor(Math.random() * demoUsers.length) : seed % demoUsers.length;
  const messageIndex =
    seed === undefined ? Math.floor(Math.random() * demoSnippets.length) : seed % demoSnippets.length;
  const user = demoUsers[userIndex];
  return {
    id: generateId(),
    username: user.username,
    color: user.color,
    message: demoSnippets[messageIndex],
    badges: user.badges,
  };
}

export interface UseDemoChatOptions {
  intervalMs?: number;
  maxMessages?: number;
  paused?: boolean;
  initialCount?: number;
}

export function useDemoChat({
  intervalMs = 1800,
  maxMessages = 8,
  paused = false,
  initialCount = 3,
}: UseDemoChatOptions = {}) {
  const [messages, setMessages] = useState<DemoMessage[]>([]);
  const seededRef = useRef(false);

  useEffect(() => {
    if (seededRef.current) return;
    seededRef.current = true;
    const initial: DemoMessage[] = [];
    const startSeed = Math.floor(Math.random() * 1000);
    for (let i = 0; i < initialCount; i++) {
      initial.push(buildDemoMessage(startSeed + i));
    }
    setMessages(initial);
  }, [initialCount]);

  useEffect(() => {
    if (paused) return;

    const id = window.setInterval(() => {
      setMessages((prev) => {
        const next = [...prev, buildDemoMessage()];
        while (next.length > maxMessages) next.shift();
        return next;
      });
    }, intervalMs);

    return () => window.clearInterval(id);
  }, [intervalMs, maxMessages, paused]);

  return messages;
}
