# Documentação da API

O backend do Twitch Chat Visualizer (`apps/api`) é construído com **NestJS 11** e **Fastify**. Ele expõe tanto endpoints REST convencionais quanto um Gateway WebSocket para comunicação em tempo real com o frontend React (`apps/web`).

---

## 🌐 Endpoints REST

A interface do Swagger com a documentação OpenAPI está disponível interativamente quando você roda o servidor de desenvolvimento, em:
👉 **[http://localhost:3000/api/docs](http://localhost:3000/api/docs)**

### 1. Obter Assets do Canal
Busca os dados de badges e emotes de um canal na Twitch e de provedores de terceiros (BetterTTV, FrankerFaceZ). O resultado é servido via Cache (Redis ou In-memory) para alta performance.

**Requisição:**
- **Método:** `GET`
- **Rota:** `/api/assets/:channel`
- **Parâmetros:**
  - `channel` (path): Nome de usuário do canal na Twitch (ex: `alanzoka`).

**Resposta de Sucesso (200 OK):**
```json
{
  "globalBadges": { "data": [ ... ] },
  "channelBadges": { "data": [ ... ] },
  "bttvEmotes": [
    { "id": "5f...12", "code": "KEKW", "imageType": "png", "animated": false }
  ],
  "ffzEmotes": [
    { "id": 1234, "name": "MonkaS" }
  ]
}
```

### 2. Health Check
Verifica a saúde do serviço, incluindo o status da memória do Node.js e a disponibilidade do Redis. Utiliza o módulo `@nestjs/terminus`.

**Requisição:**
- **Método:** `GET`
- **Rota:** `/health`

**Resposta de Sucesso (200 OK):**
```json
{
  "status": "ok",
  "info": {
    "memory_heap": { "status": "up" },
    "memory_rss": { "status": "up" },
    "redis": { "status": "up", "message": "Redis/Cache is responding" }
  },
  "error": {},
  "details": { ... }
}
```

---

## 🔌 Eventos WebSocket (Socket.io)

O servidor Socket.io escuta em `/socket.io/` e opera num modelo Pub/Sub. Quando o React conecta, ele se inscreve num canal. O backend gerencia a conexão única com a IRC da Twitch (`tmi.js`) para poupar recursos.

### Eventos Emitidos pelo Cliente (Frontend -> Backend)

#### `username`
Informa ao backend que o socket atual deseja escutar um canal específico. O backend vai adicionar o socket a uma *Room* e iniciar a conexão `tmi.js` se for o primeiro visualizador daquele canal.

- **Payload:** `string` (nome do canal, ex: `"alanzoka"`)

#### `transparent` (Obsoleto / Retrocompatibilidade)
Solicitava que o backend gerasse o link parametrizado do overlay legado.
- **Payload:** `Object` (Configurações de UI: `{ nameBackgroundColor, ... }`)

---

### Eventos Emitidos pelo Servidor (Backend -> Frontend)

#### `configured`
Sinaliza que o servidor se conectou com sucesso à IRC da Twitch para o canal solicitado.
- **Payload:** Nenhum.

#### `message`
Uma nova mensagem no chat do canal. O backend já efetua o tratamento de emotes convertendo tags originais da Twitch, BTTV e FFZ para tags de imagem HTML de forma otimizada.
- **Payload:**
```json
{
  "badges": {
    "0": "https://static-cdn.jtvnw.net/badges/v1/xyz/1"
  },
  "username": "usuario_teste",
  "message": "Olá chat! <img src=\"...\" alt=\"KEKW\">",
  "emotes": "25:0-4"
}
```

#### Eventos de Moderação
Quando ocorre moderação no chat da Twitch, o servidor propaga estes eventos para o overlay limpar a tela:
- **`ban`**: Usuário foi banido permanentemente. (Payload: `string` - `username`)
- **`timeout`**: Usuário sofreu timeout temporário. (Payload: `string` - `username`)
- **`messagedeleted`**: Uma mensagem específica foi apagada. (Payload: `string` - `username`)
- **`clearchat`**: Comando `/clear` foi executado pelo moderador. Limpa todas as mensagens. (Payload: nenhum)