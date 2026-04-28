import { IoAdapter } from '@nestjs/platform-socket.io';
import { ServerOptions } from 'socket.io';
import { createAdapter } from '@socket.io/redis-adapter';
import { Redis } from 'ioredis';

export class RedisIoAdapter extends IoAdapter {
  private adapterConstructor: ReturnType<typeof createAdapter>;

  async connectToRedis(): Promise<void> {
    const pubClient = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');
    const subClient = pubClient.duplicate();

    await Promise.all([pubClient.connect(), subClient.connect()]).catch((err) => {
      // Ignorando erros de conexão inicial para permitir fallback caso redis não exista no ambiente dev
      console.warn('⚠️  Redis for Socket.IO failed to connect. Falling back to memory adapter.', err.message);
    });

    if (pubClient.status === 'ready' && subClient.status === 'ready') {
      this.adapterConstructor = createAdapter(pubClient, subClient);
    }
  }

  createIOServer(port: number, options?: ServerOptions): any {
    const server = super.createIOServer(port, options);
    if (this.adapterConstructor) {
      server.adapter(this.adapterConstructor);
    }
    return server;
  }
}