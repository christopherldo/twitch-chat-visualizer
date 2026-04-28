# Changelog

## [2.0.0] - 2026-04-28

### 🚀 Novidades
- **Arquitetura Monorepo (pnpm):** Transição completa para pnpm workspaces separando código em pacotes compartilhados e apps isolados.
- **Backend Moderno (NestJS):** Substituição do Express monolítico pelo NestJS utilizando Fastify sob o capô para ganho de performance.
- **Integração Real-time Escalável:** Socket.io reestruturado em Gateways do NestJS com gestão eficiente de rooms.
- **Cache Otimizado:** Implementação de Redis (com fallback in-memory) para caching agressivo de badges e emotes da Twitch, BetterTTV e FrankerFaceZ.
- **Gestão Segura de Tokens:** Rotação automática do `App Access Token` da Twitch via serviço Cron para prevenir expirações surpresa durante transmissões longas.
- **Novo Frontend (React 19):** UI reconstruída completamente do zero com Vite e React, mantendo total paridade visual e funcional de URLs com a versão antiga.
- **Estilização Ágil:** Adoção do Tailwind CSS v4.
- **Observabilidade:** Logs estruturados no backend via `nestjs-pino` preparados para DataDog/ELK e health checks profissionais via `@nestjs/terminus`.
- **Docker Multi-stage:** Imagens ultraleves separadas para API e Nginx, orquestradas via `docker-compose.yaml` prontas para deploy com segurança e performance.

### 🛡️ Segurança e Correções
- **Resolvido vulnerabilidade crítica de XSS:** As mensagens renderizadas via WebSocket agora passam por estrita sanitização e injeção de HTML é restrita unicamente a tags `<img>` oriundas de origens verificadas.
- **Memory Leaks Eliminados:** O backend antigo mantinha conexões e listeners do `tmi.js` acumulando na memória a cada refresh. A versão 2.0 aplica um padrão *Singleton* por canal, não duplicando tráfego na Twitch.

### 🗑️ Remoções
- Remoção definitiva do frontend/backend monolítico em `apps/legacy-express`.
- Remoção do motor de template `mustache-express`.