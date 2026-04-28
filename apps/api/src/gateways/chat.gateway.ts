import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { TwitchService, TwitchMessagePayload } from '../twitch/twitch.service';
import { EmoteCacheService } from '../cache/emote-cache.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(ChatGateway.name);
  private socketChannelMap = new Map<string, string>();

  constructor(
    private readonly twitchService: TwitchService,
    private readonly emoteCacheService: EmoteCacheService,
  ) {
    // Inscreve nos eventos do RxJS Subject do TwitchService
    this.twitchService.messageSubject.subscribe((payload) => this.handleTwitchMessage(payload));
    this.twitchService.banSubject.subscribe(({ channel, username }) => this.server.to(channel).emit('ban', username));
    this.twitchService.timeoutSubject.subscribe(({ channel, username }) => this.server.to(channel).emit('timeout', username));
    this.twitchService.deleteSubject.subscribe(({ channel, username }) => this.server.to(channel).emit('messagedeleted', username));
    this.twitchService.clearSubject.subscribe(({ channel }) => this.server.to(channel).emit('clearchat'));
  }

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
    const channel = this.socketChannelMap.get(client.id);
    
    if (channel) {
      client.leave(channel);
      this.twitchService.leaveChannel(channel);
      this.socketChannelMap.delete(client.id);
    }
  }

  @SubscribeMessage('username')
  async handleJoinChannel(@ConnectedSocket() client: Socket, @MessageBody() channelName: string) {
    const channel = channelName.toLowerCase();
    
    // Armazena a qual canal este socket pertence
    this.socketChannelMap.set(client.id, channel);
    
    // Adiciona o socket à "room" do Socket.io para multicast
    client.join(channel);
    
    this.logger.log(`Client ${client.id} joined channel room: ${channel}`);
    
    // Assegura que o Singleton do TMI crie ou reutilize a conexão IRC
    await this.twitchService.joinChannel(channel);
    
    // (Opcional) Faz cache de assets agora, para a nova feature React consumir
    await this.emoteCacheService.getChannelAssets(channel);

    // Mantendo compatibilidade com o frontend legado
    client.emit('configured');
  }

  @SubscribeMessage('transparent')
  handleTransparentLink(@ConnectedSocket() client: Socket, @MessageBody() object: any) {
    const { nameBackgroundColor, nameTextColor, messageBackgroundColor, messageTextColor, fontSize } = object;
    const channel = this.socketChannelMap.get(client.id);
    const link = `/${channel}/transparent/?namebackground=${nameBackgroundColor}&namecolor=${nameTextColor}&messagebackground=${messageBackgroundColor}&messagecolor=${messageTextColor}&fontsize=${fontSize}`;
    
    client.emit('redirect', link);
  }

  private findBadgeUrl(badgesPayload: any, setId: string, versionId: string): string | null {
    if (!badgesPayload || !badgesPayload.data) return null;
    const set = badgesPayload.data.find((s: any) => s.set_id === setId);
    if (!set) return null;
    const version = set.versions.find((v: any) => v.id === versionId);
    return version ? (version.image_url_4x || version.image_url_2x || version.image_url_1x) : null;
  }

  private parseEmotes(message: string, emotesRaw: string | undefined, bttvEmotes: any[] = [], ffzEmotes: any[] = []): string {
    if (!message) return '';

    let messageWords = message.split(' ');
    const twitchLinks: Record<string, string> = {};

    // 1. Parse Twitch native emotes
    if (emotesRaw) {
      const emotes = emotesRaw.split('/');
      for (const emote of emotes) {
        const [emoteId, positions] = emote.split(':');
        const posArray = positions.split(',');

        for (const pos of posArray) {
          const [start, end] = pos.split('-');
          const codigo = message.substring(parseInt(start), parseInt(end) + 1);
          twitchLinks[codigo] = `<img src="https://static-cdn.jtvnw.net/emoticons/v2/${emoteId}/default/light/1.0" alt="${codigo}">`;
        }
      }
    }

    // 2. Apply Emotes to Words
    messageWords = messageWords.map((word) => {
      // Substitui os nativos do Twitch
      if (twitchLinks[word]) {
        return twitchLinks[word];
      }

      // Checa BTTV
      const bttvMatch = bttvEmotes.find((e: any) => e.code === word);
      if (bttvMatch) {
        return `<img src="https://cdn.betterttv.net/emote/${bttvMatch.id}/1x" alt="${word}">`;
      }

      // Checa FFZ
      const ffzMatch = ffzEmotes.find((e: any) => e.name === word);
      if (ffzMatch) {
        return `<img src="https://cdn.frankerfacez.com/emote/${ffzMatch.id}/1" alt="${word}">`;
      }

      return word;
    });

    return messageWords.join(' ');
  }

  private async handleTwitchMessage(payload: TwitchMessagePayload) {
    const { channel, tags, message } = payload;
    
    // Busca assets do cache para resolver as URLs das badges
    const assets = await this.emoteCacheService.getChannelAssets(channel);
    const badgesSource: Record<number, string> = {};
    
    if (tags['badges-raw'] && assets) {
      const rawBadges = tags['badges-raw'].split(',');
      let i = 0;
      for (const raw of rawBadges) {
        const [set_id, version_id] = raw.split('/');
        let badgeUrl = this.findBadgeUrl(assets.channelBadges, set_id, version_id);
        if (!badgeUrl) {
          badgeUrl = this.findBadgeUrl(assets.globalBadges, set_id, version_id);
        }
        if (badgeUrl) {
          badgesSource[i] = badgeUrl;
          i++;
        }
      }
    }
    
    // TODO: Em uma fase futura, a lógica de "messageTreatment" de converter
    // emotes para tags HTML pode ser feita no próprio Frontend React para segurança máxima,
    // mas por enquanto, manteremos o contrato JSON do legado:
    
    const parsedMessage = this.parseEmotes(
      message, 
      tags['emotes-raw'], 
      assets?.bttvEmotes || [], 
      assets?.ffzEmotes || []
    );
    
    const messageObject = {
      badges: Object.keys(badgesSource).length > 0 ? badgesSource : null,
      username: tags.username,
      message: parsedMessage, // O React/Legado aplicará sanitizeHTML que permite <img>
      emotes: tags['emotes-raw'] // Nova prop para o React reconstruir sem depender de tratamento backend
    };

    // Manda a mensagem *somente* para os sockets que estão na Room desse canal
    this.server.to(channel).emit('message', messageObject);
  }
}
