import { Injectable, Logger } from '@nestjs/common';
import * as tmi from 'tmi.js';
import { Subject } from 'rxjs';

export interface TwitchMessagePayload {
  channel: string;
  tags: tmi.ChatUserstate;
  message: string;
  self: boolean;
}

interface ChannelConnection {
  client: tmi.Client;
  listenersCount: number;
}

@Injectable()
export class TwitchService {
  private readonly logger = new Logger(TwitchService.name);
  private connections = new Map<string, ChannelConnection>();
  
  // Usamos RxJS Subject como um event bus para todos os eventos de chat
  public messageSubject = new Subject<TwitchMessagePayload>();
  public banSubject = new Subject<{ channel: string, username: string }>();
  public timeoutSubject = new Subject<{ channel: string, username: string }>();
  public deleteSubject = new Subject<{ channel: string, username: string }>();
  public clearSubject = new Subject<{ channel: string }>();

  async joinChannel(channelName: string): Promise<void> {
    const channel = channelName.toLowerCase();

    if (this.connections.has(channel)) {
      const conn = this.connections.get(channel)!;
      conn.listenersCount++;
      this.logger.log(`Existing connection for ${channel}. Listeners: ${conn.listenersCount}`);
      return;
    }

    this.logger.log(`Creating new TMI client for ${channel}...`);
    
    const client = new tmi.Client({
      connection: {
        secure: true,
        reconnect: true,
      },
      channels: [channel],
    });

    try {
      await client.connect();
      
      this.connections.set(channel, {
        client,
        listenersCount: 1,
      });

      this.setupListeners(client, channel);
      this.logger.log(`Connected to Twitch IRC for ${channel}.`);
    } catch (error: any) {
      this.logger.error(`Failed to connect to ${channel}: ${error.message}`);
    }
  }

  async leaveChannel(channelName: string): Promise<void> {
    const channel = channelName.toLowerCase();
    
    if (!this.connections.has(channel)) return;

    const conn = this.connections.get(channel)!;
    conn.listenersCount--;

    if (conn.listenersCount <= 0) {
      this.logger.log(`No more listeners for ${channel}. Disconnecting TMI client.`);
      
      try {
        await conn.client.disconnect();
        conn.client.removeAllListeners();
      } catch (err: any) {
        this.logger.error(`Error disconnecting client for ${channel}: ${err.message}`);
      } finally {
        this.connections.delete(channel);
      }
    } else {
      this.logger.log(`Listener left ${channel}. Remaining: ${conn.listenersCount}`);
    }
  }

  private setupListeners(client: tmi.Client, channel: string) {
    client.on('message', (ch, tags, message, self) => {
      this.messageSubject.next({ channel: ch.replace('#', ''), tags, message, self });
    });

    client.on('ban', (ch, username) => {
      this.banSubject.next({ channel: ch.replace('#', ''), username });
    });

    client.on('timeout', (ch, username) => {
      this.timeoutSubject.next({ channel: ch.replace('#', ''), username });
    });

    client.on('messagedeleted', (ch, username) => {
      this.deleteSubject.next({ channel: ch.replace('#', ''), username });
    });

    client.on('clearchat', (ch) => {
      this.clearSubject.next({ channel: ch.replace('#', '') });
    });
  }
}
