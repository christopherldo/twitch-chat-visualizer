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

  private async handleTwitchMessage(payload: TwitchMessagePayload) {
    const { channel, tags, message } = payload;
    
    // TODO: Em uma fase futura, a lógica de "messageTreatment" de converter
    // emotes para tags HTML pode ser feita no próprio Frontend React para segurança máxima,
    // mas por enquanto, manteremos o contrato JSON do legado:
    
    const messageObject = {
      badges: tags['badges-raw'] || {}, // Simplificado: O React receberá badges-raw e construirá a imagem
      username: tags.username,
      message: message, // O React aplicará sanitizeHTML
      emotes: tags['emotes-raw'] // Nova prop para o React reconstruir sem depender de tratamento backend
    };

    // Manda a mensagem *somente* para os sockets que estão na Room desse canal
    this.server.to(channel).emit('message', messageObject);
  }
}
