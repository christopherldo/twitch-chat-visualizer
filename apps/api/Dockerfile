# Etapa 1: Build
FROM node:22-alpine AS build

# Configurar pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /app

# Copiar os arquivos essenciais para o workspace e root package.json
COPY pnpm-workspace.yaml package.json pnpm-lock.yaml ./
COPY packages ./packages
COPY apps/api ./apps/api

# Instalar as dependências do monorepo e buildar o projeto e os packages
RUN pnpm install --frozen-lockfile
RUN pnpm --filter @twitch-chat-visualizer/shared build
RUN pnpm --filter @twitch-chat-visualizer/api build

# Etapa 2: Produção
FROM node:22-alpine AS production

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Copiar os arquivos de lock e workspaces
COPY pnpm-workspace.yaml package.json pnpm-lock.yaml ./
COPY packages ./packages
COPY --from=build /app/packages/shared/dist ./packages/shared/dist

# Copiar apenas os arquivos do API já compilados e o package.json
COPY apps/api/package.json ./apps/api/
COPY --from=build /app/apps/api/dist ./apps/api/dist

# Instalar apenas dependências de produção para rodar as dists
RUN pnpm install --prod --frozen-lockfile

EXPOSE 3000

CMD ["node", "apps/api/dist/main.js"]