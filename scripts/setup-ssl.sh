#!/bin/bash

DOMAIN=$1
EMAIL=$2

if [ -z "$DOMAIN" ] || [ -z "$EMAIL" ]; then
  echo "Uso: bash scripts/setup-ssl.sh <seu-dominio.com> <seu-email@exemplo.com>"
  exit 1
fi

echo "=========================================="
echo "1. Instalando Certbot no Amazon Linux 2023"
echo "=========================================="
sudo dnf install -y python3 augeas-libs
sudo python3 -m venv /opt/certbot/
sudo /opt/certbot/bin/pip install --upgrade pip
sudo /opt/certbot/bin/pip install certbot
sudo ln -sf /opt/certbot/bin/certbot /usr/bin/certbot

echo "=========================================="
echo "2. Parando o servidor web para liberar a porta 80"
echo "=========================================="
docker compose stop web

echo "=========================================="
echo "3. Gerando certificado SSL para $DOMAIN"
echo "=========================================="
# O Certbot vai subir um servidor temporário na porta 80 para validar o domínio
sudo certbot certonly --standalone -d $DOMAIN -m $EMAIL --agree-tos --non-interactive

if ! sudo test -d "/etc/letsencrypt/live/$DOMAIN"; then
  echo "❌ Falha ao gerar o certificado SSL. Verifique se o DNS propagou."
  docker compose start web
  exit 1
fi

echo "=========================================="
echo "4. Configurando Nginx para usar SSL"
echo "=========================================="
# Substitui o domínio no template de configuração e gera o arquivo de produção
sed "s/YOUR_DOMAIN/$DOMAIN/g" apps/web/nginx-ssl.template.conf > apps/web/nginx-prod.conf

echo "=========================================="
echo "5. Iniciando os containers com suporte a SSL"
echo "=========================================="
docker compose -f docker-compose.yaml -f docker-compose.prod.yaml up -d

echo "=========================================="
echo "6. Configurando renovação automática (Cron)"
echo "=========================================="
# O cron rodará todo dia de madrugada, parando o container apenas se for renovar, e depois ligando novamente.
CRON_CMD="0 3 * * * root /opt/certbot/bin/certbot renew -q --pre-hook \"cd $(pwd) && docker compose stop web\" --post-hook \"cd $(pwd) && docker compose -f docker-compose.yaml -f docker-compose.prod.yaml start web\""
echo "$CRON_CMD" | sudo tee /etc/cron.d/certbot-renew > /dev/null

echo "=========================================="
echo "✅ SSL configurado com sucesso para https://$DOMAIN!"
echo "=========================================="
