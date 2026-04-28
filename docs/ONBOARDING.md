# Guia de Onboarding para Desenvolvedores

Bem-vindo(a) ao projeto **Twitch Chat Visualizer**. Este guia te ajudará a entender a arquitetura do projeto e os padrões de código para iniciar suas contribuições rapidamente.

## 🏗️ Arquitetura do Monorepo

Nós utilizamos **pnpm workspaces** para dividir nossa base de código de forma moderna e modular:

```text
twitch-chat-visualizer/
├── apps/
│   ├── api/                 # Backend: NestJS, Fastify, Socket.io, Redis
│   └── web/                 # Frontend: React 19, Vite, Tailwind CSS v4, Zustand
├── packages/
│   ├── config-ts/           # Configurações TypeScript baseadas na raiz (`tsconfig.base.json`)
│   └── shared/              # Contratos globais (Zod Schemas e Tipos TS) partilhados
└── docker-compose.yaml      # Infraestrutura de produção local
```

## 🛠️ Padrões e Convenções

- **TypeScript (Strict Mode):** O projeto inteiro foi reconstruído com TypeScript `strict: true`. O uso de `any` deve ser evitado ou estritamente comentado com justificação.
- **Formatação e Linting:**
  - `Prettier`: Mantém o código visualmente coeso. (Ver `.prettierrc` na raiz).
  - `ESLint`: Configuramos regras unificadas para a raiz, integradas com Vite e NestJS.
- **Gerenciador de Pacotes:** Obrigatório o uso de **`pnpm`** para lidar com os workspaces com alta performance.

## 🚀 Fluxo de Desenvolvimento Local

### 1. Preparação
- Instale as dependências: `pnpm install`
- Crie o seu arquivo `.env` na raiz copiando de `.env.example`.
- Garanta que você possui `TWITCH_CLIENT_ID` e `TWITCH_CLIENT_SECRET`.

### 2. Rodando o Projeto
Inicie todo o ecossistema (backend + frontend) simultaneamente em paralelo:
```bash
pnpm dev
```
- **Web UI:** http://localhost:5173
- **API Gateway:** http://localhost:3000
- **Swagger Docs:** http://localhost:3000/api/docs

*(Opcional) Para infraestrutura (Redis), você pode rodar:* `pnpm run services:up`.

### 3. Testes e Qualidade
Antes de submeter código, garanta que os testes passem (Vitest é a nossa ferramenta escolhida):
```bash
pnpm test
```
Para verificação de tipos limpos, a integração contínua (CI) vai rodar `pnpm build`, o que envolve um `tsc --noEmit` validando toda a monorepo.

## 🤝 Como Contribuir

1. **Branches:** Crie branches semânticas a partir da `main`. (Ex: `feature/nova-animacao`, `fix/cache-bug`, `refactor/alguma-coisa`).
2. **Commits:** Siga o padrão *Conventional Commits* (ex: `feat: add new emote provider`).
3. **Pull Requests:** Antes de abrir um PR, sempre rode o formatador na raiz (`pnpm format`) e garanta que não foram inseridas vulnerabilidades (`pnpm audit`).
4. **Code Review:** Seu código será analisado focando em performance, zero vazamentos de memória (mem-leaks via sockets mal fechados) e sanitização rigorosa para prevenir ataques XSS (Cross-Site Scripting).