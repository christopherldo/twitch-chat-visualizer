# Twitch Chat Visualizer

![GitHub repo size](https://img.shields.io/github/repo-size/christopherldo/twitch-chat-visualizer?style=for-the-badge)
![GitHub language count](https://img.shields.io/github/languages/count/christopherldo/twitch-chat-visualizer?style=for-the-badge)
![GitHub forks](https://img.shields.io/github/forks/christopherldo/twitch-chat-visualizer?style=for-the-badge)

> Um overlay de chat em tempo real moderno, ultra-otimizado e seguro, desenhado para streamers e criadores de conteúdo na Twitch. Integração perfeita com o OBS Studio. Totalmente refatorado para os padrões corporativos de 2026!

## 🌟 Sobre o Projeto

O Twitch Chat Visualizer v2 é uma aplicação monorepo construída para alta escalabilidade e segurança. Ele recebe e converte as mensagens e os eventos de moderação (bans, timeouts, apagamentos) diretamente da IRC da Twitch para um overlay limpo e personalizável via navegador. Suporta **emotes nativos, BetterTTV e FrankerFaceZ**, renderizados através de uma engine reativa em React 19.

## 🚀 Tecnologias e Arquitetura

Este projeto adota um **Monorepo (pnpm workspaces)** separando as responsabilidades:

![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![Fastify](https://img.shields.io/badge/fastify-000000?style=for-the-badge&logo=fastify&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Redis](https://img.shields.io/badge/redis-%23DD0031.svg?style=for-the-badge&logo=redis&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white)

```text
twitch-chat-visualizer/
├── apps/
│   ├── api/                 # NestJS API Gateway + WebSockets (Fastify)
│   └── web/                 # React 19 SPA (Vite + Tailwind CSS v4)
├── packages/
│   ├── config-ts/           # Base tsconfig para o monorepo
│   └── shared/              # Tipagens e schemas Zod compartilhados
└── docker-compose.yaml      # Orquestração local (Redis, API, Nginx/Web)
```

## 📋 Pré-requisitos

Para rodar este projeto localmente, você precisará de:
- **Node.js** 22+ (LTS)
- **pnpm** (gerenciador de pacotes v9+)
- **Docker** e **Docker Compose** (para Redis e deploy de produção)
- Uma **Conta de Desenvolvedor da Twitch** (Para obter o Client ID e Secret)

## 🛠️ Configuração e Instalação

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/christopherldo/twitch-chat-visualizer.git
   cd twitch-chat-visualizer
   ```

2. **Instale as dependências da monorepo:**
   ```bash
   pnpm install
   ```

3. **Configure as Variáveis de Ambiente:**
   Copie o arquivo de exemplo e edite com suas credenciais da Twitch (obtidas em [dev.twitch.tv](https://dev.twitch.tv/console)):
   ```bash
   cp .env.example .env
   ```
   *Exemplo do `.env`:*
   ```env
   TWITCH_CLIENT_ID=seu_client_id_aqui
   TWITCH_CLIENT_SECRET=seu_client_secret_aqui
   REDIS_URL=redis://localhost:6379
   PORT=3000
   ```

## 💻 Desenvolvimento Local

Para rodar em ambiente de desenvolvimento (Hot-Reload ativo para Backend e Frontend):

1. **Suba o Redis localmente** (requer Docker):
   ```bash
   pnpm run services:up
   ```
2. **Inicie o monorepo:**
   ```bash
   pnpm dev
   ```
   - **Frontend (Painel e Overlay):** `http://localhost:5173`
   - **Backend API:** `http://localhost:3000`
   - **Swagger Docs:** `http://localhost:3000/api/docs`

### Comandos Úteis
- `pnpm build` — Compila todos os workspaces para a pasta `dist`.
- `pnpm test` — Roda as suítes de teste (Vitest).
- `pnpm lint` — Executa análise estática (ESLint) em todo o código.

## 🐳 Produção com Docker

Para ambientes de produção, o projeto dispõe de Dockerfiles multi-stage otimizados. O Frontend é servido por um Nginx superleve que também atua como proxy reverso para a API.

Suba toda a infraestrutura com um único comando:
```bash
docker compose up --build -d
```
A aplicação estará disponível em **`http://localhost`** (porta 80).

**Health Check:**
Você pode verificar a saúde do serviço, memória e conexão com Redis em:
```bash
curl http://localhost/api/health
```

## 🤝 Contribuição e Guias

- **Quer contribuir?** Veja nosso [Guia de Onboarding](docs/ONBOARDING.md) para entender os padrões de código, TypeScript Strict e fluxo de PRs.
- **Documentação da API:** Os endpoints REST e detalhes do WebSocket estão documentados em [docs/API.md](docs/API.md) e interativamente via Swagger local.

### 🛡️ Relatório de Vulnerabilidades
A segurança é prioridade (temos zero tolerância a XSS). Se encontrar uma vulnerabilidade, por favor, **NÃO** abra uma issue pública. Entre em contato diretamente com o mantenedor de forma privada para coordenarmos um patch seguro.

## 📄 Licença

Este projeto adota a licença **PolyForm Noncommercial License 1.0.0**. 
Você é livre para modificar, estudar e utilizar pessoalmente em suas transmissões, mas **a revenda ou o uso comercial/SaaS deste código é estritamente proibido.** 

Para mais detalhes sobre as restrições e liberdades, leia nossa [Escolha da Licença](docs/LICENSE_CHOICE.md) e o arquivo oficial [LICENSE](LICENSE).

---
**Feito com ❤️ para a comunidade de streaming!**