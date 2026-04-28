# Etapa 1: Build
FROM node:22-alpine AS build

# Configurar pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /app

# Copiar workspace root
COPY pnpm-workspace.yaml package.json pnpm-lock.yaml ./
COPY packages ./packages
COPY apps/web ./apps/web

# Instalar dependências e buildar
RUN pnpm install --frozen-lockfile
RUN pnpm --filter @twitch-chat-visualizer/shared build
RUN pnpm --filter @twitch-chat-visualizer/web build

# Etapa 2: Nginx (Produção)
FROM nginx:stable-alpine AS production

# Copiar build gerado
COPY --from=build /app/apps/web/dist /usr/share/nginx/html

# Copiar configuração Nginx
COPY apps/web/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]